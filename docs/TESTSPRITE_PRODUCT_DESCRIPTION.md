# TestSprite Product Description

## Product overview

Abou-Taleb Education is a multilingual university-admissions web platform available in Arabic, English, and Turkish. It helps prospective students explore partner universities in Turkey, learn about admission services and registration steps, create accounts, and submit admission requests.

## Public visitor experience

Public visitors can:

- Switch between Arabic, English, and Turkish.
- Browse the responsive landing page on desktop and mobile devices.
- Search partner universities by name.
- Filter universities by city.
- View education and admission services.
- Review the admission and registration steps.
- Read published student testimonials.
- Access managed contact information and social-media links.
- Open the configured WhatsApp contact link.

## Authentication and account flows

Authentication features include:

- Account registration with the user's full name, email address, password, and required consent.
- Email verification using a six-digit verification code.
- Resending an email verification code.
- Login and authenticated-session restoration after a page refresh.
- Logout and session invalidation.
- Requesting a password reset.
- Resetting a password using a six-digit reset code.

Protected pages redirect unauthenticated users to the login page. Unverified clients may sign in, but they cannot submit an admission request until their email address is verified.

## Client admission-request flow

A verified client can submit an admission request containing:

- Full name.
- Phone number.
- Preferred specialization.
- Required consent to be contacted.

Supported specializations include Medicine, Dentistry, Pharmacy, Engineering, and Business Administration.

After a successful submission, the application displays a unique request reference. Clients can open their account dashboard to:

- View total, active, and completed request counts.
- Review all their admission requests.
- Expand a request to see its status history.
- Read client-visible messages added by an administrator.
- Submit additional admission requests.

## Administrator experience

Administrators have access to a role-protected dashboard. They can:

- View request totals and status metrics.
- Search admission requests.
- Filter requests by status and specialization.
- Sort requests by creation date or update date.
- Navigate paginated request results.
- Open the details of an individual request.
- Perform only valid request-status transitions.
- attach an optional client-visible message to a status update.
- Add internal notes that are visible only to administrators.

Admission-request statuses include:

- New.
- Contacted.
- Waiting for Client.
- In Progress.
- Completed.
- Rejected.
- Cancelled.

Administrators can also manage public website content:

- Create, edit, publish, archive, and restore universities.
- Upload university logos.
- Configure featured universities and their display order.
- Create and archive testimonials.
- Publish testimonials only after confirming client consent.
- Create, edit, reorder, archive, and restore social links.
- Update phone, email, and WhatsApp contact information.

## Authorization rules

- Visitors cannot access client-account or administrator pages.
- Ordinary clients cannot access administrator pages.
- Only verified clients can submit admission requests.
- Only administrators can manage admission requests and public website content.
- Invalid or expired authentication and verification data must produce safe error messages.

## Recommended test coverage

Tests should cover:

- Successful visitor, client, and administrator journeys.
- Required-field and consent validation.
- Invalid credentials and invalid, expired, or malformed verification codes.
- Unauthorized and forbidden access attempts.
- Authentication persistence after a page refresh.
- Language switching and right-to-left Arabic layout.
- Responsive desktop and mobile navigation.
- University search and city filtering.
- Admission-request submission and history display.
- Valid and invalid administrator status transitions.
- Public-content creation, editing, publication, archiving, and restoration.
- Loading, empty, success, and error states.
- Not-found routes and safe application errors.

## Live-testing requirements

For effective live testing, provide TestSprite with:

- One verified client test account.
- One administrator test account.
- Access to verification and password-reset codes, or pre-created accounts that avoid OTP-dependent setup.
- Clear permission boundaries defining whether tests may create admission requests or modify administrator-managed public content.
