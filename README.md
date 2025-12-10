# student-management-api

student management system api built with adonis js

### Setup

- clone repo
- npm install
- copy .env.example -> .env
- configure env variables
- node ace migration:run

### Docker

- Build & start:
  - `docker compose up -d --build`
- Logs:
  - `docker compose logs -f api`
- Run migrations:
  - `docker compose exec api node ace migration:run --force`
- Seed (optional):
  - `docker compose exec api node ace db:seed --force`

Notes:
- Set a strong `APP_KEY` in `docker-compose.yml` (e.g. `base64:...`). To generate:
  - `docker compose run --rm api node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

### Database from backup

- First-time init (empty volume):
  - Put `.sql`/`.sql.gz` files under `backups/init/` (executed automatically on first run).
  - Start stack: `docker compose up -d db`

- Restore into existing DB:
  - Place dump under `backups/` (e.g. `backups/restore.sql`).
  - Run: `scripts/db-restore.sh backups/restore.sql`
  - You can also override file inline:
    - `BACKUP_FILE=/backups/restore.sql docker compose --profile restore run --rm db-restore`
