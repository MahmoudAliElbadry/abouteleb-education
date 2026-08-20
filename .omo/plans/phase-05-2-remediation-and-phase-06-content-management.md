# phase-05-2-remediation-and-phase-06-content-management - Work Plan

## TL;DR (For humans)

**What you'll get:** The public site will navigate with normal URLs, clients can track their own applications, and staff get reliable order tools. Staff will also manage the university catalog, approved client stories, contact details, and social links from the admin area.

**Why this approach:** It first fixes security, routing, and existing workflow defects, then adds content management using the project’s current Prisma, Express, React Query, localization, and admin conventions.

**What it will NOT do:** No file uploads, generic page builder, university selection in an application, order-to-university relationship, testimonial consent timestamp/evidence requirement, new i18n/form/styling framework, or public content editing.

**Effort:** Large. **Risk:** Medium-high: routing/deployment, credential rotation, and a database migration require staging validation.

**Locked decisions:** BrowserRouter plus Render Static Site rewrites; URL-only image assets; contact/social-only managed copy; no Order–University relation; boolean testimonial consent confirmation before publish. Boolean-only consent is an explicit user-approved deviation from the broader consent-record recommendation.

---

## Scope

### Must have
- Phase 5.2 remediation: BrowserRouter migration, complete public routes/navigation, canonical enrollment, Turkish-safe search, consent/i18n repair, client-owned order tracking, login CSRF, route limits, credential remediation, and admin-order filters/states.
- Phase 6: protected CRUD for universities, testimonials, social links, and four fixed contact keys; public rendering and migration from the static university catalog.
- Prisma migration, contracts, server/API tests, web component tests, staging/deployment verification, and audit events for all admin mutations.

### Must NOT have
- No image/document upload or media library; accept HTTPS URLs only.
- No arbitrary content keys or page/body rich-text CMS.
- No university selection or reference on `Order`, and no admin order-by-university filter.
- No publication of a testimonial when `consentConfirmed` is false.
- No unlocalized user-facing strings in Arabic, English, or Turkish surfaces changed by this work; `/me`, `PATCH /me`, logout-all, and account-profile UI are explicitly deferred.

## Verification strategy

Tests-after, agent-executed. Each task stores command output and relevant screenshots/HTTP transcripts under `<attemptDir>/task-<N>-phase-05-2-phase-06.*`. Use Vitest, Testing Library, Supertest, Prisma validation/migration status, and production-build checks. Integration tests remain gated by `RUN_INTEGRATION_TESTS=true`. Final gates: `npm run format:check && npm run lint && npm run typecheck && npm run test && npm run build`.

## Execution strategy

### Parallel execution waves
- **Wave 1 — remediate foundations:** 1 routing/deployment, 2 public navigation/localization/search, 3 enrollment/consent, 4 client orders, 5 auth/rate-limit/secret remediation.
- **Wave 2 — complete existing admin behavior:** 6 admin API filters, 7 admin UI states/filters, 8 remediation test suite and staging security verification.
- **Wave 3 — content data/API:** 9 schema/migration/seed, 10 contracts, 11 university API, 12 testimonial API, 13 social/contact API.
- **Wave 4 — content UI:** 14 admin content shell/university CRUD, 15 testimonial/social/contact CRUD, 16 public catalog migration, 17 public stories/contact/social rendering, 18 web/API content test completion.

### Dependency matrix
| Todo | Depends on | Blocks |
| --- | --- | --- |
| 1 | - | 2, 16, deployment verification |
| 2 | 1 | 18 |
| 3 | existing auth client | 18 |
| 4 | orders API | 18 |
| 5 | auth middleware/config | 8 |
| 6 | existing admin-orders contracts | 7, 8 |
| 7 | 6 | 8 |
| 8 | 1-7 | final verification |
| 9 | - | 10-18 |
| 10 | 9 | 11-18 |
| 11-13 | 9, 10 | 14-18 |
| 14-15 | 11-13 | 18 |
| 16-17 | 11-13, 1 | 18 |
| 18 | 2-17 | final verification |

## Todos

- [ ] 1. Replace hash routing and establish SPA fallback deployment configuration.
- **Do:** Change `apps/web/src/main.tsx` to `BrowserRouter`; update internal links/redirects, including the existing `/#enroll` login redirect, to pathname URLs. Add Render Static Site configuration that serves `/index.html` with 200 for `/*` while preserving API/static assets. Test direct routing with routes already available after this task (`/`, `/login`), and document the Render rewrite rule.
  - **Must NOT:** Retain hash-based public URLs, intercept API routes, or add a router library.
  - **References:** `apps/web/src/main.tsx`, `apps/web/src/App.tsx`, `README.md`, `DEVELOPMENT_PLAN.md` Phase 5.2.
