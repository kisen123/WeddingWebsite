@AGENTS.md

# Claude Code notes

## Skills to reach for

| Task                                                   | Skill                     |
| ------------------------------------------------------ | ------------------------- |
| Any new UI, restyling, layout or typography work       | `frontend-design` (plugin) |
| Borders, ornaments, icons, illustrations as SVG        | `svg-design`              |
| See what a change looks like / check responsiveness    | `visual-check`            |
| Get Kaja's (or anyone's) opinion on designs            | `design-review`           |
| Start a new feature in its own worktree                | `new-feature`             |
| Ship `develop` to production                           | `release`                 |

The `playwright` plugin (MCP) is also enabled for interactive browsing:
clicking through the RSVP form, hovering, reading console errors. Use
`visual-check` for static screenshots and Playwright MCP for interaction.

## Subagents

- `visual-reviewer`: after any visual change, run it to screenshot all
  viewports and audit against the design rules. Read-only, so it can run in the
  background while you keep working.
- `i18n-auditor`: after touching strings or Q&A content. Cheap (Haiku).
- `backend-dev`: hand off .NET/EF/Postgres work so frontend context stays clean.
- `security-reviewer`: bad practices and vulnerable dependencies. It is
  **required** before opening a PR that touches `backend/`, auth or the admin page,
  guest data, dependencies, workflows or Docker files, and before every release.
  Use `diff` scope for PRs and `full` for periodic audits. The built-in
  `/security-review` command is a good second opinion on a branch.

After finishing a feature, launch `visual-reviewer` and `i18n-auditor` (plus
`security-reviewer` when the rule above applies) **in parallel**, in one message
with several Agent calls, and fix what they report before opening the PR.

For two independent features at once, spawn implementation agents with
`isolation: "worktree"` so each gets its own checkout and branch.

## Guardrails

- Never push to `master`/`develop` or force-push; `.claude/settings.json` denies it,
  and branch protection enforces it on GitHub. Finish work by pushing the
  feature branch and opening a PR (`gh pr create --base develop`). Merging the
  PR is the user's call.
- Hooks: edited frontend files are auto-formatted with Prettier; when the session
  stops with changed frontend files, ESLint runs and blocks on errors.
- `frontend/test-results/` is scratch output (gitignored).
