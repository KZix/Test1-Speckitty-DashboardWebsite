---
work_package_id: WP07
title: Attendance Tracking
lane: "doing"
dependencies: []
base_branch: main
base_commit: 8135ea4f22373a45dbc16dc1b505e63060f1f967
created_at: '2026-04-17T06:43:32.451329+00:00'
subtasks:
- T023
- T024
- T025
phase: Phase 3 - Implementation
assignee: ''
agent: "Gemini"
shell_pid: "31432"
review_status: ''
reviewed_by: ''
history:
- timestamp: '2026-04-16T16:40:06Z'
  lane: planned
  agent: system
  shell_pid: ''
  action: Prompt generated via /spec-kitty.tasks
---

# Work Package Prompt: WP07 – Attendance Tracking

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

- **Outcome**: A functional attendance tracking system for association events.
- **Acceptance Criteria**:
  - `POST /api/attendance` allows Admins to mark presence/absence for multiple users.
  - `GET /api/attendance` allows viewing attendance history for an event.
  - UI allows Admins to pick an event from the calendar and mark attendance for all members.
  - Attendance records are persisted in PostgreSQL.
  - Dashboard shows a summary of recent attendance.

## Context & Constraints

- **Prerequisites**: WP01, WP02, WP06 completed.
- **Related Docs**:
  - `kitty-specs/001-trovantina-mvp-music-associations/spec.md` (Section 3.6).
  - `kitty-specs/001-trovantina-mvp-music-associations/data-model.md`.
- **Architectural Decisions**:
  - Link attendance to Google Calendar Event IDs.
  - Use `upsert` logic for marking attendance to handle updates easily.
  - Role-based access: Only Admins can mark attendance.

## Subtasks & Detailed Guidance

### Subtask T023 – Attendance API: Implement Mark Attendance endpoint (Admin only)
- **Purpose**: Persist attendance data.
- **Steps**:
  1. Create `AttendanceController` in `backend/app/Http/Controllers/`.
  2. Implement `store` method:
    - Validate `event_id`, `user_id`, `status` (present/absent).
    - Handle bulk updates if possible (array of user statuses).
    - Store the `marked_by` admin ID.
  3. Implement `index` method:
    - Filter by `event_id`.
    - Return a list of users and their attendance status for that event.
- **Files**: `backend/app/Http/Controllers/AttendanceController.php`, `backend/routes/api.php`.
- **Parallel?**: No.

### Subtask T024 – Attendance UI: Build Attendance Tracking interface for Admins
- **Purpose**: Allow admins to easily track attendance.
- **Steps**:
  1. Create `AttendanceTracker` component in `frontend/src/features/attendance/`.
  2. Implement a member list with toggles (Present/Absent).
  3. Connect the UI to the `POST /api/attendance` endpoint.
  4. Use React Query to manage the state and provide feedback (e.g., success toast).
- **Files**: `frontend/src/features/attendance/components/AttendanceTracker.tsx`, `frontend/src/features/attendance/api/markAttendance.ts`.
- **Parallel?**: Yes.

### Subtask T025 – Attendance Integration: Link Attendance tracking with Calendar events
- **Purpose**: provide a seamless workflow for admins.
- **Steps**:
  1. Update the `CalendarView` to include a "Mark Attendance" button for past or current events (Admin only).
  2. Clicking the button navigates the admin to the `AttendanceTracker` for that specific `event_id`.
  3. Ensure the event details (title, date) are displayed in the tracker.
- **Files**: `frontend/src/features/calendar/components/CalendarView.tsx`, `frontend/src/features/attendance/pages/AttendancePage.tsx`.
- **Parallel?**: No.

## Test Strategy

- **Backend**: Test `POST /api/attendance` with valid and invalid data. Verify `marked_by` is set correctly.
- **Frontend**: Verify that marking a user as "Present" updates the database and reflects in subsequent views.

## Risks & Mitigations

- **Event ID Mismatch**: Ensure the `event_id` from Google Calendar is stored as a string and handled consistently.
- **Bulk Updates**: Large member lists can lead to slow API responses. Use optimized DB queries.

## Review Guidance

- Check that only users with the 'admin' role can access the `POST /api/attendance` endpoint.
- Verify that the attendance status is restricted to the 'present' and 'absent' enum values.
- Ensure the UI provides clear feedback when attendance is successfully saved.

## Activity Log

- 2026-04-16T16:40:06Z – system – lane=planned – Prompt generated via /spec-kitty.tasks
- 2026-04-17T06:43:33Z – Gemini – shell_pid=25224 – lane=doing – Assigned agent via workflow command
- 2026-04-17T06:58:55Z – Gemini – shell_pid=25224 – lane=for_review – Attendance Tracking system implemented. Backend includes Mark/List Attendance endpoints with tests. Frontend includes AttendanceTracker UI linked with Google Calendar events.
- 2026-04-17T10:20:37Z – Gemini – shell_pid=31432 – lane=doing – Started review via workflow command
