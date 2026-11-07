#!/usr/bin/env bash
set -e

cd "$(dirname "${BASH_SOURCE[0]}")/../frontend"
npm install

# Chromium + system deps for Playwright screenshots (npm run screenshots)
npx playwright install --with-deps chromium

# Language server used by the Claude Code typescript-lsp plugin
npm install -g typescript-language-server typescript

cd ..
dotnet restore bryllup-nettside.sln
