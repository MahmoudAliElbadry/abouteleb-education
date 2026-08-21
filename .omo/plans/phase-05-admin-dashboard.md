# phase-05-admin-dashboard - Work Plan

## TL;DR (For humans)
<!-- Fill this LAST, after the detailed plan below is written, so it summarizes the REAL plan. -->
<!-- Plain English for a non-engineer: NO file paths, NO todo numbers, NO wave/agent/tool names. -->

**What you'll get:** A secure admin area where staff can see counts of applications by status, list and search/sort/filter all applications, open any application to see its full timeline and contact details, assign it to themselves, move it through the approved status steps, and leave private internal notes plus client-visible messages. On the public side, the landing page gets a real "Enroll now" section that knows whether the visitor is signed out (locked form), signed in and verified (usable form), or signed in but unverified (locked with a verification path). The app also gains proper sign-up, email-verification, login, forgot-password, and reset-password pages — all in Arabic, English, and Turkish — and clients see status-change messages in their own timeline. Email notifications fire for a submitted application and for important status changes.

**Why this approach:** The admin transitions reuse the single order-state rulebook (built in the preceding hardening plan) so staff can only ever make legal status moves, and every admin action is role-gated on the server and written to the audit log. The frontend keeps the project's existing patterns (plain forms, the existing copy-object localization) rather than pulling in new libraries.

