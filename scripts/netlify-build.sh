#!/usr/bin/env bash
set -euo pipefail

npm --prefix backend ci --include=dev
npm --prefix frontend ci --include=dev
npm --prefix backend run build
npm --prefix frontend run build
