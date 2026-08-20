# phase-06-1-remediation - Work Plan

## TL;DR (For humans)

**What you'll get:** Phase-06 content management made production-correct — the six blocking defects fixed (broken university logo URLs, rejected testimonial publish-PATCH, inverted admin "Draft" filter, cache-corrupting contact edit, asymmetric archive/restore, non-atomic audit), data fidelity restored (vendored logos + migrated X/Twitter & LinkedIn), and every SOLID violation resolved (split services/component/contracts, shared helpers, strict typing). The same findings are also flagged into `DEVELOPMENT_PLAN.md` as a new "Phase 6.1 — Deep review findings and remediation" section.

**Why this approach:** Contracts first (services/UI then depend on corrected schemas), then behavior fixes, then data, then behavior-preserving structural refactors, then one full verification wave. Each fix carries a regression test.

**What it will NOT do:** No new features, no file upload or generic CMS, no hard-delete endpoints, no fabricated Arabic/English/Turkish translations (owner-input, flagged), no staging deployment or TestSprite (hosting still unresolved).

**Effort:** Large. **Risk:** Medium — image vendoring depends on retrieving the 41 source assets from the original repo, and the archive/restore semantics change alters archive behavior.

**Locked decisions:** Full remediation (blocking + SOLID). `restore()` re-applies the prior published/visible state (archive stops forcing `isPublished/isVisible=false`, so archive+restore become symmetric without extra columns). University logos are vendored into `apps/web/public/images/` under relative `/images/<slug>.png` paths, with `imageUrl` schema relaxed to accept HTTPS absolute OR `/images/...` relative. Trilingual name/summary content stays flagged as owner-input.

---

## Scope

### Must have
- Flag all review findings into `DEVELOPMENT_PLAN.md` (§15 Phase 6.1, §11, §20).
- Fix the testimonial publish-PATCH contract and the admin `isPublished` query coercion.
- Make archive/restore symmetric and add a testimonial restore endpoint.
- Make content mutations atomic with their audit events.
- Repair the admin content UI cache handling and mutation error states.
- Vendor the 41 university logos, repair seeded `imageUrl`, restore the catalog image fallback, and migrate the two missing social links.
- Resolve the SOLID violations: split `SocialContactService`, split `AdminManagedContentPage`, split the contracts god-file, single-source contact keys, extract `audit()`/`listAdmin()`/`pathParam()` helpers, and restore strict typing.

### Must NOT have
- No new user-facing features, hard-delete endpoints, file uploads, arbitrary managed-content keys, or general CMS.
- No unconsented testimonial publication (create-level guard stays).
- No change to existing route paths or API response shapes.
- No fabricated trilingual copy (flagged as owner-input, not generated).
- No `any` / `@ts-ignore` / `@ts-expect-error` in production code.
- No staging deployment or TestSprite claims while hosting is unresolved.

