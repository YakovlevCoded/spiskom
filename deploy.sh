#!/usr/bin/env bash
set -euo pipefail

if ! command -v netlify >/dev/null 2>&1; then
  echo "Netlify CLI не установлен"
  exit 1
fi

ENV_FILE="${ENV_FILE:-backend/.env.production}"

if [ -f "$ENV_FILE" ]; then
  set -a
  . "$ENV_FILE"
  set +a
fi

if [ -z "${DATABASE_URL:-}" ] || [ -z "${DIRECT_URL:-}" ]; then
  echo "Заполните DATABASE_URL и DIRECT_URL в $ENV_FILE"
  exit 1
fi

if ! netlify status >/dev/null 2>&1; then
  echo "Нет авторизации Netlify или проект не привязан"
  exit 1
fi

if [ -f "$ENV_FILE" ]; then
  netlify env:import "$ENV_FILE" >/dev/null
fi

DATABASE_URL="$DATABASE_URL" DIRECT_URL="$DIRECT_URL" npm --prefix backend run db:deploy
netlify deploy --build --prod
