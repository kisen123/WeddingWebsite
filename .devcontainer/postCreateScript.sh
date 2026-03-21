#!/usr/bin/env bash
set -e

cd /workspaces/bryllup-nettside/frontend
npm install

cd /workspaces/bryllup-nettside
sudo chown -R vscode:vscode /workspaces/bryllup-nettside
sudo find . -name 'obj' -prune -exec rm -rf {} \;
dotnet restore bryllup-nettside.sln