# Trovantina Backend - Music Association Management System

This is the backend API for the Trovantina MVP, built with Laravel 11.

## Features

- **User Authentication**: Secure registration and login using Laravel Sanctum.
- **Instrument Inventory**: CRUD operations for managing musical instruments with image upload support.
- **Attendance Tracking**: Marking and listing member attendance for association events.
- **Google Calendar Integration**: Automated fetching of association events with caching and mock fallback.
- **Role-Based Access Control**: Middleware to protect administrative endpoints.

## Tech Stack

- **Framework**: Laravel 11+
- **Database**: PostgreSQL (Production) / SQLite (Testing)
- **Authentication**: Laravel Sanctum
- **External APIs**: Google Calendar API
- **Testing**: PHPUnit

## Getting Started

### Prerequisites

- PHP 8.3+
- Composer
- PostgreSQL

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Configure environment:
   ```bash
   copy .env.example .env
   # Update DB_* variables in .env
   ```

4. Generate app key:
   ```bash
   php artisan key:generate
   ```

5. Run migrations:
   ```bash
   php artisan migrate
   ```

6. Link storage:
   ```bash
   php artisan storage:link
   ```

### Running Tests

```bash
php artisan test
```

## License

The Trovantina system is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
