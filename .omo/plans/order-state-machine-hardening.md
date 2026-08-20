# order-state-machine-hardening - Work Plan

## TL;DR (For humans)

<!-- Fill this LAST, after the detailed plan below is written, so it summarizes the REAL plan. -->
<!-- Plain English for a non-engineer: NO file paths, NO todo numbers, NO wave/agent/tool names. -->

**What you'll get:** The application-request lifecycle gets a single, explicit set of rules for which status an application can move to next (instead of rules scattered in two places), and every status change becomes safe under simultaneous requests (no more double-cancel or a response landing on a cancelled request). A response can be submitted only once per request, and the client gets a clear receipt when it lands. The database also rejects a finished application that forgot its close timestamp.

**Why this approach:** One machine module becomes the only place that knows the allowed moves, and one helper becomes the only code allowed to change a status — so the rules can't drift and can't be bypassed. The client-cancel behavior you approved is layered on top: clients may cancel from New/Contacted/Waiting-for-client; cancelling an in-progress application is staff-only.

**What it will NOT do:** It will not build the staff dashboard or the staff-side status-change screens (Contacted/In-progress/Completed/Rejected writes) — those are a later phase. It will not add the low-priority polish items (order reference format, a client-visible message field on history, richer audit details). It will not duplicate the full rules inside the database as a trigger.

**Effort:** Short
**Risk:** Medium - changing how status writes happen touches the live order flow, but behavior is locked by tests.

**Decisions to sanity-check:** (1) A client may submit at most one response per request — later responses are rejected until staff round-trips are built. (2) The response endpoint now returns the response in the body instead of an empty "success". (3) The only database change is a guard that a finished application must carry its close timestamp (no full transition trigger).

Your next move: approve, or run a high-accuracy review. Full execution detail follows below.

---

> TL;DR (machine): Short; Medium risk; centralize order state machine + race-free single-writer + role-aware cancel + DB closedAt guard + response guard/receipt + tests.

## Scope

### Must have

- One machine module as the single source of truth for order status transitions (documented lifecycle + role-aware client-cancel overlay).
- A single race-free transition helper that is the ONLY code path that writes `order.status`; cancel uses it with an exact-status conditional write.
- `addResponse` reads inside the transaction, rejects duplicate responses, and returns the response in the body.
- DB CHECK constraint: terminal status ⟺ `closedAt` is set.
- History chain continuity guaranteed by construction (exact `fromStatus` from the transactional write).
- Unit tests (mocked prisma) + integration tests (supertest, gated) for all transitions and guards.
- Reconcile DEVELOPMENT_PLAN.md with the role-aware cancel overlay.

### Must NOT have (guardrails, anti-slop, scope boundaries)

- NO admin/worker transition endpoints (CONTACTED, IN_PROGRESS, COMPLETED, REJECTED write paths) — future phase.
- NO Postgres trigger duplicating the full transition map (machine is provisional; business owner has not approved final states).
- NO schema changes beyond the single `closedAt`/terminal CHECK constraint migration (no `clientVisibleMessage`, no reference format change).
- NO changes to `create`/`listForClient`/`findOwned` behavior beyond reusing the machine constants where already equivalent.
- Do NOT touch auth, web app, or contracts packages.

## Verification strategy

> Zero human intervention - all verification is agent-executed.

- Test decision: tests-after + vitest (unit tests mock the PrismaClient; integration tests use supertest against the real app + prisma, gated behind `RUN_INTEGRATION_TESTS=true`, mirroring auth.integration.test.ts).
- Evidence: `<attemptDir>/task-<N>-order-state-machine-hardening.<ext>` (attemptDir = currentAttemptDir from 'omo ulw-loop status --json', `.omo/evidence/ulw/<session>/<goalId>/a<attempt>`; outside ulw-loop use `.omo/evidence/`).

## Execution strategy

### Parallel execution waves

> Target 5-8 todos per wave. Fewer than 3 (except the final) means you under-split.

