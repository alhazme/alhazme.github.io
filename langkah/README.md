# langkah-site

Static site for Langkah: First Then App (TICKET-OPS-002). Plain HTML and CSS, no build step,
no analytics, no cookies. Every page link is relative and ends in `index.html`, so the site
works at a GitHub Pages project path (`/<repo>/`), on a custom domain, and opened from disk.

| Page | English | Bahasa Indonesia |
|---|---|---|
| Landing (Marketing URL) | `index.html` | `id/index.html` |
| Privacy policy (Privacy Policy URL) | `privacy/index.html` | `privacy/id/index.html` |
| Support (Support URL) | `support/index.html` | `support/id/index.html` |

Shared brand tokens live in `assets/styles.css`; the landing redesign uses `assets/landing.css`
and `assets/landing.js`. Artwork and optimized app screenshots in `assets/img/` come from
Langkah-onboarding and the existing site. Sources and layout decisions are recorded in
`DESIGN.md`. Font: Nunito (OFL), self-hosted in `assets/fonts/`.

## Before publishing

1. Support address: `mochfarizalhazmi@gmail.com` (temporary, chosen by Fariz). To change it,
   replace it in the two privacy and two support pages.
2. Resolve the `<!-- [LEGAL REVIEW] -->` comments in `privacy/index.html` and `privacy/id/index.html`.
3. Run `python3 check.py`. It must print `OK`.
4. Preview: `python3 -m http.server` and open http://localhost:8000.

## Publish (needs Fariz's go-ahead)

```bash
gh repo create <owner>/langkah-site --public --source . --push
gh api -X POST repos/<owner>/langkah-site/pages -f 'source[branch]=main' -f 'source[path]=/'
```

After launch: replace the disabled store buttons in `index.html` and `id/index.html` with
links to verified App Store and Google Play listings (marked `TODO(OPS-004)`).
