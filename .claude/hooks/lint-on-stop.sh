#!/usr/bin/env bash
# Stop hook: if the session changed frontend TS/TSX/JS files, run ESLint on
# just those files. On errors, exit 2 so Claude keeps going and fixes them.
# Skips when already continuing from a stop-hook block (no loops).
set -uo pipefail

input=$(cat)
[[ "$(jq -r '.stop_hook_active // false' <<<"$input")" == "true" ]] && exit 0

cwd=$(jq -r '.cwd // empty' <<<"$input")
root=$(git -C "${cwd:-.}" rev-parse --show-toplevel 2>/dev/null) || exit 0
eslint="$root/frontend/node_modules/.bin/eslint"
[[ -x "$eslint" ]] || exit 0

mapfile -t changed < <(
  cd "$root" && {
    git diff --name-only --diff-filter=ACMR HEAD -- frontend
    git ls-files --others --exclude-standard -- frontend
  } | grep -E '\.(ts|tsx|js|mjs|jsx)$' | sort -u | sed 's#^frontend/##'
)
((${#changed[@]} == 0)) && exit 0

if ! out=$(cd "$root/frontend" && "$eslint" --no-warn-ignored "${changed[@]}" 2>&1); then
  echo "ESLint found problems in files changed this session. Fix them (npm run lint:fix may help):" >&2
  echo "$out" >&2
  exit 2
fi
exit 0
