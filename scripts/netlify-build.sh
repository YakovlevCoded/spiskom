#!/usr/bin/env bash
set -euo pipefail

npm --prefix backend ci
npm --prefix frontend ci
npm --prefix backend run build
npm --prefix frontend run build
