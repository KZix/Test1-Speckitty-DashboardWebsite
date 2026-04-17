---
work_package_id: WP03
title: Frontend Containerization (React/Vite)
lane: "doing"
dependencies:
- WP01
base_branch: 002-docker-containerization-trovantina-mvp-WP01
base_commit: 5922de92050fd3a47a1f4c6b229e8838f20c6981
created_at: '2026-04-17T19:55:10.736972+00:00'
subtasks: [T009, T010, T011, T012]
requirement_refs:
- FR-002
shell_pid: "39604"
agent: "Gemini"
---

# Work Package: WP03 – Frontend Containerization (React/Vite)

## Objective
Create an optimized Docker environment for the React+Vite frontend and ensure seamless development features (HMR).

## Context
The frontend requires Node 20 and must handle file system event issues commonly found in containerized bind mounts.

## Detailed Guidance

### Subtask T009: Create frontend/Dockerfile
- **Purpose**: Define the Node environment.
- **Steps**:
  1. Base image: `node:20-alpine`.
  2. Set the working directory to `/app`.
  3. Expose port 5173.
- **Files**: `frontend/Dockerfile` (new).

### Subtask T010: Configure vite.config.ts for Docker
- **Purpose**: Enable hot-reloading and proper host binding.
- **Steps**:
  1. Update `server` config: `host: '0.0.0.0'` and `port: 5173`.
  2. Add `watch: { usePolling: true }` to the server section.
- **Files**: `frontend/vite.config.ts`.

### Subtask T011: Add web service to docker-compose.yml
- **Purpose**: Orchestrate the frontend.
- **Steps**:
  1. Build context: `./frontend`.
  2. Map port 5173:5173.
  3. Use bind mount: `./frontend:/app`.
  4. Mount `node_modules` as an anonymous volume to avoid host conflicts.
- **Files**: `docker-compose.yml`.

### Subtask T012: Verify API Communication
- **Purpose**: Ensure frontend can talk to the containerized backend.
- **Steps**:
  1. Set `VITE_API_URL` to `http://localhost:8000/api`.
  2. Log into the app and verify the dashboard loads data from the `app` container.
- **Validation**: Browser network tab shows successful requests to port 8000.

## Definition of Done
- `docker-compose up web -d` starts the frontend successfully.
- Dashboard is accessible at `localhost:5173`.
- Making a change in a React component results in an instant browser update (HMR).
- API requests successfully reach the backend container.

## Risks
- **Node Modules Size**: Large anonymous volumes can consume disk space.
- **HMR Latency**: Polling can slightly increase CPU usage during development.

## Activity Log

- 2026-04-17T19:55:13Z – Gemini – shell_pid=39604 – lane=doing – Assigned agent via workflow command
