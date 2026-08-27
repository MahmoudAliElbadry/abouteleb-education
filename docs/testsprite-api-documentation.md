# Abou-Taleb Education API Documentation

## Connection details

- **Production API base URL:** `https://api.aboutalebeducation.com`
- **API prefix:** `/api/v1`
- **Health check:** `GET /api/v1/health`
- **Readiness check:** `GET /api/v1/health/readiness`
- **Content type:** `application/json`, except image upload requests

Use the origin alone in TestSprite's **API Base URL** field:

```text
https://api.aboutalebeducation.com
```

Endpoint paths in this document already contain `/api/v1`.

## Authentication and CSRF

The API uses cookie-based sessions rather than bearer tokens.

- Session cookie: `abou_session` (HttpOnly in production)
- CSRF cookie: `abou_csrf`
- The client must preserve cookies between requests.
- Before login or any authenticated state-changing request, call `GET /api/v1/auth/csrf`.
- Read `csrfToken` from the response and send it as the `X-CSRF-Token` header.
- Authenticated state-changing requests require both the session cookie and matching CSRF header.
- Protected client endpoints require a signed-in user.
- `/api/v1/admin/*` endpoints require a signed-in user with the `ADMIN` role.

Example login sequence:

1. `GET /api/v1/auth/csrf` and retain the issued cookies.
2. `POST /api/v1/auth/login` with the returned token in `X-CSRF-Token`.
3. Retain the session and CSRF cookies for later requests.
4. Call `GET /api/v1/auth/session` to confirm the authenticated identity and role.

## Common responses

Successful JSON responses use the schemas described below. A `204` response has no body.

Errors use this safe structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "requestId": "request-trace-id"
  }
}
```

Common status codes are:

- `400` invalid input or invalid workflow transition
- `401` missing, invalid, expired, or revoked session
- `403` invalid CSRF token, insufficient role, or unverified client
- `404` resource or route not found
- `409` conflicting resource, such as an existing account or duplicate slug
- `429` rate limit reached on sensitive endpoints
- `500` safe internal error without secrets
- `503` readiness dependency unavailable

## Core schemas

### Public user

```json
{
  "id": "string",
  "email": "client@example.com",
  "role": "CLIENT | ADMIN",
  "emailVerified": true,
  "fullName": "Client Name | null"
}
```

### Admission-request enums

- Specializations: `medicine`, `dentistry`, `pharmacy`, `engineering`, `business`
- Statuses: `NEW`, `CONTACTED`, `WAITING_FOR_CLIENT`, `IN_PROGRESS`, `COMPLETED`, `REJECTED`, `CANCELLED`

Valid status transitions are:

- `NEW` -> `CONTACTED`, `REJECTED`, or `CANCELLED`
- `CONTACTED` -> `WAITING_FOR_CLIENT` or `IN_PROGRESS`
- `WAITING_FOR_CLIENT` -> `IN_PROGRESS`
- `IN_PROGRESS` -> `COMPLETED`, `REJECTED`, or `CANCELLED`
- Terminal statuses `COMPLETED`, `REJECTED`, and `CANCELLED` have no outgoing transitions.

## Health endpoints

| Method | Path | Authentication | Description |
|---|---|---|---|
| GET | `/api/v1/health` | Public | Returns `{ "status": "ok", "service": "api" }`. |
| GET | `/api/v1/health/readiness` | Public | Checks the database. Returns `200` when ready or `503` when unavailable. |

## Authentication endpoints

| Method | Path | Authentication | Request body | Success |
|---|---|---|---|---|
| POST | `/api/v1/auth/register` | Public | `fullName` 2-120 chars, valid `email`, `password` 8-128 chars, `consentAccepted: true` | `201` with `user` and verification message |
| POST | `/api/v1/auth/verify-email` | Public | `email`, six-digit `code` | `200` with verified `user` |
| POST | `/api/v1/auth/resend-verification` | Public | `email` | `200` generic anti-enumeration message |
| GET | `/api/v1/auth/csrf` | Public | None | `200` with `{ "csrfToken": "..." }` and CSRF cookie |
| POST | `/api/v1/auth/login` | CSRF | `email`, `password` | `200` with `user` and session cookie |
| POST | `/api/v1/auth/logout` | Session + CSRF | None | `204`; revokes session |
| GET | `/api/v1/auth/session` | Session | None | `200` with current `user` |
| POST | `/api/v1/auth/forgot-password` | Public | `email` | `200` generic anti-enumeration message |
| POST | `/api/v1/auth/reset-password` | Public | `email`, six-digit `code`, `newPassword` 8-128 chars | `200` success message; existing sessions are invalidated |

Authentication endpoints are rate-limited. Do not repeatedly brute-force passwords or six-digit codes.

## Client admission-request endpoints

All endpoints in this section require an authenticated client session. State-changing endpoints also require CSRF.

| Method | Path | Request | Success |
|---|---|---|---|
| GET | `/api/v1/orders?page=1&pageSize=10` | Query: `page >= 1`, `pageSize` 1-50 | Paginated list of the current client's requests |
| POST | `/api/v1/orders` | `{ "fullName": "2-120 chars", "phoneNumber": "7-32 chars", "specialization": "medicine" }` | `201` with `{ "order": ... }`; verified clients only |
| GET | `/api/v1/orders/{orderId}` | Owned request ID | `200` with `{ "order": ... }` |
| POST | `/api/v1/orders/{orderId}/cancel` | No body | `204` if cancellation is permitted |
| POST | `/api/v1/orders/{orderId}/responses` | `{ "body": "1-2000 chars" }` | `201` with the created client response |

An order representation includes its ID, unique reference, client details, specialization and label, current status, submission/update timestamps, status history, client-visible messages, and—on detailed views—client responses as applicable. A client must never be able to read or mutate another client's order.

## Administrator admission-request endpoints

All endpoints require an authenticated administrator. State-changing endpoints also require CSRF.

| Method | Path | Request | Success |
|---|---|---|---|
| GET | `/api/v1/admin/orders/metrics` | None | Total and per-status counts |
| GET | `/api/v1/admin/orders` | Optional query: `status`, `specialization`, `search` max 120, `sort=createdAt|updatedAt`, `order=asc|desc`, `page`, `pageSize` 1-100 | Paginated request list |
| GET | `/api/v1/admin/orders/{orderId}` | Request ID | Detailed order, history, internal notes, and client responses |
| POST | `/api/v1/admin/orders/{orderId}/status` | `{ "to": "STATUS", "clientVisibleMessage": "optional, max 2000" }` | `200` with completed transition |
| POST | `/api/v1/admin/orders/{orderId}/internal-notes` | `{ "body": "1-2000 chars" }` | `201` with created internal note |

Internal notes must not appear in client order responses. Invalid or terminal status transitions must be rejected.

## Public-content endpoints

| Method | Path | Authentication | Success |
|---|---|---|---|
| GET | `/api/v1/universities` | Public | `{ "items": [...] }` containing published, non-archived universities |
| GET | `/api/v1/universities/{slug}` | Public | `{ "university": ... }` for a published university |
| GET | `/api/v1/testimonials` | Public | Published, consented, non-archived testimonials |
| GET | `/api/v1/social-links` | Public | Visible, non-archived social links in display order |
| GET | `/api/v1/contact` | Public | Managed public contact values |

### University fields

`slug`, `nameAr`, `nameEn`, `nameTr`, `city`, `imageUrl`, nullable HTTPS `websiteUrl`, `featured`, `sortOrder`, timestamps. Admin responses also include `isPublished` and nullable `archivedAt`.

### Testimonial fields

`clientNameAr`, `clientNameEn`, `clientNameTr`, `quoteAr`, `quoteEn`, `quoteTr`, nullable `imageUrl`, `sortOrder`, timestamps. Publishing requires `consentConfirmed: true`.

### Social-link fields

`platform`, localized labels, HTTPS `url`, `iconKey`, visibility, `sortOrder`, timestamps. Icon keys are `whatsapp`, `facebook`, `instagram`, `telegram`, `x`, or `linkedin`.

## Administrator content endpoints

All endpoints require an administrator session. Mutations also require CSRF.

### Universities

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/admin/universities` | List with `page`, `pageSize`, `search`, and optional `isPublished=true|false` |
| GET | `/api/v1/admin/universities/{universityId}` | Read one managed university |
| POST | `/api/v1/admin/universities` | Create a university |
| PATCH | `/api/v1/admin/universities/{universityId}` | Partially update a university |
| POST | `/api/v1/admin/universities/{universityId}/archive` | Archive; returns `204` |
| POST | `/api/v1/admin/universities/{universityId}/restore` | Restore; returns `204` |

