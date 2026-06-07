#!/usr/bin/env bash
# post-deploy.sh — runs on the VPS after CI rsyncs the artifact into public_html.
#
# Steps:
#   1. Install dependencies
#   2. Link shared .env from ~/domains/cms.minakshidewan.com/shared/.env
#   3. Run payload migrations
#   4. Reload pm2 (or start on first run)
#   5. Health check

set -euo pipefail

PUBLIC_HTML="/home/minakshidewan/domains/cms.minakshidewan.com/public_html"
SHARED_DIR="/home/minakshidewan/domains/cms.minakshidewan.com/shared"
APP_NAME="payload-cms"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3000/admin}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

ts()  { date -u +"%Y-%m-%dT%H:%M:%SZ"; }
log() { printf '[post-deploy %s] %s\n' "$(ts)" "$*"; }

# 1. Install deps ---------------------------------------------------------------
log "Step 1/5 — installing dependencies"
cd "${PUBLIC_HTML}"
npm ci --no-audit --no-fund --include=dev

# 2. Link shared .env -----------------------------------------------------------
log "Step 2/5 — linking shared .env"
mkdir -p "${SHARED_DIR}"
if [[ ! -f "${SHARED_DIR}/.env" ]]; then
  log "WARNING: ${SHARED_DIR}/.env not found — copy .env.example there and fill it in"
  exit 1
fi
ln -sfn "${SHARED_DIR}/.env" "${PUBLIC_HTML}/.env"

# 3. Run migrations -------------------------------------------------------------
log "Step 3/5 — running migrations"
set -a
# shellcheck disable=SC1091
source "${PUBLIC_HTML}/.env"
set +a
"${SCRIPT_DIR}/migrate.sh"

# 4. (Re)start pm2 -------------------------------------------------------------
log "Step 4/5 — reloading pm2"
if pm2 describe "${APP_NAME}" >/dev/null 2>&1; then
  pm2 reload "${APP_NAME}" --update-env
else
  pm2 start "${SCRIPT_DIR}/ecosystem.config.cjs" --only "${APP_NAME}"
  pm2 save
fi

# 5. Health check ---------------------------------------------------------------
log "Step 5/5 — health check ${HEALTH_URL}"
sleep 3
for i in {1..20}; do
  code="$(curl -s -o /dev/null -w '%{http_code}' "${HEALTH_URL}" || echo 000)"
  if [[ "${code}" != "000" && "${code}" != "502" && "${code}" != "503" ]]; then
    log "Health check OK (HTTP ${code})"
    exit 0
  fi
  log "  attempt ${i}/20: HTTP ${code}, retrying…"
  sleep 2
done

log "ERROR: health check failed after 20 attempts"
pm2 logs "${APP_NAME}" --lines 80 --nostream --raw || true
exit 1
