#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUPS_DIR="$PROJECT_ROOT/backups"

INPUT_PATH="${1:-$BACKUPS_DIR/restore.sql}"

if [[ ! -f "$INPUT_PATH" ]]; then
  echo "Backup file not found: $INPUT_PATH"
  echo "Usage: scripts/db-restore.sh backups/your_dump.sql"
  exit 1
fi

# Ensure file is under ./backups
case "$INPUT_PATH" in
  "$BACKUPS_DIR"/*) ;;
  *)
    echo "Error: file must be inside $BACKUPS_DIR"
    exit 1
    ;;
esac

RELATIVE="${INPUT_PATH#$BACKUPS_DIR/}"

echo "Ensuring database service is up..."
docker compose up -d db

echo "Starting restore using profile 'restore' ..."
BACKUP_FILE="/backups/$RELATIVE" docker compose --profile restore run --rm db-restore

echo "Done."


