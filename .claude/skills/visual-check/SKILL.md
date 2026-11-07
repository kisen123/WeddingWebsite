---
name: visual-check
description: Take Playwright screenshots of the wedding site at mobile (390×844), tablet (768×1024) and desktop (1440×1000), optionally for one route or section, and look at them. Use after any visual change, before committing UI work, or to capture before/after images.
argument-hint: "[route] [#section-selector] [before|after]"
---

# Visual check

Arguments: `$ARGUMENTS`, e.g. `/save-the-date`, `#rsvp`, `before`. All are optional.

1. From `frontend/` in the **current worktree**, run:
   ```bash
   npm run screenshots -- [--route <route>]... [--selector '<css>'] [--viewport mobile|tablet|desktop]... [--out test-results/<label>]
   ```
   - Sections on `/`: `#home`, `#program`, `#rsvp`, `#contact`, `#qa`.
   - For before/after comparisons, use `--out test-results/before` first, make the
     change, then `--out test-results/after`.
   - The script starts its own Vite server on a free port, so it doesn't clash with a
     running `npm run dev` or other worktrees. Use `--url` to point it at a
     server that is already running instead.
   - If Chromium is missing: `npx playwright install --with-deps chromium`.
2. Read the JSON summary. Exit code 2 means **horizontal overflow**, which is a
   bug to fix and never to accept. Also report any `consoleErrors`.
3. **Open every PNG with the Read tool and actually look at it.** Describe what you
   see per viewport: clipping, overlap, cramped spacing, unreadable text, or
   broken images.
4. Report the file paths so the user can open them too.

For a thorough audit, delegate to the `visual-reviewer` subagent instead.
For interaction (hover, form submission, open/close), use the Playwright MCP
tools from the `playwright` plugin.
