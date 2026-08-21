# Abou-Taleb Education — Express + React Development Plan

**Prepared:** 2026-08-17  
**Status:** Complete and ready for phased implementation; flagged external confirmations are listed in Section 20  
**Starting point:** Static single-page site documented in `PROJECT_BASELINE.md`

## 1. Goal

Replace the current static website with a maintainable full-stack application that:

- Preserves and improves the public marketing website.
- Uses React for the frontend and Express for the backend API.
- Supports client and admin accounts with verified email addresses.
- Requires clients to sign in before creating an order/application.
- Gives clients a private area to submit and track their own orders.
- Gives admins a secure dashboard to review and manage all orders.
- Allows admins to manage public website content, beginning with universities.
- Displays universities as a searchable, responsive catalog of cards.
- Works reliably across phones, tablets, laptops, and large screens.
- Has automated tests, database migrations, CI checks, staging, and a clean GitHub workflow.

### 1.1 What “MVP” means for this project

**MVP** means **Minimum Viable Product**: the smallest complete version that is genuinely useful to the business and safe to launch. It does not mean a low-quality or unfinished site. It means building the essential workflow first, launching it, then adding lower-priority features after real usage confirms they are needed.

For this project, the MVP is:

1. A responsive Arabic/English/Turkish public website.
2. Client registration, email verification, sign-in, and password reset.
3. A signed-in, verified client can submit an order containing full name, email, phone, and specialization.
4. The client can see their own orders and statuses.
5. Admins can review orders and update their statuses.
6. Admins can manage universities, client testimonials, and social-media links.

Features such as document uploads, payments, live chat, and a general page builder are postponed until the core workflow is working.

## 2. Scope terminology

Use **Application Request** as the customer-facing term in Arabic, English, and Turkish. Use `Order` internally in database models and API code to preserve the agreed dashboard terminology.

## 3. Recommended architecture

### 3.1 Repository shape

Use a TypeScript monorepo with npm workspaces:

```text
.
├── apps/
│   ├── web/                  # React + Vite frontend
│   │   ├── src/
│   │   │   ├── app/          # Router, providers, app bootstrap
│   │   │   ├── components/   # Shared UI components
│   │   │   ├── features/     # Auth, orders, universities, admin, content
│   │   │   ├── pages/        # Route-level components
│   │   │   ├── services/     # Typed API client
│   │   │   ├── styles/       # Tokens and global styles
│   │   │   └── test/         # Frontend test setup
│   │   └── public/           # Optimized public assets
│   └── api/                  # Express API
│       └── src/
│           ├── config/       # Validated environment configuration
│           ├── middleware/   # Auth, roles, validation, errors, rate limits
│           ├── modules/      # Auth, users, orders, universities, content
│           ├── services/     # Email, storage, audit logging
│           ├── jobs/         # Cleanup/notification jobs if required
│           └── test/         # API integration tests
├── packages/
│   ├── contracts/            # Shared schemas and API types
│   ├── eslint-config/        # Shared lint configuration
│   └── tsconfig/             # Shared TypeScript configuration
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── docs/
│   ├── api.md
│   ├── deployment.md
│   └── runbooks.md
├── .github/
│   ├── workflows/ci.yml
│   ├── pull_request_template.md
│   └── ISSUE_TEMPLATE/
├── package.json
└── README.md
```

### 3.2 Technology choices

| Area | Recommended choice | Reason |
|---|---|---|
| Language | TypeScript throughout | Shared types and safer refactoring |
| Frontend | React + Vite | Fits the explicit React/Express requirement and provides a simple SPA build |
| Routing | React Router | Public, client, and admin route separation |
| Server state | TanStack Query | Caching, invalidation, loading/error states, and mutations |
| Forms | React Hook Form + Zod | Performant forms with shared validation rules |
| Styling | CSS Modules plus design tokens | Keeps styling explicit and avoids locking the project to a UI framework |
| API | Express | Requested backend framework |
| Database | PostgreSQL | Reliable relational model for users, orders, statuses, content, and audit history |
| ORM/migrations | Prisma | Type-safe queries and committed SQL migration history |
| Authentication | Server-side sessions in secure cookies | Easy revocation and safer browser storage than JavaScript-readable tokens |
| Session store | PostgreSQL initially; Redis when scale requires it | Avoids another service during MVP while preserving a scalable path |
| Password hashing | Argon2id | Modern password hashing recommendation |
| Email | Resend behind a provider adapter | Simple Node.js integration and sufficient free allowance for the initial OTP volume |
| Testing | Vitest, React Testing Library, Supertest, Playwright | Unit, integration, and end-to-end coverage |
| API documentation | OpenAPI generated/validated from schemas | Keeps frontend/backend contracts reviewable |
| Local services | Docker Compose for PostgreSQL and optional mail catcher | Reproducible setup without containerizing every dev process |

### 3.3 Deployment shape

The current GitHub Pages deployment cannot run Express. The target deployment needs:

- Static React assets served by a CDN or the Express service.
- A persistent Express runtime.
- PostgreSQL.
- HTTPS and a production domain.
- Secret/environment management.
- An outbound email provider.
- Automated database backups.
- A staging environment separate from production.

Provisional deployment layout (blocked pending external access):

- `aboutalebeducation.com` — static React app hosting remains unresolved. Free GitHub Pages cannot publish this private repository; select an approved alternative or make the repository public before staging.
- `api.aboutalebeducation.com` — Express API on Render's free tier.
- Managed PostgreSQL — Neon, connected through `DATABASE_URL`.
- OTP delivery — Resend, after domain DNS verification. The Resend domain currently reports `not_started`; GoDaddy DNS access is required to add its DKIM, SPF, and return-path records.

Start with Render's free tier to control costs. Its inactivity spin-down/cold-start delay is acceptable during the early validation period. Upgrade the API to an always-on paid Render plan when real users, OTP delivery speed, uptime expectations, or project income justify it; no application rewrite should be required.

Cross-subdomain production requirements:

- Set `WEB_ORIGIN=https://aboutalebeducation.com` and allow credentials only for that origin.
- Use HTTPS-only cookies with `SameSite=Lax` and production `Domain=.aboutalebeducation.com` so the frontend can read the CSRF cookie while the session cookie remains `HttpOnly`.
- Keep the API at `https://api.aboutalebeducation.com`; never expose API keys, database URLs, or Resend credentials to the React build.
- Verify CORS, login, session restore, CSRF-protected mutation, logout, and password reset on both the custom domain and the final API subdomain before launch.
- Add a configurable production cookie domain before enabling cross-subdomain authentication.