**What it will NOT do:** It will not let staff reopen a finished/rejected/cancelled application (that stays deferred for the business owner's approval), will not add file uploads or a document area, will not build university/testimonial/social content management (a later phase), and will not introduce a background email queue (email is sent right after the save succeeds).

**Effort:** Large
**Risk:** Medium - building the admin surface raises security stakes, but permission and workflow tests lock the behavior.

**Decisions to sanity-check:** (1) No form or translation libraries — we extend the existing plain-form and copy-object approach. (2) Staff emails are sent immediately after save (no retry queue yet). (3) The existing `/applications` page stays, but the main "Apply now" button now points at the new enrollment section.

Your next move: approve, or run a high-accuracy review. Full execution detail follows below.

---

> TL;DR (machine): Large; Medium risk; admin dashboard + auth pages + enrollment section, gated on the order state machine, with audit, notifications, and permission/workflow tests.

## Scope
### Must have
- `requireAdmin` authorization middleware; admin routes gated by auth + role + CSRF.
- Admin orders backend: metrics, paginated list (search/filter/sort), detail, assignment, valid status transition, internal notes, client-visible message.
- Schema: `OrderInternalNote` model + `OrderStatusHistory.clientVisibleMessage`.
- Contracts: admin zod schemas (list query, status transition, assignment, internal note).
- Notification trigger (submission + status change) fired after the DB transaction.
- Client timeline surfaces `clientVisibleMessage`.
- Web auth pages (register/verify/login/forgot/reset) + localized + redirect-back.
- Session-aware enrollment section on the landing page (3 states) + localized + CTA.
- Admin dashboard UI (list + detail) responsive + localized.
- API unit + integration tests; web component tests.

### Must NOT have (guardrails, anti-slop, scope boundaries)
- NO terminal-order reopen (no outgoing transitions from COMPLETED/REJECTED/CANCELLED).
- NO file/document upload area.
- NO university/testimonial/social content management (Phase 6).
- NO durable email outbox/job queue.
- NO react-hook-form, no i18n library, no new styling framework.
- NO admin user-management UI (invite/create admins) beyond the existing seed.

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: tests-after + vitest (API unit = mock prisma; API integration = supertest gated behind `RUN_INTEGRATION_TESTS=true`; web = Testing Library + MemoryRouter, mocking fetch/react-query).
- Evidence: `<attemptDir>/task-<N>-phase-05-admin-dashboard.<ext>` (attemptDir = currentAttemptDir from 'omo ulw-loop status --json', `.omo/evidence/ulw/<session>/<goalId>/a<attempt>`; outside ulw-loop use `.omo/evidence/`).

## Execution strategy
### Parallel execution waves
> Target 5-8 todos per wave. Fewer than 3 (except the final) means you under-split.

- Wave 1 (independent, parallel): Todo 1 (machine gate), Todo 2 (schema migration), Todo 3 (contracts), Todo 4 (requireAdmin).
- Wave 2: Todo 5 (admin read service/routes), Todo 6 (admin write service/routes), Todo 7 (notifier). Todo 6 needs 1/2/4; Todo 5 needs 2/4; Todo 7 needs 2.
- Wave 3: Todo 8 (API unit tests), Todo 9 (API integration tests) — need 5/6/7.
- Wave 4 (frontend; auth work can start after 3): Todo 10 (auth client/hook), Todo 11 (auth pages), Todo 12 (enrollment), Todo 13 (admin list UI), Todo 14 (admin detail UI), Todo 15 (web component tests).

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1. state machine gate | - | 6 | 2, 3, 4 |
| 2. schema migration | - | 5, 6, 7 | 1, 3, 4 |
| 3. contracts | - | 10-15 | 1, 2, 4 |
| 4. requireAdmin | - | 5, 6 | 1, 2, 3 |
| 5. admin read routes | 2, 4 | 8, 9, 13, 14 | 6, 7 |
| 6. admin write routes | 1, 2, 4 | 8, 9, 14 | 5, 7 |
| 7. notifier | 2 | 8, 9 | 5, 6 |
| 8. API unit tests | 5, 6, 7 | - | 9 |
| 9. API integration tests | 5, 6, 7 | - | 8 |
| 10. auth client/hook | 3 | 11, 12, 13, 14 | - |
| 11. auth pages | 10 | 15 | 12, 13 |
| 12. enrollment section | 10 | 15 | 11, 13 |
| 13. admin list UI | 10, 5 | 15 | 11, 12, 14 |
| 14. admin detail UI | 10, 5, 6 | 15 | 13 |
| 15. web component tests | 11, 12, 13, 14 | - | - |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->

- [ ] 1. Verify the order state machine module exists (implement if missing)
  What to do / Must NOT do: Ensure `apps/api/src/modules/orders/order-state.ts` exists exporting `ORDER_TRANSITIONS` (admin lifecycle per DEVELOPMENT_PLAN.md:404-415), `TERMINAL_STATUSES = [COMPLETED,REJECTED,CANCELLED]`, `CLIENT_CANCELLABLE_STATUSES = [NEW,CONTACTED,WAITING_FOR_CLIENT]`, `canTransition(from,to,role)`, `assertTransition(from,to,role)` (throws AppError INVALID_ORDER_TRANSITION 409), and `isTerminal(status)`. If the file is already present from the `order-state-machine-hardening` plan, do NOT rewrite it — just confirm the exports. If absent, implement it exactly as that plan's Todo 1 specifies (pure module, no prisma import, uses `OrderStatus`/`UserRole` from `@prisma/client` and `AppError` from `../../core/app-error.js`). Do NOT add reopen edges; terminals have empty outgoing arrays. Add/confirm `order-state.test.ts` passes.
  Parallelization: Wave 1 | Blocked by: - | Blocks: 6
  References (executor has NO interview context - be exhaustive): lifecycle diagram DEVELOPMENT_PLAN.md:404-429; enum OrderStatus prisma/schema.prisma:21-29; UserRole prisma/schema.prisma:10-13; AppError apps/api/src/core/app-error.ts:15-25; prior plan .omo/plans/order-state-machine-hardening.md.
  Acceptance criteria (agent-executable): `npx vitest run src/modules/orders/order-state.test.ts` passes; `npm run typecheck -w @abou/api` exits 0; `grep -n "COMPLETED\|REJECTED\|CANCELLED" apps/api/src/modules/orders/order-state.ts` shows empty outgoing arrays for all three.
  QA scenarios (name the exact tool + invocation): happy = `npx vitest run src/modules/orders/order-state.test.ts` green. failure = a test asserting `canTransition('COMPLETED', 'NEW', 'ADMIN')` is false. Evidence `<attemptDir>/task-1-phase-05-admin-dashboard.txt`.
  Commit: Y | test(orders): verify state machine module ready for admin transitions

- [ ] 2. Schema migration: OrderInternalNote + clientVisibleMessage
  What to do / Must NOT do: In `prisma/schema.prisma`, add to `OrderStatusHistory` the optional field `clientVisibleMessage String?`. Add a new model `OrderInternalNote { id String @id @default(cuid()); orderId String; adminId String?; body String; createdAt DateTime @default(now()); updatedAt DateTime @updatedAt; order Order @relation(fields:[orderId], references:[id], onDelete: Cascade); admin User? @relation(fields:[adminId], references:[id], onDelete: SetNull); @@index([orderId, createdAt]); }` and add the back-relations on `Order` (`internalNotes OrderInternalNote[]`) and `User` (reuse existing or add a named relation). Run `npm run db:migrate` (creates migration) and `npm run db:generate`. Do NOT add any other fields/models. Do NOT touch University/Testimonial/SocialLink.
  Parallelization: Wave 1 | Blocked by: - | Blocks: 5, 6, 7
  References (executor has NO interview context - be exhaustive): Order model prisma/schema.prisma:54-78; OrderStatusHistory prisma/schema.prisma:80-92; User relations prisma/schema.prisma:31-52; plan data model DEVELOPMENT_PLAN.md:320-335; existing migration style prisma/migrations/20260819100000_client_orders/migration.sql.
  Acceptance criteria (agent-executable): `npm run db:migrate` exits 0 and emits a migration containing `OrderInternalNote` and `clientVisibleMessage`; `npx prisma migrate status` is clean; `npm run typecheck -w @abou/api` exits 0.
  QA scenarios (name the exact tool + invocation): happy = `npx prisma migrate status` shows applied; `npm run typecheck -w @abou/api` green. failure = `npx prisma validate` reports an invalid relation if the back-relation is wrong. Evidence `<attemptDir>/task-2-phase-05-admin-dashboard.txt`.
  Commit: Y | feat(db): add order internal notes and client-visible history message

- [ ] 3. Contracts: admin order schemas
  What to do / Must NOT do: In `packages/contracts/src/index.ts`, add zod schemas + inferred types: `adminOrderListQuerySchema` (`{ status?: OrderStatus enum, specialization?: specializationSchema, assignedAdminId?: string, search?: string (max 120), sort?: enum ['createdAt','updatedAt'], order?: enum ['asc','desc'], page?: number int min 1, pageSize?: number int 1..100 }`), `orderStatusTransitionSchema` (`{ to: z.nativeEnum(OrderStatus), clientVisibleMessage?: string trim max 2000 }`), `orderAssignmentSchema` (`{ assignedAdminId: string }`), `internalNoteSchema` (`{ body: string trim min 1 max 2000 }`). Import `OrderStatus` from `@prisma/client` is NOT available in contracts (contracts has no prisma dep) — so define a local `orderStatusSchema = z.enum([...all 7 statuses])` matching schema.prisma:21-29, and export `OrderStatusValue = z.infer<typeof orderStatusSchema>`. Add a unit test in `packages/contracts/src/index.test.ts` covering valid + invalid for each schema. Do NOT import prisma into contracts.
  Parallelization: Wave 1 | Blocked by: - | Blocks: 10-15
  References (executor has NO interview context - be exhaustive): existing contracts packages/contracts/src/index.ts:1-29; contracts test packages/contracts/src/index.test.ts; enum values prisma/schema.prisma:21-29; admin API outline DEVELOPMENT_PLAN.md:471-487.
  Acceptance criteria (agent-executable): `npm run test -w @abou/contracts` passes; `npm run typecheck -w @abou/contracts` exits 0.
  QA scenarios (name the exact tool + invocation): happy = `npm run test -w @abou/contracts` green. failure = a test asserting an invalid status string or empty note body is rejected. Evidence `<attemptDir>/task-3-phase-05-admin-dashboard.txt`.
  Commit: Y | feat(contracts): add admin order list/transition/assignment/note schemas

- [ ] 4. requireAdmin middleware
  What to do / Must NOT do: In `apps/api/src/middleware/auth.ts`, add an exported `requireAdmin` middleware: after `requireAuth`-style resolution, if `response.locals.user?.role !== 'ADMIN'` call `next(new AppError('FORBIDDEN', 403, 'Admin access required'))`, else `next()`. It should assume `requireAuth` already ran (document this). Do NOT merge it into requireAuth; keep a separate composable middleware. Add a unit test (mock req/res/next) `apps/api/src/middleware/auth.test.ts` for: ADMIN passes, CLIENT gets 403, missing user gets 403.
  Parallelization: Wave 1 | Blocked by: - | Blocks: 5, 6
  References (executor has NO interview context - be exhaustive): existing middleware apps/api/src/middleware/auth.ts:1-24; AppError/appErrors apps/api/src/core/app-error.ts:15-25; role enum prisma/schema.prisma:10-13; admin policy DEVELOPMENT_PLAN.md:192-200.
  Acceptance criteria (agent-executable): `npx vitest run src/middleware/auth.test.ts` passes; `npm run typecheck -w @abou/api` exits 0.
  QA scenarios (name the exact tool + invocation): happy = `npx vitest run src/middleware/auth.test.ts` green. failure = a test where role CLIENT nexts with FORBIDDEN. Evidence `<attemptDir>/task-4-phase-05-admin-dashboard.txt`.
  Commit: Y | feat(auth): add requireAdmin authorization middleware

- [ ] 5. Admin read service + routes (metrics, list, detail)
  What to do / Must NOT do: Create `apps/api/src/modules/admin-orders/admin-orders.service.ts` and `admin-orders.routes.ts`. Service constructor takes `PrismaClient`. Implement: `metrics()` returning counts grouped by status (`groupBy status _count`); `list(query)` with `where` built from optional `status`, `specialization`, `assignedAdminId`, and `search` (case-insensitive `contains` across reference/fullName/email/phoneNumber using OR), `orderBy` from `sort`/`order`, and `skip`/`take` from `page`/`pageSize` — also return `total` via a parallel `count`. `detail(orderId)` returning order + `statusHistory` (asc) + `internalNotes` (asc) + `clientResponses` (asc) + assigned admin id. Use a `toAdminOrder` presenter. Routes (`requireAuth`, `requireAdmin`, then requireCsrf only on mutations): `GET /api/v1/admin/orders/metrics`, `GET /api/v1/admin/orders` (parse query via `adminOrderListQuerySchema`), `GET /api/v1/admin/orders/:orderId`. Register the router in `apps/api/src/app.ts` after ordersRouter. Do NOT implement mutations here (Todo 6). Do NOT leak `clientVisibleMessage` incorrectly — include it in history mapping.
  Parallelization: Wave 2 | Blocked by: 2, 4 | Blocks: 8, 9, 13, 14
  References (executor has NO interview context - be exhaustive): app router registration apps/api/src/app.ts:25-27; orders service include pattern apps/api/src/modules/orders/orders.service.ts:19-22,28-49; contracts list schema (added in Todo 3); admin outline DEVELOPMENT_PLAN.md:471-487; admin list requirements DEVELOPMENT_PLAN.md:533-552.
  Acceptance criteria (agent-executable): `npm run typecheck -w @abou/api` exits 0; routes registered (grep `admin/orders` in app.ts); manual curl or integration later — here verify service compiles and metrics/list/detail are exported.
  QA scenarios (name the exact tool + invocation): happy = `npm run typecheck -w @abou/api` green and `grep -n "admin/orders" apps/api/src/app.ts` returns the mount. failure = lint/typecheck flags untyped groupBy. Evidence `<attemptDir>/task-5-phase-05-admin-dashboard.txt`.
  Commit: Y | feat(admin-orders): add metrics, list, and detail endpoints

- [ ] 6. Admin write service + routes (assignment, status transition, internal notes)
  What to do / Must NOT do: Extend the admin-orders service+routes with: `assign(orderId, assignedAdminId)` (validate the admin user exists and has role ADMIN; `updateMany`/`update` order.assignedAdminId; audit `order.assigned`); `transition(orderId, { to, clientVisibleMessage }, actorId, ip)` that runs INSIDE `$transaction`: read order (with `assignedAdminId`/status), `assertTransition(order.status, to, 'ADMIN')`, conditional `updateMany({ where:{ id, status: order.status }, data:{ status: to, ...(isTerminal(to)?{ closedAt:new Date() }:{}) } })` asserting count===1 else throw INVALID_ORDER_TRANSITION, write `orderStatusHistory` `{ fromStatus, toStatus: to, changedByUserId: actorId, clientVisibleMessage }`, write audit `order.status_changed` with `{ reference, fromStatus, toStatus }`; `addInternalNote(orderId, body, actorId)` writing `OrderInternalNote` + audit `order.internal_note_added`. Routes (requireAuth, requireAdmin, requireCsrf): `PATCH /api/v1/admin/orders/:orderId/assignment`, `POST /api/v1/admin/orders/:orderId/status`, `POST /api/v1/admin/orders/:orderId/internal-notes`. Fire notifications from Todo 7 AFTER the transition transaction commits (call notifier in the route after service returns, NOT inside the tx). Do NOT allow reopen (assertTransition already rejects). Do NOT let a client reach these (requireAdmin).
  Parallelization: Wave 2 | Blocked by: 1, 2, 4 | Blocks: 8, 9, 14
  References (executor has NO interview context - be exhaustive): machine module (Todo 1); conditional updateMany idiom auth.repository.ts:144-168; current client cancel transaction orders.service.ts:109-143; audit direct writes orders.service.ts:76-85,132-141; lifecycle rules DEVELOPMENT_PLAN.md:417-429; admin API outline DEVELOPMENT_PLAN.md:471-487.
  Acceptance criteria (agent-executable): `npm run typecheck -w @abou/api` exits 0; `npx vitest run src/modules/admin-orders/admin-orders.service.test.ts` (added in Todo 8) passes.
  QA scenarios (name the exact tool + invocation): happy = admin transition NEW→CONTACTED writes status+history+audit atomically. failure = admin transition CONTACTED→COMPLETED (illegal) throws INVALID_ORDER_TRANSITION 409. Evidence `<attemptDir>/task-6-phase-05-admin-dashboard.txt`.
  Commit: Y | feat(admin-orders): add assignment, status transition, and internal notes

- [ ] 7. Notification trigger (submission + status change)
  What to do / Must NOT do: Extend the email provider interface: in `apps/api/src/modules/auth/email.provider.ts` add `sendOrderNotification(input: { recipient: string; reference: string; event: 'submitted' | 'status_changed'; newStatus?: string }): Promise<void>` to the `EmailProvider` interface and implement in both `DevelopmentEmailProvider` (push to a new `developmentNotificationMailbox` + `getDevelopmentNotifications()`/`clearDevelopmentNotifications()` helpers) and `ResendEmailProvider` (simple text email, subject like `Your application ATE-… status`). Create `apps/api/src/modules/orders/notifier.ts` exporting `createOrderNotifier(emailProvider)` with `notifySubmitted(order)` and `notifyStatusChanged(order, newStatus)` that call the provider and `logger.info('order.notification.sent', ...)`; make it swallow send errors (log via `logger.warn`) so a failed email never fails the request. Wire: in `orders.routes.ts` POST `/` after create succeeds call `notifySubmitted`; in admin transition route (Todo 6) after commit call `notifyStatusChanged`. Do NOT send inside the DB transaction. Do NOT add a queue/outbox.
  Parallelization: Wave 2 | Blocked by: 2 | Blocks: 8, 9
  References (executor has NO interview context - be exhaustive): EmailProvider interface + dev mailbox apps/api/src/modules/auth/email.provider.ts:5-78; logger apps/api/src/core/logger.ts:35-39; notification rule DEVELOPMENT_PLAN.md:426,758; outbox deferral DEVELOPMENT_PLAN.md:1005.
  Acceptance criteria (agent-executable): `npm run typecheck -w @abou/api` exits 0; `npx vitest run src/modules/orders/notifier.test.ts` passes (mock provider asserts recipient + event; send error is swallowed).
  QA scenarios (name the exact tool + invocation): happy = `npx vitest run src/modules/orders/notifier.test.ts` green. failure = a test where provider rejects and notifier still resolves without throwing. Evidence `<attemptDir>/task-7-phase-05-admin-dashboard.txt`.
  Commit: Y | feat(orders): add post-commit email notification for submission and status change

- [ ] 8. API unit tests (admin service, mocked prisma)
  What to do / Must NOT do: Add `apps/api/src/modules/admin-orders/admin-orders.service.test.ts` using `vi.fn()` mocks for the PrismaClient (mirror account.service.test.ts style). Cover: `list` builds correct where/orderBy/skip/take and returns `{ items, total }`; `metrics` returns grouped counts; `detail` includes history/notes/responses; `assign` validates admin exists and role ADMIN and rejects CLIENT; `transition` happy path writes status+history+audit with correct fromStatus, sets closedAt only on terminal target, and rejects illegal moves (mock `assertTransition` behavior by feeding a legal/illegal `to`); `addInternalNote` writes note+audit. Also add `apps/api/src/middleware/auth.test.ts` (if not already added in Todo 4). Do NOT hit a real DB.
  Parallelization: Wave 3 | Blocked by: 5, 6, 7 | Blocks: -
  References (executor has NO interview context - be exhaustive): mock style account.service.test.ts:1-17; service methods (Todos 5/6); machine assertions order-state.ts (Todo 1).
  Acceptance criteria (agent-executable): `npx vitest run src/modules/admin-orders/admin-orders.service.test.ts src/middleware/auth.test.ts` passes.
  QA scenarios (name the exact tool + invocation): happy = `npx vitest run src/modules/admin-orders/admin-orders.service.test.ts` green. failure = a test where transition on a terminal target (COMPLETED) is rejected. Evidence `<attemptDir>/task-8-phase-05-admin-dashboard.txt`.
  Commit: Y | test(admin-orders): unit coverage for admin service and middleware

- [ ] 9. API integration tests (admin flows + permission enforcement)
  What to do / Must NOT do: Add `apps/api/src/modules/admin-orders/admin-orders.integration.test.ts` gated behind `RUN_INTEGRATION_TESTS==='true'` (copy auth.integration.test.ts pattern: uniqueEmail, cleanupDatabase with FK order — delete internalNote/orderStatusHistory/orderClientResponse/order before user). Seed: a CLIENT (verified) + an ADMIN (set role directly via prisma after creating a verified user). Use supertest with CSRF cookie+header from a login (reuse the login/agent approach). Cover: CLIENT hitting `GET /admin/orders` gets 401/403; ADMIN list returns paginated results + total; ADMIN transition NEW→CONTACTED succeeds and history has clientVisibleMessage; illegal transition (CONTACTED→COMPLETED) returns 409; assignment sets assignedAdminId; internal note is created and returned in detail; a client can still only see their own orders via `/orders`. Clean up in beforeEach/afterEach.
  Parallelization: Wave 3 | Blocked by: 5, 6, 7 | Blocks: -
  References (executor has NO interview context - be exhaustive): integration pattern + cleanup auth.integration.test.ts:9-30; routes (Todos 5/6); session cookie env apps/api/src/config/env.ts:13-15; CSRF helper auth.integration.test.ts:16-22.
  Acceptance criteria (agent-executable): `RUN_INTEGRATION_TESTS=true npx vitest run src/modules/admin-orders/admin-orders.integration.test.ts` passes; `npx vitest run` (no flag) still skips it.
  QA scenarios (name the exact tool + invocation): happy = `RUN_INTEGRATION_TESTS=true npx vitest run src/modules/admin-orders/admin-orders.integration.test.ts` green. failure = a test asserting CLIENT gets 403 on admin routes. Evidence `<attemptDir>/task-9-phase-05-admin-dashboard.txt`.
  Commit: Y | test(admin-orders): integration coverage for admin flows and permission enforcement

- [ ] 10. Web auth client + session hook + protected route helper
  What to do / Must NOT do: Create `apps/web/src/features/auth/auth-client.ts` exporting typed `apiFetch<T>(path, options)` (mirrors ApplicationPage.tsx `api`) plus `getSession()`, `login()`, `register()`, `verifyEmail()`, `resendVerification()`, `forgotPassword()`, `resetPassword()`, `logout()`; a `csrfToken()` helper. Create `apps/web/src/features/auth/useAuth.ts` (react-query `useQuery` for `/auth/session`, key `['session']`, with `invalidateQueries({queryKey:['session']})` on mutation success) returning `{ user, isLoading }`. Create `apps/web/src/features/auth/RequireAuth.tsx` and `RequireAdmin.tsx` route guards (redirect to `/login` with `state.from` / render a "not authorized" view). Reuse `@abou/contracts` types where useful. Do NOT build the page components here (Todo 11). Do NOT add react-hook-form.
  Parallelization: Wave 4 | Blocked by: 3 | Blocks: 11, 12, 13, 14
  References (executor has NO interview context - be exhaustive): existing fetch + csrf ApplicationPage.tsx:4-36; session endpoint auth.routes.ts:85-91; presentPublicUser shape auth.presenter.ts:3-11; react-query provider main.tsx:8-16; router usage App.tsx:446-453.
  Acceptance criteria (agent-executable): `npm run typecheck -w @abou/web` exits 0; `npx vitest run src/features/auth/useAuth.test.tsx` (or client unit test) passes.
  QA scenarios (name the exact tool + invocation): happy = `npx vitest run src/features/auth` green. failure = a test asserting logout invalidates the session query. Evidence `<attemptDir>/task-10-phase-05-admin-dashboard.txt`.
  Commit: Y | feat(web): add auth client, session hook, and route guards

- [ ] 11. Localized auth pages (register/verify/login/forgot/reset) + redirect-back
  What to do / Must NOT do: Create `apps/web/src/features/auth/AuthPages.tsx` (or per-page files) for `/register`, `/verify-email`, `/login`, `/forgot-password`, `/reset-password`, each with ar/en/tr copy via the existing hand-rolled `copy`-object pattern, field-level validation using `@abou/contracts` schemas (client-side) + server error surfacing, loading states, and redirect-back (after login, navigate to `state.from ?? '/'`). Register form must include consent checkbox. Login form must handle the "email not verified" path (show a verify/resend link). Wire routes into `App.tsx` (`HashRouter`), wrapping admin routes with `RequireAdmin` and account routes with `RequireAuth`. Keep the existing `/applications` route intact. Do NOT build the enrollment section here (Todo 12). Do NOT add an i18n library.
  Parallelization: Wave 4 | Blocked by: 10 | Blocks: 15
  References (executor has NO interview context - be exhaustive): auth endpoints + payloads auth.routes.ts:27-110, auth.schemas.ts:6-31; copy-object pattern App.tsx:8-176; existing sign-in form ApplicationPage.tsx:91-128; public routes list DEVELOPMENT_PLAN.md:493-503.
  Acceptance criteria (agent-executable): `npm run typecheck -w @abou/web` exits 0; `npm run build -w @abou/web` succeeds; `npx vitest run src/features/auth` passes.
  QA scenarios (name the exact tool + invocation): happy = `npx vitest run src/features/auth/AuthPages.test.tsx` renders all three languages and submits valid payloads. failure = a test asserting invalid email shows a field error. Evidence `<attemptDir>/task-11-phase-05-admin-dashboard.txt`.
  Commit: Y | feat(web): add localized auth pages with redirect-back

- [ ] 12. Session-aware enrollment section on the landing page
  What to do / Must NOT do: Create `apps/web/src/features/enrollment/EnrollmentSection.tsx` rendering the four-field order form (fullName, phoneNumber, specialization) with three states driven by `useAuth()`: signed-out = dimmed, non-interactive form + lock icon + explanation + login button (links to `/login`); signed-in unverified = locked + verification path (link to `/verify-email` or resend); signed-in verified = usable form that POSTs `/orders` with CSRF and shows a success/refetch state. Localize ar/en/tr (enrollment labels, lock text, CTA, validation errors, specialization labels). Add the section at the end of the landing page in `App.tsx` (after the contact section) and change the header "Apply now" CTA to link to `#enroll` (keep `/applications` route working). Do NOT change the order service/schema. Do NOT add an i18n library.
  Parallelization: Wave 4 | Blocked by: 10 | Blocks: 15
  References (executor has NO interview context - be exhaustive): landing page structure App.tsx:217-435; CTA App.tsx:281-283; existing order form ApplicationPage.tsx:75-172; create order route orders.routes.ts:21-32; createOrderSchema packages/contracts/src/index.ts:18-22; enrollment deliverable DEVELOPMENT_PLAN.md:771-776.
  Acceptance criteria (agent-executable): `npm run typecheck -w @abou/web` exits 0; `npm run build -w @abou/web` succeeds; `npx vitest run src/features/enrollment` passes.
  QA scenarios (name the exact tool + invocation): happy = `npx vitest run src/features/enrollment/EnrollmentSection.test.tsx` renders locked state when signed out, usable form when verified, lock+verification path when unverified. failure = a test asserting the signed-out form fields are disabled. Evidence `<attemptDir>/task-12-phase-05-admin-dashboard.txt`.
  Commit: Y | feat(web): add session-aware enrollment section to landing page

- [ ] 13. Admin dashboard — order list + metrics UI
  What to do / Must NOT do: Create `apps/web/src/features/admin/AdminOrdersPage.tsx` for `/admin/orders` (and a `/admin` redirect): fetch `/admin/orders/metrics` for summary cards by status and `/admin/orders` for the list (react-query), with search box, status/specialization filters, sort control, and pagination controls; render a responsive table on wide screens and card/list on narrow (CSS via existing styles.css conventions). Localize ar/en/tr. Gate with `RequireAdmin`. Do NOT build the detail page here (Todo 14). Do NOT add a table library.
  Parallelization: Wave 4 | Blocked by: 10, 5 | Blocks: 15
  References (executor has NO interview context - be exhaustive): admin routes list DEVELOPMENT_PLAN.md:521-529; order list requirements DEVELOPMENT_PLAN.md:533-552; list/meta endpoints (Todo 5); admin list query schema (Todo 3); existing styles.css + App.test.tsx render pattern.
  Acceptance criteria (agent-executable): `npm run typecheck -w @abou/web` exits 0; `npm run build -w @abou/web` succeeds; `npx vitest run src/features/admin/AdminOrdersPage.test.tsx` passes.
  QA scenarios (name the exact tool + invocation): happy = `npx vitest run src/features/admin/AdminOrdersPage.test.tsx` renders metrics + list from mocked fetch, filters change the query. failure = a test asserting pagination control advances page. Evidence `<attemptDir>/task-13-phase-05-admin-dashboard.txt`.
  Commit: Y | feat(web): add admin orders list with metrics, search, filter, sort, pagination

- [ ] 14. Admin dashboard — order detail UI (timeline, notes, assignment, status actions)
  What to do / Must NOT do: Create `apps/web/src/features/admin/AdminOrderDetailPage.tsx` for `/admin/orders/:orderId`: fetch `/admin/orders/:orderId`; show client/contact info, submitted data, full status timeline (with clientVisibleMessage), internal notes (separate visually), and client responses; render assignment control (`PATCH assignment`) and valid next-status actions derived from the order's current status against the machine's admin transitions (only show legal buttons; disable/reject others server-side too); provide "add internal note" and "transition with optional client-visible message" forms with CSRF. Localize ar/en/tr. Gate with `RequireAdmin`. Do NOT add reopen actions. Do NOT build file/document area.
  Parallelization: Wave 4 | Blocked by: 10, 5, 6 | Blocks: 15
  References (executor has NO interview context - be exhaustive): detail/assignment/status/notes endpoints (Todos 5/6); order detail requirements DEVELOPMENT_PLAN.md:543-552; machine transitions order-state.ts (Todo 1); internal-notes separation DEVELOPMENT_PLAN.md:549.
  Acceptance criteria (agent-executable): `npm run typecheck -w @abou/web` exits 0; `npm run build -w @abou/web` succeeds; `npx vitest run src/features/admin/AdminOrderDetailPage.test.tsx` passes.
  QA scenarios (name the exact tool + invocation): happy = `npx vitest run src/features/admin/AdminOrderDetailPage.test.tsx` renders timeline + only legal next-status buttons for a NEW order (CONTACTED/REJECTED/CANCELLED, no COMPLETED). failure = a test asserting a terminal order shows no transition buttons. Evidence `<attemptDir>/task-14-phase-05-admin-dashboard.txt`.
  Commit: Y | feat(web): add admin order detail with timeline, notes, assignment, and status actions

- [ ] 15. Web component tests (auth pages, enrollment states, admin list/detail)
  What to do / Must NOT do: Consolidate/complete component tests under `apps/web/src/features/` using Testing Library + MemoryRouter, mocking fetch and react-query (mirror App.test.tsx vi.mock pattern). Cover: auth pages render ar/en/tr and submit correct payloads; enrollment three states; admin list renders metrics/rows and applies filters; admin detail shows legal status buttons only and hides them for terminal orders; RequireAuth/RequireAdmin redirect behavior. Ensure the existing `App.test.tsx` still passes (the landing page now includes the enrollment section — update its assertions only if the new section breaks the article/heading counts, and keep the test green). Do NOT add Playwright/E2E (that is Phase 5.1).
  Parallelization: Wave 4 | Blocked by: 11, 12, 13, 14 | Blocks: -
  References (executor has NO interview context - be exhaustive): component test pattern App.test.tsx:1-28; test-setup apps/web/src/test-setup.ts; features (Todos 10-14).
  Acceptance criteria (agent-executable): `npm run test -w @abou/web` passes; `npm run typecheck -w @abou/web` exits 0.
  QA scenarios (name the exact tool + invocation): happy = `npm run test -w @abou/web` green. failure = a test asserting RequireAdmin renders a not-authorized view for a CLIENT user. Evidence `<attemptDir>/task-15-phase-05-admin-dashboard.txt`.
  Commit: Y | test(web): component coverage for auth, enrollment, and admin dashboard

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. Plan compliance audit
- [ ] F2. Code quality review
- [ ] F3. Real manual QA
- [ ] F4. Scope fidelity

## Commit strategy
- One atomic commit per todo, in dependency order (1→2/3/4→5/6/7→8/9→10→11/12/13/14→15), each with the message in the todo's Commit line. No monolithic commit. Do not create branches unless repo convention requires; commit to the current working branch with Conventional Commits (matches DEVELOPMENT_PLAN.md:912-921).

## Success criteria
- `npm run typecheck`, `npm run lint`, `npm run format:check` all exit 0 at the repo root.
- `npm run test` passes (contracts + api unit + web component) and `RUN_INTEGRATION_TESTS=true npm run test -w @abou/api` passes.
- An admin can move an order from NEW to a terminal state with a complete history and no client-data isolation failure; a CLIENT cannot reach any `/admin/*` route.
- Only legal transitions are possible (machine-backed); reopen is not possible.
- Auth pages and the enrollment section work in Arabic, English, and Turkish; the landing "Apply now" CTA reaches the enrollment section.
- Notifications are emitted after commit for submission and status change, and never fail the request.
