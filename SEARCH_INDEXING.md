# Search Indexing

Search indexing is intentionally disabled for Tangent.

The current no-index layer has three parts:

- `robots.txt` disallows all crawlers with `Disallow: /`.
- Every public HTML page includes `<meta name="robots" content="noindex, nofollow" />`.
- `sitemap.xml` is intentionally empty so we do not submit public URLs to crawlers.

To reverse this later:

1. Change `robots.txt` back to `Allow: /` and restore the `Sitemap:` line.
2. Change page-level robots meta tags back to `index, follow` on pages that should appear in search.
3. Re-add indexable URLs to `sitemap.xml`.
4. Keep `noindex` on internal, print, or brand exploration pages if they should stay private.
