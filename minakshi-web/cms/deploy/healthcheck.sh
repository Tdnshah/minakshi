#!/usr/bin/env bash
# healthcheck.sh — quick liveness probe for the deployed CMS.
#
# Usage: ./healthcheck.sh [url]
# Default URL: http://127.0.0.1:3000/admin
set -euo pipefail

URL="${1:-http://127.0.0.1:3000/admin}"
ts() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }

code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "${URL}" || echo 000)"
printf '[healthcheck %s] %s -> HTTP %s\n' "$(ts)" "${URL}" "${code}"
if [[ "${code}" =~ ^(2|3)[0-9]{2}$ ]]; then
  exit 0
fi
exit 1
