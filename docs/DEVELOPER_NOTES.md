# Instructions:

This note is where I write my notes for the working agents.

For now those are the main sections; when the line starts with "-" that means that the agent did pass this point yet. And if the line started with "*" that means the agent have passed this point.

If you (Codex/Claude Code) have any improvements for this idea tell me.

After reading this file and decide what to do .. add that task in `TODO.md` to start implement the task.

# Issues:

- Remove those sections:
  [<section class="admin-panel" /> in AdminOrderDetailPage (at AdminOrdersPages.tsx) in App (at App.tsx)]
  [<section class="admin-panel" /> in AdminOrderDetailPage (at AdminOrdersPages.tsx) in App (at App.tsx)]
- Make `Return to home page` button inside this side bar fix in its place even if I need to scroll up and down.
  [<nav id="admin-navigation" class="admin-sidebar" aria-label="Admin sections" /> in AdminLayout (at AdminLayout.tsx) in App (at App.tsx) selector: #admin-navigation]
- Remove this section .. we don't need it:
  [<input aria-label="Icon" required value="instagram" /> in SocialLinksAdminSection (at SocialLinksAdminSection.tsx) in AdminManagedContentPage (at AdminManagedContentPage.tsx) in App (at App.tsx) selector: [aria-label="Icon"]]
- only the number here .. make its direction fixed in all languages "Because in Arabic each 3 number become RTL":
  [<a class="contact-detail">+90 501 595 98 80</a> in PublicPage (at App.tsx) in App.tsx in App (at App.tsx) key: "contact_phone" selector: #contact]

# Modifications:

- Make the email sent with 2 languages "Ar-En"
- Remove this section .. we don't need it any more:
  [<textarea aria-label="English quote" required /> in TestimonialsAdminSection (at TestimonialsAdminSection.tsx) in AdminManagedContentPage (at AdminManagedContentPage.tsx) in App (at App.tsx) selector: [aria-label="English quote"]]

# Improvements:

- Make the message written here fetched in the the order status email update
  [<textarea placeholder="Client message (optional)" maxlength="2000" /> in AdminOrderDetailPage (at AdminOrdersPages.tsx) in App (at App.tsx)]
- Add Cancel Order button in the end of the page .. and make it require confirmation:
  [<main class="admin-page" dir="ltr" /> in AdminOrderDetailPage (at AdminOrdersPages.tsx) in App (at App.tsx)]
- Below this section .. add a new section the describes the order status flow in the system:
  [<article class="account-card..." /> in AccountPage (at AccountPage.tsx) in App (at App.tsx)]

# Questions:

- What is the purpose of those fields:
  [<label>Slug</label> in AdminUniversityPage (at AdminUniversityPage.tsx) in AdminUniversityPage.tsx in App (at App.tsx) key: "slug"]
  [<label>HTTPS website URL</label> in AdminUniversityPage (at AdminUniversityPage.tsx) in AdminUniversityPage.tsx in App (at App.tsx) key: "websiteUrl"]

Answer:

- `Slug` is the stable, URL-friendly university identifier (for example, `istanbul-university`). It is used in routes and lookups, so it should be unique and normally should not change after publishing.
- `HTTPS website URL` is the university's official external website. It lets visitors open the authoritative university site and must begin with `https://` for a secure link.
