# TestSprite Extra Testing Instructions

Paste the following text into TestSprite's **Extra testing instructions** field:

```text
Test the production API using cookie-based authentication; it does not use Bearer tokens. Preserve cookies between requests. Before login and every authenticated mutation, call GET /api/v1/auth/csrf, retain the abou_csrf cookie, and send the returned csrfToken in the X-CSRF-Token header. After login, retain the abou_session cookie.

Prioritize health/readiness, registration validation, login/session/logout, authorization boundaries, client admission-request ownership, legal order-status transitions, pagination/filtering, and public-content visibility. Verify that unauthenticated protected calls return 401, CLIENT users cannot access /api/v1/admin/* and receive 403, invalid/missing CSRF receives 403, and unverified clients cannot create admission requests. Confirm errors follow {error:{code,message,requestId}} and never expose passwords, cookies, OTPs, stack traces, internal notes, or sensitive implementation details.

Use provided dedicated CLIENT and ADMIN test accounts. Do not brute-force OTPs or passwords; authentication endpoints are rate-limited. OTP verification and reset tests require access to the test mailbox or known test codes. Use unique data with a testsprite-<timestamp> prefix. The target is the live production API: do not modify, archive, restore, reorder, or overwrite pre-existing universities, testimonials, social links, contact values, orders, or admin notes. Mutating tests may operate only on records created during the same run and must retain returned IDs for cleanup. Do not test email-delivery volume, denial-of-service, load, stress, or destructive security scenarios.

For order workflow tests, create a fresh verified-client order, confirm ownership isolation, test only documented legal transitions, and ensure terminal states reject further transitions. Verify client-visible messages appear to the owner while internal admin notes never appear in client responses. For content tests, keep new records unpublished by default; testimonial publication requires consentConfirmed=true, slugs must be unique lowercase kebab-case, and external URLs must use HTTPS. Image uploads must use multipart field file, an allowed image type, and stay below 5 MiB.
```

## Required credentials and test data

Provide TestSprite with these values through its secure credential mechanism, not inside uploaded documentation:

- Verified `CLIENT` test email and password
- `ADMIN` test email and password
- A disposable mailbox or controlled method for retrieving six-digit verification/reset codes
- An optional small disposable PNG or JPEG for upload testing

If those credentials are unavailable, instruct TestSprite to skip authenticated and OTP-dependent scenarios rather than guessing credentials or repeatedly retrying.
