# Pomodoro Productivity Suite

A full-stack Pomodoro task management application built with NestJS, React, and Hexagonal Architecture.

## 🚀 Architecture Overview

This project follows **Hexagonal Architecture (Ports and Adapters)** to ensure a clean separation of concerns:

- **Domain Layer**: Contains core business logic, entities, and repository interfaces.
- **Application Layer**: Implements use cases and defines data transfer objects (DTOs).
- **Infrastructure Layer**: Handles external concerns like database persistence (Prisma), authentication (Passport), and module configuration.
- **Presentation Layer**: Exposes functionality via REST API controllers and the React frontend.

## 🛠️ Tech Stack

- **Backend**: NestJS, Prisma ORM, PostgreSQL, Passport.js (Google OAuth2 & JWT), Swagger.
- **Frontend**: React (Vite), Tailwind CSS, Zustand, React Query, Lucide Icons, Recharts.
- **DevOps**: Docker, Docker Compose, pnpm workspaces.

## ⚙️ Environment Variables

### Backend (`apps/backend/.env`)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/pomodoro_db"
JWT_SECRET="your-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"
FRONTEND_URL="http://localhost:5173"
```

### Frontend (`apps/frontend/.env`)
```env
VITE_API_URL="http://localhost:3000"
```

## 📦 Setup Instructions

### Local Development (Native)
1. **Install Dependencies**: `pnpm install`
2. **Setup Database**: `docker-compose up db -d`
3. **Apply Migrations**: `cd apps/backend && pnpm prisma migrate dev`
4. **Run Apps**: `pnpm dev` (from root)

### Docker Setup (Recommended)
The entire stack can be launched with a single command:
```bash
docker-compose up -d
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Swagger Docs: `http://localhost:3000/api`

## 🧪 Testing

### Backend
Run unit tests for use cases:
```bash
cd apps/backend
pnpm test
```

### Frontend
Run component tests:
```bash
cd apps/frontend
pnpm test
```

## 📝 Docker Notes

If Docker build fails after dependency changes, rebuild without cache:

```bash
docker compose build --no-cache
```

## 📜 Available Scripts

- `pnpm dev`: Starts both frontend and backend in development mode.
- `pnpm build`: Builds all applications for production.
- `pnpm lint`: Runs linting across the monorepo.
- `pnpm test`: Executes tests in all packages.
- `pnpm prisma:generate`: Updates Prisma client.
- `pnpm prisma:migrate`: Runs database migrations.