The business may already own hosting, but we still need the **hosting company and plan/control-panel details**. We must verify that it supports a persistent Node.js process, environment variables, HTTPS routing, and access to PostgreSQL. Owning a domain or having static/PHP hosting does not automatically mean it can run Express.

### 3.4 Why PostgreSQL is needed

React displays the interface and Express handles requests, but neither permanently stores business data. PostgreSQL is the permanent database for:

- Client and admin accounts.
- Secure password hashes and email-verification records.
- Login sessions.
- Orders and their current statuses.
- Complete status history and admin notes.
- Universities in three languages.
- Client testimonials and social-media links.
- Audit records showing important admin changes.

We do not need the business owner to supply PostgreSQL data. We need either an existing PostgreSQL database included with the hosting plan or permission to create/use a managed PostgreSQL database. The application will create its tables through reviewed Prisma migrations.

### 3.5 Email provider recommendation

Use **Resend** for the first release, sending from a dedicated address such as `no-reply@aboutalebeducation.com`.

- Its current free transactional plan includes 3,000 emails per month with a 100-email daily limit, which should be enough for initial OTP and order notifications.
- Its Node.js integration is straightforward.
- The application will use an internal email adapter, so a later move to Postmark or Amazon SES will not require rewriting authentication.
- Before real email is sent, the domain must have the provider's SPF and DKIM records configured; DMARC should also be added for monitoring/protection.
- OTP delivery and bounce handling must be tested on Gmail, Outlook, and common business inboxes before launch.

Postmark is a strong paid alternative when transactional-email deliverability and support justify the cost. Amazon SES is inexpensive at volume but has more AWS setup and operational complexity, so it is not the recommended starting point for this project.

## 4. Roles and permissions

Use one authentication service and one `User` table with role-based access control.

### Client

- Register, verify email, sign in, sign out, and reset password.
- View and edit their basic profile.
- Create an order only while authenticated and email-verified.
- View only their own orders and order status history.
- Add information to their own order only when its state permits editing.
- Cancel their own order only in explicitly allowed states.

### Admin

- Sign in through the same auth service but enter a separate admin area.
- View, search, filter, sort, and paginate all orders.
- View complete order details and status history.
- Change order status through valid state transitions.
- Add internal notes that clients cannot see.
- Add client-visible notes/messages when required.
- Manage universities and selected website content.
- View audit history for sensitive actions.

### Admin account policy

- No public admin registration endpoint.
- Create the first admin through a secure seed/bootstrap command.
- Later admins are invited or created by an authorized admin.
- Admin authorization is enforced in Express middleware and service methods, never only by hiding frontend routes.
- Strongly recommend adding TOTP or WebAuthn MFA for admins after the email-verification MVP. Email OTP alone is not ideal protection for privileged accounts.

The bootstrap admin account is fixed as `mostafa.ahmed.abuhamed@gmail.com`. The bootstrap process must create or promote only that exact normalized email through a deployment environment variable/seed allowlist, and no password may be committed to source control. Future admins will be invite-only by default.

## 5. Authentication and email verification design

### 5.1 Registration

1. Client submits name, normalized email, password, and required consent.
2. API validates input and checks rate limits.
3. Password is hashed with Argon2id.
4. User is created as `CLIENT` with `emailVerifiedAt = null`.
5. A cryptographically random OTP is generated and only its hash is stored.
6. Verification email is queued/sent.
7. Client enters the OTP.
8. API validates purpose, user, expiry, attempt count, and unused state.
9. On success, the OTP is consumed and `emailVerifiedAt` is set.
10. The user receives a new authenticated session or is directed to sign in, depending on the final UX choice.

### 5.2 OTP controls

- Six digits for usability, with a five-to-ten-minute expiry; eight digits can be selected if a stricter threat model is desired.
- Cryptographically secure generation.
- Hash OTP values at rest; never log them.
- Single use and invalidated after successful verification.
- A resend replaces the previous active OTP.
- Cooldown between sends.
- Per-account and per-IP send limits.
- Strict verification attempt limit followed by temporary lockout.
- Generic responses to avoid revealing whether an email exists.
- Store purpose (`EMAIL_VERIFY`, `PASSWORD_RESET`, later `EMAIL_CHANGE`) so codes cannot be reused across flows.
- Record provider message ID and delivery status where available, but never store the raw email body with secrets.

### 5.3 Sign-in and sessions

- Sign in with normalized email and password.
- Require verified email before order creation; decide whether unverified users may sign in solely to resend verification.
- Use opaque session IDs in `HttpOnly`, `Secure`, same-site cookies.
- Rotate the session after authentication and privilege changes.
- Store session records server-side and support logout from the current device and all devices.
- Add idle and absolute session expiry.
- Do not store authentication tokens in `localStorage` or `sessionStorage`.
- Add CSRF protection for all state-changing cookie-authenticated requests.
- Add login throttling and security logging without leaking credentials or OTP values.

### 5.4 Password reset

Password reset was not listed, but it is required for a usable account system.

- Generic reset-request response.
- Short-lived, random, single-use reset token or purpose-specific OTP.
- Rate-limited request and verification endpoints.
- Invalidate active sessions after successful reset, or let the user explicitly choose to invalidate all sessions.
- Send a confirmation email after the password changes.

## 6. Core data model

### User

- `id`
- `email` (normalized, unique)
- `passwordHash`
- `role`: `CLIENT | ADMIN`
- `status`: `ACTIVE | SUSPENDED | DISABLED`
- `emailVerifiedAt`
- `lastLoginAt`
- `createdAt`, `updatedAt`

### ClientProfile

- `userId`
- `fullName`
- `phoneCountryCode`, `phoneNumber`
- `nationality` (optional until the order requires it)
- `preferredLanguage`: `ar | en`
- `createdAt`, `updatedAt`

### Session

- `id` or hashed session token
- `userId`
- `expiresAt`
- `lastSeenAt`
- Optional device metadata such as user-agent summary
- `revokedAt`

### VerificationChallenge

- `id`
- `userId` or normalized email, depending on purpose
- `purpose`
- `codeHash`
- `expiresAt`
- `attemptCount`
- `consumedAt`
- `createdAt`

### Order

