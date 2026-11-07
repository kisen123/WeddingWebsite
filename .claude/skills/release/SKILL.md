---
name: release
description: Release develop to production (master → GitHub Pages at kajaogkristian.no). Runs pre-release checks and opens the develop→master PR only after explicit confirmation. Use only when the user asks to release, deploy or ship.
disable-model-invocation: true
---

# Release develop → master

Merging to `master` **deploys the public website immediately**. Each step
below is a gate. Stop and report if one fails.

1. **Sync:** `git fetch origin`. Make sure `develop` is clean and up to date
   with `origin/develop`.
2. **Preview the merge result:**
   ```bash
   git merge-tree --write-tree origin/master origin/develop   # must not conflict
   git diff --stat origin/master origin/develop               # what will ship
   git diff --diff-filter=D --name-only origin/master origin/develop
   ```
   Every deleted file must be intended. If the merge tree differs from
   `origin/develop^{tree}` in unexpected ways, stop.
3. **Checks** (from `frontend/`): `npm ci`, `npm run lint`,
   `npm run format:check`, `npm run build`, and `dotnet build` at the repo root.
4. **Visual pass:** run the `visual-reviewer` subagent on `/` and
   `/save-the-date`. Blockers or majors stop the release.
5. **Content sanity:** run the `i18n-auditor` subagent. Grep the build for
   placeholder text ("Item 1", "Your Names", "TODO", "test").
   Also run the `security-reviewer` subagent with `full` scope. Any blocker
   stops the release.
6. **Backend reality check:** if the release includes features that call the
   API (RSVP), confirm the API is deployed and `VITE_API_BASE_URL` is set for the
   build. GitHub Pages hosts only the static frontend.
7. **Summarize** what ships (commits since the last release, screenshots) and
   **ask the user for explicit confirmation**.
8. Only then: `gh pr create --base master --head develop --title "Release <date>"`
   with the summary as the body. The user merges it on GitHub using **"Create a
   merge commit"**. Never squash or rebase a release PR, because that would make
   `master` and `develop` diverge. Never push to `master` directly.
9. After deploy: open https://kajaogkristian.no and run
   `npm run screenshots -- --url https://kajaogkristian.no --out test-results/prod`.
