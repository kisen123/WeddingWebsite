#!/usr/bin/env node
// Render screenshots of the site at the standard viewports.
//
//   npm run screenshots                              # "/" at all viewports
//   npm run screenshots -- --route /save-the-date    # another route (repeatable)
//   npm run screenshots -- --selector '#rsvp'        # one element/section only
//   npm run screenshots -- --viewport mobile         # subset (repeatable)
//   npm run screenshots -- --url http://localhost:5173  # reuse a running server
//   npm run screenshots -- --out test-results/before    # custom output folder
//
// Starts its own Vite dev server on a free port (so parallel git worktrees do
// not collide), writes PNGs to test-results/screenshots/<branch>/ by default,
// and prints a JSON summary including horizontal-overflow checks.
// Exits with code 2 if any page scrolls horizontally.

import { execSync, spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { createServer } from 'node:net';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { chromium } from 'playwright';

const PROJECT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 1000 },
};

const { values } = parseArgs({
  options: {
    route: { type: 'string', multiple: true, default: ['/'] },
    selector: { type: 'string' },
    viewport: { type: 'string', multiple: true },
    url: { type: 'string' },
    out: { type: 'string' },
    'no-full-page': { type: 'boolean', default: false },
  },
});

const viewportNames = values.viewport ?? Object.keys(VIEWPORTS);
for (const name of viewportNames) {
  if (!VIEWPORTS[name]) {
    console.error(
      `Unknown viewport "${name}". Use: ${Object.keys(VIEWPORTS).join(', ')}`,
    );
    process.exit(1);
  }
}

function slug(text) {
  return (
    text
      .replace(/^\/+|\/+$/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'home'
  );
}

function currentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      cwd: PROJECT_DIR,
      encoding: 'utf8',
    }).trim();
  } catch {
    return 'unknown';
  }
}

function freePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolvePort(port));
    });
  });
}

async function waitForServer(url, child, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Vite exited early with code ${child.exitCode}`);
    }
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`Vite did not become ready at ${url}`);
}

async function startVite() {
  const port = await freePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(
    join(PROJECT_DIR, 'node_modules', '.bin', 'vite'),
    ['--host', '127.0.0.1', '--port', String(port), '--strictPort'],
    // Own process group so the whole Vite tree can be stopped at once.
    { cwd: PROJECT_DIR, stdio: ['ignore', 'pipe', 'pipe'], detached: true },
  );
  const stop = () => {
    try {
      process.kill(-child.pid, 'SIGTERM');
    } catch {
      // already gone
    }
  };
  let log = '';
  child.stdout.on('data', (d) => (log += d));
  child.stderr.on('data', (d) => (log += d));
  try {
    await waitForServer(baseUrl, child);
  } catch (error) {
    stop();
    console.error(log);
    throw error;
  }
  return { baseUrl, stop };
}

const outDir = resolve(
  PROJECT_DIR,
  values.out ?? join('test-results', 'screenshots', slug(currentBranch())),
);
mkdirSync(outDir, { recursive: true });

const server = values.url
  ? { baseUrl: values.url.replace(/\/+$/, ''), stop: () => {} }
  : await startVite();

const results = [];
const browser = await chromium.launch();

try {
  for (const route of values.route) {
    for (const name of viewportNames) {
      const viewport = VIEWPORTS[name];
      const page = await browser.newPage({ viewport });
      // Keep agent screenshot runs out of the real Cloudflare analytics.
      await page.route(/cloudflareinsights\.com/, (r) =>
        r.fulfill({ status: 200, contentType: 'text/javascript', body: '' }),
      );
      const consoleErrors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', (err) => consoleErrors.push(err.message));

      const path = route.startsWith('/') ? route : `/${route}`;
      console.error(`[screenshots] ${path} @ ${name}`);
      await page.goto(`${server.baseUrl}${path}`, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);

      const overflow = await page.evaluate(() => {
        const el = document.documentElement;
        return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth };
      });

      const parts = [slug(route)];
      if (values.selector) parts.push(slug(values.selector));
      parts.push(name);
      const file = join(outDir, `${parts.join('_')}.png`);

      if (values.selector) {
        const target = page.locator(values.selector).first();
        await target.scrollIntoViewIfNeeded();
        await target.screenshot({ path: file });
      } else {
        await page.screenshot({
          path: file,
          fullPage: !values['no-full-page'],
        });
      }

      results.push({
        route: path,
        viewport: `${name} ${viewport.width}x${viewport.height}`,
        file,
        horizontalOverflow: overflow.scrollWidth > overflow.clientWidth,
        ...overflow,
        consoleErrors,
      });
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.stop();
}

console.log(JSON.stringify({ outDir, results }, null, 2));

if (results.some((r) => r.horizontalOverflow)) {
  console.error('\nHorizontal overflow detected (see "horizontalOverflow").');
  process.exit(2);
}
process.exit(0);
