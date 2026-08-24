# Implementation Log

Running notes on non-obvious changes made to this repo — enough detail that you
could redo them yourself next time. Routine fixes (typos, formatting, lint)
are skipped; only things that add lasting value are logged here.

---

## 2026-08-24 — Firebase Hosting for the production web app

**What changed:** Added `firebase.json`, `.firebaserc`, and
`.github/workflows/deploy-firebase.yml` so pushes to `main` build
`apps/web` and deploy it to Firebase Hosting (project `aboutaleb-platform`)
automatically, instead of deploying by hand from your machine.

**How it works:**

- `firebase.json` points Firebase at `apps/web/dist` (the Vite build output)
  and rewrites every path to `/index.html` — required for a client-side
  router (React Router) so deep links like `/orders/123` don't 404 on a
  hard refresh.
- `.firebaserc` pins the default project so `firebase deploy` (run locally)
  and the CI workflow both target `aboutaleb-platform` without you having to
  pass `--project` every time.
- The workflow uses [`FirebaseExtended/action-hosting-deploy`](https://github.com/FirebaseExtended/action-hosting-deploy),
  authenticating with a service account JSON stored as the GitHub secret
  `FIREBASE_SERVICE_ACCOUNT` (Settings → Secrets and variables → Actions).
  Generate that key from Firebase Console → Project settings → Service
  accounts → Generate new private key, then paste the whole JSON as the
  secret value.
- `channelId: live` means every merge to `main` publishes straight to the
  live site (not a preview channel). If you ever want PR previews, add a
  second workflow triggered on `pull_request` with `channelId` omitted
  (the action auto-creates a temporary preview channel per PR).

**To deploy manually** (e.g. to test before CI is wired up): install the
Firebase CLI (`npm i -g firebase-tools`), run `firebase login`, then from
the repo root: `npm run build -w @abou/web && firebase deploy --only hosting`.

**Ignore-file additions:** `.gitignore` and `.prettierignore`/`eslint.config.mjs`
now exclude `.vite/` (Vite's local dependency cache) and `.firebase/`
(Firebase CLI's local deploy cache) — these are machine-local build
artifacts that were accidentally being linted/formatted/tracked before.

## 2026-08-24 — GitHub Pages disabled

**What changed:** Removed `.github/workflows/deploy-pages.yml`, so nothing
publishes to Pages going forward.

**Not done — needs an admin:** turning Pages fully off in the repo's own
settings (`Settings → Pages` → disable, or `gh api -X DELETE
repos/MahmoudAliElbadry/abouteleb-education/pages`) requires admin
permission on the repo, which this session's `gh` account doesn't have
(only push/triage). The old `mahmoudalielbadry.github.io/abouteleb-education/`
URL will keep resolving (to whatever was last published there) until
someone with admin access flips that switch.

**Why it was safe to do immediately** (unlike the "keep until verified"
plan from earlier): checking the repo's live Pages config
(`gh api repos/.../pages`) beforehand showed `cname: null` — GitHub Pages
was never actually connected to `aboutalebeducation.com`, only reachable
at the unused default `mahmoudalielbadry.github.io/abouteleb-education/`
URL. Firebase Hosting was already the real origin for the custom domain,
so disabling Pages has no effect on live production traffic.

**Left alone:** the root `index.html`, `images/`, and `CNAME` files —
these are the pre-monorepo static site (see `PROJECT_BASELINE.md`) and
were never part of the Pages workflow's publish step (it built
`apps/web/dist` instead). They're now fully inert repo history; removing
them is a separate cleanup you can ask for whenever you want.

## 2026-08-24 — Fixed the API crash-on-boot after switching Render to `main`

**Symptom:** Render's build log showed `ERR_MODULE_NOT_FOUND` for
`packages/contracts/src/auth.js` and the API failed to start
(`npm error command sh -c node dist/server.js`). Once Render was actually
deploying `main` (it had been tracking a different branch before), this
long-latent bug surfaced for the first time — nobody had run the compiled
`node dist/server.js` in production before, only `tsx watch` (dev) and
`vitest` (tests), which don't hit this code path.

**Root cause (two compounding bugs):**

1. `packages/contracts/package.json`'s `exports` field pointed `"."` at
   the TypeScript **source** (`./src/index.ts`), not the compiled output.
   `tsx`/`vite`/`vitest` all transform `.ts` on the fly, so they never
   noticed. Plain `node dist/server.js` has no such transform — it tried
   to execute `src/index.ts` directly, whose internal `export * from
'./auth.js'` (written with a `.js` extension, per TypeScript's
   `NodeNext` convention, expecting a compiled sibling) had no matching
   `.js` file next to it in `src/`, hence `ERR_MODULE_NOT_FOUND`.
2. `render.yaml`'s `buildCommand` only ran `npm run build -w @abou/api`,
   never `npm run build -w @abou/contracts` — so even with (1) fixed,
   `packages/contracts/dist` wouldn't have existed on Render at all.

**Fix:**

- `packages/contracts/package.json`: `exports` now points `"."` at
  `./dist/index.js` (and `./dist/index.d.ts` for types) — the real,
  compiled output a plain Node process can load.
- `render.yaml`: `buildCommand` now builds contracts before the API:
  `npm ci && npm run build -w @abou/contracts && npm run build -w @abou/api`.

**Verified safe for dev/test:** confirmed by actually deleting
`packages/contracts/dist` and running `npm test`/`npm run dev` — Vite and
Vitest resolve the workspace package's `.ts` source directly and ignore
the `exports` field entirely for linked monorepo packages, so this change
doesn't affect local dev/test the way CLAUDE.md describes ("no prebuild
step needed for dev/test, only for build"). `apps/web`'s Firebase build
was unaffected either way, since `vite build` transforms `.ts` the same
as dev — only the API's plain-`node` production runtime needed this.

**Separately diagnosed but not fixed here (needs Render dashboard
access):** the CORS error you saw (`Access-Control-Allow-Origin` header
containing both the old GitHub Pages domain and the real domain,
comma-joined) is a **different, still-open** issue — a static header
value that doesn't change no matter what `Origin` is sent, which the
app's own `cors()` middleware could never produce (it always reflects a
single origin per request). That points to a manually-added custom
response header on the Render service, left over from earlier GitHub
Pages CORS troubleshooting. Fix: Render dashboard → API service →
Settings → Headers → remove the stale `Access-Control-Allow-Origin` rule.
