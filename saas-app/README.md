# SaaS Starter (monorepo)

Production-style template: **Next.js (App Router)** + **Express API** + **Supabase Auth & PostgreSQL** + **Zustand** + **Tailwind + shadcn-style UI**.

## Structure

| Path | Purpose |
|------|---------|
| `frontend/` | Next.js app — landing, auth pages, dashboard, middleware |
| `backend/` | Express REST API — JWT validation, items CRUD via Supabase client |
| `shared/` | Shared TypeScript types (`Item`, etc.) |
| `supabase/schema.sql` | Table + Row Level Security policies |

## Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project

## 1. Supabase setup

1. Create a project and open **Project Settings → API**.
2. Copy **Project URL** and **anon public** key.
3. In the SQL editor, run `supabase/schema.sql` from this repo.
4. Under **Authentication → Providers**, ensure **Email** is enabled.
5. Add redirect URL: `http://localhost:3000/auth/callback` (and your production URL later).

## 2. Environment variables

Create two env files (values from step 1):

**`frontend/.env.local`**

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**`backend/.env`**

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbG...
PORT=4000
FRONTEND_ORIGIN=http://localhost:3000
```

See root `.env.example` for a combined checklist.

## 3. Install and run

From the `saas-app` directory:

```bash
npm install
npm run dev
```

This starts:

- Next.js — [http://localhost:3000](http://localhost:3000)
- Express API — [http://localhost:4000/health](http://localhost:4000/health)

### Build (production)

```bash
npm run build
```

Start compiled apps (after build):

```bash
# terminal 1
npm run start --workspace=@saas/backend

# terminal 2
npm run start --workspace=@saas/frontend
```

Set `NEXT_PUBLIC_API_URL` to your deployed API URL in production.

## Features

- **Auth**: sign up, login, logout, session cookies, `auth.onAuthStateChange` via `AuthProvider` + Zustand.
- **Middleware**: redirects unauthenticated users away from `/dashboard`.
- **CRUD**: items list/create/delete; data scoped per user with **RLS** on `public.items`.
- **API**: Express validates `Authorization: Bearer <jwt>` and uses the anon key + user JWT so Postgres policies apply.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev: frontend + backend concurrently |
| `npm run build` | Build shared, backend, frontend |
| `npm run lint` | Lint Next.js app |

## Security notes

- Never expose the **service role** key in the browser; this template uses the **anon** key with RLS.
- Keep `.env.local` / `backend/.env` out of version control.
- For production, use HTTPS and restrict `FRONTEND_ORIGIN` / CORS to your domain.