- `id` plus a human-readable public reference such as `ATE-2026-000123`
- `clientId`
- `fullName` — snapshot of the submitted name
- `email` — snapshot of the verified account email
- `phoneCountryCode`, `phoneNumber`
- `specialization` — selected from the approved dropdown list
- `status`
- `assignedAdminId` (optional)
- `submittedAt`, `closedAt`
- `createdAt`, `updatedAt`

The specialization list is confirmed from the current website and will be seeded in all three languages:

| Key | English | Arabic | Turkish |
|---|---|---|---|
| `medicine` | Medicine | الطب البشري | Tıp |
| `dentistry` | Dentistry | طب الأسنان | Diş Hekimliği |
| `pharmacy` | Pharmacy | الصيدلة | Eczacılık |
| `engineering` | Engineering | الهندسة | Mühendislik |
| `business` | Business Administration | إدارة الأعمال | İşletme |

Store the selected key and a submitted display snapshot so future label changes do not rewrite historical orders.

### OrderStatusHistory

- `id`
- `orderId`
- `fromStatus`, `toStatus`
- `changedByUserId`
- `clientVisibleMessage` (optional)
- `createdAt`

### OrderInternalNote

- `id`
- `orderId`
- `adminId`
- `body`
- `createdAt`, `updatedAt`

### University

- `id`
- `slug` (unique)
- `nameAr`, `nameEn`, `nameTr`
- `summaryAr`, `summaryEn`, `summaryTr`
- `city`
- `logoUrl`
- `websiteUrl` (optional)
- `featured`
- `active`
- `displayOrder`
- `createdAt`, `updatedAt`

Future-safe optional entities include `Program`, `UniversityProgram`, and `TuitionFee`; they should not be built until catalog requirements are confirmed.

### SocialLink

- `id`
- `platform`
- `labelAr`, `labelEn`, `labelTr`
- `url`
- `iconKey`
- `active`
- `displayOrder`
- `updatedByAdminId`
- `createdAt`, `updatedAt`

The initial seed uses the confirmed contact and social-media links from the current website.

### ManagedContent

For any small approved set of editable website fields added later:

- `key`
- `locale`
- `value` or structured JSON
- `updatedByAdminId`
- `updatedAt`

Do not build an unrestricted page builder in the first version. Use typed, whitelisted content sections so admins cannot break layout or inject unsafe markup.

### Testimonial / ClientStory

- `id`
- `clientNameAr`, `clientNameEn`, `clientNameTr`
- `quoteAr`, `quoteEn`, `quoteTr`
- Image URL with consent record
- `featured`, `active`, `displayOrder`
- `publishedAt`

### AuditLog

- `id`
- `actorUserId`
- `action`
- `entityType`, `entityId`
- Safe before/after metadata
- `ipAddress` or privacy-aware request metadata if legally appropriate
- `createdAt`

Audit records should cover role changes, admin account changes, order status changes, content publication, and destructive actions.

## 7. Order lifecycle

Use this provisional controlled state machine until the business owner approves or changes it:

```text
NEW
  ├── CONTACTED
  │     ├── WAITING_FOR_CLIENT
  │     │     └── IN_PROGRESS
  │     └── IN_PROGRESS
  │           ├── COMPLETED
  │           ├── REJECTED
  │           └── CANCELLED
  ├── REJECTED
  └── CANCELLED
```

Recommended rules:

- A successful order submission starts as `NEW` and creates its first history record.
- `CONTACTED` means an admin has contacted the client at least once.
- `WAITING_FOR_CLIENT` means the business cannot continue until the client responds or provides information.
- `IN_PROGRESS` means the business is actively processing the request.
- `COMPLETED`, `REJECTED`, and `CANCELLED` are terminal states unless an admin explicitly reopens the order.
- The submitted full name, email, phone, and specialization are locked after submission; corrections are recorded by an admin rather than silently rewriting history.
- Every status change is transactional and auditable.
- Status notifications are sent after the database transaction succeeds.
- Invalid transitions return a conflict response rather than silently accepting arbitrary status changes.

The state-machine diagram describes the staff/admin lifecycle. A client-cancel overlay additionally allows clients to cancel from `NEW`, `CONTACTED`, or `WAITING_FOR_CLIENT`; `IN_PROGRESS → CANCELLED` is staff-only. A client may submit one response per request while `WAITING_FOR_CLIENT`, and the response endpoint returns the created response receipt.

The business must approve the final states and transition rules before dashboard implementation.

## 8. API outline

Prefix routes with `/api/v1`.

### Authentication

