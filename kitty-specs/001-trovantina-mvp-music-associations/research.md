# Research: Efficient Data Handling & Modernized Frontend for Trovantina

## 1. Decisions & Rationale

### Decision: Use Shadcn UI for Dashboard Components
- **Rationale**: Built on Radix UI, it provides high-level accessibility (WAI-ARIA compliance, keyboard navigation) and full implementation control. The "copy-paste" model allows for deep customization without library overhead, making it ideal for a unique dashboard design.
- **Alternatives**: MUI (Heavy bundle, difficult to customize deeply), Tailwind UI (Paid, less accessible primitives than Radix).

### Decision: Implement Optimistic UI Updates via TanStack Query
- **Rationale**: Essential for a "seamless" UX in Inventory and Calendar modules. Updates the UI immediately upon action (e.g., adding an instrument or event) and handles automatic rollbacks on error.
- **Alternatives**: Standard loading spinners (Slower perceived speed), Manual state management (Error-prone and complex rollbacks).

### Decision: Use a Centralized Sidebar & Shell Configuration
- **Rationale**: Simplifies Role-Based Access Control (RBAC) and ensures a consistent navigation experience across the dashboard. Config-driven navigation is easier to maintain as the application grows.

### Decision: Implement Laravel Atomic Updates for Inventory
- **Rationale**: Prevents race conditions by using database-level increments/decrements. This ensures data integrity even when multiple admins are updating stock simultaneously.

## 2. Supporting Evidence
- **Shadcn UI Documentation**: Confirms built-in accessibility via Radix UI and ease of theming via CSS variables.
- **TanStack Query Documentation**: Detailed patterns for `onMutate`, `onError`, and `onSettled` ensure robust optimistic updates.
- **Laravel Best Practices**: Recommends `decrement()` and `lockForUpdate()` for sensitive inventory/financial operations.

## 3. Open Questions & Risks
- **Google Calendar Latency**: Even with optimistic updates, Google API can be slow. We need to handle temporary IDs carefully before the server confirms the real event ID.
- **Theming Complexity**: Maintaining dark mode and high-density layouts requires a disciplined approach to CSS variables in `globals.css`.

## 4. Summary of Risks
- **Risk**: "Page Drift" in infinite scrolling if using offset-based pagination.
- **Mitigation**: Locked decision to use **Cursor Pagination** for all infinite-scroll lists.
- **Risk**: UI/Server state mismatch during optimistic updates.
- **Mitigation**: Use Zod for schema validation on both frontend and backend to ensure data shapes match exactly.