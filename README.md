# Reusable Portfolio API

Express + Prisma/PostgreSQL backend for any personal portfolio. Each deployment represents one portfolio owner and is customized through the API.

## Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `JWT_SECRET` (at least 32 characters), and `ADMIN_PASSWORD`.
2. Install dependencies with `pnpm install`.
3. Create/update tables with `pnpm db:migrate` (or `pnpm db:push` for a quick local setup).
4. Seed the admin, settings, and starter profile with `pnpm seed`.
5. Run with `pnpm dev` or `pnpm start`.

API documentation: `/api/docs`. Health check: `/api/health`.

## Authentication

Call `POST /api/auth/login` with `{ "email": "...", "password": "..." }`. Send the returned token as `Authorization: Bearer <token>` for admin routes. Public routes are GET content endpoints and `POST /api/contact`.

## Customization endpoints

- `GET/PUT /api/profile` — owner details, avatar, CV, social links, calls to action
- `GET/PUT /api/settings` — branding, colors, theme, fonts, SEO, language, section layout
- `GET/POST/PUT/DELETE /api/sections` — testimonials, services, awards, certifications, galleries, or any custom JSON section
- `GET/POST/PUT/DELETE /api/projects`, `/api/skills`, `/api/history`
- `POST /api/uploads` — authenticated multipart upload using field name `file` (images/PDF, local storage)
- `POST /api/contact` — public contact form, rate limited; inbox management requires authentication

Projects, skills, and history support visibility/publishing and sort order. Project and contact list endpoints support pagination.

For production, use object storage (S3/Cloudinary) instead of local `uploads/`, configure `CLIENT_ORIGINS`, run behind HTTPS, and rotate `JWT_SECRET`.
