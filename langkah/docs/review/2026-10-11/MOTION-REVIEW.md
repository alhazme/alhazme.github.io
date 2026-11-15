# Store badges and motion revision

Fariz requested English black store badges, phone-centered feature alignment, four preview
screens with 3-second holds, and a leftward looping showcase containing only the free cards.
The store controls remain dummy downloads, as previously authorized.

## Results

- PASS: Both badge assets load locally, display English text and match the uploaded black style.
- PASS: Feature-column centers differ from the phone center by less than 1px on desktop/tablet.
- PASS: Splash -> Learn -> Play -> Good Job -> Splash. Each state holds for 3000ms, followed by
  a 300ms swipe. The complete loop is 13.2 seconds. Timeline inspection at 1.5, 4.8, 8.1,
  11.4 and 13.2 seconds showed all four states and the return to splash. Real elapsed playback
  reached Learn at 3.3 seconds. Pause/Play changes the animation state without resetting it.
- PASS: The ten original card keys exactly match `Limits.freeCardKeys`: get_dressed,
  put_on_shoes, toilet, bath, brush_teeth, eat, play, tablet, sleep, car.
- PASS: Card translation moved from 0px to -28.5px in 800ms. At desktop size the track's
  half-width and the repeated first card's offset are both 2160px, verifying a seamless reset.
- PASS: Repeated cards are aria-hidden. Pause/Play, keyboard focus and hover pause the strip.
- PASS: Reduced motion has no automatic preview or strip animation, only ten visible cards,
  manual horizontal scrolling and a Next screen button cycling all four preview states.
- PASS: Without JavaScript, the splash remains visible, motion controls stay hidden and ten
  original free cards remain manually scrollable.
- PASS: Both languages at 1440x900, 1366x768, 768x1024, 390x844 and 320x568 have no horizontal
  overflow. Desktop/tablet heroes match the available viewport height. Mobile content grows.
- PASS: JavaScript syntax checks, `python3 check.py --draft`, `git diff --check`, no page errors.

Screenshots are in `motion/`. Checks used Chromium. Existing support email/legal placeholders
and the publication limitations in REVIEW.md remain outside this revision.

## Delivery gate

- R-01 PASS: App palette retained; black badges follow the explicit reference.
- R-02 PASS: HTML checker found no em/en dashes.
- R-03 PASS: Five viewport sizes in both languages without page overflow.
- R-04 PASS: Locks, ordered arrows and earned stars retain their product meanings.
- R-05 PASS: Phone, feature columns, strip and existing paired sections have distinct compositions.
- R-06 PASS: Existing Nunito retained; store badge typography comes from the store artwork.
- R-07 PASS: Existing plain background, no decorative texture added.
- R-08 PASS: Arrow only communicates FIRST to THEN; no CTA arrows added.
- R-09 PASS: Stage and next-step labels describe actual preview states.
- R-10 PASS: Opaque header and solid preview surfaces, no glass added.
- R-11 PASS: Existing radius system retained; official badge geometry preserved.
- R-12 PASS: No new decorative shadows.
- R-13 PASS: No new glow.
- R-14 PASS: Feature text supports the central phone; no new feature-card grid.
- R-15 PASS: Pause, Play and Next screen controls name their actions.
- R-16 PASS: Existing product language retained, no new buzzwords.
- R-17 PASS: Ten free keys verified in app constants; one star illustrates the app's board reward.
- R-18 PASS: No testimonials or invented people.
- R-19 PASS: Explicitly requested loops explain the app and free catalog; pause and reduced motion ship with them.
- R-20 PASS: Dina, Dino, Nunito and FIRST/THEN preserve Langkah's identity.
- R-21 PASS: Existing light-only brand retained.
- R-22 PASS: Every new illustration is exported from a bundled app asset.
- R-23 PASS: Badge reference and looping layout explicitly requested; no generated assets.
- R-24 PASS: Existing navigation destinations retained; static link checker passes.
- R-25 PASS: New controls use the existing sage-dark/background pair above 4.5:1.
- R-26 PASS: Preview and card controls were activated; badges stay disabled with a visible dummy note.
- R-27 PASS: No remote data added; existing initial loader and static fallback remain usable.
- R-28 PASS: No new FAQ.
- R-29 PASS: Existing app color system plus the requested store artwork.
- R-30 PASS: App preview compositions follow local SwiftUI source and the owner's reference.
- R-31 PASS: Timing, layout, assets and motion reasons recorded in DESIGN.md.
- R-32 PASS: Native motion buttons, visible focus, focus-to-pause cards, hidden duplicate semantics.
- R-33 PASS: Features edited directly in source, no rewriting script.
- R-34 PASS: Single light theme retained and checked.
- R-35 PASS: HTTP preview run, controls exercised, timeline and responsive results recorded.
- R-36 PASS: No new performance or security claims.
- R-37 PASS: Existing DESIGN.md plus explicit reference and motion brief guided implementation.
- R-38 PASS: Free keys sourced from the app; store downloads are visibly dummy; previews are identified as previews.
- Dials PASS: ENERGY 2 / RHYTHM 2 / MOTION 2 retained, with explanatory motion.
- Focal point PASS: Phone remains centered between supporting features.
- Whitespace PASS: Badge rows cannot shift feature alignment; mobile content can grow.
- Accent PASS: Sage actions and earned stars preserve their defined roles.
- Identity motif PASS: Dina/Dino and FIRST/THEN carry through preview and cards.
- Design read PASS: Existing direction and motion purpose stated before implementation.
- C-1 PASS: Major decisions have written reasons in DESIGN.md.
- C-2 PASS: New motion controls exercised and dummy downloads visibly identified.
- C-3 PASS: Motion explains existing app states and the verified free catalog.
- C-4 PASS: Responsive, reduced-motion and no-JavaScript cases checked.
- C-5 PASS: No invented availability, features or testimonials.
