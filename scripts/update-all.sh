#!/bin/bash
# Run all digest update scripts and commit/push results
# No API key needed — pulls directly from Reddit

set -e
cd "$(dirname "$0")/.."

echo "=== Updating SRE Digest ==="
node scripts/update-sre-digest.mjs || echo "SRE digest failed (non-fatal)"

echo "=== Updating React Radar ==="
node scripts/update-react-radar.mjs || echo "React Radar failed (non-fatal)"

echo "=== Updating Daily Brief ==="
node scripts/update-daily-brief.mjs || echo "Daily Brief failed (non-fatal)"

echo "=== Committing and pushing ==="
git add public/data/
if git diff --staged --quiet; then
  echo "No changes to commit"
else
  git commit -m "chore: update digests $(date +%Y-%m-%d)"
  git pull --rebase
  git push
  echo "Pushed updates"
fi

echo "=== Done ==="
