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

After finishing a feature, launch `visual-reviewer` and `i18n-auditor` **in
parallel** (one message, two Agent calls) and fix what they report before
committing.

For two independent features at once, spawn implementation agents with
`isolation: "worktree"` so each gets its own checkout and branch.

## Guardrails

- Never push to `master` or force-push; `.claude/settings.json` denies it.
- Hooks: edited frontend files are auto-formatted with Prettier; when the session
  stops with changed frontend files, ESLint runs and blocks on errors.
- `frontend/test-results/` is scratch output (gitignored).
