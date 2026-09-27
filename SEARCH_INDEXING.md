# Search Indexing

Search indexing is enabled for Tangent's public marketing pages.

The current indexing policy is:

- `robots.txt` allows crawlers and advertises `sitemap.xml`.
- Public HTML pages use `index, follow` with unrestricted search previews.
- `sitemap.xml` contains only canonical, indexable URLs.
- `pricing.html`, `tracks/advanced.html`, and the legacy `tracks/foundational.html` redirect remain `noindex` and are omitted from the sitemap.

When adding or removing a public page:

1. Give the page a unique title, description, canonical URL, and social metadata.
2. Use `index, follow` only if the page should appear in search.
3. Add canonical, indexable pages to `sitemap.xml`; update `lastmod` only when the page changes materially.
4. Link public pages from relevant site content so they are not orphaned.
5. Keep excluded, redirect, print, and brand-exploration pages out of the sitemap and marked `noindex`.

`robots.txt` is not a privacy control. Excluded pages remain crawlable so search engines can read their `noindex` directive.
