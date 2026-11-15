---
name: Langkah site
description: A calm, illustrated First Then landing page, using Langkah's app palette and artwork.
---

# Langkah site design

Updated 2026-11-15. The layout takes its direction from https://kindlo.me/: a centered
introduction, a phone framed by illustrated cards, and alternating product stories.
Langkah keeps its own identity, product content, bilingual pages and local assets.

## Brand foundation

The source files in `../Langkah-onboarding/` are design and asset references.
The website remains plain HTML, CSS and JavaScript. No app source was changed.

- Colors: `Langkah/Resources/Assets.xcassets/*.colorset/Contents.json` and
  `docs/readme/palette.svg`.
- Shapes and spacing: `Langkah/Core/DesignSystem/Tokens.swift`.
- Font: the existing self-hosted Nunito variable font. The app also bundles Nunito.
- Website tokens: `assets/styles.css`.
- Landing layout and web-specific surfaces: `assets/landing.css`.
- Privacy and support retain their existing shared reading-page styles.

| Role | Color |
| --- | --- |
| Background | `#faf8f4` |
| Ink / secondary ink | `#3f4542` / `#626864` |
| Action / sage | `#447267` / `#8fb8a8` |
| Sage tint | `#e5efea` |
| First tint / ink | `#e7ecf6` / `#4c6392` |
| Then tint / ink | `#fbeadb` / `#955c2d` |
| Star / outline | `#efc24f` / `#b9861c` |
| Line | `#e6e0d6` |

The hero adds a pale sage radial field, subtle SVG grain and two rounded hills.
Feature fields use the app's blue, peach and sage families, plus a warm star-tinted field.
White borders, small rotations and muted sage shadows separate overlapping cards.
Nunito ranges from 500 for body text to 900 for the emphasized hero line.

## Layout and behavior

- Header: app icon and wordmark, section navigation, language switch and an anchor to
  availability. On narrow screens, keep the wordmark, language and availability link.
- Hero: "First this. Then that." with a static ready-board screenshot, four illustrated
  cards from `Limits.freeCardKeys` and four preview buttons. Two cards remain on small screens, cropped intentionally
  by the hero container. These decorative cards are hidden from assistive technology.
- Introduction: three numbered steps explaining the board, child action and earned star.
- Features: alternating illustrations/screenshots and copy for cards, timer, stars and modes.
- Activity gallery: the ten cards in the app's `Limits.freeCardKeys`, drifting in a 42-second
  linear loop. Pause on hover or keyboard focus; no visible pause/resume controls.
  Stop offscreen or in a hidden tab; reduced motion shows a static wrapping list.
- Buddies: existing Dino and Dina art.
- Privacy: local-storage explanation and the existing policy link.
- Availability: disabled store badges with an explicit coming-soon note, plus free/Pro details.

The content width is 1120px. Feature pairs become a single column below 580px.
Layouts are checked at 320, 390, 768 and 1280px in both languages.

`assets/landing.js` swaps the phone screenshot only after the requested image loads.
It updates the image description, selected button and live caption. A request counter
prevents an earlier image load from overriding a later selection. Only the free activity
gallery loops automatically. The ready-board screenshot remains visible without JS.
Reduced motion disables transitions and smooth scrolling through the shared stylesheet.
All buttons use native keyboard interaction, and focus rings come from the shared styles.

The support and privacy URLs, canonical URLs, language alternates, structured data and
social metadata are retained. No analytics, third-party font requests or dependencies
were added. Store badges remain disabled until verified listing URLs are available.

## Asset provenance

All new screenshots come from the existing app folder:
`../Langkah-onboarding/docs/app-store/2026-10-23/screenshots/iphone-1206x2622/`.
They are English app screenshots on both website languages; their descriptions are localized.

| Site asset | Source screenshot |
| --- | --- |
| `assets/img/screens/board.webp` | `08-ready.png` |
| `assets/img/screens/first.webp` | `02-first-with-timer.png` |
| `assets/img/screens/then.webp` | `03-then.png` |
| `assets/img/screens/celebrate.webp` | `04-good-job.png` |
| `assets/img/screens/library.webp` | `06-activity-library.png` |

Each screenshot is resized to 720 x 1565 and encoded as quality-86 WebP. The five files
total about 222 KiB. They are literal screenshots, framed with CSS.

Existing 640px WebP mascot and activity exports are reused. `splash_reading_dina.webp`
and `splash_play_dino.webp` originate in the app's matching splash image sets. The ten free
activity illustrations are the same exports used by the previous website.

`parent_mode_setup.webp` and `buddy_privacy_together.webp` are existing website illustrations
created in the earlier 2026-10-11 design work. They explain parent setup and privacy;
they are not app screenshots. `buddy_all_done_dino.webp` and `buddy_unlock_together.webp`
are existing app-art exports. No Kindlo imagery or copy was copied, and no new artwork
was generated for this revision.

The self-hosted Apple store badge remains visible. The Google Play badge is hidden until
the Android version is available; its asset and crop styling are retained for later use.

## Verification

See `docs/review/2026-11-15/REVIEW.md` for the implementation checks and screenshots.
Earlier design records remain in `docs/review/2026-10-11/` and Git history.
