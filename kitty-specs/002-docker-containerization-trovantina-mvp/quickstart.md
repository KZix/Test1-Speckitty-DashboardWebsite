# Quickstart: Dockerized Trovantina Environment

Follow these steps to launch the entire Trovantina stack using Docker.

## 1. Prerequisites
- Ensure Docker and Docker Compose are installed and running.

## 2. Launch the Stack
Run the following command from the project root:
```bash
docker-compose up -d
```

## 3. Application URLs

| Service | Local URL |
|---------|-----------|
| **Frontend** | [http://localhost:5173](http://localhost:5173) |
| **Backend API** | [http://localhost:8000/api](http://localhost:8000/api) |
| **Mailpit UI** | [http://localhost:8025](http://localhost:8025) |

## 4. Common Commands

| Action | Command |
|--------|---------|
| **Stop** | `docker-compose stop` |
| **Start** | `docker-compose start` |
| **Down (Reset)** | `docker-compose down` |
| **Down (Clear Data)** | `docker-compose down -v` |
| **View Logs** | `docker-compose logs -f` |

## 5. Backend Initial Setup
Once the containers are up, initialize the Laravel environment:
```bash
docker-compose exec app php artisan migrate --seed
docker-compose exec app php artisan storage:link
```

## 6. Frontend Initial Setup
The frontend should automatically install dependencies and start the dev server, but you can manually trigger an install if needed:
```bash
docker-compose exec web npm install
```

## 7. Running Tests
You can run the full test suite directly inside the containers:

**Backend Tests:**
```bash
docker-compose exec app php artisan test
```

**Frontend E2E Tests (Requires separate setup for UI tests):**
```bash
docker-compose exec web npx playwright test
```

## 8. Verification
1. Run `docker-compose ps` to ensure all services are `running`.
2. Check backend logs: `docker-compose logs app`.
3. Check frontend logs: `docker-compose logs web`.
