#!/usr/bin/env bash
set -e

cd "$(dirname "${BASH_SOURCE[0]}")/../frontend"
npm install

cd ..
dotnet restore bryllup-nettside.sln
