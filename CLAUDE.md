# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Abou-Taleb Education — a Turkey study-abroad consultancy site, being migrated from a static GitHub Pages HTML page into a TypeScript monorepo: React (web) + Express (API) + PostgreSQL/Prisma. Content is trilingual (Arabic, English, Turkish) with Arabic RTL as the primary layout.

`PROJECT_BASELINE.md` describes the _old_ static site and is historical — the repo has since moved to the monorepo structure below. `DEVELOPMENT_PLAN.md` is the authoritative design doc (data model, API outline, phased delivery plan, roles/permissions).

## Commands

Run from the repo root (npm workspaces):

```bash
npm install
docker compose up -d postgres      # Postgres 17 on localhost:5432 (user/pass/db: abou)
cp .env.example .env
npm run db:generate                # prisma generate
npm run db:migrate                 # prisma migrate dev
npm run dev                        # runs api + web concurrently
```

- Web: http://localhost:5173 — API health: http://localhost:4000/api/v1/health
- After registering and verifying the bootstrap account (email from `BOOTSTRAP_ADMIN_EMAIL`), promote it to admin: `npm run db:seed`

Quality gates (also what CI runs — check before considering work done):

```bash
npm run format:check   # prettier --check .
npm run lint           # eslint per workspace
npm run typecheck      # tsc per workspace (contracts -> api -> web order)
npm test               # vitest per workspace (contracts -> api -> web order)
npm run build          # contracts -> api -> web order
```

Per-workspace, use `-w @abou/api`, `-w @abou/web`, or `-w @abou/contracts`, e.g.:

```bash
npm run test -w @abou/api
npm run test -w @abou/api -- src/modules/orders/orders.service.test.ts
npm run typecheck -w @abou/web
```

`@abou/contracts` must build/typecheck before `@abou/api` or `@abou/web` since both depend on it directly from source (no prebuild step needed for `dev`/`test`, only for `build`).

API test files ending in `.integration.test.ts` hit a real Postgres via `DATABASE_URL` (docker-compose Postgres must be running); plain `.test.ts` files are unit tests. Both run through the same `vitest run` command — `fileParallelism: false` is set in `apps/api/vitest.config.ts` because integration tests share one database.

Prisma schema lives at the repo root: `prisma/schema.prisma`, `prisma/seed.ts`, `prisma/migrations/`. Always run `db:migrate`/`db:generate` from the root, not from `apps/api`.

## Architecture

### Monorepo layout

- `packages/contracts` — the only cross-cutting package. Zod schemas + inferred types shared by API and web (`auth.ts`, `content.ts`, `orders.ts`, aggregated in `index.ts`). Change a request/response shape here first; both apps import from `@abou/contracts`.
- `apps/api` — Express 5 API.
- `apps/web` — React 19 + Vite SPA, React Router 7, TanStack Query.
- `prisma/` — single Prisma schema shared by the whole repo (not nested under `apps/api`).

### API (`apps/api/src`)

`app.ts` is the composition root: security middleware (helmet, cors from `env.WEB_ORIGINS`, compression, cookie-parser, `requestContext`), then one router mount per domain under `/api/v1/*`, then a 404 handler and a single centralized `errorHandler`. Read `app.ts` to see the full route map before adding new endpoints.

Each domain under `src/modules/<name>/` follows the same layering:

- `*.routes.ts` — Express router, wires HTTP to services, request validation via zod schemas from `@abou/contracts` or local `*.schemas.ts`.
- `*.service.ts` — business logic.
- `*.repository.ts` — Prisma data access (only in `auth/`; other modules call `prisma` directly from services).
- `*.module.ts` (auth only) — a small DI factory (`createAuthModule`) that wires repository → services so tests can inject fakes. Prefer this pattern if a module's dependency graph grows.
- Public vs admin split: content modules (`universities`, `testimonials`, `social-link`, `contact`) each export a `public*Router` and `admin*Router` pair from the same routes file — admin routes require the `auth` middleware and role check, public ones only return published rows.

Cross-cutting pieces: `core/app-error.ts` (typed `AppError` + `appErrors` factory — throw these from services, not raw `Error`), `core/logger.ts`, `core/monitoring.ts` (Sentry), `middleware/auth.ts` (session cookie auth + role guard), `middleware/rate-limit.ts`, `lib/prisma.ts` (singleton client), `lib/otp.ts`/`lib/password.ts` (argon2 hashing, OTP generation for email verification).

`config/env.ts` is the single source of truth for environment variables — it validates with zod and enforces production-only requirements (HTTPS origins, `DATABASE_URL`, `COOKIE_DOMAIN`, a configured Resend key). Add new env vars here, not via ad-hoc `process.env` reads elsewhere.

Auth model: cookie-based sessions (`Session` table, hashed token) + a separate CSRF cookie, OTP-based email verification and password reset (`VerificationChallenge` table), `AuditLog` for admin/security-relevant actions. Roles are `CLIENT` / `ADMIN` (see `prisma/schema.prisma`).

### Web (`apps/web/src`)

`App.tsx` defines the route tree (public marketing routes, client routes behind `guards.tsx`, admin routes). Feature folders under `src/features/<name>/` pair a `*-client.ts` (fetch wrapper calling the API, typed via `@abou/contracts`) with page/section components and colocated `*.test.tsx`. Auth state lives in `features/auth/useAuth.ts`.

Dev-only tooling (excluded from production build): React Grab (`Ctrl+C`/`Cmd+C` on a hovered element to copy component context) and React Scan (floating re-render inspector), wired in `developer-tools.ts` and only active under `npm run dev`.

### Deployment

The API is deployed to Render (`render.yaml`) as a standalone web service; `/api/v1/health` and `/api/v1/health/readiness` are its Express-handled health checks. The web app is deployed to Firebase Hosting (`firebase.json`, `.firebaserc`, project `aboutaleb-platform`) via `.github/workflows/deploy-firebase.yml` on every push to `main`, with all paths rewritten to `/index.html` for client-side routing. GitHub Pages (`deploy-pages.yml`, root `index.html`/`images/`/`CNAME`) is legacy and kept only as a fallback until the Firebase deploy is verified live — see `IMPLEMENTATION.md`. `docs/phase-07-launch-runbook.md` covers the launch/deploy procedure; other `docs/phase-*.md` files are dated QA/remediation snapshots from earlier delivery phases.
