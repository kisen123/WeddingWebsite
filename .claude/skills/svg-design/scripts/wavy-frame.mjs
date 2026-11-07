#!/usr/bin/env node
// Parametric wavy frame generator.
//
// Walks the perimeter of a rounded rectangle, displaces each sample along the
// outward normal by a sine wave, and emits a smooth closed cubic-Bézier path
// (Catmull-Rom → Bézier). Wave counts per side are rounded to whole numbers so
// the pattern meets seamlessly at the corners.
//
// Usage:
//   node wavy-frame.mjs [--width 800] [--height 1200] [--amplitude 14]
//     [--wavelength 110] [--stroke 18] [--radius 60] [--padding 24]
//     [--color currentColor] [--samples 12] [--phase 0] [--out frame.svg]
//
// Prints the SVG (or writes --out) and, on stderr, the content safe-region
// insets as CSS percentages for `inset: <top>% <right>%` on the content box.

import { writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

const { values: a } = parseArgs({
  options: {
    width: { type: 'string', default: '800' },
    height: { type: 'string', default: '1200' },
    amplitude: { type: 'string', default: '14' },
    wavelength: { type: 'string', default: '110' },
    stroke: { type: 'string', default: '18' },
    radius: { type: 'string', default: '60' },
    padding: { type: 'string', default: '24' },
    color: { type: 'string', default: 'currentColor' },
    samples: { type: 'string', default: '12' }, // points per wavelength
    phase: { type: 'string', default: '0' }, // 0..1, shifts crests
    out: { type: 'string' },
  },
});

const W = Number(a.width);
const H = Number(a.height);
const amp = Number(a.amplitude);
const stroke = Number(a.stroke);
const pad = Number(a.padding);
const phase = Number(a.phase) * 2 * Math.PI;
// The centre-line rectangle sits inside the viewBox with room for wave + stroke.
const margin = amp + stroke / 2 + 1;
const rw = W - 2 * margin;
const rh = H - 2 * margin;
const r = Math.min(Number(a.radius), rw / 2, rh / 2);

// Perimeter segments of the rounded rect (centre line), clockwise from top-left.
const straightH = rw - 2 * r;
const straightV = rh - 2 * r;
const arc = (Math.PI / 2) * r;
const perimeter = 2 * straightH + 2 * straightV + 4 * arc;

// Whole number of waves around the frame → seamless closure.
const waves = Math.max(4, Math.round(perimeter / Number(a.wavelength)));
const n = waves * Number(a.samples);

function pointAt(s) {
  // Returns {x, y, nx, ny}: point on the rounded rect and its outward normal.
  const x0 = margin;
  const y0 = margin;
  const segs = [
    ['line', straightH, (t) => [x0 + r + t, y0, 0, -1]],
    ['arc', arc, (t) => corner(x0 + rw - r, y0 + r, -Math.PI / 2 + t / r)],
    ['line', straightV, (t) => [x0 + rw, y0 + r + t, 1, 0]],
    ['arc', arc, (t) => corner(x0 + rw - r, y0 + rh - r, t / r)],
    ['line', straightH, (t) => [x0 + rw - r - t, y0 + rh, 0, 1]],
    ['arc', arc, (t) => corner(x0 + r, y0 + rh - r, Math.PI / 2 + t / r)],
    ['line', straightV, (t) => [x0, y0 + rh - r - t, -1, 0]],
    ['arc', arc, (t) => corner(x0 + r, y0 + r, Math.PI + t / r)],
  ];
  let rest = s;
  for (const [, len, f] of segs) {
    if (rest <= len) return f(rest);
    rest -= len;
  }
  return segs[0][2](0);
}

function corner(cx, cy, angle) {
  const nx = Math.cos(angle);
  const ny = Math.sin(angle);
  return [cx + r * nx, cy + r * ny, nx, ny];
}

const pts = [];
for (let i = 0; i < n; i++) {
  const s = (i / n) * perimeter;
  const [x, y, nx, ny] = pointAt(s);
  const d = amp * Math.sin((s / perimeter) * waves * 2 * Math.PI + phase);
  pts.push([x + nx * d, y + ny * d]);
}

// Closed Catmull-Rom spline → cubic Béziers.
const f = (v) => v.toFixed(2);
let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
for (let i = 0; i < n; i++) {
  const p0 = pts[(i - 1 + n) % n];
  const p1 = pts[i];
  const p2 = pts[(i + 1) % n];
  const p3 = pts[(i + 2) % n];
  const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
  const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
  d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
}
d += 'Z';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="none" aria-hidden="true" focusable="false">
  <path d="${d}" stroke="${a.color}" stroke-width="${stroke}" stroke-linejoin="round"/>
</svg>
`;

if (a.out) writeFileSync(a.out, svg);
else process.stdout.write(svg);

// Inner safe region: the inner wave trough + half stroke + padding (+ corner
// radius clearance, approximated as r*(1-1/√2)).
const insetPx = margin + amp + stroke / 2 + pad + r * (1 - Math.SQRT1_2);
console.error(
  JSON.stringify({
    waves,
    viewBox: `0 0 ${W} ${H}`,
    safeInsetCss: `inset: ${((insetPx / H) * 100).toFixed(1)}% ${((insetPx / W) * 100).toFixed(1)}%;`,
  }),
);
