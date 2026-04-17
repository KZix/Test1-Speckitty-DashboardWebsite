---
work_package_id: "WP02"
subtasks:
  - "T006"
  - "T007"
  - "T008"
  - "T009"
title: "User Authentication System"
phase: "Phase 2 - Core Features"
lane: "done"
dependencies: ["WP01"]
assignee: ""
agent: "Gemini"
shell_pid: "30872"
review_status: "approved"
reviewed_by: "Tiago Ramos"
history:
  - timestamp: "2026-04-16T16:40:06Z"
    lane: "planned"
    agent: "system"
    shell_pid: ""
    action: "Prompt generated via /spec-kitty.tasks"
---

# Work Package Prompt: WP02 – User Authentication System

## ⚠️ IMPORTANT: Implementation Command

To create the workspace for this work package, run:

```bash
spec-kitty implement WP02 --agent <your-name> --base WP01
```

---

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

- **Outcome**: A secure authentication system allowing users to register, login, and access protected routes based on their role.
- **Acceptance Criteria**:
  - `POST /api/register` creates a new user and returns a token.
  - `POST /api/login` authenticates users and returns a token.
  - `GET /api/user` returns the authenticated user's profile.
  - Frontend Login/Register forms validate input using Zod.
  - React Auth Context manages user state and token persistence.
  - Protected routes redirect unauthenticated users to `/login`.

## Context & Constraints

- **Prerequisites**: WP01 completed.
- **Related Docs**:
  - `kitty-specs/001-trovantina-mvp-music-associations/data-model.md`
  - `kitty-specs/001-trovantina-mvp-music-associations/contracts/openapi.yaml`
- **Architectural Decisions**:
  - Use Laravel Sanctum for token issuance and management.
  - Roles: 'admin', 'user'. Default role for registration is 'user'.
  - Use Zod and React Hook Form for robust frontend validation.

## Subtasks & Detailed Guidance

### Subtask T006 – Backend Auth: Implement Register, Login, and User Profile Endpoints
- **Purpose**: Create the API backend for authentication.
- **Steps**:
  1. Create `AuthController` in `backend/app/Http/Controllers/`.
  2. Implement `register` method:
    - Validate `name`, `email`, `password`, `password_confirmation`.
    - Create user with hashed password.
    - Return 201 with access token.
  3. Implement `login` method:
    - Validate `email`, `password`.
    - Check credentials.
    - Return 200 with access token.
  4. Implement `me` method (protected by `auth:sanctum`):
    - Return current authenticated user.
  5. Define routes in `backend/routes/api.php`.
- **Files**: `backend/app/Http/Controllers/AuthController.php`, `backend/routes/api.php`.
- **Parallel?**: No.

### Subtask T007 – Backend Auth Tests: 100% Coverage for Auth Logic
- **Purpose**: Ensure the authentication system is robust and secure.
- **Steps**:
  1. Create `AuthTest` in `backend/tests/Feature/`.
  2. Write tests for:
    - Successful registration.
    - Registration with existing email (fail).
    - Successful login.
    - Login with wrong password (fail).
    - Accessing `/api/user` without token (fail).
    - Accessing `/api/user` with valid token (success).
- **Files**: `backend/tests/Feature/AuthTest.php`.
- **Parallel?**: Yes (once T006 is done).

### Subtask T008 – Frontend Auth: Implement Login and Registration Forms
- **Purpose**: Create the user interface for authentication.
- **Steps**:
  1. Install dependencies: `npm install react-hook-form @hookform/resolvers zod`.
  2. Create `LoginForm` and `RegisterForm` components in `frontend/src/features/auth/`.
  3. Use Zod schemas for validation (email format, password length).
  4. Connect forms to the Axios API client.
- **Files**: `frontend/src/features/auth/components/LoginForm.tsx`, `frontend/src/features/auth/components/RegisterForm.tsx`, `frontend/src/features/auth/types/index.ts`.
- **Parallel?**: Yes.

### Subtask T009 – Frontend Auth: Implement Auth Context and Protected Routes
- **Purpose**: Manage authentication state across the application.
- **Steps**:
  1. Create `AuthContext` in `frontend/src/context/AuthContext.tsx`.
  2. Implement `login`, `logout`, and `register` functions that update state and store tokens (localStorage or cookie).
  3. Create a `ProtectedRoute` component that checks for authentication and redirects if needed.
  4. Wrap routes in `frontend/src/App.tsx` with the `AuthProvider`.
- **Files**: `frontend/src/context/AuthContext.tsx`, `frontend/src/components/routing/ProtectedRoute.tsx`, `frontend/src/App.tsx`.
- **Parallel?**: No.

## Test Strategy

- **Backend**: Run `php artisan test --filter AuthTest`.
- **Frontend**: Manually verify the login/register flow and check that protected routes (e.g., `/dashboard`) are inaccessible without login.

## Risks & Mitigations

- **Token Storage**: Use secure cookies or localized storage with short expiration.
- **CSRF**: Ensure the `X-XSRF-TOKEN` header is handled correctly by Axios for Sanctum.

## Review Guidance

- Verify that passwords are never returned in API responses.
- Check that Zod schemas match the backend validation rules.
- Ensure the `AuthContext` properly handles loading states while checking for an existing session.

## Activity Log

- 2026-04-16T16:40:06Z – system – lane=planned – Prompt generated via /spec-kitty.tasks
- 2026-04-16T18:37:03Z – unknown – lane=for_review – User Authentication System implemented. Backend includes Register/Login/User endpoints with 100% test coverage. Frontend includes AuthContext, Login/Register forms with Zod validation, and dashboard protection.
- 2026-04-17T10:01:52Z – Gemini – shell_pid=30872 – lane=doing – Started review via workflow command
- 2026-04-17T10:07:48Z – Gemini – shell_pid=30872 – lane=done – Review passed: User authentication system is fully implemented with secure backend endpoints, comprehensive tests, and a reactive frontend context with validated forms.