### Findings ledger (source of truth for the flagging todo and acceptance)
- **B1 (P0)** `prisma/seed.ts` seeds `imageUrl` as `https://aboutalebeducation.com/<file>` (root); the 41 logos live under `images/<file>` in the original repo whose Pages has `cname: null`; neither hosting target contains the files.
- **B2 (P0)** `testimonialUpdateSchema` `superRefine` rejects `PATCH {isPublished:true}` without `consentConfirmed`, making `TestimonialsService.update()`'s existing-consent fallback unreachable.
- **B3 (P0)** `managedContentListQuerySchema.isPublished` uses `z.coerce.boolean()`; Zod v4 maps the string `"false"` → `true`, so the admin "Draft" filter returns published records (universities, testimonials, social-links).
- **B4 (P1)** `AdminManagedContentPage.tsx` mutates React Query cache in place (`item.value = e.target.value`), dispatches through one union-typed mutation with `as Parameters<...>` casts, and gives contact-save / social-reorder no error or pending states.
- **B5 (P1)** `restore()` clears only `archivedAt` (record stays unpublished); testimonials have no restore endpoint.
- **B6 (P1)** Each service writes the record then the audit log as separate operations (not atomic).
- **S1 (P2)** `SocialContactService` owns two aggregates (SocialLink + ManagedContent); its routes file exports four routers.
- **S2 (P2)** `AdminManagedContentPage.tsx` owns three sections.
- **S3 (P2)** `packages/contracts/src/index.ts` mixes auth + orders + content.
- **S4 (P2)** `audit()` duplicated ×3, `listAdmin()` pagination/search near-identical ×3, `pathParam()` duplicated ×3.
- **S5 (P2)** Contact keys hardcoded in three places (contracts enum, `listPublicContact()` `in:[...]`, seed).
- **S6 (P2)** `ManagedContentListQuery.isPublished` reused for social links and mapped to `isVisible`.
- **S7 (P2)** `prisma as never` in service tests; `as Parameters<...>` in web mutation.
- **N1 (non-blocking)** X/Twitter + LinkedIn omitted from seed (3 of 5 confirmed links migrated).
- **N2 (non-blocking)** `nameAr/nameEn/nameTr` all one Turkish name; generic summaries (owner-input).
- **N3 (LOW)** `httpsUrlSchema` has no max length; contact `value` not format-checked.

## Verification strategy

Tests-after, agent-executed. Each task stores command output and evidence under `<attemptDir>/task-<N>-phase-06-1.*`. Use Vitest, Testing Library, Supertest, and Prisma validation. Integration tests remain gated by `RUN_INTEGRATION_TESTS=true`. Final gates: `npm run format:check && npm run lint && npm run typecheck && npm run test && npm run build`.

## Execution strategy

### Parallel execution waves
- **Wave 0 — document:** 1 flag findings in DEVELOPMENT_PLAN.md.
- **Wave 1 — contracts:** 2 fix contract bugs, 3 split contracts + centralize keys + vendored image schema (parallel).
- **Wave 2 — API behavior:** 4 universities, 5 testimonials, 6 social/contact (parallel, after 2).
- **Wave 3 — data fidelity:** 7 vendor logos, 8 image fallback + social-link migration (after 3).
- **Wave 4 — admin UI:** 9 repair cache/mutation states (independent; may run alongside waves 2-3).
- **Wave 5 — SOLID refactors:** 10 split social/contact + shared helpers (after 4-6), 11 split managed-content page (after 9), 12 strict typing (after 10-11).
- **Wave 6 — verify:** 13 regression + root gates + docs (after all).

### Dependency matrix
| Todo | Depends on | Blocks |
| --- | --- | --- |
| 1 | - | (none) |
| 2 | - | 4, 5, 6 |
| 3 | - | 7, 8, 10 |
| 4 | 2 | 10 |
| 5 | 2 | 10 |
| 6 | 2 | 10 |
| 7 | 3 | 8, 13 |
| 8 | 3, 7 | 13 |
| 9 | - | 11 |
| 10 | 4, 5, 6 | 12 |
| 11 | 9 | 12 |
| 12 | 10, 11 | 13 |
| 13 | all | - |

## Todos

