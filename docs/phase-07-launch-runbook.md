# Phase 7 launch runbook

## Provisioning

1. Create separate Neon staging and production projects. Store each `DATABASE_URL` only in its matching Render environment.
2. Deploy the API from `render.yaml`. The blueprint configures `api.aboutalebeducation.com`, `WEB_ORIGIN=https://aboutalebeducation.com`, and `COOKIE_DOMAIN=.aboutalebeducation.com`; leave `WEB_ORIGINS` unset unless an additional same-site frontend is intentionally supported.
3. In Render, add and verify the `api.aboutalebeducation.com` custom domain. At the DNS provider, create a `CNAME` record for `api` pointing to the API service's `onrender.com` hostname shown by Render. Do not create an `AAAA` record for `api`.
4. In GitHub repository Settings > Pages, set the custom domain to `aboutalebeducation.com` and enable HTTPS after verification. At the DNS provider, point the apex domain to GitHub Pages with an `ALIAS`/`ANAME`, or GitHub's four documented `A` records; optionally point `www` to `mahmoudalielbadry.github.io`. The Pages workflow publishes the tracked `apps/web/public/CNAME` file and builds with `VITE_API_BASE_URL=https://api.aboutalebeducation.com` at the domain root.
5. Do not use `https://mahmoudalielbadry.github.io/abouteleb-education/` for authenticated production traffic: it is cross-site with the API and the `SameSite=Lax` session/CSRF cookies will not be sent. Configure `SENTRY_DSN` only after its project enforces PII scrubbing.
6. Add Resend DKIM, SPF, and return-path DNS records before production email is enabled.

## Migration and rollback

1. Take and retain a Neon backup before deployment. Restore that backup into an isolated Neon database and run a health/read-only validation.
2. Render deploys `npm run build -w @abou/api`; run `npm run db:deploy` as the release migration job before traffic is switched.
3. Roll back application code through the previous Render deploy. Never roll back a database by deleting migrations; use a forward-compatible recovery migration or restore the verified backup after an incident decision.

## Staging acceptance

- Check public navigation, direct deep links, catalog, mobile layout, Arabic RTL, and English/Turkish LTR.
- Verify client registration, email verification, login, session restore, CSRF-protected changes, logout, order ownership, cancellation, and client responses from `https://aboutalebeducation.com`.
- Confirm the API returns credentialed CORS headers for `https://aboutalebeducation.com` and does not allow `https://mahmoudalielbadry.github.io`.
- Verify client/admin authorization, content publication/archive/restore, audit records, CSRF rejection, and rate-limit responses.
- Confirm `GET /api/v1/health` and `/api/v1/health/readiness` return 200, Sentry receives a deliberately captured non-PII staging error, and UptimeRobot alerts on both public URLs.

## Production smoke and incident response

1. Run the staging checklist after deployment, then obtain business/content sign-off.
2. Deploy production, repeat health, session, public-page, and admin authorization smoke checks, then monitor Sentry and UptimeRobot during the first launch window.
3. For an incident, record the request ID and deploy version, use Sentry/logs without copying PII, roll back code where safe, and escalate database recovery only from the verified backup procedure.

## Deferred TestSprite

TestSprite is not a launch gate. Resume it only against staging with isolated accounts, a non-production OTP retrieval method, and the API/frontend targets configured separately.
