---
work_package_id: WP03
title: Public Landing Page
lane: "doing"
dependencies: []
base_branch: main
base_commit: 008de1cb9325f07c36f4e9d66df88500d17e5092
created_at: '2026-04-16T19:13:45.501818+00:00'
subtasks:
- T010
- T011
- T012
phase: Phase 2 - Core Features
assignee: ''
agent: ''
shell_pid: "23884"
review_status: ''
reviewed_by: ''
history:
- timestamp: '2026-04-16T16:40:06Z'
  lane: planned
  agent: system
  shell_pid: ''
  action: Prompt generated via /spec-kitty.tasks
---

# Work Package Prompt: WP03 – Public Landing Page

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

- **Outcome**: A visually appealing and performant public landing page that introduces the Trovantina association and provides access to registration and login.
- **Acceptance Criteria**:
  - Landing Page renders a Hero section with a clear value proposition.
  - "About Us" section contains relevant information about the association.
  - Responsive Navbar allows navigation to Login and Register.
  - Page achieves a Lighthouse Performance score of > 90.
  - Layout is fully responsive across mobile, tablet, and desktop.

## Context & Constraints

- **Prerequisites**: WP01 completed.
- **Related Docs**:
  - `kitty-specs/001-trovantina-mvp-music-associations/spec.md` (Section 3.2).
- **Architectural Decisions**:
  - Use Tailwind CSS for rapid responsive design.
  - Optimize images for the web to ensure high performance.

## Subtasks & Detailed Guidance

### Subtask T010 – Landing Page: Design and implement Hero and "About Us" sections
- **Purpose**: Create the main content of the public site.
- **Steps**:
  1. Create `LandingPage` component in `frontend/src/pages/`.
  2. Implement a Hero section with a background image or color gradient, a title ("Trovantina"), and a subtitle.
  3. Add a "Call to Action" button that links to `/register`.
  4. Implement an "About Us" section with placeholder text about music education and association goals.
  5. Use Shadcn components where appropriate (e.g., buttons, cards).
- **Files**: `frontend/src/pages/LandingPage.tsx`, `frontend/src/assets/hero.png`.
- **Parallel?**: No.

### Subtask T011 – Landing Page: Implement responsive Navbar with Auth links
- **Purpose**: Facilitate navigation for the user.
- **Steps**:
  1. Create `Navbar` component in `frontend/src/components/layout/`.
  2. Include the association logo and links to: Home, About, Login, Register.
  3. Ensure the Navbar is sticky at the top.
  4. Implement a mobile menu (hamburger icon) for small screens using Shadcn's Sheet or a custom solution.
- **Files**: `frontend/src/components/layout/Navbar.tsx`.
- **Parallel?**: Yes.

### Subtask T012 – Performance: Optimize Landing Page assets
- **Purpose**: Meet the success criteria for page speed.
- **Steps**:
  1. Audit the landing page using Lighthouse (Chrome DevTools).
  2. Optimize any large images (e.g., convert to WebP, resize).
  3. Implement lazy loading for off-screen components if necessary.
  4. Ensure fonts are loaded efficiently.
- **Files**: `frontend/src/pages/LandingPage.tsx`, `frontend/vite.config.ts`.
- **Parallel?**: Yes.

## Test Strategy

- **Manual**: Verify responsive behavior by resizing the browser window.
- **Performance**: Run a Lighthouse audit in a production build (`npm run build && npx serve -s dist`).
- **Access**: Confirm the page is accessible at the root URL (`/`) without being logged in.

## Risks & Mitigations

- **Large Assets**: High-resolution images can hurt performance. Use image compression.
- **Browser Compatibility**: Ensure Tailwind's responsive classes work across major browsers.

## Review Guidance

- Check visual consistency with the "Trovantina" brand (e.g., colors, typography).
- Verify that "Login" and "Register" links point to the correct routes.
- Confirm that the mobile menu functions correctly and closes upon selection.

## Activity Log

- 2026-04-16T16:40:06Z – system – lane=planned – Prompt generated via /spec-kitty.tasks