- [ ] 1. Flag the Phase 6 review findings in DEVELOPMENT_PLAN.md.
- **Do:** Add a `### Phase 6.1 — Deep review findings and remediation (blocking)` section under §15, immediately after the Phase 6 "Exit criteria" line and before `### Phase 7`. Structure it exactly like the existing Phase 5.2 section: a lead paragraph (five-lane review, toolchain green, findings blocking the Phase 7 exit gate), "Deliverables", "Exit criteria", then `#### P0`, `#### P1`, `#### P2`, `#### Non-blocking (owner-input / follow-up)`, `#### External blockers (not code defects)` populated from the Findings ledger in Scope (B1-B3 → P0; B4-B6 → P1; S1-S7 → P2; N1-N3 → non-blocking; image-source availability → external blocker). Also (a) annotate the §11 line "Migrate the existing 41 university records through a reviewed seed script after renaming and optimizing the malformed asset filenames." with a `*(Status: seed migrated all 41 records; filename renaming/optimization was deferred — the seeded imageUrl values 404; now a Phase 6.1 blocking defect.)*` note; (b) add two entries to §20 "Flagged external confirmations": `[FLAG: CONTENT/ASSETS]` (university logo source assets must be retrieved from the original repository before vendoring; owner supplies the set if unavailable) and `[FLAG: CONTENT]` (real Arabic/English/Turkish name+summary translations and X/LinkedIn confirmation are owner-provided); (c) update the §20 "Important risks" bullet about malformed asset filenames to reference Phase 6.1.
- **Must NOT:** Change any other phase deliverable wording; delete or reorder existing sections; mark the findings as fixed before the fixes land.
- **References:** `DEVELOPMENT_PLAN.md` §15 (Phase 5.2 and Phase 6 blocks), §11, §20; Findings ledger in this plan's Scope.
- **Acceptance / QA:** `grep -n "Phase 6.1" DEVELOPMENT_PLAN.md` returns the new section; §20 contains the two new `[FLAG: …]` entries and the updated risk bullet; `git diff --stat` shows only `DEVELOPMENT_PLAN.md` with the expected additions; a quick `git diff -- DEVELOPMENT_PLAN.md` review shows no unrelated edits.
- **Commit:** `docs(plan): flag phase 6 review findings and remediation`

- [ ] 2. Fix testimonial publish-PATCH and boolean query coercion in contracts.
- **Do:** In `packages/contracts/src/index.ts`: (a) change `testimonialUpdateSchema` to drop its `superRefine` (keep `.partial()` only), so a PATCH may carry `isPublished:true` without `consentConfirmed` and `TestimonialsService.update()` remains the authority (it re-checks against the stored record). (b) change `managedContentListQuerySchema.isPublished` from `z.coerce.boolean().optional()` to `z.enum(['true','false']).transform(v => v === 'true').optional()` (or an equivalent `z.preprocess`). Keep `testimonialCreateSchema`'s `superRefine` and `testimonialPublicationUpdateSchema` untouched. Add regression tests in `index.test.ts`: update `{isPublished:true}` parses; update `{isPublished:true, consentConfirmed:false}` parses at the schema layer (service rejects); query `{isPublished:'false'}` → `false`, `'true'` → `true`, and `'1'`/`'yes'` → validation error.
- **Must NOT:** Remove the create-level consent guard; change `testimonialPublicationUpdateSchema`; alter the `isPublished` field shape for list responses.
- **References:** `packages/contracts/src/index.ts` (content section, ~lines 85-137), `packages/contracts/src/index.test.ts`, `apps/api/src/modules/content/testimonials.service.ts` (`assertPublicationConsent`, `update()` fallback).
- **Acceptance / QA:** `npm run test -w @abou/contracts` passes with the new cases; `npm run typecheck -w @abou/api` passes (service `TestimonialUpdateInput` type still valid); failure scenario — `'1'` and `'yes'` return a Zod 400.
- **Commit:** `fix(contracts): allow consent-ful publish PATCH and fix boolean query coercion`

- [ ] 3. Split contracts by module, centralize contact keys, allow vendored image paths.
- **Do:** Split `packages/contracts/src/index.ts` into `content.ts`, `orders.ts`, `auth.ts` (same `packages/contracts/src/` dir) and re-export every existing name from `index.ts`, so all `import { … } from '@abou/contracts'` sites keep resolving unchanged. Add `export const CONTACT_KEYS = ['contact_phone','contact_email_primary','contact_email_secondary','contact_whatsapp'] as const` and derive `managedContactKeySchema = z.enum(CONTACT_KEYS)`. Add `imageRefSchema = z.union([httpsUrlSchema, z.string().regex(/^\/images\/[a-z0-9-]+\.(png|svg|webp|jpe?g)$/)])` and use it for university `imageUrl` (required) and testimonial `imageUrl` (nullable/optional); keep `websiteUrl` as `httpsUrlSchema.nullable()`. Ensure `socialIconKeySchema` includes `linkedin` if not already present.
- **Must NOT:** Rename or drop any exported schema/type; permit relative paths outside `/images/`; change `websiteUrl` or non-image URL semantics.
- **References:** `packages/contracts/src/index.ts`, `packages/contracts/src/index.test.ts`, all `from '@abou/contracts'` import sites (grep across `apps/*` and `packages/*`).
- **Acceptance / QA:** `npm run build -w @abou/contracts` and `npm run typecheck` (all workspaces) pass; `npm run test -w @abou/contracts` passes; grep confirms no import site references the removed internal paths and `CONTACT_KEYS`/`imageRefSchema` are exported.
- **Commit:** `refactor(contracts): split by module, centralize contact keys, allow vendored images`

