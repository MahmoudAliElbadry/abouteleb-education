# Abou-Taleb Education — Manual Website Validation

## Purpose

Use this checklist to confirm that the delivered website works correctly from a visitor, client, and administrator perspective.

Record each test as **Pass**, **Fail**, **Blocked**, or **Not applicable**. For every failure, capture:

- Test ID.
- Browser and device or viewport.
- Exact steps performed.
- Expected and actual results.
- Screenshot or screen recording.
- Time of failure.
- Request ID from any displayed API error.

## Test targets

- **Website:** `https://aboutalebeducation.com`
- **API health:** `https://api.aboutalebeducation.com/api/v1/health`
- **API readiness:** `https://api.aboutalebeducation.com/api/v1/health/readiness`

## Safety rules

1. Use dedicated QA client and administrator accounts.
2. Prefix new test data with `QA-` and the current date, for example `QA-2026-08-26`.
3. Do not modify or archive real client requests or existing public content.
4. Do not repeatedly request email codes or attempt passwords; authentication endpoints are rate-limited.
5. Do not test denial-of-service, brute-force, or destructive security scenarios.
6. Use a non-customer email address and phone number in test admission requests.
7. Archive only records created during this validation. Keep a list of their IDs, references, and names.
8. Tests marked **Staging/local only** must not be performed against production.

## Required test accounts and data

- One new disposable email address for registration and verification.
- One verified `CLIENT` account.
- One `ADMIN` account.
- Access to the disposable and client mailboxes.
- One small PNG or JPEG image under 5 MiB for optional upload testing.
- Three test admission requests when validating the complete client workflow:
  - One request for the normal administrator lifecycle.
  - One request for client cancellation.
  - One request for the Waiting for Client response flow.

Never write passwords or verification codes in this document.

## Browser and viewport matrix

Run the complete critical path in the primary browser and the public/responsive checks in the others.

| Target | Minimum coverage | Result |
|---|---|---|
| Chrome or Chromium desktop | Complete checklist | |
| Firefox desktop | Public page, authentication, and client request | |
| Mobile viewport — 390 × 844 | Public navigation, forms, account, and admin navigation | |
| Tablet viewport — 768 × 1024 | Public page and admin layout | |

---

## 1. Service availability

### MAN-001 — Website loads over HTTPS

1. Open `https://aboutalebeducation.com` in a private browser window.
2. Confirm the browser reports a secure HTTPS connection.
3. Refresh the page.

**Expected:** The page loads without a certificate warning, blank screen, or infinite loading state.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-002 — API health

1. Open `https://api.aboutalebeducation.com/api/v1/health`.

**Expected:** HTTP 200 with JSON containing `"status":"ok"` and `"service":"api"`.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-003 — API readiness

1. Open `https://api.aboutalebeducation.com/api/v1/health/readiness`.

**Expected:** HTTP 200 with `"status":"ok"` and database check `"ok"`.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-004 — Direct route loading

Open each URL directly in a new tab, then refresh it:

- `/login`
- `/register`
- `/forgot-password`
- `/account` while signed out
- `/admin/orders` while signed out
- A nonexistent route such as `/this-route-does-not-exist`

**Expected:** Public routes load normally; protected routes redirect to login; the nonexistent route shows the application's not-found page rather than a hosting-provider 404.

Result: ☐ Pass ☐ Fail ☐ Blocked

---

## 2. Public website

### MAN-005 — Header and navigation

1. Open the home page.
2. Confirm the logo and product name are visible.
3. Use every header navigation link.
4. Confirm each link scrolls to the correct section.
5. Scroll down until the back-to-top button appears.
6. Use the back-to-top button.

**Expected:** Navigation reaches Home, Universities, Services, Registration Steps, and Contact. Back-to-top returns to the page beginning.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-006 — Hero, services, steps, and statistics

1. Review the hero heading, description, and calls to action.
2. Select the enrollment call to action.
3. Select the services call to action.
4. Review company statistics, service cards, and registration steps.

