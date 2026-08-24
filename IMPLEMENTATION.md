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

**Still using GitHub Pages for now:** `deploy-pages.yml` and the legacy
root `index.html`/`images/`/`CNAME` were intentionally left in place as a
fallback until the Firebase deploy is verified live. Once you've confirmed
`aboutalebeducation.com` serves correctly from Firebase, these can be
removed — ask me to do the cleanup pass.

**Ignore-file additions:** `.gitignore` and `.prettierignore`/`eslint.config.mjs`
now exclude `.vite/` (Vite's local dependency cache) and `.firebase/`
(Firebase CLI's local deploy cache) — these are machine-local build
artifacts that were accidentally being linted/formatted/tracked before.
