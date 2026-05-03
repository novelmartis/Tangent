# Tangent Website

Static website for Tangent: a warm, serious small-group reading and discussion program for students in Grades 7-12.

## What This Repo Is

- No build step, no framework.
- Plain HTML/CSS site, deployed via GitHub Pages.
- All pages share one stylesheet: `styles.css`.

## Live Information Architecture

Public pages:

- `index.html`
- `our-story.html`
- `how-it-works.html`
- `tracks.html`
- `mentors.html`
- `apply.html`
- `contact.html`
- `tracks/foundational.html` redirects to `tracks.html` for older links.
- `tracks/advanced.html` is a separate future-facing advanced offering page.

## Local Preview

Run from repo root:

```bash
python3 -m http.server 3000 --bind 127.0.0.1
```

Open:

- `http://127.0.0.1:3000/index.html`

Stop with `Ctrl+C`.

## Deployment

- Deployment target: GitHub Pages (branch-based static hosting).
- Push commits to the publishing branch configured in repository settings.
- No separate build artifact is required.
- Current SEO/canonical URL assumption in the live files: `https://www.sushrutthorat.com/Tangent/`

## License

- Source code is licensed under **PolyForm Noncommercial 1.0.0**. See `LICENSE`.
- Only source-code files are licensed under **PolyForm Noncommercial 1.0.0**. The Tangent name, logo, visual identity, and all non-code website content are **all rights reserved**. Commercial use requires prior written permission.

## Forms (Formspree)

All forms post to:

- `https://formspree.io/f/mzdanqwq`

Hidden `group` values currently in use:

- `foundational` (Tracks application form; retained as a stable Formspree value)
- `contact` (General contact form)
- `mentor-interest` (Mentor interest form)

When editing forms, keep:

- `action` URL unchanged unless intentionally migrating providers.
- `name` attributes stable so submissions remain structured.
- Required fields aligned with current selection workflow.

## Copy and Positioning Guardrails

Keep wording aligned with current site direction:

- Tangent is **not** tutoring/cram school.
- Core tone: warm, serious, inviting, and high-trust.
- Prefer `group` over `cohort` in visible public copy unless there is a strong reason otherwise.
- Current homepage age-language is `For students in grades 7-12`.
- Keep copy short and scannable; avoid startup jargon, inflated claims, and generic education language.
- Track names and current active public framing:
  - `Intelligent Behavior`
  - `Physics`
  - `Mathematics`

## Repo Conventions

- Favicon stack in root:
  - `favicon.svg`
  - `favicon-48x48.png`
  - `favicon-32x32.png`
  - `favicon-16x16.png`
  - `favicon.ico`
  - `apple-touch-icon.png`
- Navbar brand mark uses `logo_light.png`.
- Mentor photos for the website live in `images/mentor_portraits/`.
- Core image set currently used by the live site:
  - `images/braitenberg-vehicle-diagram.png`
  - `images/braitenberg-vehicles-cover.jpg`
  - `images/feynman-lectures-diagrams.svgz`
  - `images/feynman-lectures.jpg`
  - `images/math-diagram.jpg`
  - `images/proofs-from-the-book-cover.jpg`
  - `images/einstein_portrait.jpg`
  - `images/raman_portrait.JPG`
  - `images/curie_portrait.jpg`
  - `images/noether_portrait.jpg`
  - `images/bose_portrait.jpg`
  - `images/sahyadri-2.jpg`
  - `images/sahyadri-3.jpg`
  - `images/sahyadri-4.jpg`
- Track pages use `../` relative paths for shared assets.
- Archived/non-live material can be kept under `misc/`.

## Before Committing

Quick checks:

1. Internal links resolve across all HTML pages.
2. Forms still submit to Formspree endpoint and correct `group` values.
3. Navigation is consistent on all pages.
4. Favicon links are present in each page head.
5. Browser/page titles are simple, page-specific, and consistent with the public navigation.
6. Copy remains consistent with positioning guardrails above.
7. Home page remains the visual anchor for spacing and hierarchy across the rest of the site.