**Expected:** Content is readable, calls to action reach the correct sections, and no section overlaps or disappears.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-007 — University catalog

1. Confirm university cards load with names, cities, and logos.
2. Search using part of a known university name.
3. Search using different letter casing.
4. Filter by each available city.
5. Combine search and city filters.
6. Search for a value that has no matches.
7. Clear all filters.
8. If more than eight results exist, use Show More and Show Less.

**Expected:** Results match the active filters, the empty state appears when appropriate, clearing filters restores the catalog, and broken images fall back gracefully.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-008 — Testimonials and contact information

1. Review the published testimonials section if it contains records.
2. Verify phone and email contact information.
3. Open each visible social link in a new tab.
4. Select the floating WhatsApp button.

**Expected:** Only published content is shown. Links use the correct destination, external links open safely, email links open the mail client, and WhatsApp uses the configured number.

Result: ☐ Pass ☐ Fail ☐ Blocked

---

## 3. Languages and layout direction

### MAN-009 — English

1. Select English.
2. Review the header, hero, catalog, services, steps, enrollment, testimonials, and contact sections.

**Expected:** Visible interface text is English and the page uses left-to-right layout.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-010 — Arabic

1. Select Arabic.
2. Review all public sections and forms.
3. Open login, registration, account, and administrator pages where permitted.

**Expected:** Visible interface text is Arabic, layout direction changes to right-to-left, and controls remain aligned and usable.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-011 — Turkish

1. Select Turkish.
2. Review the public page and forms.

**Expected:** Visible interface text is Turkish and the page uses left-to-right layout.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-012 — Language persistence

1. Select each language in turn.
2. Navigate between public, authentication, account, and administrator pages.
3. Refresh the browser.

**Expected:** The selected language remains consistent across navigation and refreshes.

Result: ☐ Pass ☐ Fail ☐ Blocked

---

## 4. Responsive and accessibility smoke checks

### MAN-013 — Mobile public navigation

1. Set the viewport to 390 × 844.
2. Open the navigation menu.
3. Use every navigation link.
4. Reopen and close the menu.

**Expected:** The menu opens and closes, reports its expanded state, does not cover required controls permanently, and closes after navigation.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-014 — Responsive forms and content

At mobile and tablet sizes, review:

- University cards and catalog controls.
- Login and registration forms.
- Enrollment form.
- Client account and request history.
- Administrator sidebar, tables, forms, and request detail.

**Expected:** No horizontal page overflow, clipped controls, overlapping text, or unreachable actions.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-015 — Keyboard and focus smoke test

1. Reload the home page.
2. Navigate interactive controls using only `Tab`, `Shift+Tab`, `Enter`, `Space`, and arrow keys.
3. Repeat on login, registration, enrollment, and administrator pages.

**Expected:** Focus is visible, order is logical, buttons and links activate by keyboard, selects and checkboxes work, and focus is not trapped.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-016 — Labels and user feedback

1. Confirm form fields have visible labels.
2. Trigger a required-field validation error.
3. Trigger a safe application error using invalid credentials.

**Expected:** Fields are identifiable, errors are readable and associated with the action, success states are announced clearly, and no technical stack trace or secret is displayed.

Result: ☐ Pass ☐ Fail ☐ Blocked

---

## 5. Registration and email verification

### MAN-017 — Registration validation

1. Open `/register`.
2. Attempt submission with empty fields.
3. Enter an invalid email.
4. Enter a password shorter than eight characters.
5. Complete valid fields without accepting consent.

**Expected:** Invalid submissions are blocked and consent is required.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-018 — Register a disposable client

1. Enter a QA full name, disposable email, valid password, and accept consent.
2. Submit once.
3. Check the mailbox.

**Expected:** Registration succeeds, the browser navigates to email verification, and one branded six-digit verification email arrives without exposing the code elsewhere.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-019 — Unverified-client restriction

1. Before verifying, sign in using the new account.
2. Open the enrollment section.

**Expected:** Sign-in may succeed, but admission-request submission remains locked and the user is directed to verify their email.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-020 — Verification validation and resend

