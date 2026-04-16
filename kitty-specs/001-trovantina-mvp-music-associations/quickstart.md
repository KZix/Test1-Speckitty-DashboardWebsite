# Quickstart: Trovantina

## Backend Setup (Laravel)
1. Navigate to `backend/`.
2. Copy `.env.example` to `.env`.
3. Set up your PostgreSQL database credentials in `.env`.
4. Run `composer install`.
5. Run `php artisan key:generate`.
6. Run `php artisan migrate`.
7. Start the server: `php artisan serve`.

## Frontend Setup (React)
1. Navigate to `frontend/`.
2. Run `npm install`.
3. Start the development server: `npm run dev`.

## Environment Variables
- `VITE_API_URL`: URL of the Laravel backend (e.g., `http://localhost:8000`).
- `GOOGLE_CALENDAR_ID`: ID of the shared association calendar.
- `GOOGLE_SERVICE_ACCOUNT_JSON`: Path to the service account credentials for Google API access.