- [ ] 4. Make university archive/restore symmetric and audit atomic.
- **Do:** In `apps/api/src/modules/content/universities.service.ts`: (a) change `archive()` to set only `archivedAt` (stop forcing `isPublished:false`); public visibility already filters `archivedAt: null`, so archived rows disappear regardless of `isPublished`. `restore()` then only clears `archivedAt`, and the row returns to its pre-archive published state automatically (symmetric, no extra column). (b) Wrap each mutation (`create`, `update`, `archive`, `restore`) together with its `audit()` call in a single `this.prisma.$transaction([...])` (or an interactive transaction) so content and audit commit or roll back together. Update the unit tests to assert the new archive/restore behavior and audit atomicity.
- **Must NOT:** Add a hard-delete endpoint; add a schema column; drop the public visibility filters; change the route signatures.
- **References:** `apps/api/src/modules/content/universities.service.ts`, `universities.routes.ts`, `universities.service.test.ts`.
- **Acceptance / QA:** unit test proves archive preserves `isPublished` and restore returns a previously-published row to published; a test with `auditLog.create` rejecting asserts the content write is rolled back (not committed); `npm run test -w @abou/api` passes.
- **Commit:** `fix(content): symmetric university archive/restore with atomic audit`

- [ ] 5. Make testimonial mutations atomic and add a restore endpoint.
- **Do:** In `apps/api/src/modules/content/testimonials.service.ts`: wrap `create`/`update`/`archive` with their `audit()` calls in `$transaction`; change `archive()` to set only `archivedAt` (drop the `isPublished:false` write) and add `restore(id, actorId, ipAddress?)` that clears `archivedAt`. In `testimonials.routes.ts`, add `adminTestimonialsRouter.post('/:testimonialId/restore', sensitiveRouteLimit(60), requireCsrf, …)` calling `service.restore`. Add/update tests for restore, symmetric archive, and audit atomicity.
- **Must NOT:** Remove the consent guard; expose restore on the public router; skip CSRF/rate-limit on the new route.
- **References:** `apps/api/src/modules/content/testimonials.service.ts`, `testimonials.routes.ts`, `testimonials.service.test.ts`, mirror `universities.routes.ts` restore handler.
- **Acceptance / QA:** tests prove restore returns an archived consented testimonial to public visibility; the new route is admin-only + CSRF-protected (401/403/403-INVALID_CSRF on unauthenticated/non-admin/no-CSRF); audit atomicity test passes; `npm run test -w @abou/api` passes.
- **Commit:** `feat(content): add testimonial restore and atomic audit`

- [ ] 6. Make social-link archive/restore symmetric and audit atomic.
- **Do:** In `apps/api/src/modules/content/social-contact.service.ts`: change `archiveSocial()` to set only `archivedAt` (drop the `isVisible:false` write) and `restoreSocial()` to clear only `archivedAt` (leave `isVisible`), keeping `listPublicSocial` filter `{ isVisible:true, archivedAt:null }`. Wrap social create/update/archive/restore and contact `upsertContact` with their `audit()` calls in `$transaction`. Add/update tests.
- **Must NOT:** Change contact upsert keys; drop visibility filtering; change the route shape.
- **References:** `apps/api/src/modules/content/social-contact.service.ts`, `.service.test.ts`, `.routes.ts`.
- **Acceptance / QA:** tests prove restore returns a previously-visible link to visible; audit atomicity test passes; `npm run test -w @abou/api` passes.
- **Commit:** `fix(content): symmetric social archive/restore with atomic audit`

