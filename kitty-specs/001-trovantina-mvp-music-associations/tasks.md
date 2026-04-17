# Work Packages: Trovantina MVP for Music Associations

**Inputs**: Design documents from `kitty-specs/001-trovantina-mvp-music-associations/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/openapi.yaml, research.md, quickstart.md

**Tests**: Backend unit tests for Auth and Inventory are mandatory per SC-01. E2E tests are required for final validation.

---

## Work Package WP01: Foundation & Infrastructure (Priority: P0)

**Goal**: Set up the core development environment for both backend and frontend.
**Independent Test**: Both apps initialize, backend connects to PostgreSQL, and frontend renders the base shell.
**Prompt**: `/tasks/WP01-foundation-infrastructure.md`

### Requirement Refs
- FR-DASH-01

### Included Subtasks
- [x] T001 Configure Laravel PostgreSQL connection and base migrations (Users, Instruments, Attendances)
- [x] T002 Set up Laravel Sanctum for API authentication
- [x] T003 [P] Initialize React project with Vite, TypeScript, Tailwind, and Shadcn UI
- [x] T004 [P] Set up API Client (Axios) and Server State Management (React Query)
- [x] T005 Create base Layout Components (Shell, Sidebar, Header)

### Implementation Notes
- Initialize backend in `backend/` and frontend in `frontend/`.
- Ensure `backend/.env` is correctly configured for local PostgreSQL.
- Use `npx shadcn-ui@latest init` for frontend UI components.

### Parallel Opportunities
- T003 and T004 can be done in parallel once the frontend project is initialized.
- Backend (T001, T002) and Frontend (T003, T004, T005) setup can proceed concurrently.

### Dependencies
- None.

---

## Work Package WP02: User Authentication System (Priority: P0)

**Goal**: Implement secure registration and login for members and admins.
**Independent Test**: Users can register, login, and access protected dashboard routes.
**Prompt**: `/tasks/WP02-user-authentication-system.md`
**Requirements Refs**: FR-AUTH-01, FR-AUTH-02

### Included Subtasks
- [ ] T006 Backend Auth: Implement Register, Login, and User Profile endpoints in `backend/app/Http/Controllers/AuthController.php`
- [ ] T007 Backend Auth Tests: 100% coverage for registration and login logic in `backend/tests/Feature/AuthTest.php`
- [ ] T008 [P] Frontend Auth: Implement Login and Registration forms with Zod validation in `frontend/src/features/auth/`
- [ ] T009 Frontend Auth: Implement Auth Context and Protected Routes in `frontend/src/context/AuthContext.tsx`

### Implementation Notes
- Use Laravel Sanctum for token-based authentication.
- Role-based access control (RBAC) should distinguish between 'admin' and 'user'.

### Parallel Opportunities
- Backend (T006, T007) and Frontend (T008) can proceed in parallel once the API contract is established.

### Dependencies
- Depends on WP01.

---

## Work Package WP03: Public Landing Page (Priority: P1)

**Goal**: Create a high-performance public landing page for the association.
**Independent Test**: Landing page is accessible without authentication and achieves Lighthouse > 90.
**Prompt**: `/tasks/WP03-public-landing-page.md`
**Requirements Refs**: FR-LAND-01, FR-LAND-02

### Included Subtasks
- [x] T010 Landing Page: Design and implement Hero and "About Us" sections in `frontend/src/pages/LandingPage.tsx`
- [x] T011 Landing Page: Implement responsive Navbar with Auth links in `frontend/src/components/layout/Navbar.tsx`
- [x] T012 [P] Performance: Optimize Landing Page assets and ensure Lighthouse > 90

### Implementation Notes
- Focus on responsive design and fast loading times.
- Use images from `frontend/src/assets/`.

### Parallel Opportunities
- Design and asset optimization (T012) can run alongside development (T010, T011).

### Dependencies
- Depends on WP01.

---

## Work Package WP04: Instrument Inventory (Backend) (Priority: P1) 🎯 MVP

**Goal**: Build the robust backend for managing association instruments.
**Independent Test**: API endpoints for instrument management are functional and 100% covered by tests.
**Prompt**: `/tasks/WP04-instrument-inventory-backend.md`
**Requirements Refs**: FR-INV-01, FR-INV-02

### Included Subtasks
- [x] T013 Inventory API: Implement GET /api/instruments with cursor pagination and filtering in `backend/app/Http/Controllers/InstrumentController.php`
- [x] T014 Inventory API: Implement POST/PUT/DELETE /api/instruments (Admin only)
- [x] T015 [P] Inventory Logic: Implement image upload and storage handling in `backend/app/Services/ImageService.php`
- [x] T016 Inventory Tests: 100% coverage for CRUD operations and middleware in `backend/tests/Feature/InstrumentTest.php`

### Implementation Notes
- Use cursor pagination for performance as defined in `data-model.md`.
- Implement Admin middleware for destructive actions.

### Parallel Opportunities
- Image service logic (T015) can be developed independently of the controller (T013, T014).

### Dependencies
- Depends on WP01, WP02.

---

## Work Package WP05: Instrument Inventory (Frontend) (Priority: P1)

**Goal**: Build the UI for instrument management and viewing.
**Independent Test**: Users can view the inventory, and Admins can manage instruments through the UI.
**Prompt**: `/tasks/WP05-instrument-inventory-frontend.md`
**Requirements Refs**: FR-INV-02, FR-INV-03

### Included Subtasks
- [x] T017 Inventory UI: Build Data Table for instrument listing with infinite scroll in `frontend/src/features/inventory/InventoryList.tsx`
- [x] T018 Inventory UI: Implement Create/Edit/Delete modals (Admin only) in `frontend/src/features/inventory/InstrumentForm.tsx`
- [x] T019 [P] Inventory UI: Implement assignment and status changes in `frontend/src/features/inventory/AssignmentAction.tsx`

### Implementation Notes
- Use React Query for infinite scrolling and optimistic updates.
- Ensure the UI adapts based on user role.

### Parallel Opportunities
- Subtasks T017, T018, and T019 can proceed in parallel once the backend API is ready.

### Dependencies
- Depends on WP01, WP04.

---

## Work Package WP06: Google Calendar Integration (Priority: P2)

**Goal**: Integrate the shared association calendar into the dashboard.
**Independent Test**: Calendar events are successfully fetched and displayed in a read-only view.
**Prompt**: `/tasks/WP06-google-calendar-integration.md`
**Requirements Refs**: FR-CAL-01, FR-CAL-02, FR-CAL-03

### Included Subtasks
- [x] T020 Calendar Backend: Configure Google API Service Account and proxy endpoint in `backend/app/Services/GoogleCalendarService.php`
- [x] T021 Calendar Backend: Implement caching for Google API responses to avoid rate limits
- [x] T022 [P] Calendar Frontend: Build read-only Calendar view component for the dashboard in `frontend/src/features/calendar/CalendarView.tsx`

### Implementation Notes
- Use a server-side proxy to keep the Google API Service Account credentials secure.
- Caching is critical for performance and rate limit management.

### Parallel Opportunities
- Frontend UI development (T022) can start with mocked data while backend (T020, T021) is implemented.

### Dependencies
- Depends on WP01.

---

## Work Package WP07: Attendance Tracking (Priority: P2)

**Goal**: Allow admins to track member presence at association events.
**Independent Test**: Admins can mark attendance for events fetched from the calendar.
**Prompt**: `/tasks/WP07-attendance-tracking.md`
**Requirements Refs**: FR-ATT-01, FR-ATT-02

### Included Subtasks
- [x] T023 Attendance API: Implement Mark Attendance endpoint (Admin only) in `backend/app/Http/Controllers/AttendanceController.php`
- [x] T024 [P] Attendance UI: Build Attendance Tracking interface for Admins in `frontend/src/features/attendance/AttendanceTracker.tsx`
- [x] T025 Attendance Integration: Link Attendance tracking with Calendar events in `frontend/src/features/attendance/EventAttendanceLink.tsx`

### Implementation Notes
- Attendance records must reference the Google Calendar Event ID.
- Only Admins should have access to mark attendance.

### Parallel Opportunities
- Backend (T023) and Frontend (T024) can proceed in parallel.

### Dependencies
- Depends on WP01, WP02, WP06.

---

## Work Package WP08: Final Polish & E2E Testing (Priority: P3)

**Goal**: Ensure the application is stable, performant, and well-documented.
**Independent Test**: All E2E tests pass, and the application is ready for production.
**Prompt**: `/tasks/WP08-final-polish-e2e-testing.md`
**Requirements Refs**: SC-01, SC-02, SC-03, SC-04

### Included Subtasks
- [ ] T026 E2E Testing: Implement Playwright/Cypress tests for critical user flows in `frontend/tests/e2e/`
- [ ] T027 [P] Polish: Final UI/UX refinements, responsive checks, and error handling
- [ ] T028 [P] Documentation: Update README, Quickstart, and verify all setup steps

### Implementation Notes
- Focus on the "happy path" for the MVP release.
- Ensure all environment variables are documented.

### Parallel Opportunities
- Testing (T026), Polishing (T027), and Documentation (T028) can proceed concurrently.

### Dependencies
- Depends on WP01, WP02, WP03, WP04, WP05, WP06, WP07.

---

## Dependency & Execution Summary

- **Sequence**: WP01 → WP02 → WP03/WP04/WP06 (Parallel) → WP05/WP07 (Parallel) → WP08.
- **Parallelization**: WP03, WP04, and WP06 are largely independent once foundation and auth are in place.
- **MVP Scope**: WP01, WP02, WP04, and WP05 constitute the core inventory management release.

---

## Subtask Index (Reference)

| Subtask ID | Summary | Work Package | Priority | Parallel? |
|------------|---------|--------------|----------|-----------|
| T001       | DB Connection & Migrations | WP01 | P0 | No |
| T002       | Sanctum Setup | WP01 | P0 | No |
| T003       | Frontend Init | WP01 | P0 | Yes |
| T004       | API Client & Query Setup | WP01 | P0 | Yes |
| T005       | Base Layout Components | WP01 | P0 | No |
| T006       | Backend Auth Endpoints | WP02 | P0 | No |
| T007       | Backend Auth Tests | WP02 | P0 | No |
| T008       | Frontend Auth Forms | WP02 | P0 | Yes |
| T009       | Auth Context & Routes | WP02 | P0 | No |
| T010       | Landing Page Sections | WP03 | P1 | No |
| T011       | Responsive Navbar | WP03 | P1 | No |
| T012       | Performance Optimization | WP03 | P1 | Yes |
| T013       | Inventory GET API | WP04 | P1 | No |
| T014       | Inventory CRUD API | WP04 | P1 | No |
| T015       | Image Upload Logic | WP04 | P1 | Yes |
| T016       | Inventory Tests | WP04 | P1 | No |
| T017       | Inventory Data Table | WP05 | P1 | No |
| T018       | Inventory Modals | WP05 | P1 | No |
| T019       | Assignment Actions | WP05 | P1 | Yes |
| T020       | Google API Service | WP06 | P2 | No |
| T021       | Calendar Caching | WP06 | P2 | No |
| T022       | Calendar View | WP06 | P2 | Yes |
| T023       | Attendance API | WP07 | P2 | No |
| T024       | Attendance UI | WP07 | P2 | Yes |
| T025       | Attendance/Calendar Link | WP07 | P2 | No |
| T026       | E2E Testing | WP08 | P3 | No |
| T027       | UI/UX Polish | WP08 | P3 | Yes |
| T028       | Documentation Update | WP08 | P3 | Yes |
