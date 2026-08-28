# Cloudinary Asset Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the 41 university logos from bundled static files to Cloudinary, so admins can change any university image from the dashboard without a redeploy.

**Architecture:** Cloudinary is already wired end-to-end for ad-hoc admin uploads (dropzone → `POST /admin/uploads/image` → `upload_stream` → `secure_url` stored in `University.imageUrl`). This migration reuses that exact path, adding only a deterministic `public_id` so uploads are idempotent and replaceable. A one-off script uploads the 41 existing logos, writes a slug→URL manifest, and backfills the DB. App-shell chrome (`logo.png`, WhatsApp icon) stays local — it is not content.

**Tech Stack:** TypeScript, Node 20+, Express 5, Prisma 6 / PostgreSQL, Cloudinary Node SDK, Vitest, Zod 4, React 19 + Vite.

**Spec:** No separate spec document. This plan is the design record; it derives from the codebase audit in the "Current State" section below, which was verified against the working tree on 2026-08-27.

## Global Constraints

- Package manager is **npm workspaces** — always use `-w @abou/api`, `-w @abou/web`, `-w @abou/contracts`. Never pnpm/yarn.
- `imageRefSchema` (`packages/contracts/src/content.ts:15`) is the **single** validation seam for every image reference. Do not add a second one.
- Cloudinary env vars are **optional in dev, required in production** (`apps/api/src/config/env.ts:84-86`). Any new code must not crash when they are absent locally.
- Upload limits must stay identical on client and server: **5 MB**, **1 file**, mime allowlist `image/png`, `image/jpeg`, `image/webp`, `image/svg+xml`.
- Cloudinary folder for admin ad-hoc uploads is `abou-taleb/uploads`. This plan adds `abou-taleb/universities` for migrated logos. Do not mix them.
- All API tests mock the `cloudinary` module (`vi.mock('cloudinary', …)`). **No test may make a real network call to Cloudinary.**
- Tests run with `fileParallelism: false` (`apps/api/vitest.config.ts`) — tests may share the DB, so do not assume isolation.
- The repo has no root-level `test` for scripts; verification is `npm run test`, `npm run typecheck`, `npm run lint` from the repo root.

---

## Current State (verified 2026-08-27)

Read this before starting. It is the factual baseline every task assumes.

### Two asset paths exist in parallel

**Static (`/images/…`) — inherited from the old GitHub Pages site:**

| Location                  | Contents                                                                                                                    | Size  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----- |
| `images/` (repo root)     | 41 logos under **original mangled filenames** (e.g. `ACIBADEM MEHMET ALI_ç AYDINLAR U_êNI_çVERSI_çTESI_ç.png`) + `logo.png` | 14 MB |
| `apps/web/public/images/` | 41 logos renamed to slugs (`acibadem.png`) + `logo.png` + `email-logo.png` + `whatsapp-svgrepo-com.svg` = 44 files          | 14 MB |

Only `apps/web/public/images/` is served. Root `images/` is the pre-rename source and is referenced by nothing.

Referenced through a helper **duplicated verbatim in three files**:

```ts
const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
```

`apps/web/src/App.tsx:33`, `apps/web/src/features/account/AccountPage.tsx:9`, `apps/web/src/features/auth/AuthPages.tsx:8`.

**Cloudinary — already fully built, but holds zero university logos:**

```
ImageUploadField.tsx (dropzone: drag+drop, click-to-browse, preview, mime+size precheck)
  → uploads-client.ts  uploadImage(file)  [FormData "file"]
  → POST /admin/uploads/image
       requireAuth → requireAdmin → sensitiveRouteLimit(60) → requireCsrf
       → multer(memoryStorage, 5MB, 1 file) → isAllowedMimeType()
  → uploads.service.ts  cloudinary.uploader.upload_stream({ folder: 'abou-taleb/uploads' })
  → 201 { secure_url }
  → onChange(secure_url) → setForm({ ...form, imageUrl: url })
  → persisted to University.imageUrl on submit
```

Wired into `AdminUniversityPage.tsx:210` (required) and `TestimonialsAdminSection.tsx:103` (optional). The file is never written to disk or DB — buffered in memory, streamed to Cloudinary, discarded. Only the URL string persists.

### The bridge

`packages/contracts/src/content.ts:15` deliberately accepts either form:

```ts
export const imageRefSchema = z.union([
  httpsUrlSchema, // Cloudinary
  z.string().regex(/^\/images\/[a-z0-9-]+\.(png|svg|webp|jpe?g)$/), // legacy static
]);
```

This union is the migration seam — both forms coexist without breakage. `University.imageUrl` is `String` (NOT NULL); `Testimonial.imageUrl` is `String?`.

