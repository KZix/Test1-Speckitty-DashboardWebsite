# Trovantina Frontend - Music Association Management System

This is the frontend application for the Trovantina MVP, built with React, Vite, and Shadcn UI.

## Features

- **Modern Dashboard**: Unified view of association stats and recent activity.
- **Instrument Management**: Filterable and searchable inventory with infinite scrolling.
- **Interactive Calendar**: View upcoming rehearsals and concerts synced with Google Calendar.
- **Attendance Tracking**: Specialized interface for Admins to mark member presence.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: React Context + TanStack Query (React Query)
- **Forms**: React Hook Form + Zod Validation
- **Testing**: Playwright (E2E)

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   # Create a .env file with:
   VITE_API_URL=http://localhost:8000/api
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

### Running E2E Tests

```bash
npx playwright test
```

## License

The Trovantina system is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
