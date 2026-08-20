# Draft — phase-06-1-remediation

- intent: clear
- review_required: false
- slug: phase-06-1-remediation
- status: approved → plan written

## Source
Post-implementation review of phase-06 content management (`codex/phase-06-content-management`, base `ae34f92`). 5 lanes (goal/code-quality/security Oracle + QA + context-mining) all FAILED. Findings enumerated in the review transcript.

## Locked decisions (user-approved)
1. Scope = FULL remediation: 6 blocking defects + data fidelity + SOLID/tech-debt refactors.
2. restore() = restore prior published state (true inverse of archive); add testimonial restore for parity.
3. University images = vendor the 41 logos into `apps/web/public/images/` (renamed to safe slugs); update seed + mapping + onerror fallback.

## Defaults adopted (announced, not re-asked)
- Audit atomicity: wrap content mutation + `auditLog.create` in one `prisma.$transaction`.
- Test strategy: tests-after + a regression test per fix (repo convention; agent-executed QA always included).
- Translations (nameAr/En/Tr + summaries): flagged as OWNER-INPUT — no AR/EN/TR translations exist in-repo to seed from; plan flags, does not fabricate.
- isPublished coercion fix: `z.enum(['true','false']).transform(v => v === 'true')` (or equivalent) in `packages/contracts/src/index.ts`.
- Testimonial PATCH fix: remove `superRefine` from `testimonialUpdateSchema`; let `TestimonialsService.update()` remain authoritative (already checks against existing state).

## Findings ledger (for flagging + plan)
### Blocking
- B1 image URLs 404: `prisma/seed.ts` maps to `https://aboutalebeducation.com/<file>` (root) but images live at `images/<file>` in old repo, no active custom domain. All 41 logos broken.
- B2 testimonial PATCH: `testimonialUpdateSchema` superRefine rejects `PATCH {isPublished:true}` without consentConfirmed; service fallback unreachable.
- B3 admin "Draft" filter inverted: `managedContentListQuerySchema.isPublished` uses `z.coerce.boolean()` (Zod v4 maps 'false'->true).
- B4 admin UI: `AdminManagedContentPage.tsx` direct react-query cache mutation (`item.value = e.target.value`), union-typed mutation + `as` casts, missing error/pending states on contact save + social reorder.
- B5 restore asymmetry: restore clears only archivedAt (stays unpublished); testimonials have no restore endpoint.
- B6 mutation + audit not atomic: 3 services write record then audit log as separate ops.

### SOLID / tech-debt
- S1 SRP: `SocialContactService` owns two aggregates (SocialLink + ManagedContent); routes file exports 4 routers.
- S2 SRP: `AdminManagedContentPage.tsx` (335 lines) owns 3 sections + dispatcher + cache.
- S3 SRP: `packages/contracts/src/index.ts` god-file (auth+orders+content).
- S4 DRY: `audit()` duplicated ×3; `listAdmin()` pagination/search duplicated ×3; `pathParam()` duplicated ×3 routes.
- S5 OCP: contact keys hardcoded in contracts enum + `listPublicContact()` + seed.
- S6 ISP: `ManagedContentListQuery.isPublished` reused for social links, mapped to `isVisible`.
- S7 type safety: `prisma as never` in tests; `as Parameters<...>` in web.

### Non-blocking
- N1 data migration: X/Twitter + LinkedIn omitted from seed (only 3 of 5 confirmed links).
- N2 translation fidelity: nameAr/En/Tr all same Turkish name; generic summaries (owner-input).
- N3 security LOW: `httpsUrlSchema` no max length; contact `value` no phone/email format.

## Pending action (on approval)
1. Edit `DEVELOPMENT_PLAN.md`: add `### Phase 6.1 — Deep review findings and remediation (blocking)` under §15 (mirror Phase 5.2), flag image-asset + translation + social-link-migration items in §20, mark §11:578 renaming status.
2. Write `.omo/plans/phase-06-1-remediation.md` (template: TL;DR / Scope / Verification / Execution / Todos / Final verification wave / Commit / Success).