### Why the DB currently points at static paths

`prisma/seed.ts:48,61` writes `imageUrl: \`/images/${university.id}.png\``for all 41 rows, sourced from`apps/web/src/data/universities.ts`(41 entries,`id` used as both slug and filename stem).

### Known gaps this plan closes

1. **Orphaned Cloudinary assets.** Only `secure_url` is stored, never `public_id`. Replacing a logo strands the old asset forever — nothing deletes it. Deterministic `public_id` + `overwrite: true` fixes this for university logos and makes the migration re-runnable.
2. **41 rows never went through the upload path.** They were seeded as static paths.
3. **Root `images/` is 14 MB of dead weight.**

### Assets that deliberately do NOT move

| Asset                                                  | Decision                                  | Reason                                                                                                                                                                                                                               |
| ------------------------------------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `logo.png` (header/account/auth chrome)                | **stays local**                           | App shell, never admin-edited. Cloudinary would add a third-party dependency to header rendering for zero benefit.                                                                                                                   |
| `whatsapp-svgrepo-com.svg`                             | **stays local**                           | Same.                                                                                                                                                                                                                                |
| `logo.png` as `<img onError>` fallback (`App.tsx:613`) | **stays local, keep the behaviour**       | Handles a _single_ image 404 (deleted asset, blocked request) — unrelated to API health. Matters **more** after migration, since URLs now point at a third party.                                                                    |
| `email-logo.png`                                       | **stays at its current URL — see Task 7** | Not a local asset: `env.ts:31` defaults `EMAIL_LOGO_URL` to `https://aboutalebeducation.com/images/email-logo.png`, and `email.provider.ts:86` hardcodes the same string. Email clients need an absolute, permanently-reachable URL. |

### ⚠️ Open decision blocking Task 6 only

`fallbackUniversities` (`App.tsx:35-47`) renders the bundled 41-university list when `getPublicUniversities()` fails. **My recommendation is to remove it** — the API and web app share a deployment, so if the API is down the contact form, lead capture and auth are dead too; showing a pristine catalogue is stale by construction, silently diverges from admin edits, and means the client can _never_ actually remove a university from the public site. That is a content-management bug wearing a resilience costume.

**But this is a visible product decision, not cleanup** — it changes what visitors see during an outage from "full catalogue" to "error + retry". If the client asked for the site to look complete during backend hiccups, the recommendation reverses.

**Tasks 1-5 and 7-8 do not depend on this and can ship first.** Task 6 is gated on client sign-off. If the client says keep it, do Task 6-ALT instead.

---

## File Structure

| File                                                   | Change                      | Responsibility                                                                                 |
| ------------------------------------------------------ | --------------------------- | ---------------------------------------------------------------------------------------------- |
| `apps/api/src/modules/uploads/uploads.service.ts`      | modify                      | Add optional `publicId` to `uploadImage`; unchanged default behaviour for ad-hoc admin uploads |
| `apps/api/src/modules/uploads/uploads.service.test.ts` | modify                      | Cover the new option                                                                           |
| `scripts/migrate-university-images.ts`                 | create                      | One-off: upload 41 logos with deterministic public_ids, emit manifest                          |
| `scripts/university-image-manifest.json`               | create (generated)          | slug → Cloudinary `secure_url` + `public_id`. Committed — it is the seed's source of truth     |
| `scripts/backfill-university-images.ts`                | create                      | One-off: rewrite `University.imageUrl` from the manifest                                       |
| `prisma/seed.ts`                                       | modify `:44-66`             | Seed from the manifest instead of `/images/${id}.png`                                          |
| `apps/web/src/App.tsx`                                 | modify `:33-47`, `:595-599` | Remove bundled fallback (Task 6, gated)                                                        |
| `apps/web/src/App.test.tsx`                            | modify `:217-241`           | Update fallback expectations (Task 6, gated)                                                   |
| `packages/contracts/src/content.ts`                    | modify `:15-18`             | Tighten `imageRefSchema` once backfill is confirmed (Task 8)                                   |
| `packages/contracts/src/index.test.ts`                 | modify                      | Cover the tightened schema                                                                     |
| `images/` (root)                                       | delete                      | 14 MB dead pre-rename source                                                                   |
| `apps/web/public/images/*.png` (41 logos)              | delete                      | Superseded by Cloudinary (Task 6/6-ALT decides timing)                                         |

---

### Task 1: Deterministic public_id on the uploads service

Makes uploads idempotent and replaceable. The HTTP route keeps its current behaviour exactly — only the migration script passes the new option.

**Files:**