- **Acceptance / QA:** `npm run build -w @abou/web` succeeds; tests render `/` and `/login` directly; when the external Render service exists, staging requests to a deep URL return the app and `/api/v1/health` remains API-served. Before then, record a BLOCKED external check plus local build/router evidence.
  - **Commit:** `fix(web): migrate public routing to browser history`

- [ ] 2. Repair public navigation, locale coverage, catalog search, and route-level failure states.
- **Do:** In `apps/web/src/App.tsx` restore every header/footer CTA to an approved normal URL route or existing anchored section; do not add unapproved `/about` or `/faq` routes. Normalize catalog search with NFD decomposition, combining-mark removal, Turkish locale folding, and dotless-`ı` normalization. Move all added text into the existing `ar`/`en`/`tr` copy structure and add accessible not-found/error states.
  - **Must NOT:** Add a translation framework or silently transliterate Turkish `İ/ı`.
  - **References:** `apps/web/src/App.tsx`, `apps/web/src/data/universities.ts`, `apps/web/src/App.test.tsx`.
- **Acceptance / QA:** Web tests prove every nav href resolves to a route or anchor; Turkish fixtures match `İstanbul`, `istanbul`, and `Istanbul`; tests render each changed error/not-found state in three locales.
  - **Commit:** `fix(web): restore public navigation and localized catalog behavior`

- [ ] 3. Consolidate application flow and enforce consent behavior.
- **Do:** Make `apps/web/src/features/enrollment/EnrollmentSection.tsx` the single public application implementation; make `apps/web/src/ApplicationPage.tsx` delegate to it or remove the duplicate form only after preserving its supported route. Add required enrollment consent and extend the order contract only if persistence requires it. Fix `apps/web/src/features/auth/AuthPages.tsx` to submit the actual registration checkbox rather than hardcoded `consentAccepted: true`; reject unchecked consent. Preserve signed-out, unverified, and verified states with localized success/validation/failure views.
  - **Must NOT:** Change order fields, add a university field, or weaken verification before order creation.
  - **References:** `apps/web/src/ApplicationPage.tsx`, `apps/web/src/features/enrollment/EnrollmentSection.tsx`, `packages/contracts/src/index.ts`, `apps/api/src/modules/orders`.
  - **Acceptance / QA:** Component tests cover all three session states, valid submit, rejected submit, duplicate-page route behavior, and disabled consent/submit behavior.
  - **Commit:** `fix(enrollment): use one verified and consent-aware application flow`

- [ ] 4. Add protected client order tracking.
  - **Do:** Add a client-ownership-scoped read route/service in `apps/api/src/modules/orders`, returning only the authenticated user’s order summary, current status, timeline, and pagination metadata. Add typed client/query code plus a `RequireAuth`-protected `/account/orders` page under `apps/web/src/features/`; include localized loading, empty, error, and retry states and link it from the authenticated account UI.
  - **Must NOT:** Expose admin notes, other clients’ data, or mutable order actions outside the existing state rules.
  - **References:** `apps/api/src/modules/orders/orders.routes.ts`, `apps/api/src/modules/orders/orders.service.ts`, `apps/web/src/features/auth`, `apps/web/src/features/admin-orders/admin-client.ts`.
  - **Acceptance / QA:** Supertest verifies unauthenticated rejection and cross-user isolation; web tests cover populated/empty/error views; integration fixtures prove a client receives only their own reference/status history.
  - **Commit:** `feat(client): add owned application tracking`

- [ ] 5. Harden login and sensitive routes; remove credential exposure.
- **Do:** Add pre-session `GET /api/v1/auth/csrf` to issue a CSRF cookie/token, require it on login, and retain current CSRF behavior for authenticated mutations. Add explicit per-IP route limits for login, registration/verification, password reset, order creation, and admin mutations, returning `429`/`Retry-After`. Localize Resend email bodies by recipient/request locale. Rotate root `.env` Neon/Resend values through the external consoles, update examples/docs, and ensure test helpers never print secrets.
  - **Must NOT:** Rate-limit globally in a way that breaks health checks, log raw tokens/passwords, or commit rotated values.
