#!/usr/bin/env sh
set -eu

PROJECT_ROOT=$(
  CDPATH= cd -- "$(dirname -- "$0")"/.. && pwd -P
)
BACKUPS_DIR="$PROJECT_ROOT/backups"

INPUT_PATH="${1:-$BACKUPS_DIR/restore.sql}"

echo "Input path: $INPUT_PATH"

if [ ! -f "$INPUT_PATH" ]; then
  echo "Backup file not found: $INPUT_PATH"
  echo "Usage: scripts/db-restore.sh backups/your_dump.sql"
  exit 1
fi

# Ensure file is under ./backups (copy if needed so container can read it)
case "$INPUT_PATH" in
  "$BACKUPS_DIR"/*)
    RELATIVE=${INPUT_PATH#"$BACKUPS_DIR"/}
    ;;
  *)
    BASENAME=$(basename -- "$INPUT_PATH")
    DEST="$BACKUPS_DIR/$BASENAME"
    echo "Copying dump into $DEST for container access..."
    cp -f -- "$INPUT_PATH" "$DEST"
    RELATIVE="$BASENAME"
    ;;
esac

echo "Ensuring database service is up..."
docker compose up -d db

echo "Starting restore using profile 'restore' ..."
BACKUP_FILE="/backups/$RELATIVE" docker compose --profile restore run --rm db-restore

echo "Done."