1. Submit a malformed code that is not six digits.
2. Submit an incorrect six-digit code once.
3. Use Resend Verification once and check the mailbox.
4. Submit the latest valid code.

**Expected:** Invalid codes fail safely; resend produces a new email; the valid code verifies the account and directs the user to login.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-021 — Duplicate registration

1. Attempt to register the same verified email again.

**Expected:** Registration is rejected safely without creating another account.

Result: ☐ Pass ☐ Fail ☐ Blocked

---

## 6. Login, session, logout, and password reset

### MAN-022 — Invalid login

1. Open `/login`.
2. Enter a known test email and an incorrect password once.

**Expected:** Login fails with a safe message and reveals neither whether unrelated accounts exist nor any technical details.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-023 — Verified client login and session restoration

1. Sign in using the verified client account.
2. Confirm client-specific header actions appear.
3. Open `/account`.
4. Refresh the page.
5. Close and reopen the tab during the same browser session.

**Expected:** Login succeeds, the client—not administrator—experience appears, and the session restores after refresh.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-024 — Logout and protected-route guard

1. Sign out.
2. Refresh the page.
3. Open `/account` directly.

**Expected:** Authenticated controls disappear, the session is no longer accepted, and the protected route redirects to login.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-025 — Forgot-password privacy

1. Open `/forgot-password`.
2. Submit the disposable test email.
3. In a separate attempt, submit an unused email address once.

**Expected:** Both requests show a generic response that does not reveal whether the account exists. The real test account receives a reset email.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-026 — Password reset

1. Open the reset page using the test account email.
2. Try one incorrect six-digit reset code.
3. Enter the valid code and a new password of at least eight characters.
4. Attempt login with the old password.
5. Log in with the new password.

**Expected:** Invalid code fails safely, reset succeeds, old credentials stop working, and the new password works.

Result: ☐ Pass ☐ Fail ☐ Blocked

---

## 7. Client admission-request workflow

### MAN-027 — Signed-out enrollment gate

1. Sign out and open the enrollment section.
2. Select Sign In.

**Expected:** The form is locked and login retains a redirect back to enrollment.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-028 — Admission-request validation

1. Sign in as the verified QA client.
2. Open the enrollment form.
3. Confirm the known full name is prefilled where applicable.
4. Attempt submission without phone number or consent.

**Expected:** Required fields and contact consent are enforced; no request is created.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-029 — Create an admission request

1. Enter a QA full name and non-customer phone number.
2. Select one specialization.
3. Accept contact consent.
4. Submit once.
5. Record the returned reference here: `________________`.
6. Check the test mailbox.

**Expected:** One request is created, a unique reference appears, the form resets, and the configured submission email arrives.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-030 — Client account dashboard

1. Open `/account`.
2. Confirm the QA request appears.
3. Verify total and active counts.
4. Expand the request.

**Expected:** Only the signed-in client's requests appear; reference, specialization, status, submission date, history, and client-visible messages are correct.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-031 — Dedicated request-history page

1. Open `/account/orders`.
2. Review the list and timeline.
3. Use pagination if the account has enough requests.

**Expected:** Owned requests and their histories load; pagination does not duplicate or omit records.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-031A — Client cancellation

1. Create a separate QA request and leave it in `NEW`, `CONTACTED`, or `WAITING_FOR_CLIENT`.
2. Open its client-facing details.
3. Select the cancellation action and confirm it.
4. Refresh the account page and request history.
5. Attempt to cancel it again.

**Expected:** An eligible request provides a clear cancellation action, changes once to `CANCELLED`, records the transition in its timeline, and cannot be cancelled again. Requests in `IN_PROGRESS`, `COMPLETED`, `REJECTED`, or `CANCELLED` do not offer client cancellation.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-031B — Client response while Waiting for Client

1. Create a separate QA request.
2. As administrator, move it through the legal path to `WAITING_FOR_CLIENT` and include a clear request for information.
3. Sign in as the owning client and open the request.
4. Confirm the administrator's message is visible.
5. Submit one QA response containing between 1 and 2000 characters.
6. Attempt to submit a blank response and a second response.
7. Return to the administrator request details.