- **References:** `apps/api/src/modules/auth/auth.routes.ts`, `apps/api/src/modules/auth/session.service.ts`, `apps/api/src/modules/auth/email.provider.ts`, `apps/api/src/middleware/auth.ts`, `apps/api/src/app.ts`, root `.env` (inspect without disclosure), `.env.example`.
- **Acceptance / QA:** API tests prove issued-CSRF plus valid login succeeds and login without token fails; rate-limit and email-localization tests pass. Rotation is external: record old-key revocation/new-platform confirmation and a clean `git grep`; do not claim the agent performed console rotation.
  - **Commit:** `fix(security): protect auth and sensitive API routes`

- [ ] 6. Complete admin order filter/query support at the API boundary.
  - **Do:** Extend the existing admin-order list query contract/service/route for the Phase 5.2-approved filters and deterministic sort/pagination; validate query coercion and bounds through Zod; return consistent `{items, total, page, pageSize}` metadata and structured errors.
  - **Must NOT:** Introduce a university filter, accept arbitrary sort fields, or bypass `requireAdmin`.
  - **References:** `apps/api/src/modules/admin-orders`, `packages/contracts/src/index.ts`, `.omo/plans/phase-05-admin-dashboard.md`.
  - **Acceptance / QA:** Unit tests assert correct Prisma `where`/`orderBy`; integration tests cover valid filter, invalid query 400, and client/admin authorization boundary.
  - **Commit:** `fix(admin-orders): complete validated list filters`

- [ ] 7. Complete admin order filtering and resilient UI states.
  - **Do:** Update `apps/web/src/features/admin-orders` to bind every approved filter to URL/query state, preserve pagination reset behavior, and render localized loading, no-results, network-error, and permission-error states with retry. Keep RTL layout and existing client abstraction.
  - **Must NOT:** Add a table/query library or hide API failures as empty data.
  - **References:** `apps/web/src/features/admin-orders/AdminOrdersPages.tsx`, `apps/web/src/features/admin-orders/admin-client.ts`.
  - **Acceptance / QA:** Testing Library tests exercise filter updates, reset, no-results, 400/403/500 responses, and retry; `npm run typecheck -w @abou/web` passes.
  - **Commit:** `fix(admin-orders): finish filters and failure states`

- [ ] 8. Verify the Phase 5.2 remediation release candidate.
  - **Do:** Add/complete focused API and web tests for Todos 1–7, run the root gates, deploy to Render/Neon staging, verify host rewrites and CSRF/rate-limit behavior with non-secret test accounts, then run TestSprite against the staging URL once external configuration is valid.
  - **Must NOT:** Treat a local build as deployment validation or run browser tests with production credentials.
  - **References:** root `package.json`, `README.md`, deployment config from Todo 1.
  - **Acceptance / QA:** Save command and TestSprite output; all root gates pass; staging evidence includes deep-link, client-isolation, admin-filter, and rate-limit checks.
  - **Commit:** `test(release): verify phase 5 remediation flows`

- [ ] 9. Add Phase 6 Prisma models, migration, indexes, and deterministic seed data.
- **Do:** In `prisma/schema.prisma` add tri-locale `University` (`id`, unique `slug`, `nameAr/nameEn/nameTr`, `summaryAr/summaryEn/summaryTr`, `city`, `imageUrl`, optional `websiteUrl`, `featured`, `isPublished`, `archivedAt?`, `sortOrder`, timestamps); tri-locale `Testimonial` (`id`, `clientNameAr/En/Tr`, `quoteAr/En/Tr`, optional `imageUrl`, `consentConfirmed`, `isPublished`, `archivedAt?`, `sortOrder`, timestamps); tri-locale `SocialLink` (`id`, `platform`, `labelAr/En/Tr`, HTTPS `url`, `iconKey`, `isVisible`, `archivedAt?`, `sortOrder`, timestamps); and fixed-key `ManagedContent`. Copy static catalog to a seed-only source first, normalize malformed local image filenames, host them at approved HTTPS URLs, and record the old-path→new-URL mapping. Seed exact existing contact/social values idempotently.
- **Must NOT:** Add `Order.universityId`, `University.type`, testimonial program, JSON page blobs, uploads, or a testimonial consent timestamp/evidence field.
  - **References:** `prisma/schema.prisma`, `prisma/seed.*`, `apps/web/src/data/universities.ts`, `DEVELOPMENT_PLAN.md` Phase 6.
  - **Acceptance / QA:** `npm run db:migrate`, `npm run db:generate`, `npx prisma validate`, and a repeat seed run succeed; migration contains only approved Phase 6 entities/fields.
  - **Commit:** `feat(db): add managed public content models`

