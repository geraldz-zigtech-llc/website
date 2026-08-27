# AspireOn Networks — Master Checklist
Prospecting build for Adrian Andrews. Not yet a signed client — no repo/domain access. This tracks the pitch build so nothing gets lost before hand-off.

## Build status

### DONE — Pages
- [x] Homepage (`index.html`) — hero, trust strip, "What We Do," all 6 service preview rows, CTA banner
- [x] About Us (`about-us.html`) — real audited copy: company overview, leadership/experience, founding info
- [x] Solutions (`solutions.html`) — 6 sections (VoIP, Telecom Consulting, Structured Cabling, Security Cameras, IT Support, Web Services) with real audited copy for the first 4; IT Support/Web Services copy adapted from homepage source
- [x] Service Areas (`service-areas.html`) — interactive Leaflet map + searchable list, replaces the 47 duplicate Weebly city pages with one real page
- [x] Contact Us (`contact-us.html`) — FormSubmit-wired form matching audited "Solution Interest" options (expanded from site's original 4 to all 6 services)
- [x] `thank-you.html` — built from site template, noindex, excluded from sitemap/allowed in robots.txt disallow
- [x] `privacy-policy.html` — **DRAFT ONLY, see Open Items below**

### DONE — Standard build items
- [x] `robots.txt` — Allow /, Disallow /thank-you.html, Sitemap line
- [x] `sitemap.xml` — 6 real pages, correctly excludes thank-you.html
- [x] `llms.txt` — company summary + service list + key page links
- [x] WCAG 2.1 AA: 0 axe-core violations across all 7 pages, desktop + mobile (verified via Playwright, not eyeballed)
- [x] Semantic landmarks, heading hierarchy (fixed 3 real skip violations during build — see notes below)
- [x] Mobile nav with proper aria-expanded/hidden handling
- [x] Self-hosted Leaflet (no external CDN dependency)

### NOT DONE YET
- [ ] JSON-LD schema (LocalBusiness/ProfessionalService + `sameAs` to LinkedIn, Instagram, Facebook, BBB)
- [x] Open Graph image (`assets/images/og-image.png`) — placeholder text/brand-color card, not built from real photography
- [x] Favicon (`assets/images/favicon.png` + `.svg`) — placeholder monogram ("A" on brand colors), **not cropped from the real logo** since that asset couldn't be extracted (see below) — swap once Adrian supplies the real logo file
- [ ] Real logo file — currently a text wordmark sitewide; couldn't extract the actual PNG from Weebly's CDN (CORS-blocked, canvas tainted)
- [ ] Photography — all service illustrations are custom SVGs, not real photos (no photo assets available pre-signing)
- [ ] Blog (3 existing posts) — not migrated, no decision made on whether to carry them over
- [ ] Store (VoIP phone products) — **awaiting Adrian's choice**: free (Stripe Payment Links/PayPal Buy Now) vs. embed (Ecwid/Snipcart)
- [ ] Appointment booking — **awaiting Adrian's choice**: free (Cal.com) vs. embed (Calendly)
- [ ] "My Account" — site had Voice Portal / Payment Portal links; unclear if these are client-carrier-hosted (out of scope) or need rebuilding
- [ ] "Devices" nav item — likely ties to store; scope depends on store decision above

## Open items requiring Adrian's/Gerald's input

1. **Privacy Policy is a placeholder, not the real policy.** The live site has an actual dated legal document (effective May 1, 2024, ~12,800 characters, GDPR/CCPA-referencing). I could only partially extract it through the audit tooling and didn't want to reconstruct a legal document from partial fragments or paraphrase it — that's a compliance risk, not a copy-editing one. **Before this goes live, we need the verbatim text from the client (or their counsel) migrated in directly**, not rewritten.
2. **Brand name inconsistency** — site flips between "AspireOn Networks," "Aspireon Networks," and "Aspireon Network" (singular). Standardized on "AspireOn Networks" (matches BBB legal listing) throughout the rebuild. Confirm with Adrian this is the form he wants.
3. **"World Class Carriers — 150+ carriers" claim** (from the Telecom Consulting page) — carried over verbatim from their existing site copy, not independently verified. Flagging per compliance practice since it's a specific number.
4. **Logo** — need the real vector/high-res logo file from Adrian directly; currently using a styled text wordmark as a placeholder.
5. **Store & booking** — dual-path options above need a decision once Adrian is engaged.

## Notes on accessibility fixes made during build
Real issues caught by automated testing (axe-core), not just fixed reactively:
- Brand green `#41A85F` measured off the live site fails WCAG contrast for text/buttons (3.0:1, needs 4.5:1). Added `--color-green-dark: #317E47` (4.99:1) for all text/button use; kept the brighter green for large decorative/icon-only elements where 3:1 applies.
- Fixed 3 separate H1→H4/H1→H3 heading-hierarchy skips (homepage info strip, footer, service-areas sidebar).
- Fixed a mobile-width bug where the header "Book a Call" button wrapped and visually collided with the logo — moved the CTA into the mobile menu panel instead of the header bar under 640px.
