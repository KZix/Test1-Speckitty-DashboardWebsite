# Feature Specification: Docker Containerization for Trovantina MVP

## 1. Executive Summary
**Context**: The Trovantina MVP currently requires manual environment setup for its Laravel backend and React frontend. This creates friction for new developers and potential inconsistencies between environments.
**Problem**: Setup time is significant, and "it works on my machine" issues can arise due to varying local versions of PHP, Node, and database engines.
**Solution**: Provide a robust, single-command development environment using Docker and Docker Compose. This includes specialized containers for each application layer and integrated supporting services.

## 2. User Scenarios
### 2.1 Developer Onboarding
A new developer joins the project. They clone the repository, run a single command, and have a fully functional development environment with all dependencies, databases, and cache services running in isolation.

### 2.2 Local Testing
A developer needs to test a feature that requires a specific database state or mail sending. They can rely on the Docker setup to provide a consistent PostgreSQL instance and a local Mailpit service for capturing and inspecting emails without needing external SMTP servers.

## 3. Functional Requirements
### FR-001: Backend Containerization
- The backend service must run on a PHP 8.3 environment optimized for Laravel 11.
- All system-level dependencies for Laravel (e.g., PDO, OpenSSL, BCMath) must be pre-installed.
- Composer dependencies must be installed during the build or container startup.
- The container must utilize an entrypoint script to handle initial setup tasks like environment variable verification or cache clearing.

### FR-002: Frontend Containerization
- The frontend service must run on a Node 20 environment.
- The container must handle the installation of npm packages.
- The Vite development server must be accessible on port 5173.
- Support for Hot Module Replacement (HMR) must be maintained across the container boundary.

### FR-003: Service Orchestration
- **Database**: A dedicated service using PostgreSQL must be included with persistent storage via Docker volumes.
- **Cache**: A Redis service must be included for application caching and session management.
- **Mail Testing**: A Mailpit service must be included to capture outgoing emails for inspection during development.
- **Networking**: All services must communicate via a common internal network, allowing the use of service names as hostnames (e.g., `DB_HOST=db`).

## 4. Key Entities
- **Container**: Individual units of software (Backend, Frontend, DB, Redis, Mailpit).
- **Volume**: Persistent storage areas for database files and application logs.
- **Network**: The virtual communication layer connecting all services.

## 5. Success Criteria
- **SC-001: One-Command Setup**: A developer can launch the entire stack (Frontend, Backend, and Support Services) using a single Docker Compose command.
- **SC-002: Connectivity**: The backend container successfully establishes connections to the PostgreSQL and Redis services within 10 seconds of startup.
- **SC-003: Accessibility**: The frontend dashboard is reachable via `localhost:5173` with full styling and interactivity.
- **SC-004: Integration**: The frontend can successfully make API requests to the backend container using the orchestrated network.
- **SC-005: Data Persistence**: Database records created within the container remain available after the container is stopped and restarted.

## 6. Assumptions
- The host machine has Docker and Docker Compose (v2.0+) installed.
- Developers have a basic understanding of Docker commands.
- The project follows a standard Laravel and React project structure.

## 7. Risks & Mitigations
- **Build Performance**: Docker builds can be slow. Mitigation: Use multi-stage builds and efficient layer caching.
- **Resource Usage**: Running multiple containers can consume significant RAM/CPU. Mitigation: Use alpine-based images where possible and configure resource limits.
- **Port Conflicts**: Local ports (5173, 8000, 5432) might be used by other applications. Mitigation: Document how to easily remap ports in the environment configuration.