**Expected:** The client can respond only while the request is `WAITING_FOR_CLIENT`; the valid response appears once for the administrator; blank, duplicate, and wrong-state responses are rejected safely.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-032 — Ownership boundary

1. While signed in as QA Client A, obtain a request URL or ID belonging to QA Client B in a controlled test environment.
2. Attempt to open it.

**Expected:** Client A cannot read or modify Client B's request.

**Production rule:** Perform only when both accounts and requests are dedicated QA data.

Result: ☐ Pass ☐ Fail ☐ Blocked

---

## 8. Administrator access and request management

### MAN-033 — Client cannot access administrator pages

1. Sign in as the QA client.
2. Open `/admin/orders` directly.

**Expected:** Access is denied by redirecting away from the administrator interface. No administrator data is displayed.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-034 — Administrator login and navigation

1. Sign out, then sign in with the administrator account.
2. Confirm navigation goes to the administrator area.
3. Visit Orders, Universities, Testimonials, and Contact & Social.
4. At mobile width, open and close the administrator navigation.

**Expected:** All administrator sections load. The enrollment call to action is not offered to the administrator. Mobile navigation remains usable.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-035 — Request metrics and filtering

1. Open administrator Orders.
2. Confirm total and status metrics load.
3. Search for the QA request reference, client name, or email.
4. Filter by its status.
5. Filter by its specialization.
6. Sort ascending and descending by creation and update time.
7. Use pagination if available.

**Expected:** Metrics are plausible, the QA request is found, filters combine correctly, and sorting/pagination update results without errors.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-036 — Request details and internal note

1. Open the QA request.
2. Verify client identity, phone, email, specialization, current status, history, and responses.
3. Add an internal note beginning with `QA-`.
4. Sign in as the client and inspect the request.

**Expected:** The note is saved for administrators but never appears in the client interface.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-037 — Legal status transitions and client message

Using only the QA request, perform the shortest appropriate path without skipping required states:

1. `NEW` → `CONTACTED`.
2. Add a client-visible QA message.
3. Confirm the status email reaches the test mailbox.
4. Sign in as the client and confirm the new status and message appear.
5. Continue only if needed: `CONTACTED` → `IN_PROGRESS` → `COMPLETED`.

**Expected:** Only legal next statuses are offered, each transition appears once in history, client-visible messages reach the client, and terminal status offers no further transition.

Result: ☐ Pass ☐ Fail ☐ Blocked

---

## 9. Administrator-managed public content

Use only newly created QA records. Keep them unpublished unless publication visibility is the behavior under test.

### MAN-038 — University management

1. Create an unpublished university with a unique `qa-<date>-university` slug and QA names in all three languages.
2. Use a valid existing test image or approved upload.
3. Confirm an HTTP website URL is rejected and an HTTPS URL is accepted.
4. Save, search for, and edit the record.
5. Confirm it does not appear publicly while unpublished.
6. Publish it temporarily and confirm it appears in the public catalog in all three languages.
7. Unpublish or archive it immediately.
8. Confirm it disappears publicly.
9. Restore it only to verify restore behavior, then leave it archived.

**Expected:** Create, validation, update, publication, localization, archive, and restore behave correctly without changing existing universities.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-039 — Testimonial consent and publication

1. Create a QA testimonial without consent.
2. Confirm publication cannot be selected or saved without consent.
3. Confirm consent, publish the QA testimonial, and verify it appears publicly.
4. Archive it and confirm it disappears.

**Expected:** Publication requires explicit consent and only published, non-archived testimonials appear publicly.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-040 — Social-link management

1. Create a QA social link using a unique platform label and HTTPS URL.
2. Edit it.
3. Move it up and down.
4. Verify visible ordering on the public page.
5. Archive it and confirm it disappears.
6. Restore it to verify restore behavior, then leave it archived.