- `POST /auth/register`
- `POST /auth/verify-email`
- `POST /auth/resend-verification`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/logout-all`
- `GET /auth/session`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

### Client profile and orders

- `GET /me`
- `PATCH /me`
- `GET /me/orders`
- `POST /orders` — creates and immediately submits the four-field order as `NEW`
- `GET /orders/:orderId`
- `POST /orders/:orderId/cancel`
- `POST /orders/:orderId/responses` for a response while `WAITING_FOR_CLIENT`

`POST /orders/:orderId/cancel` applies the role-aware cancellation rules. `POST /orders/:orderId/responses` accepts one response per request and returns the created response.

All order reads and writes must enforce ownership in the query/service layer.

### Public content

- `GET /universities`
- `GET /universities/:slug`
- `GET /content/public`

Support server-side pagination, active filters, and stable sorting. Public endpoints return only published fields.

### Admin

- `GET /admin/orders`
- `GET /admin/orders/:orderId`
- `PATCH /admin/orders/:orderId/assignment`
- `POST /admin/orders/:orderId/status`
- `POST /admin/orders/:orderId/internal-notes`
- `GET /admin/universities`
- `POST /admin/universities`
- `PATCH /admin/universities/:universityId`
- `POST /admin/universities/:universityId/archive`
- Testimonial/client-story create, edit, reorder, publish, and archive routes
- Social-link edit, reorder, activate, and deactivate routes
- `PATCH /admin/content/:key` only for additional approved content keys
- `GET /admin/audit-logs` with restricted access

Prefer archive/deactivate operations over hard deletion for content referenced by orders.

## 9. Frontend information architecture

### Public routes

- `/` — landing page
- `/universities` — catalog/grid
- `/universities/:slug` — optional detail page once content exists
- `/services` or anchored landing-page services
- `/contact`
- `/login`
- `/register`
- `/verify-email`
- `/forgot-password`
- `/reset-password`

### Client routes

- `/account`
- `/account/orders`
- `/account/orders/new`
- `/account/orders/:orderId`
- `/account/profile`

Unauthenticated order CTA behavior:

1. User clicks “Apply” or “Start Order.”
2. The app stores only a safe intended destination, not form secrets.
3. User signs in or registers and verifies email.
4. User returns to the new-order flow.

The API remains the source of truth: even if the frontend route guard is bypassed, unauthenticated or unverified requests cannot create an order.

### Admin routes

- `/admin`
- `/admin/orders`
- `/admin/orders/:orderId`
- `/admin/universities`
- `/admin/content`
- `/admin/testimonials`
- `/admin/audit` (optional UI in MVP, data capture required)

## 10. Admin dashboard requirements

### Order list

- Summary cards by status.
- Search by order reference, client name, email, or phone.
- Filters for status, service, university, date range, and assigned admin.
- Sort by created date, updated date, and priority if priority is later added.
- Server-side pagination.
- Clear empty, loading, and error states.
- Responsive table on wide screens and card/list view on narrow screens.

### Order detail

- Client profile and contact information.
- Submitted order data.
- Current status and complete status timeline.
- Valid next-status actions only.
- Internal notes separated visually and technically from client-visible messages.
- Assignment to an admin.
- Audit metadata.
- File/document area only if uploads are approved as part of scope.

### Content management

- University create/edit/archive.
- Image upload with file type, size, and dimension validation.
- Arabic, English, and Turkish fields displayed together to reduce missing translations.
- Preview before publish.
- Active/featured controls and explicit display ordering.
- Prevent deletion of records referenced by orders.

## 11. University catalog redesign

Replace the current generated list with a responsive catalog:

- Grid target: one column on small phones, two on larger phones/tablets, three on laptops, four on wide screens where card width remains readable.
- Card fields: optimized logo, localized name, city, optional badges, and detail/action link.
- Text search by localized university name.
- Filters for city and featured/active properties; add program/language filters only when data exists.
- Stable sorting and meaningful empty state.
- Server pagination or “load more” once the catalog grows; the current 41 records can initially load in one request if payloads stay small.
- Image aspect-ratio container to prevent layout shift.
- Responsive image formats and local fallback image.
- Keyboard-accessible cards and controls.
- Shareable query parameters for filters where useful.

Migrate the existing 41 university records through a reviewed seed script after renaming and optimizing the malformed asset filenames. *(Status: seed migrated all 41 records; filename renaming/optimization was deferred — the seeded imageUrl values 404; now a Phase 6.1 blocking defect.)*

## 12. Responsive and accessibility requirements

Build mobile-first and test at content-driven breakpoints rather than targeting specific device brands.

Required checks:

- No horizontal overflow at 320 CSS pixels.
- Navigation usable by keyboard and touch.
- Dialogs, dropdowns, and menus trap/restore focus correctly when applicable.
- Forms have labels, field-level errors, summaries, and visible focus styles.
- Touch targets are comfortably sized and separated.
- Tables switch to a usable compact presentation on small screens.
- RTL and LTR layouts are both tested, including icons and directional spacing.
- Text remains readable at 200% zoom.
- Images have useful alternative text or are marked decorative.
- Color contrast meets WCAG AA targets.
- Respect reduced-motion preferences; AOS-style animation must not block content.
- Test current Chrome, Firefox, Safari/WebKit, and Edge through Playwright where practical.

Core viewport test matrix:

- 320 × 568
- 360 × 800
- 390 × 844
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 900
- One ultra-wide viewport such as 1920 × 1080

## 13. Security, privacy, and operational baseline

### API and application security

- Validate every request at the API boundary.
- Centralized error handling with safe production responses.
- Security headers through Helmet plus an explicit Content Security Policy.
- Strict CORS allowlist if the deployment is cross-origin.
- CSRF defense for cookie-authenticated mutations.
- Rate limits for authentication, OTP, order creation, and expensive searches.
- Parameterized database access through the ORM; no string-built SQL.
- Output encoding and no unsanitized admin-provided HTML.
- Request-body and upload size limits.
- Production HTTPS only.
- Secrets stored outside Git and validated on startup.
- Dependency and secret scanning in CI.
- Structured logs with request IDs and redaction of passwords, cookies, OTPs, tokens, and sensitive client data.

### Privacy and business controls

- Define what personal data an order needs before collecting it.
- Publish privacy/terms/consent copy appropriate to the business jurisdictions.
- Define data retention and account/order deletion handling.
- Restrict admins to the minimum necessary permissions; add finer-grained admin roles later if staff responsibilities differ.
- Automated database backups with a tested restore procedure.
- Record consent before publishing a client testimonial/photo.
- Do not email sensitive documents or include sensitive order data in notification emails.

### File uploads

Document uploads are a likely future need but materially expand risk and cost. If required for MVP:

- Store files in private object storage, never in the Git repository or database blobs.
- Use signed upload/download URLs.
- Validate size, extension, MIME type, and file signature.
- Add malware scanning or quarantine before staff access.
- Enforce order ownership and admin authorization for every download.
- Define retention and deletion behavior.

Uploads are outside the confirmed first-release scope. Use `WAITING_FOR_CLIENT` and structured text responses when staff need more information.

## 14. Migration strategy

The public site should not disappear while the application is being built.

1. Preserve the current static site and assets as the visual/content reference.
2. Scaffold the new monorepo without deleting the existing page until parity is verified.
3. Move existing copy into typed localized content files.
4. Rename and optimize image assets with a recorded old-to-new mapping.
5. Seed the 41 universities into PostgreSQL.
6. Recreate the public landing page in React with matching content and improved responsiveness.
7. Replace the Google Apps Script form only after the new auth/order flow is complete.
8. Deploy to staging and run content, mobile, accessibility, and order-flow acceptance tests.
9. Prepare DNS/deployment cutover with rollback instructions.
10. Keep the previous static deployment available for rollback until production is stable.

SEO continuity requirements include title/description metadata, canonical URLs, sitemap, robots policy, social metadata, image alt text, stable public paths, and redirects for any changed URLs.

## 15. Delivery phases

Estimates below are rough focused-development days for one developer after requirements are approved. They are planning ranges, not commitments, and exclude delays for content, email/hosting accounts, and business feedback.

### Phase 0 — Decisions and project contract (1–2 days)

Deliverables:

- Record `Application Request` as the customer-facing term and the confirmed four order fields.
- Record the current five specialization options and three-language labels.
- Record `mostafa.ahmed.abuhamed@gmail.com` as the bootstrap admin.
- Record document uploads as outside the first release.
- Adopt the provisional status workflow and flag it for business-owner confirmation.
- Flag hosting verification for completion before staging deployment.
- Adopt Resend provisionally and flag its account/DNS setup for production OTP testing.
- Confirm acceptance criteria from this plan.
- Convert approved work into GitHub issues/milestones.

Exit criteria: no unresolved decision blocks the initial database schema, authentication flow, or local Phase 1 work. External flags remain visible with deadlines before staging/production.

### Phase 1 — Foundation and CI (2–4 days)

Deliverables:

- TypeScript workspace with `web`, `api`, and shared contracts.
- React/Vite and Express applications running locally.
- PostgreSQL/Prisma setup and initial migration.
- Environment validation and `.env.example` without secrets.
- Formatting, linting, type checking, tests, and production builds.
- GitHub Actions CI and PR template.
- Health/readiness endpoints and structured logging foundation.
- Initial deployment skeleton for staging.

Exit criteria: a clean clone can install, start, test, and build from documented commands; CI passes.

### Phase 2 — Authentication and authorization (4–7 days)

Deliverables:

- User, profile, session, verification, and audit models.
- Client registration, email OTP verification/resend, login, logout, and session restore.
- Password reset.
- Admin bootstrap/invite path.
- Client/admin authorization middleware.
- Rate limits, CSRF protection, secure cookie policy, and auth audit events.
- Unit, integration, and end-to-end auth tests.

Exit criteria: unauthorized, unverified, client, and admin behaviors are proven by automated tests.

### Phase 2.1 — Authentication hardening (3–5 days)

This required gate runs before Phase 3. It turns the initial authentication implementation into a maintainable and production-oriented subsystem.

Deliverables:

- Split authentication into account, challenge, session, audit, repository, and email-provider responsibilities.
- Replace string-thrown errors with typed application errors and centralized API error handling.
- Introduce repository and email-provider interfaces, with Prisma, Resend, and development implementations selected by the composition root.
- Fix OTP attempt handling, duplicate-account races, session activity tracking, audit events, production environment checks, and structured/redacted logs.
- Apply CSRF requirements to every authenticated mutation and document the required `X-CSRF-Token` header.
- Add unit tests for service behavior and PostgreSQL integration tests for the complete registration, verification, login, session, logout, and reset flows.
- Run the integration suite in GitHub Actions using an isolated PostgreSQL service and committed Prisma migrations.
- Define Redis-backed rate limits and a durable email outbox as deployment-phase integrations only; do not provision either until hosting is selected.

Exit criteria: formatting, linting, type checks, unit tests, PostgreSQL integration tests, and production builds pass; all authentication failures use the standard error response shape.

API note: every authenticated, cookie-based mutation must send `X-CSRF-Token` with the same value as the readable CSRF cookie issued at login. Add `requireAuth` and `requireCsrf` to all future authenticated mutation routes.

### Phase 3 — Public React site and university catalog (4–7 days)

Deliverables:

- Responsive React recreation of all current public sections.
- Arabic RTL plus English/Turkish LTR direction and localized content architecture.
- Optimized asset migration.
- University seed data and public API.
- Responsive catalog with card grid, search, filters, loading/error/empty states.
- SEO, accessibility, and browser baseline.

Exit criteria: public-site content parity is approved and catalog works across the viewport matrix.

### Phase 4 — Client order workflow (4–7 days)

Deliverables:

- Final order schema and status-history model.
- Authenticated, verified-only order creation.
- Draft, submit, detail, list, requested-information, and allowed cancellation flows.
- Client order dashboard and timeline.
- Ownership enforcement and concurrency-safe updates.
- Notifications for successful submission and important status changes.
- Integration and end-to-end tests.

Exit criteria: a client cannot view another client's order or create an order without a verified session; the full order happy path and critical failures pass.

### Phase 5 — Admin order dashboard (5–8 days)

Deliverables:

- Admin metrics and paginated order list.
- Search, sorting, and filters.
- Order detail, assignment, valid status transitions, internal notes, and client-visible messages.
- Sign-up, email-verification, login, password-reset, and session-aware protected-route pages.
- Localized authentication forms with field validation, safe errors, loading states, and redirect-back behavior.
- Public “Enroll now” / “Application Request” section at the end of the landing page.
- Signed-out enrollment state: dimmed, non-interactive form with a lock icon, explanation, and login button.
- Signed-in verified-client state: the same enrollment form becomes directly usable without a second page.
- Signed-in unverified-client state: submission remains locked and provides the email-verification path.
- Arabic, English, and Turkish localization for the enrollment section, lock state, CTA, validation errors, and specializations.
- Audit records and notification triggers.
- Responsive admin presentation.
- Permission and workflow tests.

Exit criteria: admins can process an order from submission to a terminal state with a complete history and no client-data isolation failure; authentication pages and the session-aware enrollment experience work across the supported languages.

### Phase 5.1 — Public and operations acceptance checkpoint (1 day)

Deliverables:

- TestSprite browser testing for public navigation, catalog search/filtering, language direction, mobile menu, external links, client order flow, and responsive admin views.
- TestSprite backend testing for health, authentication, sessions, CSRF, client order ownership, and admin order authorization/workflows.
- Record and fix confirmed defects before Phase 6 begins.

Exit criteria: TestSprite evidence is recorded; no critical public, client, or admin usability defect remains.

#### TestSprite execution status and resume conditions

TestSprite has successfully analyzed this repository, generated the standardized PRD, and generated both frontend and backend test plans. The generated backend plan is stored at `testsprite_tests/testsprite_backend_test_plan.json`.

The local execution attempts are currently treated as **blocked acceptance evidence**, not as application failures, for these reasons:

- The TestSprite MCP planning call prepares a terminal handoff; the returned CLI command must be executed as a separate step.
- TestSprite execution depends on a cloud tunnel reaching the local server. The previous run recorded tunnel stream aborts, closed control WebSockets, local-port timeouts, and failed external-resource connections.
- This workspace has separate React (`4173`) and Express (`4000`) servers, so the correct server and endpoint must be selected for each test type.
- Backend flows require PostgreSQL, seeded client/admin accounts, session state, and a testable OTP delivery path. Local PostgreSQL/Docker is unavailable in the current environment, and Render/Neon have not been connected yet.

Do not spend additional TestSprite execution credits on the full stateful suite until the hosting flag is resolved. After Render and Neon are connected, resume in this order:

1. Deploy the Express API to a Render staging service and connect it to a Neon PostgreSQL database.
2. Apply reviewed Prisma migrations with `prisma migrate deploy` and seed non-production test accounts/data.
3. Configure the development/test email provider or an approved test mailbox for OTP retrieval; configure Resend and DNS separately for production.
4. Run API health/readiness smoke tests, then execute the TestSprite backend plan against the stable staging target.
5. Execute the frontend plan against the deployed React site/API combination, record failures, and fix only confirmed defects.
6. Re-run the application test suite, builds, and TestSprite evidence before starting Phase 6.

### Phase 5.2 — Deep review findings and remediation (blocking)

A full five-lane review (goal/constraint verification, hands-on QA, code quality, security, context mining) of all components and services was run against the phase-05 staging state. The toolchain is fully green (typecheck, lint, test, and build all pass; 38 tests), but runtime and spec review surfaced the defects below. These are **blocking** for the Phase 6 exit gate and must be resolved and re-verified before content management begins.

Deliverables:

- Fix the P0 public-navigation defect and add a regression test.
- Remove live credentials and harden the affected endpoints.
- Complete the client order tracking workflow in the primary UI.
- Close the remaining security and i18n gaps.

Exit criteria: all P0/P1 findings below are fixed, covered by a regression test where applicable, and the full toolchain re-passes.

#### P0 — must fix first

- **Primary navigation is broken.** `apps/web/src/main.tsx` uses `HashRouter`, but the public nav uses bare anchors (`href="#home"`, `#services`, `#universities`, `#steps`, `#contact`). Every nav click navigates the router to a non-existent route and renders "Page not found" on desktop and mobile. Fix: switch to `BrowserRouter` (with a Vite SPA fallback) or convert the anchors to `#/…` routes with explicit scroll handling. Add a component test that clicks a nav link and asserts the target section renders.
- **Live credentials in `.env`.** The Neon PostgreSQL credential and Resend API key present in `apps/api/.env` must be rotated immediately and never committed, archived, or bundled. Ship placeholders in `.env.example` only.

