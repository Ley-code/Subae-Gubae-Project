# መሠረተ ሃይማኖት ሰንበት ትምህርት ቤት — Web App

Web app for Ta'eka Negest Be'ata Le Mariam Gedam, Meserete Haimanot Sunday School (Addis Ababa). Amharic-first public site, online registration, educational material archive, and an admin CMS.

## Stack

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind v4, in `frontend/`
- **Backend**: Prisma schema + repositories + auth helpers, as a local workspace package `@meserete/backend`, in `backend/`
- **Database**: PostgreSQL (local via Docker, or Neon for cloud)
- **Auth**: Auth.js (NextAuth v5), credentials-based, admin/teacher roles only
- **File uploads** (post-launch admin uploads): Cloudinary

## Setup — local development

1. Install dependencies (installs both workspaces from the repo root):
   ```
   npm install
   ```

2. Start local Postgres:
   ```
   docker compose up -d
   ```

3. Copy the env file (already done if `.env` exists — it defaults to the local Docker connection string):
   ```
   cp .env.example .env
   ```
   Generate a real `NEXTAUTH_SECRET` with `openssl rand -base64 32` and paste it in. Also set `CLOUDINARY_URL` from your Cloudinary dashboard's "API Environment variable" (needed for the admin Gallery/Materials upload forms to work — public pages work fine without it).

4. Run the first migration and seed sample content:
   ```
   npm run db:migrate
   npm run db:seed
   ```
   This creates one admin login: **admin@meseretehaimanot.org / ChangeMe123!** — change this password or create a new admin via:
   ```
   npm run create-admin -- someone@example.com "Full Name" "a-strong-password" ADMIN
   ```

5. Start the dev server:
   ```
   npm run dev
   ```
   Visit `http://localhost:3000`.

6. Admin CMS: `http://localhost:3000/admin/login`

## Using Neon instead of local Docker

Create a free project at neon.tech, copy its connection string, and replace `DATABASE_URL` in `.env` with it (comment out the local Docker line). Then run steps 4–5 again against that database.

## Useful commands

- `npm run db:studio` — opens Prisma Studio (browse/edit DB rows directly)
- `npm run build` — production build (also type-checks everything)

## Deploying to Vercel

1. Import the repo into Vercel, set **Root Directory** to `frontend`.
2. Add environment variables in the Vercel project settings: `DATABASE_URL` (point at Neon), `NEXTAUTH_URL` (your production URL), `NEXTAUTH_SECRET`, `CLOUDINARY_URL` (from your Cloudinary dashboard), `NEXT_PUBLIC_SITE_URL`.
3. Before (or right after) a deploy that changes the Prisma schema, run migrations against the production database from your machine:
   ```
   DATABASE_URL="<neon-connection-string>" npx prisma migrate deploy --schema=backend/prisma/schema.prisma
   ```
   Migrations are **not** run automatically as part of the Vercel build.

## What's built vs. scaffolded

**Fully built**: public site (home, history, news, events, gallery, articles, mezmur/hymn archive), online registration, educational material archive with download, admin CMS (login, dashboard, CRUD for news/events/gallery/materials/mezmur/articles, registrations review, read-only members list).

**Scaffolded only** (data model + a minimal page, not a full feature): discussion forum (`/forum` — no reply UI yet), donations (`/donate` — records interest only, no payment gateway wired).

## Known follow-ups

- The `/history` page content was transcribed by reading photographed pages of a printed history booklet (`Pictures/history_pic/`, not included in the repo). A few words in that transcription are uncertain due to the angle/blur of the source photos — worth a native-speaker proofread pass against the original booklet before treating it as fully authoritative.
- The curated photo set in `frontend/public/images/` is a subset (~35 of ~160) of the original `Pictures/` folder; more can be added later through the admin Gallery upload feature.
