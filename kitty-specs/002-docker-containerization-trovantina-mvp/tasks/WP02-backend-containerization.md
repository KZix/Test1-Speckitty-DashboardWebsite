---
work_package_id: WP02
title: Backend Containerization (Laravel)
lane: "for_review"
dependencies:
- WP01
base_branch: 002-docker-containerization-trovantina-mvp-WP01
base_commit: 5922de92050fd3a47a1f4c6b229e8838f20c6981
created_at: '2026-04-17T17:54:55.726459+00:00'
subtasks: [T005, T006, T007, T008]
requirement_refs:
- FR-001
shell_pid: "30468"
agent: "Gemini"
---

# Work Package: WP02 – Backend Containerization (Laravel)

## Objective
Create an optimized Docker environment for the Laravel 11 backend and integrate it into the existing orchestration.

## Context
The backend requires PHP 8.3 with specific extensions and automated startup tasks like migrations and storage linking.

## Detailed Guidance

### Subtask T005: Create backend/Dockerfile
- **Purpose**: Define the PHP environment.
- **Steps**:
  1. Base image: `php:8.3-apache` or `php:8.3-fpm-alpine`.
  2. Install extensions: `pdo_pgsql`, `bcmath`, `gd`, `zip`.
  3. Install Composer from the official image.
  4. Set the working directory to `/var/www/html`.
- **Files**: `backend/Dockerfile` (new).

### Subtask T006: Create backend/docker-entrypoint.sh
- **Purpose**: Automate container initialization.
- **Steps**:
  1. Script should: `composer install`, `php artisan migrate --force`, `php artisan storage:link`.
  2. Ensure the script has execution permissions.
- **Files**: `backend/docker-entrypoint.sh` (new).

### Subtask T007: Add app service to docker-compose.yml
- **Purpose**: Orchestrate the backend.
- **Steps**:
  1. Build context: `./backend`.
  2. Map port 8000 (external) to 80 (internal).
  3. Use bind mount: `./backend:/var/www/html`.
  4. Link to `.env.docker`.
- **Files**: `docker-compose.yml`.

### Subtask T008: Verify Backend Connectivity
- **Purpose**: Confirm integration.
- **Steps**:
  1. Run `docker-compose exec app php artisan tinker`.
  2. Test DB: `DB::connection()->getPdo();`.
  3. Test Redis: `Cache::store('redis')->put('test', 1);`.
- **Validation**: Tinker commands succeed without connection errors.

## Definition of Done
- `docker-compose up app -d` starts the backend successfully.
- Backend is reachable at `localhost:8000/api/user` (or similar endpoint).
- Database migrations are automatically applied on startup.
- Logs show successful connection to `db` and `redis`.

## Risks
- **PHP Extension Failures**: Alpine builds can be tricky with system dependencies (libpq-dev, etc.).
- **Volume Permissions**: The container's web user needs write access to `storage` and `bootstrap/cache`.

## Activity Log

- 2026-04-17T17:54:56Z – Gemini – shell_pid=30468 – lane=doing – Assigned agent via workflow command
- 2026-04-17T19:54:41Z – Gemini – shell_pid=30468 – lane=for_review – Backend Containerization implemented. Created Dockerfile and entrypoint for Laravel 11. Integrated app service into docker-compose.yml.