- [ ] 10. Define Phase 6 shared contracts and presenters.
- **Do:** In `packages/contracts/src/index.ts` add strict create/update/list schemas and inferred types for every tri-locale field. Require trimmed required text, bounded lengths, safe slug syntax, finite sort order, URL protocol `https:`, fixed contact keys, icon allowlist `whatsapp|facebook|instagram|telegram|x`, and `consentConfirmed: true` whenever testimonial `isPublished: true`. Define public/admin response shapes without ORM leakage.
  - **Must NOT:** Allow arbitrary managed-content keys, insecure URLs, or publish a non-consented testimonial.
  - **References:** `packages/contracts/src/index.ts`, `packages/contracts/src/index.test.ts`, schema from Todo 9.
  - **Acceptance / QA:** Contract tests accept valid URLs/locales and reject http URLs, unknown keys, duplicate/invalid slugs, overlong fields, and publish-without-consent payloads.
  - **Commit:** `feat(contracts): define managed content validation`

- [ ] 11. Implement university public/admin API with archival-safe behavior.
- **Do:** Create or extend `apps/api/src/modules/content/universities.*` with public published list/detail endpoints and admin paginated list/create/read/update/archive/restore endpoints. Enforce unique slug, image URL validation, deterministic `sortOrder`, `requireAuth`/`requireAdmin`/CSRF on mutations, and audit events. Archive sets `archivedAt` and `isPublished=false`; restore clears `archivedAt`; hard delete is absent.
  - **Must NOT:** Add an Order relation or a hard-delete endpoint.
  - **References:** `apps/api/src/modules/admin-orders`, `apps/api/src/middleware/auth.ts`, `apps/api/src/app.ts`, Todos 9–10.
  - **Acceptance / QA:** API tests prove public visibility filtering, admin-only mutations, slug conflict 409, invalid image URL 400, and archived universities disappear publicly but remain recoverable administratively.
  - **Commit:** `feat(content): add managed university API`

- [ ] 12. Implement testimonial API with publication consent guard.
  - **Do:** Add public published-list endpoint and admin CRUD/archive endpoints under `apps/api/src/modules/content`; enforce `consentConfirmed === true` server-side before setting `isPublished`, even if a client bypasses UI; write audit events with testimonial ID and publication transition.
  - **Must NOT:** Accept client-side consent as sufficient, expose unpublished records publicly, or add consent evidence/timestamp fields.
  - **References:** Todos 9–10; admin authorization/audit patterns in `apps/api/src/modules/admin-orders`.
  - **Acceptance / QA:** Tests prove a non-consented publish request is 400/422, a consented publication is visible publicly, and archive/unpublish hides it.
  - **Commit:** `feat(content): add consent-gated testimonial API`

- [ ] 13. Implement social-link and fixed contact-content APIs.
  - **Do:** Add public visible social/contact read endpoints and protected admin list/create/update/reorder/archive endpoints for social links plus upsert endpoints for the four fixed contact keys. Validate `iconKey` against the project-supported icon allowlist and record audits.
  - **Must NOT:** Permit arbitrary social HTML/icons, arbitrary content keys, or public mutation.
  - **References:** `apps/web/src/App.tsx` footer/contact markup, Todos 9–10, auth/admin middleware.
  - **Acceptance / QA:** Tests reject unknown icon/key and HTTP URL, verify public filtering/reordering, and verify admin mutation authorization/CSRF.
  - **Commit:** `feat(content): add social and contact management API`

- [ ] 14. Build the admin content shell and university management UI.
  - **Do:** Add protected localized routes under `apps/web/src/features/admin-content` using the existing admin client/query/error patterns: university table/card list, search/status controls, create/edit form, preview-safe URL image display, publish/archive/restore actions, and accessible success/error states.
  - **Must NOT:** Add a generic CRUD framework, WYSIWYG editor, or image upload.
- **References:** `apps/web/src/features/admin-orders`, `apps/web/src/features/auth/guards.tsx`, Todos 10–11.
  - **Acceptance / QA:** Component tests cover admin render, create valid data, invalid HTTPS URL, archive confirmation, failed request retry, and Arabic/English/Turkish strings.
  - **Commit:** `feat(admin-content): manage universities`

