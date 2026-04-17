# Research: Docker Containerization for Trovantina MVP

## 1. Laravel 11 Dockerization (PHP 8.3)
- **Decision**: Use `php:8.3-fpm-alpine` as the base image for the backend.
- **Rationale**: Alpine provides a significantly smaller image size. Laravel 11 is lightweight, and FPM combined with an Nginx container (or using the `php:8.3-apache` alternative) is the standard for high-performance Laravel deployments. For development simplicity, we will use a single PHP-Apache or specialized development image.
- **Alternatives considered**: 
    - `php:8.3-cli`: Lacks web server capabilities.
    - `ubuntu/php`: Larger footprint and more complex configuration.

## 2. Vite HMR within Docker
- **Decision**: Configure Vite to use `server: { watch: { usePolling: true } }` if necessary and expose port 5173.
- **Rationale**: Docker's bind mounts (especially on Windows/macOS) sometimes fail to propagate file system events reliably to the container. Enabling polling ensures HMR works consistently across all host OS types.
- **Alternatives considered**: 
    - Native file events: Unreliable on WSL2/Docker Desktop without specific configuration.

## 3. Persistent Storage for PostgreSQL
- **Decision**: Use a named Docker volume (`db_data`) mapped to `/var/lib/postgresql/data`.
- **Rationale**: Named volumes are managed by Docker and offer better performance than direct host-bind mounts for database files, while ensuring data survives container removal.
- **Alternatives considered**: 
    - Host-bind mount: Slower on non-Linux hosts and sensitive to permission issues.

## 4. Mailpit for Local Development
- **Decision**: Include `axllent/mailpit` in the Compose file.
- **Rationale**: Mailpit is a lightweight, modern replacement for MailHog. It provides an SMTP server for the backend and a web UI for developers to inspect sent emails without them actually leaving the local environment.
- **Alternatives considered**: 
    - MailHog: Maintenance has slowed down.
    - External SMTP (Mailtrap): Requires internet and external configuration.
