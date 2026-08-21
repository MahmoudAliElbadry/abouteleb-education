# Phase 7 launch runbook

## Provisioning

1. Create separate Neon staging and production projects. Store each `DATABASE_URL` only in its matching Render environment.
2. Create the Render API Web Service and Static Site from `render.yaml`. Set the API `WEB_ORIGIN` to the primary static-site URL, or set `WEB_ORIGINS` to a comma-separated allowlist when more than one frontend origin is active. For the temporary Pages deployment, use `https://mahmoudalielbadry.github.io,https://aboutalebeducation.com`. Set `COOKIE_DOMAIN` only once the web app and API share a production parent domain.
3. Set `VITE_API_BASE_URL` during the static-site build, and configure `SENTRY_DSN` / `VITE_SENTRY_DSN` only after their projects enforce PII scrubbing.
4. Add Resend DKIM, SPF, and return-path DNS records before production email is enabled.

## Migration and rollback

1. Take and retain a Neon backup before deployment. Restore that backup into an isolated Neon database and run a health/read-only validation.
2. Render deploys `npm run build -w @abou/api`; run `npm run db:deploy` as the release migration job before traffic is switched.
3. Roll back application code through the previous Render deploy. Never roll back a database by deleting migrations; use a forward-compatible recovery migration or restore the verified backup after an incident decision.

## Staging acceptance

- Check public navigation, direct deep links, catalog, mobile layout, Arabic RTL, and English/Turkish LTR.
- Verify client registration, email verification, login, logout, order ownership, cancellation, and client responses.
- Verify client/admin authorization, content publication/archive/restore, audit records, CSRF rejection, and rate-limit responses.
- Confirm `GET /api/v1/health` and `/api/v1/health/readiness` return 200, Sentry receives a deliberately captured non-PII staging error, and UptimeRobot alerts on both public URLs.

## Production smoke and incident response

1. Run the staging checklist after deployment, then obtain business/content sign-off.
2. Deploy production, repeat health, session, public-page, and admin authorization smoke checks, then monitor Sentry and UptimeRobot during the first launch window.
3. For an incident, record the request ID and deploy version, use Sentry/logs without copying PII, roll back code where safe, and escalate database recovery only from the verified backup procedure.

## Deferred TestSprite

TestSprite is not a launch gate. Resume it only against staging with isolated accounts, a non-production OTP retrieval method, and the API/frontend targets configured separately.
