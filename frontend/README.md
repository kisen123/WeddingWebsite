# Frontend

React 19 + TypeScript + Vite + SCSS + i18next. See the root
[`AGENTS.md`](../AGENTS.md) for structure, conventions and commands.

```bash
npm ci
npm run dev          # http://localhost:5173
npm run build
npm run lint
npm run screenshots  # Playwright screenshots → test-results/screenshots/<branch>/
```

First time on a new machine: `npx playwright install --with-deps chromium`.