- Wave 1 (parallel, independent): Todo 1 (machine module + unit test), Todo 4 (DB CHECK migration), Todo 6 (doc reconciliation).
- Wave 2 (after Todo 1): Todo 2 (transitionOrder + cancel refactor + unit tests), Todo 3 (addResponse refactor + guard + receipt + unit tests).
- Wave 3 (after Todo 2, 3, 4): Todo 5 (integration tests).

### Dependency matrix

| Todo                        | Depends on | Blocks | Can parallelize with |
| --------------------------- | ---------- | ------ | -------------------- |
| 1. machine module           | -          | 2, 3   | 4, 6                 |
| 2. transitionOrder + cancel | 1          | 5      | 3                    |
| 3. addResponse refactor     | 1          | 5      | 2                    |
| 4. DB CHECK migration       | -          | 5      | 1, 6                 |
| 5. integration tests        | 2, 3, 4    | -      | -                    |
| 6. doc reconciliation       | -          | -      | 1, 4                 |

## Todos

> Implementation + Test = ONE todo. Never separate.

<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->

- [ ] 1. Create the order state machine module `order-state.ts` + unit tests
      What to do / Must NOT do: Add `apps/api/src/modules/orders/order-state.ts` exporting: `ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]>` with NEW→[CONTACTED,REJECTED,CANCELLED], CONTACTED→[WAITING_FOR_CLIENT,IN_PROGRESS], WAITING_FOR_CLIENT→[IN_PROGRESS], IN_PROGRESS→[COMPLETED,REJECTED,CANCELLED], COMPLETED→[], REJECTED→[], CANCELLED→[]; `TERMINAL_STATUSES: OrderStatus[] = [COMPLETED,REJECTED,CANCELLED]`; `CLIENT_CANCELLABLE_STATUSES: OrderStatus[] = [NEW,CONTACTED,WAITING_FOR_CLIENT]`; `canTransition(from,to,role)` (CLIENT: only `to===CANCELLED && from∈CLIENT_CANCELLABLE_STATUSES`; ADMIN: `ORDER_TRANSITIONS[from].includes(to)`); `assertTransition(from,to,role)` throwing `new AppError('INVALID_ORDER_TRANSITION', 409, ...)`; `isTerminal(status)`. Use the `OrderStatus` and `UserRole` enums from `@prisma/client` and `AppError` from `../../core/app-error.js`. Do NOT import prisma; keep the module pure. Do NOT add admin endpoints. Add `order-state.test.ts` asserting every documented edge is allowed, every non-edge denied, terminal set is exactly the three, and CLIENT may cancel from NEW/CONTACTED/WAITING_FOR_CLIENT but NOT from IN_PROGRESS/terminal, while ADMIN may do IN_PROGRESS→CANCELLED.
      Parallelization: Wave 1 | Blocked by: - | Blocks: 2, 3
      References (executor has NO interview context - be exhaustive): documented lifecycle DEVELOPMENT_PLAN.md:400-429; enum OrderStatus prisma/schema.prisma:21-29; UserRole prisma/schema.prisma:10-13; current cancellableStatuses + INVALID_ORDER_TRANSITION usage apps/api/src/modules/orders/orders.service.ts:13-17,112-118,148-154; AppError/appErrors apps/api/src/core/app-error.ts:8,15-25; unit test mock style apps/api/src/modules/auth/account.service.test.ts:1-17.
      Acceptance criteria (agent-executable): `npm run typecheck -w @abou/api` exits 0; `npm run test -w @abou/api -- order-state` (or `npx vitest run src/modules/orders/order-state.test.ts` in apps/api) passes; no import of prisma in the new module.
      QA scenarios (name the exact tool + invocation): happy = `npx vitest run src/modules/orders/order-state.test.ts` shows all green including NEW→CANCELLED and IN_PROGRESS→CANCELLED(admin-only). failure = a test asserting CLIENT IN_PROGRESS→CANCELLED throws INVALID_ORDER_TRANSITION. Evidence `<attemptDir>/task-1-order-state-machine-hardening.txt`.
      Commit: Y | feat(orders): add order state machine module with role-aware transitions