- [ ] 7. Vendor the 41 university logos and repair seeded image URLs.
- **Do:** Create `apps/web/public/images/`. For each of the 41 records in `apps/web/src/data/universities.ts` (`id` = slug, `image` = original filename): download from `https://raw.githubusercontent.com/MahmoudAliElbadry/abouteleb-education/main/images/<filename>` (fallback: `https://mahmoudalielbadry.github.io/abouteleb-education/images/<urlencoded filename>`), normalize to `images/<kebab-case-slug>.png`, and save under `apps/web/public/images/`. Record every old-filename→`/images/<new>.png` mapping in `docs/university-asset-mapping.md` (replacing the current wrong root-path rule). Update `prisma/seed.ts` so both the `create` and `update` branches set `imageUrl: '/images/<new>.png'`. If an asset cannot be retrieved, list it under a `[FLAG: CONTENT/ASSETS]` note in the mapping doc and leave that row on a placeholder path rather than blocking the rest.
- **Must NOT:** Commit files with spaces/unicode names; hotlink `aboutalebeducation.com`; alter the 41 slugs or their sort ordering.
- **References:** `apps/web/src/data/universities.ts`, `prisma/seed.ts`, `docs/university-asset-mapping.md`, `apps/web/public/` (currently only `CNAME`), Todo 3's `imageRefSchema`.
- **Acceptance / QA:** `ls apps/web/public/images/*.png | wc -l` equals the number of successfully fetched assets (target 41); a scratch-DB seed run (`npx tsx prisma/seed.ts`) writes `/images/...` values and is idempotent; `npm run build -w @abou/web` copies the images into `dist/images/`; the mapping doc lists every old filename with its new path. Failure path: any 404'd source is explicitly recorded as `[FLAG: CONTENT/ASSETS]`, not silently dropped.
- **Commit:** `fix(seed): vendor university logos and repair image URLs`

- [ ] 8. Add catalog image fallback and migrate the missing social links.
- **Do:** In `apps/web/src/App.tsx` public catalog `<img>`: add `loading="lazy"`, explicit width/height to prevent layout shift, and an `onError` handler that swaps `src` to a local placeholder (a vendored `/images/logo.png`, else an inline data-URI). In `prisma/seed.ts` social-link upserts, add the two missing confirmed links — X/Twitter `https://x.com/ABOUTALEBEDU` (`iconKey: 'x'`, sortOrder after facebook) and LinkedIn `https://www.linkedin.com/in/abou-taleb-education-108b413a7` (`iconKey: 'linkedin'`) — so the seed produces all five confirmed links idempotently. Add a web test asserting the fallback fires on an errored `<img>`.
- **Must NOT:** Fabricate contact details; change the existing three social URLs; render raw HTML from image URLs.
- **References:** `apps/web/src/App.tsx` (university card `<img>`), `apps/web/src/App.test.tsx`, `packages/contracts/src/content.ts` `socialIconKeySchema` (ensure `linkedin`), `prisma/seed.ts` social upserts.
- **Acceptance / QA:** `npm run test -w @abou/web` passes incl. the fallback test; scratch-DB seed idempotently creates exactly 5 social links; `npm run build -w @abou/web` passes.
- **Commit:** `fix(web,seed): add catalog image fallback and migrate X/LinkedIn links`