#### P1 — high priority

- **Client order tracking is half-built.** The API fully supports `GET /orders/:id`, `POST /orders/:id/cancel`, and `POST /orders/:id/responses`, but the frontend only lets a client submit and list orders. Add order detail/timeline, cancel, and respond-to-requested-information UI, and remove the drifted duplicate workflow on `/applications` (second API client, duplicated CSRF handling, and an order form shown to unverified users that the backend rejects).
- **Login is not CSRF-protected.** The `/auth/login` handler changes the session without CSRF validation, enabling login-CSRF/account confusion. Require a pre-session CSRF token for login or verify `Origin`/`Referer`.
- **Rate limiting is auth-only.** Order creation and admin/expensive-search endpoints are unlimited. Apply bounded rate limits to order creation and other abuse-prone routes.
- **Localization is incomplete.** Hardcoded English strings remain in `ApplicationPage.tsx`, the primary-navigation accessible label, admin fallbacks, and all Resend email bodies in `email.provider.ts`. Localize every user-facing string across ar/en/tr.
- **Registration consent is unconditional.** `AuthPages.tsx` submits `consentAccepted: true` regardless of the checkbox; submit the actual value and reject unchecked consent.

#### P2 — medium priority

- **Catalog search is locale-fragile.** Typing plain `istanbul` returns no results because university names use Turkish dotted `İ` (U+0130) and `toLocaleLowerCase()` mismatches. Normalize with NFD + diacritic stripping or apply a consistent locale on both sides.
- **Admin order-list filters incomplete.** Only status + search + pagination exist; add service, university, date-range, and assigned-admin filters plus date sorting per §10.
- **Missing endpoints/routes.** `POST /auth/logout-all`, `GET /me`, and `PATCH /me` (§8) are unimplemented, blocking any `/account/profile`. Client `/account/*` routes and public `/universities`/`/contact` (§9) are collapsed or absent.
- **`getSession()` masks outages.** Network/server failures are converted to `null`, so an unreachable API reads as "logged out" and redirects to login. Distinguish `401` from transport/server errors.
- **Admin mutation error handling.** `saveStatus`/`saveNote` await `mutateAsync` without catching, leaking unhandled rejections; the resend-verification error is silent.

