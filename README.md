# Abou-Taleb Education

A full-stack education consultancy platform for students who want to study in
Türkiye. The application combines a multilingual public website with secure
customer accounts, university application tracking, and an administration
console for managing orders and public content.

- **Live website:** [aboutalebeducation.com](https://aboutalebeducation.com)
- **API:** [api.aboutalebeducation.com/api/v1/health](https://api.aboutalebeducation.com/api/v1/health)

## Features

### Public website

- Arabic, English, and Turkish interfaces with RTL/LTR support
- Searchable university catalogue with city filters
- Service, registration journey, testimonial, and contact sections
- Responsive layout for desktop and mobile devices
- Managed university, testimonial, social-link, and contact content

### Customer portal

- Account registration and email verification
- Secure sign-in, sign-out, and password recovery
- University application submission
- Personal order history and status tracking
- Order cancellation when allowed by the application workflow
- Account and profile management

### Administration console

- Role-protected admin routes
- Order search, filtering, metrics, assignment, and status management
- Internal notes and client-visible order updates
- University catalogue management
- Testimonial, social-link, and contact-content management
- Image uploads through Cloudinary
- Audit logging for sensitive account and administration activity

## Technology stack

| Area | Technologies |
| --- | --- |
| Web | React 19, TypeScript, Vite, React Router, TanStack Query |
| API | Node.js, Express 5, TypeScript, Zod |
| Data | PostgreSQL, Prisma ORM |
| Authentication | Argon2, server-side sessions, HttpOnly cookies, CSRF protection |
| Email | Resend in production, development provider locally |
| Media | Cloudinary |
| Monitoring | Sentry |
| Testing | Vitest, Testing Library, Supertest |
| Delivery | GitHub Actions, Firebase Hosting, Render |

## Repository structure

```text
.
├── apps/
│   ├── api/              # Express REST API
│   └── web/              # React single-page application
├── packages/
│   └── contracts/        # Shared Zod schemas and TypeScript types
├── prisma/
│   ├── migrations/       # PostgreSQL schema migrations
│   ├── schema.prisma
│   └── seed.ts           # Admin bootstrap and initial managed content
├── scripts/                 # Content and image migration utilities
├── docs/                    # Plans, runbooks, and engineering notes
├── docker-compose.yml       # Local PostgreSQL service
├── firebase.json            # Web hosting configuration
└── render.yaml              # API deployment configuration
```

The repository uses npm workspaces. `@abou/contracts` is shared by the web and
API applications so request and response validation stays consistent across
both sides of the platform.

## Getting started

### Prerequisites

- Node.js 20.19 or newer
- npm
- Docker with Docker Compose, or a local PostgreSQL instance

### Local setup

1. Install the workspace dependencies:

   ```bash
   npm install
   ```

2. Create the local environment file:

   ```bash
   cp .env.example .env
   ```

3. Start PostgreSQL:

   ```bash
   docker compose up -d postgres
   ```

4. Generate Prisma Client and apply the development migrations:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. Start the API and web application together:

   ```bash
   npm run dev
   ```

Open [http://localhost:5173](http://localhost:5173). The API runs on
[http://localhost:4000](http://localhost:4000), and its health endpoint is
available at
[http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health).

Vite proxies local `/api` requests to port `4000`, so the default development
configuration works without an additional browser CORS setup.

## Environment variables

The complete development template is documented in [`.env.example`](.env.example).
The most important values are:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection URL |
| `API_PORT` | API port; defaults to `4000` |
| `WEB_ORIGIN` / `WEB_ORIGINS` | Allowed browser origins for credentialed requests |
| `COOKIE_DOMAIN` | Shared production cookie domain |
| `BOOTSTRAP_ADMIN_EMAIL` | Verified account promoted by the seed command |
| `AUTH_EMAIL_PROVIDER` | `development` locally or `resend` in production |
| `RESEND_API_KEY` | Resend credential for production email delivery |
| `CLOUDINARY_*` | Cloudinary credentials for admin image uploads |
| `SENTRY_DSN` / `VITE_SENTRY_DSN` | Optional API and web error monitoring |
| `VITE_API_BASE_URL` | Public API origin used by the production web build |

Do not commit real credentials. Production mode requires a database URL,
HTTPS web origins, a cookie domain, Resend configuration, and Cloudinary
credentials.

## Database and administrator bootstrap

Prisma migrations are stored in `prisma/migrations`. Useful commands include:

```bash
npm run db:generate   # Generate Prisma Client
npm run db:migrate    # Create/apply migrations during development
npm run db:deploy     # Apply committed migrations in deployment environments
npm run db:seed       # Bootstrap the admin and initial managed content
```

The seed command does not create an administrator account. First register and
verify the email configured in `BOOTSTRAP_ADMIN_EMAIL`, then run
`npm run db:seed`. The command promotes that verified account and seeds the
initial universities, social links, and contact details.

## API overview

All endpoints are versioned under `/api/v1`.

| Route group | Responsibility |
| --- | --- |
| `/auth` | Registration, verification, sessions, password recovery, account data |
| `/orders` | Customer application creation, history, details, and cancellation |
| `/admin/orders` | Administration metrics and order workflow management |
| `/universities` | Published university catalogue |
| `/testimonials` | Published testimonials |
| `/social-links` and `/contact` | Public managed contact content |
| `/admin/*` | Protected content-management and upload operations |
| `/health` | Process health check |
| `/health/readiness` | API and database readiness check |

Authentication uses server-side sessions in HttpOnly cookies. State-changing
requests are protected by CSRF validation, while admin endpoints also enforce
role-based authorization.

## Quality checks

Run the complete local verification suite from the repository root:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

GitHub Actions runs the same checks against PostgreSQL for pull requests and
pushes to `main`.

During `npm run dev`, the web application also loads React Grab and React Scan
as development-only inspection tools. They are excluded from production builds.

## Deployment

- **Web:** pushes to `main` build `@abou/contracts` and `@abou/web`, then deploy
  `apps/web/dist` to Firebase Hosting. Firebase rewrites browser-history routes
  to `index.html`.
- **API:** Render installs dependencies, generates Prisma Client, applies
  migrations, builds `@abou/contracts` and `@abou/api`, then starts the compiled
  Express server.
- **Database:** production PostgreSQL is provided separately and configured with
  `DATABASE_URL`.

Deployment credentials and service-specific environment values must be set in
GitHub, Firebase, and Render rather than committed to the repository.

## Project documentation

- [Development plan](docs/DEVELOPMENT_PLAN.md)
- [Implementation log](docs/IMPLEMENTATION.md)
- [Developer notes](docs/DEVELOPER_NOTES.md)
- [Launch runbook](docs/phase-07-launch-runbook.md)
- [Manual validation guide](docs/manual-website-validation.md)

## Contact

- Website: [aboutalebeducation.com](https://aboutalebeducation.com)
- Email: [info@aboutalebeducation.com](mailto:info@aboutalebeducation.com)
- Instagram: [@abou.taleb.education](https://www.instagram.com/abou.taleb.education)
- Facebook: [AbouTalebEducation](https://www.facebook.com/AbouTalebEducation)
