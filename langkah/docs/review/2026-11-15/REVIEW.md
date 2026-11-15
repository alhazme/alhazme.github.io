# Langkah landing redesign review

Date: 2026-11-15

## Scope

Redesign the English and Indonesian landing pages with Kindlo's presentation as the
layout reference and Langkah-onboarding as the source of branding and product assets.
The existing static stack, product limits, localized legal/support routes and metadata
are retained. The app repository and deployment configuration are unchanged.

## Implemented

- Sage hero with a centered phone and layered activity cards.
- Four user-selected, real app screenshots: ready board, first, then and celebration.
- Alternating feature sections, scrollable free-card gallery, buddies and privacy.
- Localized availability and free/Pro explanation, with disabled store badges.
- Self-hosted assets, native links, focus indicators and reduced-motion rules.
- Updated design documentation with screenshot provenance.

## Checks

- `python3 check.py`: OK, 7 HTML pages, including the existing OG source.
- `node --check assets/landing.js`: passed.
- `git diff --check`: passed.
- HTTP 200 for the six public HTML routes, the landing stylesheet and script.
- English and Indonesian checked at viewport widths 320, 390, 768 and 1280px.
  No page or header horizontal overflow observed.
- Preview buttons switch the image and selected state. Indonesian first/then/celebration
  and English first were exercised. Selection is applied only after image loading.
- Keyboard ArrowRight on the activity region changed its scrollLeft from 0 to 40.
- Indonesian landing to privacy, home, English landing, English support and home navigation
  was exercised through actual links. The destination headings and URLs were verified.
- Mobile timer and availability sections inspected visually. The badges are disabled,
  the localized coming-soon status is visible, and neither section has horizontal overflow.
- No JavaScript error logs or broken loaded images observed during browser QA.

The selected-button hover state originally overrode its fill color. Its selector now
retains sage with white text while selected and hovered.

## Screenshots

- `desktop.jpg`: English hero, 1280px viewport.
- `mobile.jpg`: Indonesian hero, 390px viewport.
- `mobile-timer.jpg`: Indonesian timer feature, 390px viewport.
- `mobile-download.jpg`: Indonesian availability and store status, 390px viewport.

## Limits

No deployment was performed. Store listings remain unavailable, as in the previous site.
App screenshots are in English on both language versions; descriptions and controls are
localized. Original mobile-app behavior is represented by existing screenshots, not a
live native-app session. Browser checks used the available in-app browser, not a separate
Safari/Firefox compatibility run.
