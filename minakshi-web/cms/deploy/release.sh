#!/usr/bin/env bash
# release.sh — rotates releases under ~/cms and swaps the `current` symlink.
#
# Usage:
#   ./release.sh deploy <staging-dir>   # promote staging -> new release
#   ./release.sh rollback               # swap to previous release
#   ./release.sh list                   # show available releases
#
# Layout managed here:
#   ~/cms/
#     app/                <- staging dir written to by CI (rsync target)
#     shared/             <- persistent .env and uploads/
#     logs/               <- pm2 log files
#     releases/<ts>/      <- immutable snapshots of past deploys
#     current -> releases/<ts>   (symlink pm2 runs out of)
#
# Keeps the last KEEP releases (default 3) and deletes older ones.

set -euo pipefail

CMS_HOME="${CMS_HOME:-/home/minakshidewan/cms}"
STAGING_DIR="${CMS_HOME}/app"
SHARED_DIR="${CMS_HOME}/shared"
RELEASES_DIR="${CMS_HOME}/releases"
LOG_DIR="${CMS_HOME}/logs"
KEEP="${KEEP:-3}"

ACTION="${1:-}"
ARG="${2:-}"

ts() { date -u +"%Y-%m-%dT%H-%M-%SZ"; }
log() { printf '[release %s] %s\n' "$(ts)" "$*"; }

ensure_dirs() {
  mkdir -p "${RELEASES_DIR}" "${SHARED_DIR}/uploads" "${LOG_DIR}"
}

current_target() {
  if [[ -L "${CMS_HOME}/current" ]]; then
    readlink -f "${CMS_HOME}/current"
  else
    echo ""
  fi
}

previous_target() {
  # Second-most-recent release directory (by mtime).
  ls -1dt "${RELEASES_DIR}"/*/ 2>/dev/null | sed -n '2p' | tr -d '\n' || true
}

do_deploy() {
  local staging="$1"
  ensure_dirs
  if [[ ! -d "${staging}" ]]; then
    log "ERROR: staging dir not found: ${staging}"
    exit 1
  fi
  local release="${RELEASES_DIR}/$(ts)"
  log "Promoting ${staging} -> ${release}"
  mv "${staging}" "${release}"

  # Link shared resources into the new release.
  ln -sfn "${SHARED_DIR}/.env" "${release}/.env"
  ln -sfn "${SHARED_DIR}/uploads" "${release}/uploads"

  # Atomically swap the symlink.
  ln -sfn "${release}" "${CMS_HOME}/current.tmp"
  mv -Tf "${CMS_HOME}/current.tmp" "${CMS_HOME}/current"

  # Prune old releases (keep latest KEEP).
  log "Pruning old releases (keep=${KEEP})"
  ls -1dt "${RELEASES_DIR}"/*/ 2>/dev/null | tail -n +$((KEEP + 1)) | while read -r old; do
    log "  removing ${old}"
    rm -rf -- "${old}"
  done

  log "Current -> $(readlink -f "${CMS_HOME}/current")"
}

do_rollback() {
  local prev
  prev="$(previous_target)"
  if [[ -z "${prev}" ]]; then
    log "ERROR: no previous release to roll back to"
    exit 1
  fi
  log "Rolling back to ${prev}"
  ln -sfn "${prev}" "${CMS_HOME}/current.tmp"
  mv -Tf "${CMS_HOME}/current.tmp" "${CMS_HOME}/current"
  log "Current -> $(readlink -f "${CMS_HOME}/current")"
}

do_list() {
  echo "Releases under ${RELEASES_DIR}:"
  ls -1dt "${RELEASES_DIR}"/*/ 2>/dev/null || echo "  (none)"
  echo
  echo "Current: $(current_target)"
}

case "${ACTION}" in
  deploy)    do_deploy "${ARG}" ;;
  rollback)  do_rollback ;;
  list)      do_list ;;
  *)
    echo "Usage: $0 {deploy <staging-dir>|rollback|list}" >&2
    exit 2
    ;;
esac
