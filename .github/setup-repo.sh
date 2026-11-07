#!/usr/bin/env bash
# One-time GitHub repository setup. Run it yourself after `gh auth login`:
#   bash .github/setup-repo.sh
# Safe to re-run. It configures:
#   - labels used by the issue templates and Dependabot
#   - merge settings (merge commits + squash, no rebase; delete branch on merge)
#   - branch protection: develop and master accept changes only via PR with green CI
#   - private vulnerability reporting (used by ISSUE_TEMPLATE/config.yml)
set -euo pipefail

REPO="${REPO:-kisen123/WeddingWebsite}"

echo "→ Labels"
label() { gh label create "$1" --repo "$REPO" --color "$2" --description "$3" --force; }
label enhancement  a2eeef "New feature or idea"
label bug          d73a4a "Something isn't working"
label design       f9c8e0 "Visual design change or feedback"
label content      fef2c0 "Text, Q&A, program, photos"
label chore        cfd3d7 "Tech, tooling, refactor"
label security     b60205 "Security or privacy"
label dependencies 0366d6 "Dependency updates (Dependabot)"
label admin        5319e7 "Admin page"

echo "→ Merge settings"
# Release PRs (develop → master) MUST use a merge commit; squashing them would
# make master and develop diverge again.
gh api -X PATCH "repos/$REPO" \
  -F allow_merge_commit=true \
  -F allow_squash_merge=true \
  -F allow_rebase_merge=false \
  -F delete_branch_on_merge=true \
  -f squash_merge_commit_title=PR_TITLE \
  -f squash_merge_commit_message=PR_BODY \
  -f merge_commit_title=PR_TITLE \
  -f merge_commit_message=PR_BODY >/dev/null
# GitHub validates title+message as a pair (PR_TITLE goes with PR_BODY or BLANK),
# so both must always be sent together.

protect() {
  local branch="$1"
  shift
  local checks
  checks=$(printf '"%s",' "$@")
  checks="[${checks%,}]"
  gh api -X PUT "repos/$REPO/branches/$branch/protection" --input - >/dev/null <<EOF
{
  "required_status_checks": { "strict": false, "contexts": $checks },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 0,
    "dismiss_stale_reviews": false
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_conversation_resolution": true
}
EOF
  echo "  protected $branch (checks: $*)"
}

echo "→ Branch protection"
protect develop frontend backend security
protect master frontend backend security

echo "→ Private vulnerability reporting"
gh api -X PUT "repos/$REPO/private-vulnerability-reporting" >/dev/null || \
  echo "  (could not enable; enable it under Settings → Code security)"

echo "Done. Also check under Settings → Code security that Dependabot alerts and security updates are on."