- Modify: `apps/api/src/modules/uploads/uploads.service.ts:12-27`
- Test: `apps/api/src/modules/uploads/uploads.service.test.ts`

**Interfaces:**

- Consumes: nothing from earlier tasks.
- Produces: `UploadsService.uploadImage(buffer: Buffer, options?: { publicId?: string; folder?: string }): Promise<UploadApiResponse>`. When `publicId` is given, passes `{ public_id, overwrite: true, invalidate: true }` to Cloudinary. Default folder stays `'abou-taleb/uploads'`. Task 2 depends on this signature.

- [ ] **Step 1: Write the failing test**

Append inside the existing `describe('UploadsService', …)` block in `apps/api/src/modules/uploads/uploads.service.test.ts`:

```ts
it('uploads to the default folder with no public_id by default', async () => {
  uploadStreamMock.mockImplementation((_options, callback) => ({
    end: () => callback(null, { secure_url: 'https://res.cloudinary.com/demo/a.png' }),
  }));
  const { UploadsService } = await import('./uploads.service.js');
  const service = new UploadsService();

  await service.uploadImage(Buffer.from('bytes'));

  expect(uploadStreamMock.mock.calls[0][0]).toEqual({
    folder: 'abou-taleb/uploads',
    resource_type: 'image',
  });
});

it('passes a deterministic public_id and overwrite when given one', async () => {
  uploadStreamMock.mockImplementation((_options, callback) => ({
    end: () => callback(null, { secure_url: 'https://res.cloudinary.com/demo/b.png' }),
  }));
  const { UploadsService } = await import('./uploads.service.js');
  const service = new UploadsService();

  await service.uploadImage(Buffer.from('bytes'), {
    publicId: 'acibadem',
    folder: 'abou-taleb/universities',
  });

  expect(uploadStreamMock.mock.calls[0][0]).toEqual({
    folder: 'abou-taleb/universities',
    resource_type: 'image',
    public_id: 'acibadem',
    overwrite: true,
    invalidate: true,
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -w @abou/api -- uploads.service`
Expected: FAIL — the first new test fails on the options object shape or the second fails because `uploadImage` ignores its second argument.

- [ ] **Step 3: Write minimal implementation**

Replace the `uploadImage` method in `apps/api/src/modules/uploads/uploads.service.ts`:

```ts
  async uploadImage(
    buffer: Buffer,
    options: { publicId?: string; folder?: string } = {},
  ): Promise<UploadApiResponse> {
    const uploadOptions = {
      folder: options.folder ?? 'abou-taleb/uploads',
      resource_type: 'image' as const,
      ...(options.publicId
        ? { public_id: options.publicId, overwrite: true, invalidate: true }
        : {}),
    };
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(uploadOptions, (error, result) => {
          if (error || !result) {
            reject(appErrors.uploadFailed());
            return;
          }
          resolve(result);
        })
        .end(buffer);
    });
  }
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test -w @abou/api -- uploads.service`
Expected: PASS — all UploadsService tests green, including the pre-existing success/failure cases.

- [ ] **Step 5: Verify the HTTP route is unaffected**

Run: `npm run test -w @abou/api -- uploads.integration`
Expected: PASS, unchanged. The route calls `uploadImage(buffer)` with one argument, so it keeps the `abou-taleb/uploads` folder and no `public_id`.

- [ ] **Step 6: Commit**

```bash
git add apps/api/src/modules/uploads/uploads.service.ts apps/api/src/modules/uploads/uploads.service.test.ts
git commit -m "feat(uploads): support deterministic public_id for idempotent uploads"
```

---

### Task 2: Migration script — upload the 41 logos

Reads `apps/web/public/images/<slug>.png` for each entry in `apps/web/src/data/universities.ts`, uploads with `public_id = slug` into `abou-taleb/universities`, writes a manifest.

**Files:**

- Create: `scripts/migrate-university-images.ts`
- Create (generated by running it): `scripts/university-image-manifest.json`

**Interfaces:**

- Consumes: `UploadsService.uploadImage(buffer, { publicId, folder })` from Task 1. `universities` array from `apps/web/src/data/universities.ts` — each entry has `id: string`, `name: string`, `image: string`, `city: 'Istanbul' | 'Ankara' | 'Kocaeli'`. Note: `id` is the slug; the `image` field holds the **old mangled filename** and must be ignored.
- Produces: `scripts/university-image-manifest.json`, shape `Record<string, { secureUrl: string; publicId: string }>` keyed by slug. Tasks 3 and 4 read this file.

- [ ] **Step 1: Write the script**

Create `scripts/migrate-university-images.ts`:

