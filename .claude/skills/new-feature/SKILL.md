---
name: new-feature
description: Start a new feature, fix or chore in its own git worktree branched from develop, with dependencies installed and ready for a parallel dev server. Also explains how to finish (PR into develop) and clean up. Use when starting new work, when asked to "work on X in parallel", or when asked how worktrees work here.
argument-hint: "<name> [feature|fix|chore]"
---

# New feature in a worktree

Arguments: `$ARGUMENTS`. The first word is NAME (short kebab-case; ask if missing). The optional second word is TYPE: `feature` (default), `fix` or `chore`. BRANCH = `TYPE/NAME`. Substitute them in the commands below.

## Create

Run from the **main checkout** (repo root, where `develop` is checked out):

```bash
git fetch origin
git worktree add .claude/worktrees/NAME -b BRANCH origin/develop
cd .claude/worktrees/NAME/frontend && npm ci
# backend work too?  (cd .. && dotnet restore bryllup-nettside.sln)
```

Then tell the user how to work in it:
- **New Claude session in it:** open a terminal and run
  `cd .claude/worktrees/NAME && claude`, or open that folder in a new VS Code window.
  `claude --worktree <name>` does the same in one step, but names the branch
  `worktree-<name>`; our convention is `feature/<name>`.
- **In this session:** use the EnterWorktree tool to switch into it, or delegate
  to a subagent with `isolation: "worktree"` for fully parallel, hands-off work.
- **Dev server:** `npm run dev` picks the next free port (5174, 5175, …) if
  5173 is taken. The URL is printed. `npm run screenshots` always uses its own free port.
- Gitignored files listed in `.worktreeinclude` (e.g. `.env.local`) are
  copied only when the worktree is made by Claude (`--worktree`/EnterWorktree).
  With a plain `git worktree add`, copy them by hand if needed.

## While working

- Commit often on the feature branch. Never use bare `git stash`; the stash is
  shared by all worktrees.
- Before finishing: `npm run lint && npm run format:check && npm run build`,
  then the `visual-reviewer` and `i18n-auditor` subagents in parallel.

## Finish

```bash
git push -u origin BRANCH
gh pr create --base develop --fill        # or open the PR on GitHub
```
After merge, from the main checkout:
```bash
git worktree remove .claude/worktrees/NAME
git branch -d BRANCH
git worktree prune
```
`git worktree list` shows every active worktree.