#### Deferred to Phase 6 (not blocking here)

- Admin content management: `/admin/universities`, `/admin/content`, `/admin/testimonials`, and the University/Testimonial/SocialLink models remain Phase 6 scope per §16.

#### External blockers (not code defects)

- Resend DNS `not_started` (GoDaddy DKIM/SPF) blocks real OTP/order email delivery.
- Production hosting unresolved (private repo cannot use free GitHub Pages).
- TestSprite execution deferred until Render + Neon staging is available.

### Phase 6 — Content management (4–7 days)

Deliverables:

- University create/edit/archive, image management, ordering, and preview.
- Typed management for approved landing-page content.
- Translation completeness validation.
- Safe publication workflow and audit events.
- Testimonial/client-story create, edit, ordering, publishing, archiving, and consent tracking.

Exit criteria: an admin can update approved content without a deployment and cannot inject executable markup or break required localized fields.

### Phase 6.1 — Deep review findings and remediation (blocking)

A five-lane review found the Phase 6 toolchain green but identified content correctness findings that block the Phase 7 exit gate until fixed and re-verified.

Deliverables:

- Repair content contracts, archive/restore semantics, atomic audit records, catalog assets, and managed-content UI states.
- Preserve route and response compatibility while splitting the content contracts, services, and UI sections.

Exit criteria: P0/P1 items are resolved with regression coverage and the full quality gate passes.

#### P0

- **Resolved:** vendored university logos replace broken root-hosted seed URLs.
- **Resolved:** testimonial publish PATCH may rely on stored consent, while create-level consent remains enforced.
- **Resolved:** literal `true`/`false` list filters prevent draft-filter inversion.

#### P1

- **Resolved:** contact draft edits are controlled and mutation failures/pending states are visible.
- **Resolved:** archive/restore preserves publication/visibility state; testimonials have an admin restore route.
- **Resolved:** content mutations and audit records execute in one transaction.