```ts
import 'dotenv/config';
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { universities } from '../apps/web/src/data/universities.ts';
import { UploadsService } from '../apps/api/src/modules/uploads/uploads.service.ts';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');
const imagesDir = join(repoRoot, 'apps/web/public/images');
const manifestPath = join(here, 'university-image-manifest.json');
const FOLDER = 'abou-taleb/universities';

type ManifestEntry = { secureUrl: string; publicId: string };

async function main() {
  for (const key of ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET']) {
    if (!process.env[key]) throw new Error(`${key} is required to run this migration`);
  }

  const service = new UploadsService();
  const manifest: Record<string, ManifestEntry> = JSON.parse(
    await readFile(manifestPath, 'utf8').catch(() => '{}'),
  );

  let uploaded = 0;
  let skipped = 0;
  for (const university of universities) {
    if (manifest[university.id]) {
      console.log(`skip  ${university.id} (already in manifest)`);
      skipped += 1;
      continue;
    }
    const buffer = await readFile(join(imagesDir, `${university.id}.png`));
    const result = await service.uploadImage(buffer, {
      publicId: university.id,
      folder: FOLDER,
    });
    manifest[university.id] = {
      secureUrl: result.secure_url,
      publicId: result.public_id,
    };
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`ok    ${university.id} -> ${result.secure_url}`);
    uploaded += 1;
  }

  console.log(`\nDone. uploaded=${uploaded} skipped=${skipped} total=${universities.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

The manifest is written after **every** upload, so an interrupted run resumes where it stopped. Because `public_id` is deterministic with `overwrite: true`, deleting the manifest and re-running replaces assets in place rather than creating duplicates.

- [ ] **Step 2: Verify every source file exists before uploading anything**

Run:

```bash
cd /mnt/HDD/Freelance/abouteleb-education
grep -o "id: '[a-z0-9-]*'" apps/web/src/data/universities.ts | sed "s/id: '//;s/'//" | sort > /tmp/ids.txt
ls apps/web/public/images | grep '\.png$' | sed 's/\.png$//' | sort > /tmp/files.txt
comm -23 /tmp/ids.txt /tmp/files.txt
wc -l < /tmp/ids.txt
```

Expected: **empty output** from `comm` (no university lacks a file), and `41` from `wc`. If `comm` prints any slug, stop — that logo is missing and must be sourced from the client before proceeding.

- [ ] **Step 3: Dry-run against one university**

Temporarily add `.slice(0, 1)` to the loop source (`for (const university of universities.slice(0, 1))`), then run:

```bash
npx tsx scripts/migrate-university-images.ts
```

Expected: one `ok acibadem -> https://res.cloudinary.com/…` line, and `scripts/university-image-manifest.json` created with exactly one entry. Open the printed URL in a browser and confirm the Acıbadem logo renders.

- [ ] **Step 4: Remove the slice and run the full migration**

Remove `.slice(0, 1)`, then:

```bash
npx tsx scripts/migrate-university-images.ts
```

Expected: `Done. uploaded=40 skipped=1 total=41` (the Acıbadem entry is skipped from the dry run).

- [ ] **Step 5: Verify the manifest is complete**

Run:

```bash
node -e "const m=require('./scripts/university-image-manifest.json');console.log(Object.keys(m).length);console.log(Object.values(m).every(e=>e.secureUrl.startsWith('https://')&&e.publicId))"
```

Expected: `41` then `true`.

- [ ] **Step 6: Commit**

```bash
git add scripts/migrate-university-images.ts scripts/university-image-manifest.json
git commit -m "feat(assets): migrate 41 university logos to Cloudinary"
```

---

### Task 3: Seed from the manifest

**Files:**

- Modify: `prisma/seed.ts:1-5` (imports), `:44-66` (the university upsert block)

**Interfaces:**

- Consumes: `scripts/university-image-manifest.json` from Task 2.
- Produces: seeded `University` rows whose `imageUrl` is a Cloudinary HTTPS URL. Task 4 and Task 8 depend on this.

- [ ] **Step 1: Add the manifest import**

In `prisma/seed.ts`, after the existing `import { universities } from '../apps/web/src/data/universities.ts';` line, add:

```ts
import universityImages from '../scripts/university-image-manifest.json' with { type: 'json' };
```

- [ ] **Step 2: Replace both `imageUrl` expressions**

In `prisma/seed.ts`, the university `upsert` has `imageUrl` in **both** the `update` block (line ~48) and the `create` block (line ~61). Replace both occurrences of:

```ts
          imageUrl: `/images/${university.id}.png`,
```

with:

```ts
          imageUrl: resolveImageUrl(university.id),
```

Then add this helper above `async function main()`:

```ts
function resolveImageUrl(slug: string): string {
  const entry = (universityImages as Record<string, { secureUrl: string }>)[slug];
  if (!entry) {
    throw new Error(
      `No Cloudinary image for "${slug}". Run: npx tsx scripts/migrate-university-images.ts`,
    );
  }
  return entry.secureUrl;
}
```

Failing loudly is deliberate — a silent fallback to `/images/…` would quietly undo the migration on the next seed.

- [ ] **Step 3: Verify the seed typechecks**

Run: `npm run typecheck`
Expected: PASS. If the JSON import errors, confirm `resolveJsonModule` is enabled in `tsconfig.base.json`; if not, add `"resolveJsonModule": true` to its `compilerOptions`.

- [ ] **Step 4: Run the seed against a local database**

Requires `docker compose up -d` (Postgres) and `BOOTSTRAP_ADMIN_EMAIL` set to a registered, email-verified account.

Run: `npm run db:seed`
Expected: exits 0, no `No Cloudinary image for …` error.

- [ ] **Step 5: Verify the rows**

Run:

```bash
npx prisma db execute --stdin <<'SQL'
SELECT count(*) FILTER (WHERE "imageUrl" LIKE 'https://res.cloudinary.com/%') AS cloudinary,
       count(*) FILTER (WHERE "imageUrl" LIKE '/images/%') AS legacy
FROM "University";
SQL
```

Expected: `cloudinary = 41`, `legacy = 0`.

- [ ] **Step 6: Commit**

```bash
git add prisma/seed.ts
git commit -m "feat(seed): seed university logos from the Cloudinary manifest"
```

---

### Task 4: Backfill existing databases

The seed only fixes environments you re-seed. Production rows edited since the last seed must be rewritten in place, without clobbering logos an admin already replaced via the dashboard.

**Files:**

- Create: `scripts/backfill-university-images.ts`

**Interfaces:**

- Consumes: `scripts/university-image-manifest.json` from Task 2.
- Produces: nothing other tasks read. Task 8 requires this to have been run in every environment.

- [ ] **Step 1: Write the script**

Create `scripts/backfill-university-images.ts`:

```ts
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import universityImages from './university-image-manifest.json' with { type: 'json' };

const prisma = new PrismaClient();
const manifest = universityImages as Record<string, { secureUrl: string; publicId: string }>;
const apply = process.argv.includes('--apply');

async function main() {
  const rows = await prisma.university.findMany({
    select: { id: true, slug: true, imageUrl: true },
  });

  const planned: { id: string; slug: string; from: string; to: string }[] = [];
  const alreadyCloudinary: string[] = [];
  const unmapped: string[] = [];

  for (const row of rows) {
    if (row.imageUrl.startsWith('https://')) {
      alreadyCloudinary.push(row.slug);
      continue;
    }
    const entry = manifest[row.slug];
    if (!entry) {
      unmapped.push(row.slug);
      continue;
    }
    planned.push({ id: row.id, slug: row.slug, from: row.imageUrl, to: entry.secureUrl });
  }

  for (const change of planned) console.log(`${change.slug}: ${change.from} -> ${change.to}`);
  if (unmapped.length) console.warn(`\nNo manifest entry (left untouched): ${unmapped.join(', ')}`);
  console.log(
    `\nplanned=${planned.length} alreadyCloudinary=${alreadyCloudinary.length} unmapped=${unmapped.length}`,
  );

  if (!apply) {
    console.log('\nDry run. Re-run with --apply to write these changes.');
    return;
  }

  await prisma.$transaction(
    planned.map((change) =>
      prisma.university.update({ where: { id: change.id }, data: { imageUrl: change.to } }),
    ),
  );
  console.log(`\nApplied ${planned.length} updates.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
```

Rows already on `https://` are skipped, so an admin's dashboard replacement is never overwritten. Unmapped slugs (universities added after the migration) are reported and left alone.

- [ ] **Step 2: Dry-run it**

Run: `npx tsx scripts/backfill-university-images.ts`
Expected: a list of `slug: /images/x.png -> https://res.cloudinary.com/…` lines and a summary. **No writes.**

- [ ] **Step 3: Apply against the local database**

Run: `npx tsx scripts/backfill-university-images.ts --apply`
Expected: `Applied N updates.`

- [ ] **Step 4: Verify idempotence**

Run: `npx tsx scripts/backfill-university-images.ts`
Expected: `planned=0 alreadyCloudinary=41 unmapped=0` — a second run is a no-op.

- [ ] **Step 5: Commit**

```bash
git add scripts/backfill-university-images.ts
git commit -m "feat(assets): add idempotent university image backfill script"
```

---

### Task 5: Confirm the public site renders Cloudinary URLs

No code change if all is well — this is the gate that proves the migration worked before anything is deleted.

**Files:** none modified (unless a failure is found).

- [ ] **Step 1: Start the stack**

Run: `docker compose up -d && npm run dev`
Expected: API on its configured port, web on Vite's.

- [ ] **Step 2: Inspect the public API payload**

Run: `curl -s http://localhost:3000/api/public/universities | head -c 600`

(If that 404s, find the exact path with `grep -rn "universities" apps/api/src/modules/content/*.routes.ts` and use it.)

Expected: every `imageUrl` begins `https://res.cloudinary.com/`.

- [ ] **Step 3: Verify in the browser**

Open the site, scroll to the universities section, open DevTools → Network → Img.
Expected: 41 logo requests to `res.cloudinary.com`, all HTTP 200. **Zero** requests to `/images/*.png` for university logos. `logo.png` and `whatsapp-svgrepo-com.svg` still load locally — that is correct and intended.

- [ ] **Step 4: Verify the per-image fallback still works**

In DevTools, block the `res.cloudinary.com` domain (Network → right-click a request → Block request domain), then reload.
Expected: every university card shows the local `logo.png` placeholder via the `onError` handler at `App.tsx:613` — no broken-image icons. Unblock afterwards.

- [ ] **Step 5: Verify an admin can replace a logo end-to-end**

Sign in as admin → Universities → edit any university → drag a new PNG onto the dropzone → save → reload the public page.
Expected: upload succeeds, preview updates, the new image appears publicly. Its URL is under `abou-taleb/uploads` (ad-hoc uploads keep the original folder — expected, only migrated logos live in `abou-taleb/universities`).

- [ ] **Step 6: Record the result**

If every check passed, the migration is functionally complete; Tasks 6-8 are cleanup. If any check failed, stop and fix before continuing — do not delete any local images.

---

### Task 6: Remove the bundled university fallback ⚠️ GATED

**Do not start until the client has confirmed** they accept an error state instead of a stale catalogue during an API outage. See "Open decision" above. If they want the fallback kept, do **Task 6-ALT** instead.

**Files:**

- Modify: `apps/web/src/App.tsx:20` (import), `:35-47` (`fallbackUniversities`), `:399` (`usingUniversityFallback`), `:595-599` (fallback notice)
- Modify: `apps/web/src/App.test.tsx:217-241`
- Delete: `apps/web/public/images/<41 slugs>.png`

**Interfaces:**

- Consumes: the verified-working Cloudinary rendering from Task 5.
- Produces: an `App.tsx` with no bundled catalogue. Task 8 depends on no `/images/…` university reference remaining in the web app.

- [ ] **Step 1: Update the failing test first**

In `apps/web/src/App.test.tsx`, replace the test at line 217 (`'falls back to the bundled catalogue when the public universities request fails'`) with:

```ts
  it('shows an error state instead of a bundled catalogue when the request fails', () => {
    queryState.universityRequestFailed = true;
    render(<App />);

    expect(screen.getByRole('status')).toHaveTextContent('Unable to load universities.');
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run test -w @abou/web -- App`
Expected: FAIL — articles are still rendered from the bundled fallback.

- [ ] **Step 3: Remove the fallback**

In `apps/web/src/App.tsx`:

1. Delete the `fallbackUniversities` constant (lines 35-47).
2. Delete the import at line 20: `import { universities as bundledUniversities } from './data/universities.js';`
3. Change line 400 from:

```ts
const universities: PublicUniversity[] = universitiesQuery.data?.items ?? fallbackUniversities;
```

to:

```ts
const universities: PublicUniversity[] = universitiesQuery.data?.items ?? [];
```

Leave line 399 (`usingUniversityFallback`) and the `role="status"` notice at line 595 alone — they still drive the error message; only the data substitution goes away. `shownUniversities` at line 445 derives from `universities`, so it needs no edit.

Keep `publicAsset` and the `onError` handler at line 613 — those still serve `logo.png`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test -w @abou/web -- App`
Expected: PASS.

- [ ] **Step 5: Delete the now-unused university logos**

```bash
cd /mnt/HDD/Freelance/abouteleb-education
grep -o "id: '[a-z0-9-]*'" apps/web/src/data/universities.ts | sed "s/id: '//;s/'//" \
  | while read -r slug; do git rm "apps/web/public/images/$slug.png"; done
ls apps/web/public/images
```

Expected remaining: `logo.png`, `email-logo.png`, `whatsapp-svgrepo-com.svg`.

- [ ] **Step 6: Decide the fate of `data/universities.ts`**

Run: `grep -rn "data/universities" apps packages prisma scripts --include=*.ts --include=*.tsx | grep -v node_modules`

`prisma/seed.ts` and `scripts/migrate-university-images.ts` still import it as the canonical slug/name/city list — so **keep the file**. Only its `image` field is now dead. Delete the `image` property from the `University` type and all 41 entries, plus the `const image = (filename: string) => …` helper at line 8.

- [ ] **Step 7: Full verification**

Run: `npm run typecheck && npm run test && npm run lint`
Expected: all PASS.

- [ ] **Step 8: Commit**

```bash
git add -A apps/web/src/App.tsx apps/web/src/App.test.tsx apps/web/src/data/universities.ts apps/web/public/images
git commit -m "refactor(web): drop bundled university catalogue in favour of Cloudinary"
```

---

### Task 6-ALT: Keep the fallback (only if the client rejects Task 6)

If the client wants the catalogue visible during outages, the bundled logos must stay — but they should no longer masquerade as live content.

**Files:**

- Modify: `apps/web/src/App.tsx:595-599`

- [ ] **Step 1: Make the stale state explicit in the test**

In `apps/web/src/App.test.tsx`, extend the existing test at line 217:

```ts
expect(screen.getByRole('status')).toHaveTextContent('Unable to load universities.');
expect(screen.getByRole('status')).toHaveTextContent('cached list');
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run test -w @abou/web -- App`
Expected: FAIL — the notice does not mention a cached list.

- [ ] **Step 3: Update the notice copy**

The strings live in the `t` translation object in `App.tsx` (`t.loadError`). Update all three locales so the message states the list may be out of date — Arabic is the primary locale and must read naturally, not as a translation. Have the client approve the Arabic wording.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test -w @abou/web -- App`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/App.tsx apps/web/src/App.test.tsx
git commit -m "fix(web): label the offline university catalogue as cached"
```

Note: choosing 6-ALT means **Task 8 cannot tighten `imageRefSchema`** to HTTPS-only, because `fallbackUniversities` keeps constructing `/images/…` refs. Skip Task 8's schema change and do only its cleanup steps.

---

### Task 7: Root `images/` cleanup and the email-logo decision

**Files:**

- Delete: `images/` (repo root, 14 MB)
- Possibly modify: `apps/api/src/modules/auth/email.provider.ts:86`

- [ ] **Step 1: Prove root `images/` is referenced by nothing**

Run:

```bash
cd /mnt/HDD/Freelance/abouteleb-education
grep -rn "ACIBADEM\|U_êNI_çVERSI" --include=* . 2>/dev/null | grep -v node_modules | grep -v "^./images/" | grep -v .git/
```

Expected: **no output**. If anything matches, investigate before deleting.

- [ ] **Step 2: Delete it**

```bash
git rm -r images
```

(Root `images/` is the pre-rename source of the logos, now preserved in Cloudinary and in git history. This is recoverable via `git checkout` of an earlier commit.)

- [ ] **Step 3: Fix the hardcoded email logo URL**

`apps/api/src/modules/auth/email.provider.ts:86` hardcodes `logoUrl: 'https://aboutalebeducation.com/images/email-logo.png'` while `env.ts:31` already defines `EMAIL_LOGO_URL` with that same default. The hardcode makes the env var useless. Change line 86 to read from config:

```ts
      logoUrl: env.EMAIL_LOGO_URL,
```

Add `import { env } from '../../config/env.js';` if not already imported in that file.

- [ ] **Step 4: Update the provider test**

`apps/api/src/modules/auth/email.provider.test.ts:23` asserts the literal URL. It should still pass, since `EMAIL_LOGO_URL` defaults to exactly that string. Run and confirm rather than assuming.

Run: `npm run test -w @abou/api -- email`
Expected: PASS.

- [ ] **Step 5: Leave `email-logo.png` in place**

Do **not** move `email-logo.png` to Cloudinary as part of this task and do **not** delete it. Email clients cache aggressively and some strip images from unknown hosts; changing the URL in already-delivered emails is impossible. It stays served from `aboutalebeducation.com/images/email-logo.png`. If the client later wants it on Cloudinary, it is now a one-line env var change with no code edit.

- [ ] **Step 6: Full verification and commit**

Run: `npm run typecheck && npm run test && npm run lint`
Expected: all PASS.

```bash
git add -A images apps/api/src/modules/auth/email.provider.ts
git commit -m "chore(assets): remove dead root images dir, honour EMAIL_LOGO_URL"
```

---

### Task 8: Tighten `imageRefSchema` to HTTPS-only

**Only after Task 6 (not 6-ALT) is merged AND Task 4's backfill has been applied in every environment including production.** Tightening early makes existing legacy rows fail validation on the next admin edit.

**Files:**

- Modify: `packages/contracts/src/content.ts:15-18`
- Modify: `packages/contracts/src/index.test.ts`

**Interfaces:**

- Consumes: a database where no `University.imageUrl` or `Testimonial.imageUrl` starts with `/images/`.
- Produces: `imageRefSchema` as a plain HTTPS URL schema.

- [ ] **Step 1: Confirm production has no legacy refs**

Against the production database:

```bash
npx prisma db execute --stdin <<'SQL'
SELECT 'university' AS t, count(*) FROM "University" WHERE "imageUrl" LIKE '/images/%'
UNION ALL
SELECT 'testimonial', count(*) FROM "Testimonial" WHERE "imageUrl" LIKE '/images/%';
SQL
```

Expected: `0` for both. **If either is non-zero, stop** and run Task 4's backfill there first.

- [ ] **Step 2: Write the failing test**

In `packages/contracts/src/index.test.ts`, add:

```ts
describe('imageRefSchema', () => {
  it('accepts an HTTPS URL', () => {
    expect(imageRefSchema.parse('https://res.cloudinary.com/demo/a.png')).toBe(
      'https://res.cloudinary.com/demo/a.png',
    );
  });

  it('rejects a legacy static path', () => {
    expect(() => imageRefSchema.parse('/images/acibadem.png')).toThrow();
  });

  it('rejects a non-HTTPS URL', () => {
    expect(() => imageRefSchema.parse('http://res.cloudinary.com/demo/a.png')).toThrow();
  });
});
```

Add `imageRefSchema` to the import list at the top of the file, and export it from `packages/contracts/src/content.ts` if it is not already exported.

- [ ] **Step 3: Run it to verify it fails**

Run: `npm run test -w @abou/contracts`
Expected: FAIL on `'rejects a legacy static path'` — the union still accepts it.

- [ ] **Step 4: Tighten the schema**

In `packages/contracts/src/content.ts`, replace:

```ts
export const imageRefSchema = z.union([
  httpsUrlSchema,
  z.string().regex(/^\/images\/[a-z0-9-]+\.(png|svg|webp|jpe?g)$/),
]);
```

with:

```ts
export const imageRefSchema = httpsUrlSchema;
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm run test -w @abou/contracts`
Expected: PASS.

- [ ] **Step 6: Full verification**

Run: `npm run typecheck && npm run test && npm run lint`
Expected: all PASS. Pay attention to `apps/api` content tests — any fixture using `/images/…` as an `imageUrl` must be updated to an HTTPS URL.

- [ ] **Step 7: Commit**

```bash
git add packages/contracts/src/content.ts packages/contracts/src/index.test.ts
git commit -m "refactor(contracts): require HTTPS image refs now that migration is complete"
```

---

## Rollback

| Task | How to undo                                                                                                                                   |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Revert the commit — `uploadImage(buffer)` behaviour is unchanged by default, so nothing depends on it.                                        |
| 2    | Cloudinary assets are additive and harmless. Delete the `abou-taleb/universities` folder in the Cloudinary console if truly needed.           |
| 3    | Revert `prisma/seed.ts`.                                                                                                                      |
| 4    | `UPDATE "University" SET "imageUrl" = '/images/' \|\| slug \|\| '.png';` — valid only while the local files still exist (i.e. before Task 6). |
| 6    | `git revert` restores both `App.tsx` and the 41 PNGs.                                                                                         |
| 7    | `git checkout <commit-before>^ -- images` restores the root directory.                                                                        |
| 8    | Revert the commit; the union schema accepts both forms again.                                                                                 |

## Post-migration operational notes

- Ad-hoc admin uploads still land in `abou-taleb/uploads` **without** a `public_id`, so replacing an image through the dashboard still orphans the previous asset. Task 1 only makes _migrated_ logos replaceable in place. Fully solving this needs a `publicId` column on `University`/`Testimonial` plus a delete-on-replace step — deliberately **out of scope** here, and worth raising with the client as a follow-up if Cloudinary storage cost becomes a concern.
- The Cloudinary free tier's transformation and bandwidth quotas are worth checking against expected traffic before launch — 41 logos on every homepage visit is the site's dominant image load.
- Consider adding `f_auto,q_auto` transformations to the delivered URLs for bandwidth savings. Not done here because it changes stored URLs; better implemented as a render-time URL helper.
