---
slug: phase-05-2-remediation-and-phase-06-content-management
intent: clear
review_required: false
status: approved-writing-plan
test_strategy: tests-after
approval:
  received: 2026-08-20
  approach: Combined Phase 5.2 remediation followed by Phase 6 content management.
decisions:
  - BrowserRouter with host SPA-rewrite fallback.
  - Externally hosted HTTPS image URLs only; no uploads.
  - Managed content is restricted to contact details and social links.
  - Orders do not reference universities in this phase.
  - Testimonial publication requires an admin boolean consent confirmation only.
components:
  - id: public-remediation
    outcome: Public navigation, routing, enrollment, localization, consent, and catalog behavior work correctly.
    evidence: apps/web/src/App.tsx; apps/web/src/main.tsx; apps/web/src/ApplicationPage.tsx
  - id: client-orders
    outcome: A signed-in client can see only their own order history.
    evidence: apps/api/src/modules/orders; apps/web/src/features/enrollment
  - id: security-remediation
    outcome: Login is CSRF-protected and sensitive routes are rate-limited without leaking credentials.
    evidence: apps/api/src/modules/auth; apps/api/src/app.ts; apps/api/.env
  - id: admin-remediation
    outcome: Admin order filtering and failure/empty states are complete and localized.
    evidence: apps/web/src/features/admin-orders; apps/api/src/modules/admin-orders
  - id: content-api
    outcome: University, testimonial, social-link, and narrowly keyed contact content are managed through protected APIs.
    evidence: prisma/schema.prisma; packages/contracts/src/index.ts
  - id: content-ui
    outcome: Admin CRUD and public content rendering replace the static university source without a generic CMS.
    evidence: apps/web/src/data/universities.ts; apps/web/src/App.tsx
---

# Evidence ledger
- `DEVELOPMENT_PLAN.md` Phase 5.2 and Phase 6 define the approved scope.
- `apps/web/src/main.tsx` currently mounts `HashRouter`; `apps/web/src/App.tsx` contains public routes/navigation and localization copy.
- `apps/web/src/ApplicationPage.tsx` overlaps the canonical enrollment flow in `apps/web/src/features/enrollment/EnrollmentSection.tsx`.
- `apps/api/src/modules/orders` owns authenticated client-order behavior; `apps/api/src/modules/admin-orders` establishes admin API/UI patterns.
- `prisma/schema.prisma` and `packages/contracts/src/index.ts` are the shared data/validation boundaries.
- Root quality commands are `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build`.

# Review receipts
- Metis review `ses_fdf59d713ffeEIH3BsZJoixGWK`: corrections required for locale fields, hosting, external gates, pre-login CSRF, consent, email localization, archival semantics, filters, icon keys, and stale file paths.
