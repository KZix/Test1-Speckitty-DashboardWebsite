# Data Model: Service Orchestration for Trovantina MVP

## 1. Services Overview

| Service | Role | Image | Port (Internal) | Port (External) |
|---------|------|-------|-----------------|-----------------|
| `app` | Laravel Backend | Custom (PHP 8.3) | 8000 | 8000 |
| `web` | React Frontend | Custom (Node 20) | 5173 | 5173 |
| `db` | Primary DB | `postgres:16-alpine` | 5432 | 5432 |
| `redis` | Cache/Session | `redis:alpine` | 6379 | 6379 |
| `mail` | Mail Testing | `axllent/mailpit` | 1025 / 8025 | 1025 / 8025 |

## 2. Shared Network
- **Name**: `trovantina-network`
- **Driver**: `bridge`
- **Discovery**: Services reference each other by name (e.g., `DB_HOST=db`).

## 3. Persistent Volumes

| Volume Name | Mount Point (Container) | Purpose |
|-------------|-------------------------|---------|
| `db_data` | `/var/lib/postgresql/data` | Persistent PostgreSQL records. |
| `redis_data` | `/data` | Persistent Redis cache/state. |

## 4. Environment Context (Service: `app`)
- `DB_CONNECTION`: `pgsql`
- `DB_HOST`: `db`
- `REDIS_HOST`: `redis`
- `MAIL_HOST`: `mail`
- `FILESYSTEM_DISK`: `public`
