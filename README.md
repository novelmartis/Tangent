# Tangent Website

Static marketing site for **Tangent Fellows**, a small-group reading and discussion program for students in grades 7-12.

## Overview

- **Stack:** plain HTML, CSS, and a small amount of vanilla JavaScript
- **Hosting:** GitHub Pages
- **Canonical domain:** `https://tangent-fellows.com/`
- **Build step:** none

The repo is intentionally simple. Public pages are hand-authored, shared styles live in one stylesheet, and deployment is branch-based.

## Site Map

Live public pages:

- `index.html`
- `our-story.html`
- `how-it-works.html`
- `tracks.html`
- `mentors.html`
- `apply.html`
- `contact.html`
- `pricing.html`
- `tracks/advanced.html`

Compatibility redirect:

- `tracks/foundational.html` redirects legacy links to `tracks.html`

## Project Structure

- `styles.css`: shared global stylesheet for the public site
- `form-validation.js`: lightweight client-side form behavior and validation
- `images/`: live content imagery used by the website
- `fonts/`: bundled webfonts used by the live site
- `local-ops/`: local-only prototypes, proofs, exports, and archived working files
- `misc/`: reserved for small non-live text references if needed

## Local Development

From the repo root:

```bash
python3 -m http.server 3000 --bind 127.0.0.1
```

Then open:

- `http://127.0.0.1:3000/index.html`

Stop the server with `Ctrl+C`.

## Deployment

- Deployment target is **GitHub Pages**
- Publishing source is the configured branch in repository settings
- No build artifact or bundling step is required
- A root `CNAME` file pins the custom domain

When changing domains or share metadata, update all of the following together:

- page-level `canonical` tags
- `og:url`
- absolute `og:image` and `twitter:image` URLs
- homepage structured data in `index.html`
- `robots.txt`
- `sitemap.xml`

## Forms

All forms currently post to:

- `https://formspree.io/f/mzdanqwq`

Stable hidden `group` values:

- `foundational`: track application form
- `contact`: general contact form
- `mentor-interest`: mentor interest form

When editing forms:

- keep the Formspree `action` stable unless intentionally migrating providers
- preserve field `name` attributes unless submission handling is also being updated
- keep required states aligned with the visible selection flow

## Content and Brand Guardrails

Keep public-facing copy aligned with the current site direction:

- Tangent is not framed as tutoring, tuition, or cram-school
- tone should remain warm, serious, inviting, and high-trust
- prefer `group` over `cohort` in visible public copy unless there is a strong reason not to
- current homepage age language is `For students in grades 7-12`
- keep copy concise and scannable
- avoid startup jargon, inflated claims, and generic education language

Current public track framing:

- `Intelligent Behavior`
- `Physics`
- `Mathematics`

## Asset Conventions

- Favicon stack lives at the repo root:
  - `favicon.svg`
  - `favicon-48x48.png`
  - `favicon-32x32.png`
  - `favicon-16x16.png`
  - `favicon.ico`
  - `apple-touch-icon.png`
- Navbar brand mark uses `logo_light.png`
- Share metadata and structured data use `logo_dark.png`
- Mentor portraits used by the live site live in `images/mentor_portraits/`
- Track subpages use `../` relative paths for shared assets

## Repo Hygiene

- `local-ops/` is intentionally gitignored
- keep prototypes, exported proofs, alternate layouts, and experimental assets there
- keep the repo root focused on the live public site and the assets it actually serves
- avoid committing scratch HTML files, duplicate asset folders, or one-off review artifacts

## License

- Source code is licensed under **PolyForm Noncommercial 1.0.0**. See `LICENSE`
- Only source-code files are licensed under **PolyForm Noncommercial 1.0.0**
- The **Tangent Fellows** name, the **Tangent** name, logo, visual identity, and all non-code website content are **all rights reserved**

## Release Checklist

Before pushing a public change:

1. Internal navigation resolves across all live HTML pages.
2. Local asset references still resolve.
3. Forms still post to the correct Formspree endpoint and hidden `group` values.
4. Browser titles remain short and page-specific.
5. SEO metadata remains consistent with the canonical domain.
6. Homepage spacing and hierarchy still act as the visual reference for the rest of the site.
7. No non-live prototype artifacts are being introduced into the tracked repo.