#### P2

- **Resolved:** contracts, social/contact services/routes, and managed-content UI are separated by aggregate; shared content helpers centralize audit, pagination, and route params.
- **Resolved:** contact keys and content client types are single-sourced from contracts.

#### Non-blocking (owner-input / follow-up)

- Real Arabic/English/Turkish university names and summaries remain owner-provided; X/LinkedIn confirmation remains owner-provided.
- URL length and contact-format validation remain follow-up hardening items.

#### External blockers (not code defects)

- University-logo source retrieval depends on the original repository remaining accessible; the owner supplies source assets if it is unavailable.

### Phase 7 — Hardening, staging acceptance, and launch (4–7 days)

Deliverables:

- Full end-to-end regression suite.
- Responsive, RTL/LTR, accessibility, and performance pass.
- Security review of auth, authorization, CSRF, rate limits, headers, logs, and secrets.
- Database backup/restore test.
- Monitoring, error reporting, and uptime checks.
- Production migration and rollback runbook.
- Staging user acceptance test and signed-off content.
- Production deployment and post-launch smoke test.

Exit criteria: launch checklist passes, rollback is tested/documented, and production monitoring is active.

### Total rough range

Approximately **28–49 focused developer-days** for the described full scope without document uploads, advanced analytics, payments, or a general-purpose CMS. The MVP boundary avoids these larger additions while retaining the confirmed university, testimonial, and social-link management.

## 16. Recommended MVP boundary

Include in MVP:

- Public responsive site and university catalog.
- Client registration, email verification, login, password reset, and secure sessions.
- Verified-client order creation and tracking.
- Admin order list/detail/status/notes.
- Admin management for universities, client testimonials, and social-media links.
- Arabic, English, and Turkish support.
- Audit logging, backups, CI, staging, and essential monitoring.

Defer unless the business confirms immediate need:

- University program and tuition database.
- Document uploads.
- Live chat.
- Online payments.
- Complex admin permission matrix.
- Analytics dashboard beyond operational order counts.
- General drag-and-drop page builder.
- SMS or WhatsApp OTP.

## 17. Testing strategy

### Unit tests

- Validation schemas.
- OTP generation/verification rules.
- Password/session helpers.
- Order state transitions.
- Permission policy functions.
- Localization/content mapping utilities.

### API integration tests

- Registration, verification, login, logout, reset, rate limits, and expiry.
- Role and order-ownership enforcement.
- Order lifecycle and invalid transitions.
- Admin filters/pagination and content mutation.
- Database constraints and transaction rollback.

Use a separate test database and apply committed migrations before the suite. GitHub Actions runs the authentication integration suite against an isolated PostgreSQL service; local Docker remains optional.

### Frontend component tests

- Form validation and accessible errors.
- Auth guards and pending-session behavior.
- Catalog filters and empty states.
- Order timeline/status controls.
- RTL/LTR rendering-sensitive components.

### End-to-end tests

Critical paths:

1. Register → receive test OTP → verify → create and submit order.
2. Unverified user is blocked from ordering.
3. Client cannot access another client's order.
4. Admin reviews order → changes status → client sees updated timeline.
5. Admin creates/edits/archives a university → public catalog reflects publication state.
6. Password reset and session invalidation.
7. Mobile navigation, language switching, and responsive dashboard flows.

## 18. GitHub workflow

Use short-lived branches and pull requests against a protected `main` branch. A separate long-lived `develop` branch is unnecessary unless the deployment platform requires it.

### Branches

- `main` is always releasable and maps to production.
- Staging deploys from pull requests or merged `main`, depending on provider capabilities.
- Codex-created branches use the required prefix, for example:
  - `codex/phase-01-foundation`
  - `codex/feat-email-verification`
  - `codex/feat-admin-orders`
  - `codex/fix-mobile-navigation`

### Pull requests

- One coherent feature or migration per PR.
- Open a draft PR early for large phases.
- Include purpose, screenshots for UI changes, test evidence, migration notes, security impact, and rollback notes.
- Keep schema changes and the code that uses them in the same deployable PR.
- Require CI before merge: formatting, lint, type check, unit/integration tests, frontend/API builds, and migration validation.
- Require review before merge once another reviewer is available.
- Squash merge by default for a clear main history; preserve separate commits only when they add review or rollback value.
- Delete merged branches remotely.

### Commit convention

Use Conventional Commits:

- `feat(auth): add email verification challenge`
- `feat(orders): enforce verified-client submission`
- `fix(web): prevent mobile catalog overflow`
- `test(api): cover invalid order transitions`
- `docs(deploy): add production rollback runbook`
- `chore(ci): add pull request quality checks`

### Issue and milestone structure

- One milestone per delivery phase.
- Parent issue for each feature area.
- Small issues with acceptance criteria and explicit dependencies.
- Labels such as `area:web`, `area:api`, `area:database`, `security`, `accessibility`, `migration`, `blocked`, and `needs-decision`.
- Link every PR to its issue and update the plan when scope changes.

### Release flow

1. Merge only green, reviewed PRs.
2. Deploy to staging and run smoke tests.
3. Apply production database migrations through CI using `prisma migrate deploy`, never an ad-hoc local production command.
4. Deploy the application.
5. Run production smoke tests and monitor errors.
6. Tag stable releases using semantic versions once the first production version is established.
7. Roll back application code when needed; database changes require forward-compatible migrations and an explicit recovery plan.

## 19. Definition of done

A feature is done only when:

- Acceptance criteria are met.
- Authorization is enforced on the API, not only the UI.
- Input validation and error states are implemented.
- Tests cover the happy path and critical failure/permission paths.
- RTL/LTR and responsive behavior are checked when relevant.
- Accessibility is reviewed for changed UI.
- Database migrations and rollback/compatibility implications are documented.
- Logs do not expose secrets or personal data.
- Documentation and `.env.example` are updated.
- CI passes and the PR contains test evidence.
- The feature is verified in staging.

## 20. Risks and missing decisions to resolve before implementation

### Confirmed decisions

