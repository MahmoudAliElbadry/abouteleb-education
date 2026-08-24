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

**What changed:** Removed `.github/workflows/deploy-pages.yml` and disabled
GitHub Pages in the repository's own settings (`Settings → Pages`, or
`gh api -X DELETE repos/MahmoudAliElbadry/abouteleb-education/pages`).

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
