#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${1:-${PROJECT_DIR}/test-results/final}"
SCREENSHOT_PORT="${SCREENSHOT_PORT:-4173}"
BASE_URL="http://127.0.0.1:${SCREENSHOT_PORT}/"
VITE_LOG="${TMPDIR:-/tmp}/wedding-screenshot-vite.log"

mkdir -p "${OUTPUT_DIR}"
cd "${PROJECT_DIR}"

npm run dev -- --host 127.0.0.1 --port "${SCREENSHOT_PORT}" --strictPort >"${VITE_LOG}" 2>&1 &
SERVER_PID=$!

cleanup() {
  kill "${SERVER_PID}" 2>/dev/null || true
  wait "${SERVER_PID}" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

ready=false
for _ in {1..50}; do
  if curl --fail --silent "${BASE_URL}" >/dev/null 2>&1; then
    ready=true
    break
  fi

  if ! kill -0 "${SERVER_PID}" 2>/dev/null; then
    break
  fi

  sleep 0.2
done

if [[ "${ready}" != true ]]; then
  echo "Vite did not become ready at ${BASE_URL}." >&2
  echo "Server log: ${VITE_LOG}" >&2
  exit 1
fi

npx playwright screenshot --viewport-size="1440,1000" --full-page "${BASE_URL}" "${OUTPUT_DIR}/desktop.png"
npx playwright screenshot --viewport-size="390,844" --full-page "${BASE_URL}" "${OUTPUT_DIR}/mobile.png"
npx playwright screenshot --viewport-size="768,1024" --full-page "${BASE_URL}" "${OUTPUT_DIR}/tablet.png"

echo "Rendered screenshots to ${OUTPUT_DIR}:"
echo "  desktop.png (1440x1000)"
echo "  mobile.png  (390x844)"
echo "  tablet.png  (768x1024)"
