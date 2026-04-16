---
work_package_id: "WP04"
subtasks:
  - "T013"
  - "T014"
  - "T015"
  - "T016"
title: "Instrument Inventory (Backend)"
phase: "Phase 2 - Core Features"
lane: "planned"
assignee: ""
agent: ""
shell_pid: ""
review_status: ""
reviewed_by: ""
history:
  - timestamp: "2026-04-16T16:40:06Z"
    lane: "planned"
    agent: "system"
    shell_pid: ""
    action: "Prompt generated via /spec-kitty.tasks"
---

# Work Package Prompt: WP04 – Instrument Inventory (Backend)

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

- **Outcome**: A functional backend for managing association instruments, with CRUD operations and role-based security.
- **Acceptance Criteria**:
  - `GET /api/instruments` returns a list of instruments with cursor pagination.
  - `POST /api/instruments` allows Admins to create new entries with an image.
  - `PUT /api/instruments/{id}` allows Admins to update details and status.
  - `DELETE /api/instruments/{id}` allows Admins to remove entries.
  - 100% test coverage for inventory management logic.
  - All responses follow the JSON contract in `contracts/openapi.yaml`.

## Context & Constraints

- **Prerequisites**: WP01, WP02 completed.
- **Related Docs**:
  - `kitty-specs/001-trovantina-mvp-music-associations/data-model.md`
  - `kitty-specs/001-trovantina-mvp-music-associations/contracts/openapi.yaml`
- **Architectural Decisions**:
  - Use `laravel/scout` (optional) or simple `cursorPaginate` for high-performance listing.
  - Files stored on local disk (`storage/app/public/instruments`) for MVP.
  - Use an Admin middleware to protect destructive endpoints.

## Subtasks & Detailed Guidance

### Subtask T013 – Inventory API: Implement GET /api/instruments with cursor pagination
- **Purpose**: Create a performant listing endpoint.
- **Steps**:
  1. Create `InstrumentController` in `backend/app/Http/Controllers/`.
  2. Implement `index` method:
    - Include filters: `type`, `status`.
    - Order by `created_at` (descending).
    - Return `cursorPaginate(15)`.
  3. Create `InstrumentResource` to transform the model to the API format.
- **Files**: `backend/app/Http/Controllers/InstrumentController.php`, `backend/app/Http/Resources/InstrumentResource.php`.
- **Parallel?**: No.

### Subtask T014 – Inventory API: Implement POST/PUT/DELETE for Admins
- **Purpose**: Enable instrument management.
- **Steps**:
  1. Implement `store` method:
    - Validate name, type, brand, serial_number, image.
    - Create record and store image.
  2. Implement `update` method:
    - Validate fields.
    - Update record, handling image replacement if needed.
  3. Implement `destroy` method:
    - Delete record and associated image.
  4. Ensure these routes are protected by the `auth:sanctum` and a custom `admin` middleware.
- **Files**: `backend/app/Http/Controllers/InstrumentController.php`, `backend/routes/api.php`, `backend/app/Http/Middleware/EnsureUserIsAdmin.php`.
- **Parallel?**: No.

### Subtask T015 – Inventory Logic: Implement image upload and storage handling
- **Purpose**: Handle binary assets correctly.
- **Steps**:
  1. Create `ImageService` in `backend/app/Services/`.
  2. Implement `uploadInstrumentImage` method that:
    - Compresses the image using `intervention/image` (if available, otherwise standard PHP GD).
    - Generates a unique filename.
    - Saves to `public/instruments/`.
  3. Update `InstrumentController` to use this service.
- **Files**: `backend/app/Services/ImageService.php`, `backend/config/filesystems.php`.
- **Parallel?**: Yes.

### Subtask T016 – Inventory Tests: 100% Coverage for CRUD Operations
- **Purpose**: Ensure quality and prevent regressions.
- **Steps**:
  1. Create `InstrumentTest` in `backend/tests/Feature/`.
  2. Write tests for:
    - Admin can create, update, delete.
    - Regular User can only list.
    - Validation failures (missing fields, duplicate serial number).
    - Image upload and storage verification.
    - Cursor pagination consistency.
- **Files**: `backend/tests/Feature/InstrumentTest.php`.
- **Parallel?**: Yes (once T013/T014 are done).

## Test Strategy

- **Backend**: Run `php artisan test --filter InstrumentTest`.
- **Storage**: Verify that images are correctly saved in `backend/storage/app/public/instruments/` and accessible via `storage/public` symlink.

## Risks & Mitigations

- **Image Storage Limits**: Ensure local storage has sufficient space. Monitor storage usage.
- **Concurrency**: Use database transactions for atomic updates where necessary.

## Review Guidance

- Check that cursor pagination is correctly implemented on `created_at` or `id`.
- Ensure the `admin` middleware correctly checks the `role` field from the `users` table.
- Verify that image deletions are handled properly to avoid orphaned files.

## Activity Log

- 2026-04-16T16:40:06Z – system – lane=planned – Prompt generated via /spec-kitty.tasks
