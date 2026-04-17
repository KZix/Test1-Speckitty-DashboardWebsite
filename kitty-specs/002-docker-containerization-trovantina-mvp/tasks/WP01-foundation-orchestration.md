---
work_package_id: WP01
title: Foundation & Orchestration
lane: "doing"
dependencies: []
base_branch: main
base_commit: c9e7112718565f5e6688f7ae04b8035a1bc9a5d6
created_at: '2026-04-17T14:29:04.799629+00:00'
subtasks: [T001, T002, T003, T004]
requirement_refs:
- FR-003
shell_pid: "34812"
agent: "Gemini"
---

# Work Package: WP01 – Foundation & Orchestration

## Objective
Establish the foundational Docker infrastructure, including networking, persistent storage volumes, and the core supporting service containers (PostgreSQL, Redis, and Mailpit).

## Context
This is the base of the entire containerized environment. All other application containers will rely on the network and services established here.

## Detailed Guidance

### Subtask T001: Create Shared Docker Network and Volumes
- **Purpose**: Provide isolated communication and persistent storage.
- **Steps**:
  1. Define a bridge network named `trovantina-network` in `docker-compose.yml`.
  2. Define named volumes `db_data` and `redis_data` in the top-level `volumes` section.
- **Files**: `docker-compose.yml` (new).
- **Validation**: `docker network ls` and `docker volume ls` show the new entities.

### Subtask T002: Create Root docker-compose.yml with Core Services
- **Purpose**: Define the supporting services.
- **Steps**:
  1. Add `db` service using `postgres:16-alpine`.
  2. Add `redis` service using `redis:alpine`.
  3. Add `mail` service using `axllent/mailpit`.
  4. Ensure all services are attached to `trovantina-network`.
- **Files**: `docker-compose.yml`.

### Subtask T003: Configure Persistent Volume Mapping and Health Checks
- **Purpose**: Ensure data persistence and service readiness.
- **Steps**:
  1. Map `db_data` to `/var/lib/postgresql/data`.
  2. Map `redis_data` to `/data`.
  3. Add a health check to the `db` service using `pg_isready`.
- **Files**: `docker-compose.yml`.

### Subtask T004: Implement .env.docker Template
- **Purpose**: Provide container-ready environment variables.
- **Steps**:
  1. Create `.env.docker` based on the existing `.env.example`.
  2. Set `DB_HOST=db`, `REDIS_HOST=redis`, `MAIL_HOST=mail`.
  3. Ensure it includes variables for all services defined in WP01.
- **Files**: `.env.docker` (new).

## Definition of Done
- `docker-compose up db redis mail -d` succeeds.
- All three services are reachable on their internal network names.
- Database files are stored in the `db_data` volume.
- `.env.docker` is present in the root.

## Risks
- **Port Conflicts**: Standard ports (5432, 6379) might be taken on the host.
- **Permission Issues**: Docker volumes on some OS types can have strict permissions.

## Activity Log

- 2026-04-17T14:29:05Z – Gemini – shell_pid=34812 – lane=doing – Assigned agent via workflow command
