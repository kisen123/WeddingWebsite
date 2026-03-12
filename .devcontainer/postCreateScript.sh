#!/usr/bin/env bash
set -e

cd /workspace/frontend
npm install

cd /workspace/backend
dotnet restore