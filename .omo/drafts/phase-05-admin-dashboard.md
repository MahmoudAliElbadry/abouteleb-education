---
slug: phase-05-admin-dashboard
status: awaiting-approval
intent: clear
pending-action: write .omo/plans/phase-05-admin-dashboard.md
approach: Build the Phase 5 admin order dashboard (backend admin module + frontend admin UI), the localized auth pages, and the session-aware enrollment section on the landing page — gated on the order state machine module, with a notification trigger and full permission/workflow tests. Defer terminal-order reopen.
---

# Draft: phase-05-admin-dashboard

## Components (topology ledger)
<!-- id | outcome (one line) | status: active|deferred | evidence path -->
- order-state machine | prerequisite: single source of truth for transitions (order-state.ts) | active | apps/api/src/modules/orders/order-state.ts
- admin orders backend | metrics/list/detail/assign/status/notes endpoints + requireAdmin | active | apps/api/src/modules/admin-orders/*
- schema migration | OrderInternalNote + clientVisibleMessage | active | prisma/schema.prisma + migrations
- contracts | admin zod schemas | active | packages/contracts/src/index.ts
- notification trigger | post-transaction order emails | active | apps/api/src/modules/orders/notifier.ts (or notifier in auth)
- auth pages (web) | login/register/verify/forgot/reset + routes | active | apps/web/src/features/auth/*
- enrollment section (web) | 3-state session-aware form on landing | active | apps/web/src/features/enrollment/*
- admin UI (web) | orders list + detail, responsive, localized | active | apps/web/src/features/admin/*
- tests | API unit+integration, web component | active | apps/api/src/.../*.test.ts, apps/web/src/.../*.test.tsx

## Open assumptions (announced defaults)
<!-- Record any default you adopt instead of asking, so the user can veto it at the gate. -->
<!-- assumption | adopted default | rationale | reversible? -->
- form lib | NO react-hook-form; plain controlled inputs + @abou/contracts zod schemas for client validation | matches existing ApplicationPage; avoids new dep | yes
- i18n | NO i18n library; extend the hand-rolled `copy` object pattern (ar/en/tr) already in App.tsx | matches existing code; plan §3.2 is advisory | yes
- notifications | extend EmailProvider with sendOrderNotification; fire AFTER tx commits; NO durable outbox | §7 + §20 defer outbox | yes
- metrics endpoint | dedicated GET /admin/orders/metrics | cleaner than overloading list | yes
- pagination | offset (page/pageSize) + stable sort | simple, adequate at MVP scale | yes
- admin search | case-insensitive `contains` on reference/fullName/email/phone | adequate now; full-text deferred | yes
- reopen | DEFERRED (user-confirmed): terminal states have no outgoing transitions | §20 FLAG: business owner approves | yes
- audit | admin writes auditLog directly via prisma (same pattern orders.service.ts already uses) | consistent with existing orders code | yes
- /applications route | KEEP existing route; "Apply now" CTA now anchors to the new enrollment section | non-breaking | yes

## Findings (cited - path:lines)
- No requireAdmin: middleware/auth.ts:1-24 has only requireAuth + requireCsrf.
- No OrderInternalNote, no clientVisibleMessage: schema.prisma:80-92 (history), 54-78 (order).
- assignedAdminId already exists: schema.prisma:64,71.
- Auth endpoints complete for reuse by web pages: auth.routes.ts:27-110; schemas auth.schemas.ts:6-31.
- presentPublicUser shape: auth.presenter.ts:3-11 (id,email,role,emailVerified,fullName).
- Orders service direct auditLog writes: orders.service.ts:76-85,132-141,157-166.
- toPublicOrder maps history without message: orders.service.ts:39-43.
- Web uses HashRouter + react-query, no i18n lib, no RHF: main.tsx:1-18, web/package.json.
- Landing copy object pattern: App.tsx:8-176; Apply CTA links to /applications: App.tsx:281-283,449-451.
- Existing client form (single page, not localized): ApplicationPage.tsx:38-189.
- Test patterns: unit mock (account.service.test.ts:1-17), integration gated (auth.integration.test.ts:9-30), component (App.test.tsx:1-28).
- Phase 5 deliverables + exit criteria: DEVELOPMENT_PLAN.md:763-781.
- State machine prerequisite plan: .omo/plans/order-state-machine-hardening.md (creates order-state.ts with ORDER_TRANSITIONS/TERMINAL_STATUSES/canTransition/assertTransition/isTerminal).

## Decisions (with rationale)
- D1: Gate Phase 5 on order-state.ts (from the hardening plan). Admin status transitions call assertTransition(from,to,'ADMIN').
- D2: New admin-orders module (service + routes) under apps/api/src/modules/admin-orders/, gated by requireAuth + requireAdmin (+ requireCsrf on mutations).
- D3: Schema: add OrderInternalNote (id/orderId/adminId/body/createdAt/updatedAt, FK cascade on order, SetNull on admin) and OrderStatusHistory.clientVisibleMessage String?.
- D4: Notifications fire after commit; extend EmailProvider with sendOrderNotification + dev mailbox + Resend impl.
- D5: Client timeline gains clientVisibleMessage; admin detail exposes notes + responses + history.
- D6: Defer reopen (terminals are terminal) — matches user answer and §20 flag.
- D7: Test strategy = tests-after; vitest unit (mock prisma) + supertest integration (gated RUN_INTEGRATION_TESTS) + Testing Library component tests.

## Scope IN
Admin dashboard (backend + UI), requireAdmin, schema migration, contracts, notification trigger, auth pages, enrollment section (3 states), localization, audit, permission/workflow tests, client timeline message surfacing.

## Scope OUT (Must NOT have)
- Reopen/terminal-outgoing transitions (deferred).
- Durable email outbox / job queue (deferred to deployment phase).
- react-hook-form, i18n library, new UI framework, new styling system.
- Content management (universities/testimonials/social) — that's Phase 6.
- File/document uploads.
- Admin user management UI (invite/create admins beyond seed) — not in Phase 5 list.

## Open questions
(none — forks answered: all of Phase 5; defer reopen)

## Approval gate
status: awaiting-approval