- [ ] 9. Repair AdminManagedContentPage cache handling and mutation error states.
- **Do:** In `apps/web/src/features/admin-content/AdminManagedContentPage.tsx`: replace the direct `item.value = e.target.value` contact edit with a `useState` per-key draft map (controlled inputs); replace the single union-typed `useMutation` (`{type,id,value}` + `as Parameters<...>` casts) with dedicated typed mutations per resource (`createTestimonial`/`updateTestimonial`/`createSocialLink`/`updateSocialLink`/`updateContact`/`archiveTestimonial`) or a proper discriminated-union input; add `onError` → visible error message and pending-disable on every submit; use targeted `invalidateQueries({queryKey:[…]})` instead of blanket `invalidateQueries()`.
- **Must NOT:** Introduce a form library; break the consent-disabled publish behavior; leave any mutation without an error surface.
- **References:** `apps/web/src/features/admin-content/AdminManagedContentPage.tsx`, `managed-content-client.ts`, `AdminManagedContentPage.test.tsx`, `apps/web/src/features/auth/auth-client.ts` (`ApiError`).
- **Acceptance / QA:** `npm run test -w @abou/web` passes; new tests prove (a) typing in a contact field updates a local draft and does NOT mutate the query cache, (b) a failing mutation renders an error message, (c) submit buttons disable while pending; `npm run typecheck -w @abou/web` passes with no `as Parameters` casts remaining.
- **Commit:** `fix(admin-content): correct cache handling and mutation error states`

- [ ] 10. Split SocialContactService and extract shared helpers.
- **Do:** Split `apps/api/src/modules/content/social-contact.service.ts` into `social-link.service.ts` (`SocialLinkService`) and `managed-contact.service.ts` (`ManagedContactService`). Split `social-contact.routes.ts` into `social-link.routes.ts` and `contact.routes.ts`, preserving all four router exports (public/admin social, public/admin contact). Extract shared helpers to `apps/api/src/modules/content/shared.ts`: `pathParam(value)`, `audit(prisma, action, entityType, entityId, actorUserId, ipAddress)`, and a generic `listAdminPage(model, where, orderBy, page, pageSize, select)` used by universities/testimonials/social-link `listAdmin`. Update `apps/api/src/app.ts` imports/mounts to the new router exports, keeping the same URL paths.
- **Must NOT:** Change any route path or response shape; over-abstract the list query (keep the generic to pagination/count only — field sets differ); regress the atomic-audit/restore behavior from Todos 4-6.
- **References:** `apps/api/src/modules/content/{social-contact,universities,testimonials}.{service,routes}.ts`, `apps/api/src/app.ts`.
- **Acceptance / QA:** `npm run typecheck -w @abou/api` and `npm run test -w @abou/api` pass; supertest proves the four social/contact public+admin routes behave identically (paths unchanged); grep confirms `pathParam`/`audit` are no longer duplicated across the content module.
- **Commit:** `refactor(content): split social/contact services and extract shared helpers`

- [ ] 11. Split AdminManagedContentPage into per-section components.
- **Do:** Extract `AdminManagedContentPage` into `apps/web/src/features/admin-content/` sub-components `TestimonialsAdminSection.tsx`, `SocialLinksAdminSection.tsx`, `ContactAdminSection.tsx`, each owning its own queries/mutations/forms/errors; reduce `AdminManagedContentPage.tsx` to a `section` router that composes them (lift or share the language switcher). Move each section's `copy` dictionary into its own component.
- **Must NOT:** Change public routes/URLs or the `section` prop contract; regress the Todo 9 fixes.
- **References:** `apps/web/src/features/admin-content/AdminManagedContentPage.tsx`, `AdminManagedContentPage.test.tsx`, `apps/web/src/App.tsx` (route wiring).
- **Acceptance / QA:** `npm run test -w @abou/web` and `npm run typecheck -w @abou/web` pass; tests render each section independently and the page still renders all three via `section`.
- **Commit:** `refactor(admin-content): split managed content page by section`

