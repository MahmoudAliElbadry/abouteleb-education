---
slug: order-state-machine-hardening
status: awaiting-approval
intent: clear
pending-action: write .omo/plans/order-state-machine-hardening.md
approach: Centralize the OrderStatus transition rules into one machine module (single source of truth), make every status write go through a single race-free transition helper (conditional updateMany with exact-status predicate), reconcile the code with the documented lifecycle plus a role-aware client-cancel overlay, add a DB CHECK constraint for the closedAt/terminal invariant, add duplicate-response guard + receipt body, and cover it all with unit + integration tests.
---

# Draft: order-state-machine-hardening

## Components (topology ledger)

<!-- id | outcome (one line) | status: active|deferred | evidence path -->

- order-state machine module | single source of truth for transitions + role-aware cancel | active | apps/api/src/modules/orders/order-state.ts
- orders.service transition helper | race-free single writer for order.status | active | apps/api/src/modules/orders/orders.service.ts
- DB CHECK constraint | enforce closedAt/terminal invariant at persistence layer | active | prisma/migrations/<new>/migration.sql
- tests | unit (mock prisma) + integration (supertest, gated) | active | apps/api/src/modules/orders/*.test.ts
- doc reconciliation | record client-cancel overlay in plan | active | DEVELOPMENT_PLAN.md

## Open assumptions (announced defaults)

<!-- Record any default you adopt instead of asking, so the user can veto it at the gate. -->
<!-- assumption | adopted default | rationale | reversible? -->

- addResponse duplicate guard | at most ONE client response per order (reject later ones 409) | no admin round-trip exists yet, so one response is the natural bound; relaxable when admin transitions land | yes
- addResponse receipt | return 201 + response body instead of empty 204 | client needs a visible acknowledgment of receipt | yes
- DB hardening scope | CHECK constraint for closedAt/terminal only; NO full transition trigger | machine is provisional (business owner not yet approved); duplicating the full map in plpgsql is a maintenance hazard | yes
- cancel role split | client cancels NEW/CONTACTED/WAITING_FOR_CLIENT; IN_PROGRESS→CANCELLED is admin-only | documented machine is admin lifecycle; client overlay adds 2 edges + removes 1 | yes (user-approved)

## Findings (cited - path:lines)

- Transition rules scattered: cancellableStatuses array orders.service.ts:13-17 + hardcoded status check :148.
- TOCTOU: cancel reads via findFirst :110 outside $transaction :119; update has no status predicate :121.
- addResponse reads :146 outside $transaction :155.
- Enum OrderStatus schema.prisma:21-29 cannot enforce transitions at DB level.
- OrderStatusHistory.fromStatus nullable schema.prisma:83; no contiguity check anywhere.
- WAITING_FOR_CLIENT has no client-visible exit; addResponse writes no status change orders.service.ts:155-167; route returns 204 orders.routes.ts:65.
- closedAt only set on CANCELLED orders.service.ts:122.
- No test files under apps/api/src/modules/orders/.
- updateMany conditional idiom already used in auth.repository.ts:144-168 (race-free pattern to mirror).
- Integration test pattern (RUN_INTEGRATION_TESTS gate + cleanupDatabase) auth.integration.test.ts:9-30.
- Documented lifecycle DEVELOPMENT_PLAN.md:400-429; API outline :447-457.

## Decisions (with rationale)

- D1: New module order-state.ts exports ORDER_TRANSITIONS (admin lifecycle, from diagram), TERMINAL_STATUSES, CLIENT_CANCELLABLE_STATUSES, canTransition(from,to,role), assertTransition(...), isTerminal(status). Rationale: single source of truth (R1), reconciles with doc (R3).
- D2: transitionOrder() is the ONLY place order.status is written; uses conditional updateMany({ where: { id, status: <read> }, ... }) with count===1 assertion inside $transaction for exact fromStatus + race-freedom (R2, R4, R5, R8).
- D3: closedAt set by transitionOrder iff target in TERMINAL_STATUSES (R8), enforced by DB CHECK (R4).
- D4: addResponse reads inside tx with status guard + rejects duplicate response + returns receipt body (R6).
- D5: Test strategy = tests-after, vitest, mock prisma for unit + supertest gated integration (R7). Matches existing auth conventions.

## Scope IN

R1 (centralize), R2 (race), R3 (reconcile + role-aware cancel), R4 (DB closedAt CHECK), R5 (history contiguity), R6 (response guard + receipt), R7 (tests), R8 (closedAt unification).

## Scope OUT (Must NOT have)

- Admin transition ENDPOINTS (CONTACTED/IN_PROGRESS/COMPLETED/REJECTED write paths) — future phase.
- Full transition trigger in SQL duplicating the machine map.
- R9 (reference collision format), R10 (clientVisibleMessage), R11 (404 message), R12 (audit metadata) — low-severity, deferred.
- No schema changes beyond the single CHECK constraint migration.

## Open questions

(none — both forks answered: scope R1-R8; role-aware cancel + documented machine)

## Approval gate

status: awaiting-approval
