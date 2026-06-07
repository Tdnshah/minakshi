#!/usr/bin/env bash
# build-artifact.sh — local helper that mirrors what the GitHub Actions
# deploy-cms workflow does, so you can dry-run the artifact assembly on
# your laptop before pushing.
#
# Usage (from the repo root):
#   bash cms/deploy/build-artifact.sh /tmp/cms-artifact
#
# Output: a directory containing only what the VPS needs to run Payload.

set -euo pipefail

OUT="${1:-./cms-artifact}"
CMS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

rm -rf "${OUT}"
mkdir -p "${OUT}"

echo "[build-artifact] installing deps (npm ci)…"
(cd "${CMS_DIR}" && npm ci --no-audit --no-fund)

echo "[build-artifact] next build…"
(cd "${CMS_DIR}" && npm run build)

echo "[build-artifact] staging files into ${OUT}…"
cd "${CMS_DIR}"

# 1) Standalone server entrypoint
cp -a .next/standalone/. "${OUT}/"

# 2) Static assets must live at .next/static inside the standalone tree
mkdir -p "${OUT}/.next"
cp -a .next/static "${OUT}/.next/static"

# 3) Public assets (Payload's served public dir)
cp -a public/. "${OUT}/public/" 2>/dev/null || true

# 4) Source (Payload needs the schema/collections at runtime for the admin UI
#    and for `payload migrate`).
cp -a src/. "${OUT}/src/"

# 5) Manifests + deploy scripts the on-server post-deploy.sh needs.
cp -a package.json package-lock.json next.config.mjs tsconfig.json "${OUT}/"
cp -a .npmrc "${OUT}/" 2>/dev/null || true
cp -a deploy/. "${OUT}/deploy/"

# 6) .env.example for reference (never copy the real .env).
cp -a .env.example "${OUT}/.env.example" 2>/dev/null || true

# Strip dev-only / non-runtime files that may have come along.
rm -rf "${OUT}/tests" "${OUT}/playwright-report" "${OUT}/.next/cache"

echo "[build-artifact] done."
echo "Artifact size: $(du -sh "${OUT}" | cut -f1)"
ls -la "${OUT}"

