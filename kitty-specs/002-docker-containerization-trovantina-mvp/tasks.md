# Work Packages: Docker Containerization for Trovantina MVP

This document outlines the phased implementation of the Docker orchestration setup.

## Phase 1: Infrastructure & Supporting Services

### WP01: Foundation & Orchestration
- **Goal**: Establish the base network, volumes, and supporting service containers.
- **Priority**: High
- **Independent Test**: `docker-compose up db redis mail` starts services and verifies volumes.
- **Requirement Refs**: FR-003

**Subtasks**:
- [x] T001: Create shared Docker network and volumes (db_data, redis_data). [P]
- [x] T002: Create root docker-compose.yml with db, redis, and mail definitions.
- [x] T003: Configure persistent volume mapping and health checks for db.
- [x] T004: Implement .env.docker template for container-specific environment variables.

**Implementation Sketch**:
1. Define trovina-network in docker-compose.yml.
2. Map db_data to /var/lib/postgresql/data.
3. Add axllent/mailpit for local mail capture.

---

## Phase 2: Application Containerization

### WP02: Backend Containerization (Laravel)
- **Goal**: Create and integrate the PHP 8.3 environment for the Laravel API.
- **Priority**: High
- **Independent Test**: `docker-compose exec app php artisan migrate` succeeds.
- **Requirement Refs**: FR-001
- **Depends on WP01**

**Subtasks**:
- [x] T005: Create backend/Dockerfile using PHP 8.3 Apache or FPM.
- [x] T006: Create backend/docker-entrypoint.sh for automation (migrations, storage link).
- [x] T007: Add app service to docker-compose.yml with bind mounts.
- [x] T008: Verify backend connectivity to orchestrated db and redis.

---

### WP03: Frontend Containerization (React/Vite)
- **Goal**: Create and integrate the Node 20 environment for the React dashboard.
- **Priority**: Medium
- **Independent Test**: Frontend is reachable at localhost:5173 with HMR active.
- **Requirement Refs**: FR-002
- **Depends on WP01**

**Subtasks**:
- [ ] T009: Create frontend/Dockerfile using Node 20.
- [ ] T010: Configure vite.config.ts for Docker (polling and host binding).
- [ ] T011: Add web service to docker-compose.yml with port 5173 exposed.
- [ ] T012: Verify API communication between web and app containers.

---

## Phase 3: Finalization

### WP04: Validation & Polish
- **Goal**: Ensure the environment is robust, documented, and easy to use.
- **Priority**: Low
- **Independent Test**: Fresh clone + docker-compose up results in working app.
- **Requirement Refs**: FR-001, FR-002, FR-003
- **Depends on WP02, WP03**

**Subtasks**:
- [ ] T013: Update quickstart.md with final Docker commands.
- [ ] T014: Verify data persistence after docker-compose down -v.
- [ ] T015: Optimize Docker build layers and clean up untracked files.