- [ ] 2. Add `transitionOrder` helper and refactor `cancel` to be race-free + unit tests
      What to do / Must NOT do: In `orders.service.ts`, replace `cancellableStatuses` with `CLIENT_CANCELLABLE_STATUSES` from `order-state.js`. Add a private `transitionOrder(tx, orderId, clientId, to, actorId, actorRole, ip?)` that runs INSIDE a `$transaction(async (tx) => {...})`: (1) `tx.order.findFirst({ where: { id: orderId, clientId } })` → throw `appErrors.notFound()` if null; (2) `assertTransition(order.status, to, actorRole)`; (3) `tx.order.updateMany({ where: { id: order.id, status: order.status }, data: { status: to, ...(isTerminal(to) ? { closedAt: new Date() } : {}) } })` → if `count !== 1` throw `new AppError('INVALID_ORDER_TRANSITION', 409, ...)`; (4) write `orderStatusHistory` with `fromStatus: order.status, toStatus: to, changedByUserId: actorId`; (5) write `auditLog` with `action: 'order.status_changed'` and metadata `{ reference, fromStatus, toStatus }`. Rewrite `cancel(orderId, clientId, ip?)` to call this helper with `to=CANCELLED, actorRole='CLIENT'`, keeping its own 204 route contract. Do NOT keep the old findFirst-outside-tx + non-conditional update. Do NOT change `create`. Add `orders.service.test.ts` (mock prisma with `vi.fn()`) covering: cancel happy path writes status+history+audit with correct fromStatus; cancel from IN_PROGRESS rejects; cancel when updateMany returns count 0 rejects (simulates lost race); cancel of missing order rejects.
      Parallelization: Wave 2 | Blocked by: 1 | Blocks: 5
      References (executor has NO interview context - be exhaustive): current cancel orders.service.ts:109-143; orderInclude/statusHistory shape orders.service.ts:19-22,39-43; AuditLog shape prisma/schema.prisma:156-169; conditional updateMany idiom auth.repository.ts:144-168; AppError apps/api/src/core/app-error.ts:15-25; unit test mock style account.service.test.ts:1-17.
      Acceptance criteria (agent-executable): `npm run typecheck -w @abou/api` exits 0; `npx vitest run src/modules/orders/orders.service.test.ts` passes (all 4 scenarios above).
      QA scenarios (name the exact tool + invocation): happy = `npx vitest run src/modules/orders/orders.service.test.ts` green incl. fromStatus===NEW→CANCELLED history row. failure = a test where the mocked updateMany resolves `{ count: 0 }` and `cancel` rejects with INVALID_ORDER_TRANSITION. Evidence `<attemptDir>/task-2-order-state-machine-hardening.txt`.
      Commit: Y | fix(orders): make cancel race-free via single transition helper

