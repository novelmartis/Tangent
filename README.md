# Tangent Website

Static website for Tangent: a serious reading culture for unusually curious students.

## What This Repo Is

- No build step, no framework.
- Plain HTML/CSS site, deployed via GitHub Pages.
- All pages share one stylesheet: `styles.css`.

## Live Information Architecture

Public pages:

- `index.html`
- `tracks.html`
- `how-it-works.html`
- `mentors.html`
- `contact.html`
- `tracks/foundational.html`
- `tracks/advanced.html`

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

## License

This project is licensed under the MIT License. See `LICENSE`.

## Forms (Formspree)

All forms post to:

- `https://formspree.io/f/mzdanqwq`

Hidden `group` values currently in use:

- `foundational` (Foundational track application)
- `advanced` (Advanced track application)
- `contact` (General contact form)
- `mentor-interest` (Mentor interest form)

When editing forms, keep:

- `action` URL unchanged unless intentionally migrating providers.
- `name` attributes stable so submissions remain structured.
- Required fields aligned with current selection workflow.

## Copy and Positioning Guardrails

Keep wording aligned with current site direction:

- Tangent is **not** tutoring/cram school.
- Core tone: minimal, serious, warm, high-trust.
- Advanced track audience: **advanced high school / undergraduate**.
- Do not use `UG` as public label.
- Do not reintroduce "Master's" in Advanced track audience copy.

## Repo Conventions

- Favicon stack in root:
  - `favicon.svg`
  - `favicon-32x32.png`
  - `favicon-16x16.png`
  - `favicon.ico`
  - `apple-touch-icon.png`
- Legacy icon file retained: `tangent-icon.svg` (not wired in page heads).
- Track pages use `../` relative paths for shared assets.

## Before Committing

Quick checks:

1. Internal links resolve across all HTML pages.
2. Forms still submit to Formspree endpoint and correct `group` values.
3. Navigation is consistent on all pages.
4. Favicon links are present in each page head.
5. Copy remains consistent with positioning guardrails above.
