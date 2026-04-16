---
work_package_id: "WP05"
subtasks:
  - "T017"
  - "T018"
  - "T019"
title: "Instrument Inventory (Frontend)"
phase: "Phase 3 - Implementation"
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

# Work Package Prompt: WP05 – Instrument Inventory (Frontend)

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

- **Outcome**: A functional UI for managing and viewing the instrument inventory.
- **Acceptance Criteria**:
  - Dashboard displays a list of instruments using a Shadcn Data Table.
  - Infinite scroll is implemented via React Query's `useInfiniteQuery`.
  - Admins can create, edit, and delete instruments through modals.
  - Members can view instrument details but not edit them.
  - Optimistic updates are used for status and assignment changes.

## Context & Constraints

- **Prerequisites**: WP01, WP04 completed.
- **Related Docs**:
  - `kitty-specs/001-trovantina-mvp-music-associations/spec.md` (Section 3.4).
  - `kitty-specs/001-trovantina-mvp-music-associations/data-model.md`.
- **Architectural Decisions**:
  - Use `react-query` for all data fetching and mutation.
  - Use Shadcn `Dialog`, `Form`, and `Table` components.
  - Implement "infinite scrolling" to handle large inventories efficiently.

## Subtasks & Detailed Guidance

### Subtask T017 – Inventory UI: Build Data Table for instrument listing with infinite scroll
- **Purpose**: Create the main view for instrument data.
- **Steps**:
  1. Create `InventoryPage` in `frontend/src/pages/`.
  2. Implement `useInstruments` hook using `useInfiniteQuery` to fetch instruments from `GET /api/instruments`.
  3. Build a `DataTable` component that displays: Name, Type, Brand, Serial Number, and Status.
  4. Integrate infinite scrolling (e.g., using a "Load More" button or Intersection Observer).
  5. Add search and filter controls.
- **Files**: `frontend/src/features/inventory/pages/InventoryPage.tsx`, `frontend/src/features/inventory/api/getInstruments.ts`, `frontend/src/features/inventory/components/InventoryTable.tsx`.
- **Parallel?**: No.

### Subtask T018 – Inventory UI: Implement Create/Edit/Delete modals (Admin only)
- **Purpose**: Enable CRUD operations through the UI.
- **Steps**:
  1. Create `InstrumentForm` component with React Hook Form and Zod validation.
  2. Implement `CreateInstrumentDialog` and `UpdateInstrumentDialog` using Shadcn.
  3. Ensure image upload is handled in the form.
  4. Add a `DeleteInstrumentButton` with a confirmation dialog.
  5. Only render these controls for users with the 'admin' role.
- **Files**: `frontend/src/features/inventory/components/InstrumentForm.tsx`, `frontend/src/features/inventory/components/CreateInstrumentDialog.tsx`, `frontend/src/features/inventory/api/createInstrument.ts`, `frontend/src/features/inventory/api/updateInstrument.ts`, `frontend/src/features/inventory/api/deleteInstrument.ts`.
- **Parallel?**: Yes.

### Subtask T019 – Inventory UI: Implement assignment and status changes
- **Purpose**: Allow tracking instrument state.
- **Steps**:
  1. Create an `AssignmentAction` component to assign an instrument to a member or mark as in maintenance.
  2. Implement optimistic updates: when a user clicks "In Maintenance", the UI updates immediately before the API response.
  3. Show appropriate error toasts if the mutation fails.
- **Files**: `frontend/src/features/inventory/components/AssignmentAction.tsx`, `frontend/src/features/inventory/api/updateInstrumentStatus.ts`.
- **Parallel?**: Yes.

## Test Strategy

- **Manual**: Verify that infinite scroll works correctly as more items are added.
- **Manual**: Confirm that 'admin' users can see management buttons, while 'user' role cannot.
- **Manual**: Test image upload and verify the thumbnail is correctly rendered in the table.

## Risks & Mitigations

- **UI Jitter on Update**: Use correct cache invalidation in React Query to ensure consistency.
- **Large Lists**: Use virtualization (e.g., `react-window` or `@tanstack/react-virtual`) if performance becomes an issue with hundreds of items.

## Review Guidance

- Verify that `useInfiniteQuery` correctly handles the `cursor` from the API.
- Ensure the `AuthContext` role check is used to protect the management dialogs.
- Check that optimistic updates don't cause UI flickering.

## Activity Log

- 2026-04-16T16:40:06Z – system – lane=planned – Prompt generated via /spec-kitty.tasks
