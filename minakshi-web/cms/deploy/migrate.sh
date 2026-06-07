#!/usr/bin/env bash
# migrate.sh — runs Payload database migrations against the current release.
#
# Run from inside the release directory (post-deploy.sh does this). It uses
# the project's own `payload` CLI which is already a devDependency.
#
# Honors SKIP_MIGRATIONS=1 to bypass (for emergencies / readonly DBs).
#
# Node 20.20.2 is the supported runtime on the VPS.

set -euo pipefail

ts() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }
log() { printf '[migrate %s] %s\n' "$(ts)" "$*"; }

if [[ "${SKIP_MIGRATIONS:-0}" == "1" ]]; then
  log "SKIP_MIGRATIONS=1 set — skipping migrations"
  exit 0
fi

# Make sure we have a DATABASE_URL before we try anything.
if [[ -z "${DATABASE_URL:-}" ]] && ! grep -q '^DATABASE_URL=' ./.env 2>/dev/null; then
  log "ERROR: DATABASE_URL is not set in the environment or .env"
  exit 1
fi

cd "$(pwd)"

log "Node:    $(node -v)"
log "Payload: $(npx --no-install payload --version 2>/dev/null || echo 'unknown')"

# `payload migrate` is idempotent — it only applies un-applied migrations.
log "Running payload migrate"
npx --no-install payload migrate

log "Migrations complete"