- [ ] 12. Restore strict typing in content tests and web clients.
- **Do:** Replace `new XService(prisma as never)` in `apps/api/src/modules/content/*.service.test.ts` with typed test doubles (`satisfies Partial<PrismaClient>` or `Prisma.TransactionClient`-typed fakes, cast once at construction). Remove `as Parameters<...>` casts in the admin-content components by using the discriminated-union mutation types from Todo 9. Use the shared contract types (`ManagedContactKey`, the `socialIconKeySchema`-inferred type) in `managed-content-client.ts` and `university-client.ts` instead of broad `string`.
- **Must NOT:** Silence diagnostics with `@ts-ignore`/`@ts-expect-error`; introduce `any`.
- **References:** `apps/api/src/modules/content/*.service.test.ts`, `apps/web/src/features/admin-content/*.ts(x)`, `packages/contracts/src/*`.
- **Acceptance / QA:** `npm run typecheck` (all workspaces) and `npm run lint` pass with no new suppressions; grep finds no remaining `as never` / `as Parameters` in the changed files.
- **Commit:** `refactor: restore strict typing in content tests and clients`

- [ ] 13. Verify the Phase 6.1 remediation release candidate.
- **Do:** Run root gates `npm run format:check && npm run lint && npm run typecheck && npm run test && npm run build`. Confirm a regression test exists for every fixed defect (publish PATCH, `'false'` coercion, restore symmetry, atomic audit, contact cache, image fallback). Re-run the seed against a scratch DB and confirm 41 universities + 5 social links + 4 contact keys, idempotently. Update `DEVELOPMENT_PLAN.md` Phase 6.1 to mark the fixed P0/P1 items resolved. Write `docs/phase-06-1-remediation.md` capturing command output and before/after evidence per defect.
- **Must NOT:** Claim deployment or TestSprite validation without staging; modify production data.
- **References:** root `package.json`, all preceding todos, `DEVELOPMENT_PLAN.md` Phase 6.1, `prisma/seed.ts`.
- **Acceptance / QA:** all root gates green; scratch-DB seed repeatable and idempotent; `docs/phase-06-1-remediation.md` exists with per-defect evidence; `git status` clean except the intended changes.
- **Commit:** `test(release): verify phase 6 remediation`

## Final verification wave

- [ ] F1. Plan compliance audit: Compare implemented paths/commits to Todos 1-13; reject any omitted acceptance criterion or unplanned scope. Evidence: `docs/phase-06-1-remediation.md` §compliance.
- [ ] F2. Code quality/security review: Root quality gates; inspect consent guard, CSRF/rate-limit on new restore routes, `imageRefSchema` path validation, audit atomicity, and strict typing. Evidence: `docs/phase-06-1-remediation.md` §quality-security.
- [ ] F3. Real agent-executed QA: Supertest/component-test pass over publish-PATCH, draft filter, restore symmetry, contact-cache, image fallback, and seed idempotency. Evidence: `docs/phase-06-1-remediation.md` §qa.
- [ ] F4. Scope fidelity review: Confirm no new features, no hard-delete/upload/CMS, route shapes unchanged, translations not fabricated. Evidence: `docs/phase-06-1-remediation.md` §scope-fidelity.

## Commit strategy

One atomic Conventional Commit per todo, in dependency order. Keep contracts changes in their own commits; keep the vendored image binaries out of unrelated commits. Never overwrite unrelated dirty-worktree files.

## Success criteria

- `DEVELOPMENT_PLAN.md` carries the Phase 6.1 findings section and §11/§20 flags.
- `PATCH /admin/testimonials/:id` publishes an already-consented testimonial without re-sending consent, and the admin "Draft" filter (`isPublished=false`) returns drafts.
- Archive/restore is symmetric across universities, testimonials, and social links; testimonials are restorable.
- Content mutations and their audit entries are atomic.
- The admin content UI edits contact drafts without corrupting the query cache and surfaces every mutation error.
- The public catalog renders vendored logos with a working fallback; the seed produces 41 universities, 5 social links (incl. X/Twitter and LinkedIn), and 4 contact keys idempotently.
- SOLID violations are resolved (split services/component/contracts, shared helpers, single-sourced keys, strict typing).
- Root gates (`format:check && lint && typecheck && test && build`) pass with recorded evidence.
