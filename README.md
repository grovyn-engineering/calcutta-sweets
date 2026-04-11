# Calcutta Sweets - Production Documentation

A production-ready full-stack application for managing and showcasing premium traditional sweets. This project is architected with a clean separation between the Next.js frontend and Express/Prisma backend.

## 🏗️ Architecture Overview

The system is organized into a monorepo-style structure:
- **`/frontend`**: Performance-optimized Next.js web application.
- **`/backend`**: Secure RESTful API powered by Express and Prisma.
- **`package.json` (Root)**: The orchestrator that manages both services via `concurrently`.

---

## 🚀 Quick Start (Development)

1. **Install Dependencies:**
   ```bash
   npm run install:all
   ```

2. **Setup Environment Variables:**
   - Create `backend/.env` (Database, Cloudinary, JWT secrets).
   - Create `frontend/.env.local` (`NEXT_PUBLIC_API_URL`).

3. **Database Initialization:**
   ```bash
   cd backend
   npx prisma generate
   npx prisma migrate dev
   node prisma/seed.js
   ```

4. **Launch Application:**
   ```bash
   npm run dev
   ```

---

## 📂 Frontend Inventory (`/frontend`)

### Core Infrastructure
- **`proxy.ts`**: The security gateway. Handles auth-based redirection for the `/admin` routing via Next.js Middleware.
- **`next.config.ts`**: Configuration for image optimization and remote patterns (Cloudinary).
- **`tsconfig.json`**: TypeScript configuration with `@/*` aliases for clean imports.

### Directory Breakdown
- **`app/`**: Next.js App Router.
    - `admin/`: All dashboard pages (Hero, Sweets, Occasions).
    - `layout.tsx`: Root layout with global context providers.
- **`components/`**: Reusable UI components.
    - `admin/`: Specialized dashboard tools like `ImageUploader`.
    - `layout/`: Global navigation (`Navbar`, `Footer`).
- **`hooks/`**: Custom hooks extracting business logic.
    - `useAdminData.ts`: Centralized fetcher for all admin dashboard stats.
    - `useOccasions.ts`: Logic for CRUD operations on celebrations.
- **`lib/`**: Utilities and Fetchers.
    - `apiHelper.ts`: The standardized fetching wrapper that handles `credentials: "include"` and automatic redirects.
- **`store/`**: Zustand state management.
    - `authStore.ts`: Global state for the administrator's session.
- **`types/`**: Global TypeScript interfaces. Shared between components and hooks.

---

## 📂 Backend Inventory (`/backend`)

### Core Entry Point
- **`server.js`**: The Express application hub. Configures CORS, Rate Limiting, Cloudinary, and Routes.
- **`src/lib/prisma.js`**: Critical Prisma Singleton pattern to prevent database connection pool exhaustion.

### Application Logic (`/src`)
- **`controllers/`**: Pure logic for handling requests.
    - `authController.js`: JWT generation and cookie management.
    - `occasionController.js`: CRUD logic with image cleanup integration.
- **`routes/`**: Express route definitions mapping URLs to controllers.
- **`middlewares/`**: Security and integrity guards.
    - `authMiddleware.js`: Verifies HttpOnly JWT cookies.
    - `errorHandler.js`: Standardized global error responses.
    - `validate.js`: Interceptor that runs Zod schemas against `req.body`.
- **`validators/`**: Persistence integrity.
    - `schemas.js`: Strict Zod schemas for every model (Hero, Sweet, Stat).
- **`utils/`**: Shared helpers.
    - `cloudinary.js`: Logic for secure uploads and deleting orphaned assets.

### Database (`/prisma`)
- **`schema.prisma`**: The source of truth. Defines the CUID-based ID system and `createdAt/updatedAt` timestamps for all models.
- **`seed.js`**: Recovery script that recreates the primary Admin account.

---

## 🔐 Key Security Patterns

1. **Authentication:** Uses **HttpOnly Cookies** for JWT storage. This prevents XSS-based token theft.
2. **Standardized IDs:** All records use **CUIDs** (strings) instead of auto-incrementing integers, preventing ID enumeration attacks.
3. **Data Integrity:** No request reaches the database without passing through the **Zod Validation** middleware.
4. **CORS:** Only the authorized `FRONTEND_URL` is permitted to make requests, and `credentials: true` is enforced for secure cookie handling.

---

## 🛠️ Troubleshooting & Troubleshooting

- **ID Errors:** If you see `parseInt` errors, remember the system has migrated to **CUID String IDs**.
- **Auth Issues:** Ensure your `backend/.env` has a correct `JWT_SECRET` and `backend/server.js` logs `JWT_SECRET Loaded: YES`.
- **Image Uploads:** Verify Cloudinary credentials in `.env`. The system automatically deletes old images from Cloudinary when records are updated or deleted.
- **Port Conflict:** Root dev runs Frontend on 3000 and Backend on 5000. Use `taskkill /F /IM node.exe` if ports are locked.
