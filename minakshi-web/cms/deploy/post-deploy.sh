#!/usr/bin/env bash
# post-deploy.sh — orchestrator run on the VPS after CI has rsynced the
# production artifact into ~/cms/app.
#
# Steps:
#   1. Rotate the release (atomic symlink swap to releases/<ts>)
#   2. Symlink shared .env and uploads/ into the new release
#   3. Install ONLY production deps for the new release (Next standalone
#      already vendors its code into .next/standalone, but Payload's
#      runtime code lives in src/ and the server.js needs the real
#      `payload` package for migrations / generate:types at runtime.)
#   4. Run payload migrations (migrate.sh)
#   5. pm2 reload (or start on the first run)
#   6. Health-check
#
# Idempotent: safe to re-run after a partial failure.

set -euo pipefail

CMS_HOME="${CMS_HOME:-/home/minakshidewan/cms}"
APP_NAME="payload-cms"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3000/admin}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

ts() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }
log() { printf '[post-deploy %s] %s\n' "$(ts)" "$*"; }

# 1. Rotate the release ------------------------------------------------------
# ARTIFACT_DIR is the root of the rsynced artifact (the dir that contains
# server.js, src/, deploy/ etc.).  post-deploy.sh lives inside deploy/ inside
# that artifact, so two levels up gives us the artifact root.
ARTIFACT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
log "Step 1/6 — rotating release (artifact: ${ARTIFACT_DIR})"
"${SCRIPT_DIR}/release.sh" deploy "${ARTIFACT_DIR}"

RELEASE_DIR="$(readlink -f "${CMS_HOME}/current")"
log "Active release: ${RELEASE_DIR}"

# 2. Symlink shared resources (release.sh already links .env and uploads,
#    but we re-link here in case the script was called twice and the
#    symlinks were somehow lost).
log "Step 2/6 — ensuring shared symlinks"
mkdir -p "${CMS_HOME}/shared/uploads"
ln -sfn "${CMS_HOME}/shared/.env"   "${RELEASE_DIR}/.env"
ln -sfn "${CMS_HOME}/shared/uploads" "${RELEASE_DIR}/uploads"

# 3. Install production deps if not already present ------------------------
cd "${RELEASE_DIR}"
if [[ ! -d node_modules ]]; then
  log "Step 3/6 — installing production dependencies (first run for this release)"
  # We DO want devDependencies here because payload's CLI/migration tooling
  # lives in devDependencies. If you'd rather stay strict-prod, change to
  # `npm ci --omit=dev` and run migrations from a different machine.
  npm ci --no-audit --no-fund --include=dev
else
  log "Step 3/6 — node_modules already present, skipping install"
fi

# 4. Run migrations ---------------------------------------------------------
log "Step 4/6 — running migrations"
# Load env from the (symlinked) .env so migrate.sh sees DATABASE_URL etc.
set -a
# shellcheck disable=SC1091
source "${RELEASE_DIR}/.env"
set +a
"${SCRIPT_DIR}/migrate.sh"

# 5. (Re)start the app under pm2 -------------------------------------------
log "Step 5/6 — reloading pm2 process"
cd "${RELEASE_DIR}"
if pm2 describe "${APP_NAME}" >/dev/null 2>&1; then
  # `reload` = 0-downtime when the app supports it; for a single Next.js
  # standalone instance it is effectively a quick restart.
  pm2 reload "${APP_NAME}" --update-env
else
  # First-time bootstrap.
  pm2 start "${SCRIPT_DIR}/ecosystem.config.cjs" --only "${APP_NAME}"
  pm2 save
fi

# 6. Health check -----------------------------------------------------------
log "Step 6/6 — health check ${HEALTH_URL}"
# Give the server a moment to bind.
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
