# Calcutta Sweets - Full Stack Suite

A premium, production-grade web application for Calcutta Sweets, featuring a dynamic customer-facing website and a secure administrative dashboard.

## 🏗️ Architecture

The project is architected as a decoupled full-stack application:

- **Frontend**: Next.js (App Router) with Tailwind CSS and Framer Motion for a premium, high-performance user experience.
- **Backend**: Express.js REST API with Prisma ORM for type-safe database interactions.
- **Database**: PostgreSQL (Prisma support).
- **Media**: Cloudinary integration for automated image optimization and storage.

---

## 🛠️ Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **PostgreSQL**: A running instance (Local or Managed)
- **Cloudinary Account**: Required for image uploads

---

## 🚀 Getting Started

### 1. Repository Setup

Clone the repository and install all dependencies:

```bash
# Install root, frontend, and backend dependencies automatically
npm run install:all
```

### 2. Environment Configuration

The application requires environment variables in both the `frontend` and `backend` directories. 

#### Backend (`/backend/.env`)
Copy the template and fill in your credentials:
```bash
cp backend/.env.example backend/.env
```
Key variables:
- `DATABASE_URL`: Connection string to your PostgreSQL.
- `CLOUDINARY_*`: Your Cloudinary API credentials.
- `JWT_SECRET`: A long random string for securing admin sessions.

#### Frontend (`/frontend/.env.local`)
Copy the template:
```bash
cp frontend/.env.example frontend/.env.local
```
Key variable:
- `NEXT_PUBLIC_API_URL`: The URL where your backend server is running (Default: `http://localhost:5000/api`).

### 3. Database Initialization

Once your `DATABASE_URL` is set, run the following inside the `backend` directory:

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init

# Create the initial Admin account
node prisma/seed.js
```

### 4. Launching the Application

You can start both the frontend and backend simultaneously from the root directory:

```bash
# Starts Frontend (Port 3000) and Backend (Port 5000)
npm run dev
```

---

## 📂 Project Organization

### 🔌 Backend (`/backend`)
- **`src/controllers/`**: Business logic implementations.
- **`src/routes/`**: API endpoint definitions.
- **`src/middlewares/`**: Security (JWT), validation (Zod), and error handling.
- **`prisma/`**: Database schema and seed scripts.
- **`server.js`**: Application entry point and configuration.

### 🎨 Frontend (`/frontend`)
- **`app/`**: Next.js pages and layouts (Includes Customer pages and Admin dashboard).
- **`components/`**: Reusable UI components.
- **`lib/`**: Utilities like `serverFetch.ts` (Resilient backend communication with fallbacks).
- **`hooks/`**: Custom React hooks for data fetching and state.
- **`store/`**: Global state management (Zustand).

---

## 🛡️ Key Features

- **Resilient Fetching**: The website uses a custom `serverFetch` utility that automatically falls back to local static data if the API is offline, ensuring the site never crashes for customers.
- **Secure Admin Panel**: Protected via HttpOnly JWT cookies and Next.js middleware.
- **Automated Image Management**: Uploading a new image automatically deletes the old asset from Cloudinary to save storage.
- **Schema Validation**: All incoming data is validated using Zod schemas before hitting the database.

---

## ❓ Troubleshooting

- **Port Conflict**: If port 3000 or 5000 is taken, the startup will fail. You can kill existing Node processes using `taskkill /F /IM node.exe` (Windows) or `killall node` (Mac/Linux).
- **Prisma Issues**: If you change the `schema.prisma` file, always run `npx prisma migrate dev` and `npx prisma generate`.
- **Cloudinary Errors**: Ensure your credentials are correct in the `.env` file and that you haven't exceeded your monthly transformation limits.
- **Module Not Found**: If you receive import errors, ensure you've run `npm run install:all` to install dependencies in both sub-directories.

---

## 📄 License

This project is private and proprietary.