Create body:

```json
{
  "slug": "test-university",
  "nameAr": "Test AR",
  "nameEn": "Test University",
  "nameTr": "Test TR",
  "city": "istanbul",
  "imageUrl": "/images/logo.png",
  "websiteUrl": "https://example.com",
  "featured": false,
  "isPublished": false,
  "sortOrder": 0
}
```

The slug must contain lowercase letters, digits, and single hyphens only. External website and image URLs must use HTTPS. `imageUrl` may alternatively be a local `/images/...` PNG, SVG, WebP, JPEG, or JPG path.

### Testimonials

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/admin/testimonials` | List managed testimonials |
| GET | `/api/v1/admin/testimonials/{testimonialId}` | Read one testimonial |
| POST | `/api/v1/admin/testimonials` | Create a testimonial |
| PATCH | `/api/v1/admin/testimonials/{testimonialId}` | Partially update a testimonial |
| POST | `/api/v1/admin/testimonials/{testimonialId}/archive` | Archive; returns `204` |
| POST | `/api/v1/admin/testimonials/{testimonialId}/restore` | Restore; returns `204` |

Localized names are 1-500 characters and quotes are 1-2000 characters. A testimonial cannot be published unless `consentConfirmed` is true.

### Social links

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/admin/social-links` | List managed social links |
| POST | `/api/v1/admin/social-links` | Create a social link |
| PATCH | `/api/v1/admin/social-links/{socialLinkId}` | Partially update a social link |
| POST | `/api/v1/admin/social-links/{socialLinkId}/archive` | Archive; returns `204` |
| POST | `/api/v1/admin/social-links/{socialLinkId}/restore` | Restore; returns `204` |

### Contact information

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/admin/contact` | Read all managed contact values |
| PUT | `/api/v1/admin/contact/{key}` | Upsert `{ "value": "1-500 chars" }` |

Allowed contact keys are `contact_phone`, `contact_email_primary`, `contact_email_secondary`, and `contact_whatsapp`.

### Image uploads

| Method | Path | Request | Success |
|---|---|---|---|
| POST | `/api/v1/admin/uploads/image` | `multipart/form-data`, one field named `file`, maximum 5 MiB, supported image MIME type | `201` with `{ "secure_url": "https://..." }` |

## Live-test safety

The production API sends real verification and status-notification email and stores persistent data. Prefer dedicated test accounts and clearly prefixed test records, such as `testsprite-<timestamp>`. Do not archive, overwrite, or reorder existing production content. Clean up only records created by the same test run, using their exact returned IDs.

