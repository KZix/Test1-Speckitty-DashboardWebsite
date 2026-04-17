# Quickstart: Trovantina

This guide will help you get the Trovantina Music Association Management System up and running on your local machine.

## Prerequisites

- **PHP 8.3+** & **Composer**
- **Node.js 20+** & **npm**
- **PostgreSQL** (running locally or accessible via network)
- **Google Calendar API** credentials (optional, mock data will be used if missing)

---

## Backend Setup (Laravel)

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   composer install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Open .env and set your DB_DATABASE, DB_USERNAME, and DB_PASSWORD
   ```

4. **Initialize application**:
   ```bash
   php artisan key:generate
   php artisan migrate
   php artisan storage:link
   ```

5. **Start the server**:
   ```bash
   php artisan serve
   ```
   *The API will be available at http://localhost:8000.*

---

## Frontend Setup (React)

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   Create a `.env` file in the `frontend/` root:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   *The application will be available at http://localhost:5173.*

---

## Testing

- **Backend tests**: `cd backend && php artisan test`
- **Frontend E2E tests**: `cd frontend && npx playwright test`

## Key Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_CONNECTION` | Database driver | `pgsql` |
| `GOOGLE_CALENDAR_ID` | ID of the Google Calendar to sync | `primary` |
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000/api` |
