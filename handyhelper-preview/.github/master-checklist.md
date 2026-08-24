# Handy Helper Housekeeping — Master Checklist

Client: Miranda Sears | SOW: ZT-SOW-2026-08 | Domain: handyhelperhousekeeping.biz

## Confirmed facts (do not re-verify unless client says it changed)
- Phone: (941) 585-5496
- Email: hello.handyhelper@gmail.com
- Service areas: Port Charlotte, FL / Punta Gorda, FL (confirm final list before launch — live site also mentions Sarasota County, unconfirmed)
- Google Business Profile: https://www.google.com/maps/place/Handy+Helper+Housekeeping/@26.9792616,-82.179292 (client-confirmed 4.9★, 34 reviews — spot-check before publishing the number)
- Facebook: https://www.facebook.com/p/Handy-Helper-Housekeeping-100086447460409/
- Yelp: https://www.yelp.com/biz/handy-helper-housekeeping-port-charlotte
- Design direction: blend of both provided mockup concepts (4-page pink/green set + newer olive/blush consolidated concept) — Gerald's call on final synthesis

## 1. Discovery & Audit
- [x] Live-site DOM audit (Wix; found homepage/Services URL collision, unbranded default fonts, placeholder social links)
- [x] NAP consistency check across site, Facebook, Yelp, GBP
- [x] robots.txt/sitemap.xml review (Wix auto-generated, nothing to preserve)
- [ ] Logo/brand source files received from client
- [ ] Real project/team photos received from client
- [ ] Domain registrar identified + access confirmed
- [ ] Confirm whether Wix account must stay live for email hosting before DNS cutover

## 2. Build & Accessibility
- [x] Demo built in single pass under `handyhelper-preview/` (Home, Services, About, Get an Estimate, thank-you.html) — relative paths throughout for subfolder hosting under zigtech-llc.com
- [x] Photography extracted (PIL crop, not stock) from client's own mockup PNGs: hero kitchen, 4 service images, Miranda's about photo, detail strip (towels/TP/vent/oven/plant), Handy Helper story images
- [x] Brand colors pixel-sampled (not eyeballed) from mockups: pink #B8284F, olive #48511A, olive-dark #3A4132, blush #FEECED — all contrast ratios verified >4.5:1 against their backgrounds (pink ~6.15:1, olive ~8.21:1, white-on-olive-dark ~10.27:1)
- [x] Logo recreated as inline SVG + web-font text, matching mockup styling (source vector files not yet received from client — see open items)
- [x] Static-first content delivery — all copy/content in initial HTML, no client-JS-dependent rendering
- [ ] Real logo source files + client photography to replace mockup-extracted placeholders once received
- [ ] Full multi-page nav (Reviews, Areas We Serve) — deferred from demo scope, add if client wants them in final build

## 3. Verification
- [x] Mechanical structural/a11y audit (Python/BeautifulSoup) across all 5 pages: lang attr, title length, viewport, canonical, OG/Twitter tags, landmarks, heading hierarchy, image alt text, form label association, internal link integrity — 2 issues found and fixed (heading-hierarchy skips on services.html + estimate.html, missing OG tags on thank-you.html), clean on re-check
- [x] No `outline:none` without `:focus-visible` replacement anywhere in CSS
- [x] All referenced images confirmed present on disk; unused extracted image removed
- [ ] **Live browser verification pending** — sandbox couldn't install Playwright/Chromium (network allowlist blocks the required domains); weasyprint attempted as fallback but doesn't reliably support CSS Grid, so its render wasn't trustworthy and was discarded. Plan: once pushed live, use the already-connected Chrome MCP to navigate to the real preview URL and run computed-style checks + an injected axe-core scan against actual rendering.
- [ ] Mobile viewport (390px) visual check — pending live browser verification above

## 4. Deployment
- [ ] Push `handyhelper-preview/` folder to geraldz-zigtech-llc's existing zigtech-llc.com repo (Gerald to push — no GitHub credentials available in build sandbox)
- [ ] Live browser verification pass (see Section 3) once pushed
- [ ] Repo created under geraldz-zigtech-llc for Miranda's own domain (separate from preview, created when she's ready to go live)
- [ ] CNAME file + GitHub Pages custom domain settings (production repo only — NOT the preview)
- [ ] DNS records (A/AAAA/CNAME) provided to client
- [ ] Enforce HTTPS confirmed
- [ ] Convert all relative paths to absolute + remove `noindex` meta tags when migrating from preview folder to Miranda's production repo
- [ ] Update FormSubmit `_next` from preview URL to production `https://handyhelperhousekeeping.biz/thank-you.html` on migration

## 5. SEO / GEO Baseline
- [x] Title tags, canonical tags, OG/Twitter tags on every demo page (canonical points to future production handyhelperhousekeeping.biz URLs; noindex applied while in preview)
- [x] HousekeepingService (LocalBusiness subtype) JSON-LD schema on homepage with sameAs: GBP, Facebook, Yelp
- [ ] FAQPage schema — not yet added, needs FAQ content from client first (GEO-focused, expectations set: no Google rich-result accordion per Aug 2026 deprecation)
- [ ] llms.txt — deferred until production repo (not meaningful in a noindexed preview subfolder)
- [ ] robots.txt with AI crawler allowlist + sitemap.xml — deferred until production repo

## 6. Forms & Handoff Pages
- [x] Contact/estimate form via FormSubmit.co, _next → preview thank-you.html (absolute URL to zigtech-llc.com/handyhelper-preview/), _autoresponse configured, honeypot field included
- [x] thank-you.html built from site template, noindex, matches header/footer/branding
- [ ] FormSubmit activation — client must submit the live form once and click the confirmation email before submissions deliver (do this during/after demo, on the real pushed URL)
- [ ] _next URL must be updated to production domain when migrating out of preview (see Section 4)

## 7. Client Handoff Docs
- [ ] README.md (repo root)
- [ ] ai-editing-guide.md (repo root)
- [ ] master-checklist.md (this file, updated in place)