- [ ] 15. Build testimonial, social-link, and contact management UI.
  - **Do:** Add localized protected admin views/forms for testimonials, social links, and the four contact values. The testimonial publish control must be disabled until the admin checks consent confirmation and the UI must still surface server rejection. Add drag/order controls only if they map directly to explicit numeric `sortOrder` mutation semantics; otherwise use accessible move-up/down actions.
  - **Must NOT:** Create a generic CMS, capture a consent timestamp/evidence field, or allow unconfirmed publication.
  - **References:** Todos 12–13, existing admin page/error styles.
  - **Acceptance / QA:** Tests cover consent-disabled publish, server rejection, valid social URL, unknown icon error, contact-key-only rendering, reorder, and localized empty/error states.
  - **Commit:** `feat(admin-content): manage stories contact and social links`

- [ ] 16. Replace the static public university catalog with managed API data.
  - **Do:** Replace runtime dependency on `apps/web/src/data/universities.ts` with a typed public content client and React Query hooks; retain existing catalog/card visual behavior, Turkish-safe search, loading/skeleton, empty, error/retry, featured ordering, and public university detail route if present. Delete or retain static data only as explicitly seed-only input, never rendered production content.
  - **Must NOT:** Reintroduce static fallback content that masks API failure or alter application orders.
  - **References:** `apps/web/src/data/universities.ts`, `apps/web/src/App.tsx`, Todo 11.
  - **Acceptance / QA:** Tests prove published API data renders, unpublished data does not, Turkish search works, and API failure is visible/retryable; production build succeeds.
  - **Commit:** `feat(web): render university catalog from managed content`

- [ ] 17. Render managed testimonials, contact details, and social links publicly.
  - **Do:** Replace hard-coded contact/footer social values in `apps/web/src/App.tsx` with public API-backed content; render only published consented testimonials and visible social links, use an icon allowlist/fallback, protect external links with safe `rel`, and preserve localized contact address values.
  - **Must NOT:** Render unpublished/non-consented records, inject arbitrary icon markup, or expose admin endpoints.
  - **References:** `apps/web/src/App.tsx`, Todos 12–13.
  - **Acceptance / QA:** Component tests prove visibility/consent filtering, link safety, locale switching, icon fallback, and contact API errors; keyboard/accessibility assertions cover links and headings.
  - **Commit:** `feat(web): render managed public stories and contact content`

- [ ] 18. Complete Phase 6 integration, regression, and staging validation.
  - **Do:** Add cross-module API integration tests and web regression tests; execute migration + seed against staging, validate public/admin visibility transitions, archive/restore, CSRF/role enforcement, and deep-link hosting behavior. Run all root checks and TestSprite after Render/Neon and Resend DNS prerequisites are valid.
  - **Must NOT:** Validate against production data or declare deployment ready without migration/seed/rewrite evidence.
  - **References:** Todos 1–17, `README.md`, root `package.json`.
  - **Acceptance / QA:** Root checks pass; gated API integration suite passes; staging evidence captures all four content types, non-consented testimonial rejection, and content refresh after admin mutation.
  - **Commit:** `test(release): verify managed content workflows`

## Final verification wave

- [ ] **F1 Plan compliance audit:** Compare implemented paths and commits to Todos 1–18; reject any omitted acceptance criterion or unplanned CMS/upload/order-university work. Evidence: `<attemptDir>/final-plan-compliance.md`.
- [ ] **F2 Code quality/security review:** Run root quality gates; inspect auth/CSRF/rate-limit, authorization, URL validation, secret handling, and audit behavior. Evidence: `<attemptDir>/final-quality-security.md`.
- [ ] **F3 Real agent-executed QA:** Use staging browser/API flows for public deep links, client isolation, admin content CRUD, consent gating, archive visibility, and locale switching. Evidence: `<attemptDir>/final-staging-qa.md`.
- [ ] **F4 Scope fidelity review:** Confirm deployment prerequisites, migration/seed repeatability, no manual intervention claims, and no forbidden scope additions. Evidence: `<attemptDir>/final-scope-fidelity.md`.

## Commit strategy

Create one atomic Conventional Commit per todo in dependency order. Keep migrations/schema/contracts in their dedicated commits; do not mix credential rotation values into commits. Never overwrite unrelated dirty-worktree files.

## Success criteria

- Public deep links work through BrowserRouter and the configured host fallback; every public CTA resolves to a live localized route.
- A client sees only their own order history; admin lists handle filters, errors, and empty states correctly.
- Login/sensitive routes enforce CSRF/rate limits; no live credential is tracked or logged.
- Universities, testimonials, social links, and fixed contact values are fully admin-managed and publicly visible only under their approved conditions.
- No Order–University relation, uploads, arbitrary CMS key, or unconsented testimonial publication exists.
- Migration, seed, unit/component/integration suites, root checks, staging QA, and TestSprite all pass with recorded evidence.
