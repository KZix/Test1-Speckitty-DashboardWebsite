---
work_package_id: WP01
title: Foundation & Infrastructure
lane: "doing"
dependencies: []
base_branch: main
base_commit: ecac82b69307f60eff76c3482b96e9178f4ddb2f
created_at: '2026-04-16T17:33:54.360513+00:00'
subtasks:
- T001
- T002
- T003
- T004
- T005
phase: Phase 1 - Environment Setup
assignee: ''
agent: "Gemini"
shell_pid: "26492"
review_status: ''
reviewed_by: ''
history:
- timestamp: '2026-04-16T16:40:06Z'
  lane: planned
  agent: system
  shell_pid: ''
  action: Prompt generated via /spec-kitty.tasks
---

# Work Package Prompt: WP01 – Foundation & Infrastructure

## ⚠️ IMPORTANT: Review Feedback Status

**Read this first if you are implementing this task!**

- **Has review feedback?**: Check the `review_status` field above.
- **You must address all feedback** before your work is complete.
- **Mark as acknowledged**: Update `review_status: acknowledged` in the frontmatter.
- **Report progress**: Update the Activity Log.

---

## Review Feedback

*[This section is empty initially.]*

---

## Objectives & Success Criteria

- **Outcome**: A fully functional development environment where both backend and frontend are initialized and ready for feature development.
- **Acceptance Criteria**:
  - Laravel backend is connected to a local PostgreSQL instance.
  - Base migrations (Users, Instruments, Attendances) are applied.
  - Sanctum is configured for API authentication.
  - React frontend is initialized with Vite, TypeScript, Tailwind, and Shadcn UI.
  - Axios and React Query are configured for API communication.
  - A base layout shell (Sidebar, Header, Main area) is visible in the browser.

## Context & Constraints

- **Prerequisites**: Access to a local PostgreSQL instance.
- **Related Docs**:
  - `kitty-specs/001-trovantina-mvp-music-associations/plan.md`
  - `kitty-specs/001-trovantina-mvp-music-associations/data-model.md`
  - `kitty-specs/001-trovantina-mvp-music-associations/spec.md`
- **Architectural Decisions**:
  - Use UUIDs for all primary keys as specified in `data-model.md`.
  - Use Shadcn UI for consistent and modern component design.
  - React Query for server state management to enable infinite scroll and optimistic updates later.

## Subtasks & Detailed Guidance

### Subtask T001 – Configure Laravel PostgreSQL and Base Migrations
- **Purpose**: Prepare the database schema for the entire MVP.
- **Steps**:
  1. Navigate to `backend/`.
  2. Update `.env` with `DB_CONNECTION=pgsql`, `DB_HOST=127.0.0.1`, `DB_PORT=5432`, `DB_DATABASE=trovantina`, etc.
  3. Create migrations for `instruments` and `attendances`. Note: `users` migration already exists but should be updated for UUIDs.
  4. Implement schemas in `database/migrations/`:
    - **Users**: `id` (UUID), `name`, `email`, `password`, `role` (enum: admin, user).
    - **Instruments**: `id` (UUID), `name`, `type`, `brand`, `serial_number`, `status` (enum: available, maintenance, assigned), `borrower_id` (nullable UUID), `image_path`.
    - **Attendances**: `id` (UUID), `event_id` (string), `user_id` (UUID), `status` (enum: present, absent), `marked_by` (UUID), `timestamp`.
  5. Run `php artisan migrate`.
- **Files**: `backend/.env`, `backend/database/migrations/*.php`.
- **Parallel?**: No.
- **Notes**: Ensure `laravel/helpers` is installed if using UUID helper, or use native PostgreSQL UUID.

### Subtask T002 – Set up Laravel Sanctum
- **Purpose**: Enable secure API-based authentication.
- **Steps**:
  1. Ensure Sanctum is installed and published (`php artisan install:api`).
  2. Update `User` model to use `HasApiTokens` trait.
  3. Configure `Sanctum` middleware in `app/Http/Kernel.php` or `bootstrap/app.php` (Laravel 11 style).
  4. Ensure `EnsureFrontendRequestsAreStateful` is active.
- **Files**: `backend/app/Models/User.php`, `backend/config/sanctum.php`, `backend/bootstrap/app.php`.
- **Parallel?**: Yes (once T001 is done).

### Subtask T003 – Initialize React project with Shadcn UI
- **Purpose**: Set up the frontend project with modern UI tooling.
- **Steps**:
  1. Navigate to `frontend/`.
  2. If not already initialized, use `npm create vite@latest . -- --template react-ts`.
  3. Install Tailwind CSS and initialize: `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`.
  4. Initialize Shadcn UI: `npx shadcn-ui@latest init`. Choose "Slate" or "Zinc" as the base color.
- **Files**: `frontend/package.json`, `frontend/tailwind.config.js`, `frontend/components.json`.
- **Parallel?**: Yes.

### Subtask T004 – Set up API Client (Axios) and Server State Management (React Query)
- **Purpose**: Prepare the frontend for data fetching and state management.
- **Steps**:
  1. Install dependencies: `npm install axios @tanstack/react-query @tanstack/react-query-devtools`.
  2. Create `frontend/src/lib/api-client.ts` and configure an Axios instance with `baseURL: process.env.VITE_API_URL` and `withCredentials: true`.
  3. Create `frontend/src/providers/app.tsx` and wrap the application with `QueryClientProvider`.
- **Files**: `frontend/src/lib/api-client.ts`, `frontend/src/providers/app.tsx`, `frontend/src/main.tsx`.
- **Parallel?**: Yes.

### Subtask T005 – Create base Layout Components
- **Purpose**: Provide a consistent structure for the dashboard.
- **Steps**:
  1. Create a `Layout` component in `frontend/src/components/layout/`.
  2. Implement a responsive `Sidebar` using Shadcn primitives (or Lucide icons).
  3. Implement a `Header` with a placeholder user profile dropdown.
  4. Create a `MainShell` that renders `children` within the layout.
- **Files**: `frontend/src/components/layout/Sidebar.tsx`, `frontend/src/components/layout/Header.tsx`, `frontend/src/components/layout/MainShell.tsx`.
- **Parallel?**: No.

## Test Strategy

- **Backend**: Run `php artisan migrate:status` to verify migrations.
- **Frontend**: Run `npm run dev` and verify that the base shell renders without console errors.
- **Integration**: Verify frontend can hit a dummy backend route (e.g., `/api/user`) and receive a 401 if not logged in.

## Risks & Mitigations

- **PostgreSQL Connection**: Ensure the DB service is running. Check `pg_isready`.
- **CORS Issues**: Configure `backend/config/cors.php` to allow requests from the frontend origin.

## Review Guidance

- Check that UUIDs are used correctly in migrations.
- Ensure Shadcn UI is properly initialized and components are in `src/components/ui`.
- Verify Axios configuration for Sanctum compatibility (CSRF).

## Activity Log

- 2026-04-16T16:40:06Z – system – lane=planned – Prompt generated via /spec-kitty.tasks
- 2026-04-16T17:33:55Z – Gemini – shell_pid=20760 – lane=doing – Assigned agent via workflow command
- 2026-04-16T19:26:51Z – Gemini – shell_pid=20760 – lane=for_review – Foundation & Infrastructure implementation completed. Retrying move to for_review.
- 2026-04-17T09:55:59Z – Gemini – shell_pid=26492 – lane=doing – Started review via workflow command