- [ ] 3. Refactor `addResponse` (in-tx guard, duplicate rejection, receipt body) + unit tests
      What to do / Must NOT do: In `orders.service.ts`, rewrite `addResponse(orderId, clientId, body, ip?)` to run inside `$transaction`: (1) `tx.order.findFirst({ where: { id: orderId, clientId, status: OrderStatus.WAITING_FOR_CLIENT } })` → null ⇒ `new AppError('INVALID_ORDER_TRANSITION', 409, 'A response is not requested for this application request')`; (2) `tx.orderClientResponse.findFirst({ where: { orderId } })` → if exists throw `new AppError('INVALID_ORDER_TRANSITION', 409, 'A response has already been submitted for this request')`; (3) `tx.orderClientResponse.create({ data: { orderId, clientId, body } })`; (4) audit `order.client_responded`. Return the created response `{ id, body, createdAt }` from the method. In `orders.routes.ts` POST `/:orderId/responses`, respond `response.status(201).json({ response })` instead of `204 .send()`. Do NOT change the status of the order (still WAITING_FOR_CLIENT after response). Add unit tests: happy path returns response + writes audit; non-WAITING order rejects; duplicate response rejects.
      Parallelization: Wave 2 | Blocked by: 1 | Blocks: 5
      References (executor has NO interview context - be exhaustive): current addResponse orders.service.ts:145-168; response route orders.routes.ts:55-68; orderResponseSchema packages/contracts/src/index.ts:24-26; OrderClientResponse model prisma/schema.prisma:94-105; AppError apps/api/src/core/app-error.ts:15-25.
      Acceptance criteria (agent-executable): `npm run typecheck -w @abou/api` exits 0; `npx vitest run src/modules/orders/orders.service.test.ts` passes incl. duplicate-rejection scenario.
      QA scenarios (name the exact tool + invocation): happy = `npx vitest run src/modules/orders/orders.service.test.ts` shows addResponse returns `{ id, body, createdAt }` and writes audit. failure = a test where a second addResponse on the same order rejects 409. Evidence `<attemptDir>/task-3-order-state-machine-hardening.txt`.
      Commit: Y | feat(orders): guard duplicate responses and return receipt body

- [ ] 4. Add DB CHECK constraint migration for closedAt/terminal invariant
      What to do / Must NOT do: Create a migration that enforces `closedAt` is set iff the status is terminal. Prisma does NOT express CHECK constraints in schema.prisma, so run `npx prisma migrate dev --create-only --name order_closedat_terminal_check` from repo root, then edit the generated `prisma/migrations/<timestamp>_order_closedat_terminal_check/migration.sql` to contain exactly: `ALTER TABLE "Order" ADD CONSTRAINT "Order_closedAt_terminal_ck" CHECK (("status" IN ('COMPLETED', 'REJECTED', 'CANCELLED')) = ("closedAt" IS NOT NULL));`. Then run `npm run db:migrate` to apply. Do NOT add anything to schema.prisma. Do NOT add any other constraint or trigger. Verify existing rows satisfy the constraint (NEW orders have closedAt NULL; any CANCELLED row already sets closedAt via orders.service.ts:122).
      Parallelization: Wave 1 | Blocked by: - | Blocks: 5
      References (executor has NO interview context - be exhaustive): Order model + closedAt prisma/schema.prisma:54-78; existing client_orders migration for naming style prisma/migrations/20260819100000_client_orders/migration.sql; cancel already sets closedAt orders.service.ts:122.
      Acceptance criteria (agent-executable): `npm run db:migrate` exits 0; `npx prisma migrate status` shows the new migration applied; `psql "$DATABASE_URL" -c '\d "Order"'` lists `Order_closedAt_terminal_ck`.
      QA scenarios (name the exact tool + invocation): happy = migration applies and `\d "Order"` shows the check constraint. failure = attempting `UPDATE "Order" SET status='CANCELLED' WHERE closedAt IS NULL` (via psql) is rejected by the DB. Evidence `<attemptDir>/task-4-order-state-machine-hardening.txt`.
      Commit: Y | feat(db): enforce closedAt on terminal order statuses

