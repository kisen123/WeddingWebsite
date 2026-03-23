#!/usr/bin/env bash
set -e

cd /workspaces/bryllup-nettside/frontend
npm install

cd /workspaces/bryllup-nettside
dotnet restore bryllup-nettside.sln