**Expected:** Create, edit, ordering, visibility, archive, and restore work without altering existing links.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-041 — Contact information

1. Record the current phone, primary email, secondary email, and WhatsApp values.
2. Confirm the administrator form shows the same values as the public page.
3. Save each existing value unchanged.
4. Refresh both administrator and public pages.

**Expected:** Values persist and the public page remains unchanged.

**Production rule:** Do not replace real contact details with QA values.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-042 — Image upload

1. Select a valid PNG or JPEG under 5 MiB.
2. Confirm the returned preview is accessible over HTTPS.
3. Try an unsupported file type.
4. Try an image over 5 MiB only in staging/local.

**Expected:** Valid images upload successfully; unsupported or oversized files are rejected safely.

**Production rule:** Skip unless creating one approved QA content record; uploads create persistent cloud assets.

Result: ☐ Pass ☐ Fail ☐ Blocked ☐ Not applicable

---

## 10. Error handling and security smoke checks

### MAN-043 — Authentication and authorization boundaries

Confirm the following using normal browser navigation:

- Signed-out visitor cannot access `/account`.
- Signed-out visitor cannot access `/admin/orders`.
- Client cannot access any `/admin/*` page.
- Administrator can access administrator pages.
- Unverified client cannot submit an admission request.

**Expected:** Each role sees only its permitted interface and data.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-044 — Safe errors

1. Trigger ordinary invalid-form and invalid-login errors.
2. Inspect visible messages and, when appropriate, the browser Network panel.

**Expected:** Errors contain a safe code/message and request ID where applicable. They do not expose passwords, OTPs, cookie contents, database details, stack traces, environment variables, or internal notes.

Result: ☐ Pass ☐ Fail ☐ Blocked

### MAN-045 — Cross-origin session smoke check

1. Use the production website—not a `github.io` or unrelated origin—to log in.
2. Confirm account and administrator API calls succeed from the production site.
3. Inspect one successful API response in the Network panel.

**Expected:** Credentialed requests work only from the intended website origin, session cookies are not readable by page JavaScript when HttpOnly applies, and no CORS error appears.

Result: ☐ Pass ☐ Fail ☐ Blocked

---

## 11. Final delivery smoke test

Run this short sequence after all fixes and immediately before delivery:

1. Confirm website HTTPS and API health/readiness.
2. Open the home page in English, Arabic, and Turkish.
3. Search and filter universities.
4. Verify contact, social, and WhatsApp links.
5. Register and verify a disposable client, or use the verified QA client.
6. Log in, refresh, and confirm session restoration.
7. Submit one QA admission request and record its reference.
8. Confirm the request appears in the client account.
9. Log in as administrator and locate the same request.
10. Add one client-visible status update.
11. Confirm the client sees that update.
12. Confirm the client cannot access administrator pages.
13. Confirm mobile navigation and forms at 390 × 844.
14. Sign out and confirm protected routes return to login.
15. Review browser console and Network panels for unexpected errors.

**Delivery gate:** All tests marked critical below must pass.

Critical tests: MAN-001 through MAN-004, MAN-007, MAN-009 through MAN-014, MAN-017 through MAN-024, MAN-027 through MAN-031B, MAN-033 through MAN-037, and MAN-043 through MAN-045.

---

## Test summary

| Result | Count |
|---|---:|
| Passed | |
| Failed | |
| Blocked | |
| Not applicable | |

### Outstanding failures

| Test ID | Severity | Summary | Owner | Resolution |
|---|---|---|---|---|
| | | | | |

### QA data created

| Type | Identifier/reference | Final state | Cleanup notes |
|---|---|---|---|
| Account | | | |
| Admission request | | | |
| University | | Archived | |
| Testimonial | | Archived | |
| Social link | | Archived | |
| Uploaded image | | | |

## Sign-off

- Tester: `____________________________`
- Date and time: `____________________________`
- Website version or commit: `____________________________`
- Browser/device: `____________________________`
- Final result: ☐ Approved ☐ Approved with known issues ☐ Rejected
- Notes: `____________________________________________________________`