- [ ] 5. Integration tests for the order API (supertest, gated)
      What to do / Must NOT do: Add `apps/api/src/modules/orders/orders.integration.test.ts` gated behind `RUN_INTEGRATION_TESTS === 'true'` (copy the gate pattern). Seed a CLIENT user with verified email directly via prisma (create user + emailVerifiedAt) so tests bypass the email flow; then use `request(app)` (not agent) with CSRF cookie+header obtained by hitting a session — simplest: create a session via prisma and set the session cookie manually, or reuse `request.agent(app)` login flow as in auth.integration.test.ts. Cover: POST /orders returns 201 with status NEW and one NEW history row; POST /:id/cancel returns 204 and leaves status CANCELLED with closedAt set and two history rows (NEW, CANCELLED); cancelling again returns 409 INVALID_ORDER_TRANSITION; POST /:id/responses on a NEW order returns 409; on a WAITING_FOR_CLIENT order (set status directly via prisma) returns 201 + body; second response returns 409. Add cleanup of orderClientResponse, orderStatusHistory, order, user in beforeEach/afterEach (respect FK order: response/history before order). Do NOT make integration tests run by default (must stay gated).
      Parallelization: Wave 3 | Blocked by: 2, 3, 4 | Blocks: -
      References (executor has NO interview context - be exhaustive): integration pattern + cleanupDatabase auth.integration.test.ts:1-30; routes orders.routes.ts:11-68; requireAuth/requireCsrf middleware apps/api/src/middleware/auth.ts:1-24; session cookie env apps/api/src/config/env.ts; OrderStatusHistory/OrderClientResponse FK order prisma/schema.prisma:70-105.
      Acceptance criteria (agent-executable): `RUN_INTEGRATION_TESTS=true npx vitest run src/modules/orders/orders.integration.test.ts` passes; `npx vitest run` (without the flag) still passes and skips the new file.
      QA scenarios (name the exact tool + invocation): happy = `RUN_INTEGRATION_TESTS=true npx vitest run src/modules/orders/orders.integration.test.ts` green across all scenarios. failure = a test asserting double-cancel returns 409. Evidence `<attemptDir>/task-5-order-state-machine-hardening.txt`.
      Commit: Y | test(orders): add integration coverage for order lifecycle and guards

- [ ] 6. Reconcile DEVELOPMENT_PLAN.md with the role-aware cancel overlay
      What to do / Must NOT do: In DEVELOPMENT_PLAN.md §7 (Order lifecycle, lines ~400-429), append an explicit note that the machine is the staff/admin lifecycle, and that a client-cancel overlay applies: clients may cancel from NEW/CONTACTED/WAITING_FOR_CLIENT (CONTACTED→CANCELLED and WAITING_FOR_CLIENT→CANCELLED are client-only cancel edges), while IN_PROGRESS→CANCELLED is staff-only. Update the API outline note for `POST /orders/:orderId/cancel` and `POST /orders/:orderId/responses` (one response per request, returns the response). Do NOT rewrite unrelated plan sections. Do NOT change the provisional-machine diagram itself (still subject to business owner approval).
      Parallelization: Wave 1 | Blocked by: - | Blocks: -
      References (executor has NO interview context - be exhaustive): DEVELOPMENT_PLAN.md:400-429 (lifecycle), :447-457 (API outline).
      Acceptance criteria (agent-executable): grep confirms the client-cancel overlay and one-response-per-request are stated in DEVELOPMENT_PLAN.md; `npm run format:check` passes.
      QA scenarios (name the exact tool + invocation): happy = `grep -n "client-cancel" DEVELOPMENT_PLAN.md` and `grep -n "one response per request" DEVELOPMENT_PLAN.md` both return hits. failure = none (doc-only). Evidence `<attemptDir>/task-6-order-state-machine-hardening.txt`.
      Commit: Y | docs: document role-aware cancel overlay and response guard

## Final verification wave

> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.

- [ ] F1. Plan compliance audit
- [ ] F2. Code quality review
- [ ] F3. Real manual QA
- [ ] F4. Scope fidelity

## Commit strategy

- One atomic commit per todo, in dependency order (1 → 2/3 → 4 → 5 → 6), each with the message specified in the todo's Commit line. No monolithic commit. Do not create branches unless the repo convention requires; commit directly to the current working branch.

## Success criteria

- `npm run typecheck`, `npm run lint`, `npm run format:check` all exit 0.
- `npm run test -w @abou/api` passes (unit) and `RUN_INTEGRATION_TESTS=true npm run test -w @abou/api` passes (integration).
- A single module owns transition rules; `grep -rn "status: OrderStatus" apps/api/src/modules/orders/` returns only the transitionOrder helper (no ad-hoc status writes).
- Cancel is race-free (exact-status conditional write) and duplicate responses are rejected with 409.
- DB enforces closedAt on terminal statuses.
