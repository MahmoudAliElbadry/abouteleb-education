# Abou-Taleb Education — Current Project Baseline

**Scanned:** 2026-08-17  
**Repository:** `MahmoudAliElbadry/abouteleb-education`  
**Current branch:** `main`  
**Current commit:** `a0932e2` — إضافة لوجهات الجامعات في القائمة المنسدلة

## 1. Executive summary

The current primary project is a static, single-page website. It is **not currently a Next.js project**: there is no `package.json`, `src/`, `app/`, `pages/`, build configuration, or test setup in the repository.

The site is designed for Abou-Taleb Education, an education consultancy helping students apply to Turkish universities. The page is Arabic-first (`rtl`) and includes an English translation mode.

## 2. Repository structure

```text
.
├── CNAME                 # Custom domain for GitHub Pages
├── README.md             # Short Arabic project description and public links
├── index.html            # Complete page: HTML, inline CSS, and inline JavaScript
└── images/
    ├── logo.png          # Brand logo
    └── 41 university PNG logos
```

There are no application source directories, reusable components, local stylesheets, local JavaScript modules, environment files, package manager files, or automated tests.

## 3. Runtime and deployment

- Hosting model: static hosting, apparently GitHub Pages.
- Custom domain declared in `CNAME`: `aboutalebeducation.com`.
- Repository remote: `https://github.com/MahmoudAliElbadry/abouteleb-education.git`.
- Public link currently documented in `README.md`: `https://mahmoudalielbadry.github.io/abouteleb-education/`.
- There is no local build step. The site can be opened directly from `index.html` or served by any static HTTP server.
- There is no documented development, lint, test, or deployment command.

## 4. Page sections and user-facing features

`index.html` currently contains:

1. Sticky dark navigation bar with logo, section links, university dropdown, contact dropdown, language selector, CTA, and mobile menu.
2. Hero section promoting study in Turkey and free university admission support.
3. Statistics bar showing partner universities, registered students, guaranteed admission, and years of experience.
4. University directory generated from a JavaScript array of 41 universities.
5. Four service cards:
   - University admission
   - Exclusive discounts
   - Document preparation
   - Accommodation
6. Four-step registration journey.
7. Contact section with social channels, two email addresses, WhatsApp, and a lead form.
8. Footer with social links and copyright text.
9. Floating WhatsApp button.

## 5. Current technical implementation

### HTML and CSS

- All markup and CSS are in `index.html`.
- CSS uses custom properties for the primary red, dark colors, typography, borders, shadows, and transitions.
- Responsive breakpoints are defined for widths below `768px` and `480px`.
- The document starts as Arabic RTL and changes to LTR when English is selected.
- Font family: Cairo, loaded from Google Fonts.

### JavaScript

The inline script is responsible for:

- Initializing AOS scroll animations.
- Rendering university cards from `universitiesList`.
- Rendering the university and contact dropdown menus.
- Switching all visible copy between Arabic and English using the `translations` object.
- Toggling the language dropdown and mobile navigation.
- Initializing `intl-tel-input` for the phone field.
- Submitting lead data to a Google Apps Script endpoint.

### External browser dependencies

The page loads these assets from CDNs at runtime:

- Google Fonts: Cairo
- Font Awesome `6.0.0-beta3`
- AOS `2.3.1` CSS and JavaScript
- `intl-tel-input` `17.0.8` CSS and JavaScript
- `intl-tel-input` utility script
- `ipapi.co` for country detection
- `placehold.co` as an image fallback

The page therefore depends on network access and third-party availability for some visual and form behavior.

## 6. Lead form flow

The form collects:

- Full name
- Phone number
- Desired major: medicine, dentistry, pharmacy, engineering, or business

On submission, the browser sends a JSON payload to a Google Apps Script URL using `POST` and `mode: 'no-cors'`. The payload includes empty placeholders for email, nationality, qualification, message, and file URL.

Because the request uses `no-cors`, the browser cannot inspect the response. The UI displays success after the request resolves, so a server-side failure may still appear successful to the visitor.

## 7. Assets and content observations

- There are 41 university logo files plus the main logo.
- University filenames contain unusual encoding artifacts such as `_ç`, `_ê`, and Arabic characters. They currently match the strings referenced by the JavaScript array, but they are fragile to rename, migrate, or consume from a case-sensitive deployment environment.
- The university logos are large PNGs, mostly `1563 × 1563`, and the total repository size is approximately 14 MB. This is a likely performance optimization area.
- The logo file is named `logo.png` but is detected as a JPEG image internally.
- The visible claims `+50` universities, `+1500` students, `100%` guaranteed admission, and `+8` years experience are hard-coded marketing content and should be confirmed before future redesign or migration.

## 8. Current risks and technical debt

### High priority

- The project structure does not match the previous Next.js assumption. Any Next.js work will require an intentional migration or a separate app structure.
- The form endpoint is hard-coded directly into the HTML. It should be moved behind a controlled configuration or server-side endpoint before substantial production work.
- Form success is optimistic because of `no-cors`; there is no reliable client-visible confirmation that the lead was stored.
- The page has no automated validation, browser tests, linting, or build verification.

### Medium priority

- `index.html` combines content, styling, translations, data, and behavior in one file, making changes difficult to review and reuse.
- Arabic messages are hard-coded in validation and submission states, so those states are not fully translated when English mode is selected.
- The mobile navigation links do not visibly include the university dropdown item even though the desktop navigation does.
- `target="_blank"` is used on several links without `rel="noopener noreferrer"`; the floating WhatsApp link includes the safer attributes, but the other external links do not.
- University image fallback requests an external placeholder service instead of using a local fallback asset.
- External CDN dependencies are unpinned at the integrity level; there are no Subresource Integrity hashes.

### Low priority

- The README is minimal and does not describe how to run, test, or deploy the site.
- Some repository and public-site naming is inconsistent: the repository is `abouteleb-education`, while the brand/domain uses `aboutalebeducation.com`.
- The public README social links and the actual page social links are not fully identical, so they should be reconciled.

## 9. Safe starting points for future work

Before implementing new features, confirm which direction is intended:

### Option A — Continue the static site

Keep GitHub Pages deployment and gradually split `index.html` into local CSS, JavaScript, and data files. This is the smallest change and preserves the current hosting model.

### Option B — Migrate to Next.js

Create a deliberate Next.js application structure, move the current sections into components, decide how university data and images will be managed, and replace the Google Apps Script submission with a documented API/server action or retain it behind an explicit integration boundary.

For either option, the first implementation pass should establish a reliable local preview, fix asset naming/encoding, define content ownership, and add a smoke test for navigation, language switching, and form validation.

## 10. Recommended next working sequence

1. Confirm whether the target is a redesign of this static site or a Next.js migration.
2. Confirm the canonical production domain and social/contact details.
3. Verify the Google Apps Script endpoint and the destination sheet/lead workflow.
4. Decide whether the university list should remain hard-coded or become managed data.
5. Add a local development workflow and basic browser smoke tests.
6. Then implement the first visual or functional change in small, reviewable pieces.

## 11. Scan scope

This baseline was prepared from the tracked repository contents and current Git metadata. No files were modified except this document.