1. An order contains full name, verified email address, phone number, and specialization selected from a dropdown.
2. The provisional workflow is `NEW → CONTACTED → WAITING_FOR_CLIENT/IN_PROGRESS → COMPLETED`, with `REJECTED` and `CANCELLED` alternatives. The business owner will approve or adjust it.
3. Document uploads are outside the first release unless the business owner later requests them.
4. The website and managed content support Arabic, English, and Turkish.
5. Admin-managed content includes universities, client testimonials, and social-media links.
6. Existing contact and social-media details are confirmed as correct and ready to seed.
7. Resend is the recommended initial transactional-email provider.
8. The specialization dropdown reuses the current five options: Medicine, Dentistry, Pharmacy, Engineering, and Business Administration, with approved working translations recorded in the data model section.
9. The bootstrap admin email is `mostafa.ahmed.abuhamed@gmail.com`; future admin creation is invite-only by default.
10. Testimonials support a client name, quote, and optional photo. A testimonial cannot be published until consent is recorded.
11. Use a provisional retention default of 12 months for rejected/cancelled orders and 3 years for completed orders, subject to later business/legal confirmation.

### Flagged external confirmations

These items are intentionally flagged and do not prevent local foundation work:

1. **`[FLAG: HOSTING]`** Identify the hosting company and plan/control-panel before staging deployment. Verify persistent Node.js support, environment variables, HTTPS/reverse-proxy configuration, PostgreSQL availability or external database access, deployment method, backups, and resource limits.
2. **`[FLAG: BUSINESS OWNER]`** Approve or revise the provisional order statuses, cancellation rules, and whether terminal orders may be reopened.
3. **`[FLAG: BUSINESS/LEGAL]`** Confirm the provisional retention periods and final privacy-policy wording before production launch.
4. **`[FLAG: CONTENT]`** Collect approved Arabic, English, and Turkish testimonial content and consent evidence before publishing the “Our Clients” section with real people.
5. **`[BLOCKER: EMAIL/DNS]`** Resend is configured in the API and its key is valid, but `aboutalebeducation.com` is `not_started` in Resend. The GoDaddy account owner must either grant DNS access or add the Resend-provided DKIM, SPF, and return-path records. This blocks real OTP/order email delivery and production email testing.
6. **`[BLOCKER: FRONTEND HOSTING]`** The repository is private, so it cannot be published through free GitHub Pages. Before staging, the owner must either approve making the repository public or select and configure another static-hosting provider that supports private repositories.
7. **`[FLAG: TESTSPRITE/STAGING]`** Defer full TestSprite execution until a stable staging API/site is available with Render + Neon, database migrations applied, seeded test accounts, and a deterministic OTP test path. TestSprite plan generation is complete; local execution evidence is currently inconclusive because of tunnel/network and missing stateful dependencies.
8. **`[FLAG: CONTENT/ASSETS]`** University logo source assets must be retrieved from the original repository before vendoring; the owner supplies the set if unavailable.
9. **`[FLAG: CONTENT]`** Real Arabic/English/Turkish name and summary translations and X/LinkedIn confirmation are owner-provided.

### Provisional privacy and retention baseline

Until the business owner confirms a formal policy:

- Collect only the four approved order fields.
- Add a privacy-policy page and require a clear consent checkbox before order submission.
- Restrict order data to the owning client and authorized admins.
- Allow clients to request account/data deletion, subject to legitimate business or legal retention needs.
- Use 12 months provisionally for rejected/cancelled orders and 3 years for completed orders, then replace these defaults if the owner/legal review requires different periods.
- Do not publish client names, quotes, or photos without recorded consent.
- Do not use order or authentication data for marketing without separate explicit consent.
- Treat these as product/security defaults, not legal advice; the business owner should obtain jurisdiction-specific legal review if required.

### Important risks

- Email OTP deliverability can fail even when application code is correct; provider setup and domain records must happen early.
- Authentication and admin content management make this a security-sensitive production system, not a simple static-site conversion.
- A single giant rewrite creates cutover risk; preserve the current site until React parity and staging acceptance.
- The malformed asset-filename migration risk is remediated in Phase 6.1 with a vendored slug-to-asset mapping.
- SPA-only public rendering can weaken SEO if metadata and crawlability are neglected. If organic search becomes a major acquisition channel, evaluate server rendering or prerendering before finalizing the frontend architecture.
- Admins changing records concurrently can overwrite each other. Add optimistic concurrency (`updatedAt`/version checks) for orders and managed content.
- Unbounded admin lists will become slow; implement server-side pagination and indexes from the start.
- Order notifications can be duplicated or lost if email is sent inside request transactions. Introduce a durable outbox/job strategy when notification reliability becomes business-critical.
- Hard-deleting universities or users can break historical orders. Prefer archive/status fields and explicit retention procedures.

## 21. Suggested additions not in the original request

These should be treated as part of the core build, not optional polish:

- Client order-history page, because requiring sign-in without giving clients visibility creates little value.
- Password reset and session/device logout.
- Admin internal notes and audit log.
- Search, filters, sorting, and pagination in the admin dashboard.
- Status history/timeline rather than storing only the latest status.
- Notifications for order submission and important status changes.
- Staging environment, automated backups, error monitoring, and rollback runbook.
- Accessibility and RTL/LTR acceptance criteria.
- Privacy/consent and data-retention decisions.

Recommended later enhancement:

- Strong MFA for admins using TOTP or WebAuthn, separate from client email verification.

## 22. Reference guidance

- React installation guidance notes that Create React App is deprecated and documents framework/from-scratch options: https://react.dev/learn/installation
- Express production guidance covers error handling, production configuration, restart strategy, proxies, and reliability: https://expressjs.com/en/advanced/best-practice-performance.html
- OWASP authentication guidance: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- OWASP session guidance recommends secure, HTTP-only, same-site cookies and warns against storing auth tokens in browser storage: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- OWASP password storage guidance recommends Argon2id: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- OWASP MFA/OTP guidance covers short TTL, single use, attempt limits, invalidation, and safe storage: https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html
- Prisma documents separate development and production migration workflows and recommends production migrations through CI: https://docs.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production
- Resend transactional-email pricing and limits: https://resend.com/docs/knowledge-base/what-is-resend-pricing

## 23. Approval checkpoint

The plan is complete. Implementation may begin with **Phase 1 — Foundation and CI** while the external blockers remain visible. The GoDaddy owner must resolve Resend DNS verification before real email testing, and the frontend hosting decision must be resolved before staging deployment. Business-owner status approval, privacy/retention confirmation, testimonial consent, and email DNS setup must be resolved before production launch. Authentication and database feature work should not be mixed into the initial scaffold PR.
