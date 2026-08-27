# Hanging Tree Nursery — Master Checklist

Client: Jerome Hutchings, (407) 889-8333, 2552 Valerie Avenue, Apopka, FL 32712
Source site: www.hangingtreenursery.com (Joomla, hosted by YCS)
Demo repo: https://github.com/geraldz-zigtech-llc/hanging-tree-nursery-website
Scope: Full rebuild off Joomla to static site on GitHub Pages. Refreshed design
(not pixel exact) — no DOM/browser access was available for this project, so
exact computed styles from the live site could not be extracted. Brand colors
were sampled directly from the client's logo.png pixels instead.

## Discovery & audit
- [x] Live site content harvested via fetch (6 pages: Home, Nursery Online, FAQs,
      Gallery, Corporate Info, Contact)
- [x] Assets harvested via client-run PowerShell script: logo, 17 gallery photos
      (full res recovered via Joomla iGallery filename pattern guess + verify),
      7 PDFs (2 order forms, 5 availability sheets)
- [x] Brand colors sampled from logo.png pixels (not guessed): teal #2FACB0,
      foliage green #759F31, trunk brown #6B5446
- [ ] No CMS admin, host, or DNS/registrar access obtained for this project —
      client declined to provide. Flagged as a blocker before production launch.

## Build
- [x] All 6 content pages rebuilt + thank-you.html (7 total)
- [x] Design system: Bitter (headings) / Work Sans (body) / Space Mono (tags),
      hang-tag card motif with punch hole, palette from real logo pixels
- [x] Favicon set generated from logo alpha-channel bounding box crop
- [x] robots.txt with AI crawler directives (OAI-SearchBot, ChatGPT-User,
      PerplexityBot, ClaudeBot, Applebot-Extended, Amazonbot, GPTBot,
      Google-Extended) + Disallow: /thank-you.html
- [x] sitemap.xml, 6 indexable pages, thank-you.html excluded
- [x] ProfessionalService JSON-LD schema (index.html)
- [x] FAQPage JSON-LD schema (faq.html) — set client expectation: no visible
      Google rich result per 2023/2026 deprecation, value is GEO/AI citation only
- [x] Canonical tags, OG/Twitter tags, viewport meta on all 7 pages

## Accessibility (WCAG 2.1 AA)
- [x] axe-core scan: 0 violations across all 7 pages (verified after 2 fix passes —
      contrast and heading-order issues found and corrected, see below)
- [x] Fixed: teal text/buttons failed AA contrast on light backgrounds
      (darkened --teal to #187377, reserved #2FACB0 for dark backgrounds only)
- [x] Fixed: footer heading was h4 with no h3 before it (site-wide)
- [x] Fixed: Nursery Online, FAQ, Gallery, Thank You pages skipped from h1
      straight to a deeper heading (added h2s, hidden where no visible
      heading was appropriate)
- [x] Fixed: CSS specificity bug where dark "How to Order" section overrode
      primary button text to teal instead of white, failing contrast
- [x] Exactly one h1 per page confirmed via Playwright
- [x] html lang="en" confirmed on all 7 pages via Playwright
- [x] Keyboard focus-visible styling present, no outline:none without replacement
- [x] Mobile nav: aria-expanded toggle, closes on Escape and on link click

## Verification
- [x] Playwright: 0 broken images across all pages (confirmed after correcting
      a lazy-load false positive in the initial check)
- [x] All 13 internal links (6 pages + 7 PDFs) resolve with 0 broken
- [x] Desktop + mobile screenshots reviewed for all 7 pages
- [ ] Map embed (Contact page) could NOT be visually verified — this sandbox's
      network does not allow reaching maps.google.com. The iframe uses the
      standard classic embed pattern and should render for real visitors, but
      needs a live spot check after deploy.

## Outstanding blockers before this is a real, working site
- [ ] **Contact form has no real destination.** FormSubmit action is a
      placeholder (REPLACE_WITH_CLIENT_EMAIL@example.com) in contact.html.
      Needs the actual inbox that should receive submissions.
- [ ] FormSubmit activation handoff not yet done (can't be done until the
      real email is in place and the form has been deployed + submitted once)
- [ ] thank-you.html `_next` URL currently points at the GitHub Pages demo
      URL (https://geraldz-zigtech-llc.github.io/hanging-tree-nursery-website/thank-you.html).
      Must be updated to the production domain once/if the site goes live
      on hangingtreenursery.com.
- [ ] Fax number (407) 889-0050 was found in a third-party directory listing
      (Moss Hill Foliage's supplier list), not on the client's own site. Not
      used anywhere on the rebuilt site currently, but if it's added later,
      confirm with the client first — do not treat the directory listing as
      verified.
- [ ] Nursery Online availability PDFs: no decision yet on how the client
      will update these going forward (email to Gerald and push, vs.
      teach GitHub web UI swap). Not a blocker for the demo.
- [ ] DNS/registrar access not obtained. Needed before any custom-domain
      GitHub Pages deployment, Search Console setup, or CNAME file.
- [ ] Site not yet pushed to the GitHub repo — still local only as of this
      checklist entry.

## Deployment (not started)
- [ ] Push to geraldz-zigtech-llc/hanging-tree-nursery-website
- [ ] Enable GitHub Pages on the repo
- [ ] Share live demo URL with Gerald for client review
