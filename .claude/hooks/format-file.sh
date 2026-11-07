#!/usr/bin/env bash
# PostToolUse (Edit|Write|MultiEdit): run Prettier on the edited file when it
# lives under a frontend/ directory. Worktree-aware: Prettier is resolved from
# the frontend/ folder that contains the file, not from $CLAUDE_PROJECT_DIR.
# Never blocks: formatting problems are left for lint/format:check.
set -uo pipefail

file=$(jq -r '.tool_input.file_path // empty')
[[ -z "$file" || ! -f "$file" ]] && exit 0

case "$file" in
  */frontend/*) ;;
  *) exit 0 ;;
esac

case "$file" in
  *.ts | *.tsx | *.js | *.mjs | *.jsx | *.scss | *.css | *.json | *.md | *.html) ;;
  *) exit 0 ;;
esac

frontend_dir="${file%%/frontend/*}/frontend"
prettier="$frontend_dir/node_modules/.bin/prettier"
[[ -x "$prettier" ]] || exit 0

(cd "$frontend_dir" && "$prettier" --write --log-level warn "$file") >&2 || true
exit 0
