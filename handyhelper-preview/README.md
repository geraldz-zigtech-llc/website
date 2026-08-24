# Handy Helper Housekeeping — Website

Static site for Handy Helper Housekeeping (Miranda Sears), hosted on GitHub Pages.

**Status:** Scaffolding only — page build pending client logo/photo assets and design-direction sign-off. See `.github/master-checklist.md` for full engagement status.

## Deployment model
- Static HTML/CSS/JS, no build step, served directly via GitHub Pages.
- Custom domain: handyhelperhousekeeping.biz (CNAME file at repo root once deployment begins).
- Forms handled by FormSubmit.co (see `.github/master-checklist.md` for activation status).

## Structure (planned)
```
/index.html
/services.html
/about.html
/estimate.html
/contact.html
/thank-you.html
/robots.txt
/sitemap.xml
/llms.txt
/assets/images/
/assets/css/
```

## Do not touch without ZigTech
- DNS / CNAME configuration
- FormSubmit endpoint configuration (_next, _autoresponse)
- robots.txt / sitemap.xml / llms.txt structure
- JSON-LD schema blocks in page `<head>`s

This file will be filled in with real structure and manual-edit instructions once the build is underway.
