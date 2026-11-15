# Langkah site revision, 11 October 2026

Scope: initial Dina/Dino loading screen, centered splash phone with feature links and dummy
store buttons, viewport-height landing sections, fixed navigation, explicit privacy/support URLs.
Fariz selected antislop during and requested dummy store buttons. No publishing was requested.

## Verification

- PASS: `python3 check.py --draft`, JavaScript syntax checks, and `git diff --check`.
- PASS: Chromium at 1440x900, 1366x768, 768x1024, 390x844 and 320x568, both landing languages.
  No horizontal overflow. Every section is at least the viewport height minus the header.
  Desktop heroes fit exactly into the available height; mobile sections grow for their content.
- PASS: Header stays at y=0 after scrolling. Its measured height matches page padding, including
  wrapping navigation and 200% text. Privacy/support retain their narrow reading columns.
- PASS: 76 internal link activations. Per-control destinations are recorded in `navigation.json`.
  Each language switch, home link, privacy/support link, hero feature and help-topic anchor
  reached its intended URL. Eight mobile feature links also landed below the fixed header.
- PASS: Tab focuses the visible skip link; Enter skips to main. Focus outlines remain visible.
- PASS: Loader appears with both buddies, releases content after asset decoding, skips the
  minimum delay with reduced motion, and leaves content readable without JavaScript.
- PASS: Failed mascot images, stalled mascot requests and a blocked loading script all release
  the page. No uncaught JavaScript errors occurred during normal navigation.
- PASS: Store controls are disabled and visibly marked unavailable, as requested for dummy links.
- PASS: New text contrasts range from 5.14:1 to 9.25:1 against their actual backgrounds.

Screenshots: `loading.png`, `desktop.png`, `mobile.png`. Screenshot files show the Indonesian page.
The full mobile screenshot includes the remaining sections and footer.

## Delivery gate for this revision

- R-01 PASS: Existing Langkah colors, no new gradients or glows.
- R-02 PASS: HTML checker found no em/en dashes.
- R-03 PASS: Five viewport sizes, two languages, no horizontal overflow.
- R-04 PASS: The arrow expresses FIRST to THEN; existing stars express the app's earned stars.
- R-05 PASS: Requested phone composition, paired sections, activity strip and tinted stars field.
- R-06 PASS: Existing Nunito reflects the rounded, friendly app typography.
- R-07 PASS: Plain warm background, no decorative pattern.
- R-08 PASS: The splash arrow describes step order; no decorative CTA arrows.
- R-09 PASS: FIRST/THEN are real stage labels; no promotional eyebrow badge.
- R-10 PASS: Opaque header; no added glass treatment.
- R-11 PASS: Existing radius tokens distinguish controls, panels and the phone.
- R-12 PASS: Phone and feature links remain flat, without new shadows.
- R-13 PASS: No glows added.
- R-14 PASS: Feature links remain plain text around the central app preview.
- R-15 PASS: Feature titles link to their matching content; privacy CTA names the destination.
- R-16 PASS: Revised copy describes existing app features without marketing buzzwords.
- R-17 PASS: Activity and plan counts come from existing product content, no new statistics.
- R-18 PASS: No testimonials added.
- R-19 PASS: Loader serves initial asset readiness; reduced motion skips the minimum delay.
- R-20 PASS: Both app buddies, app colors, Nunito and FIRST/THEN remain the identity.
- R-21 PASS: Existing light-only brand is retained.
- R-22 PASS: Both illustrations are exports of approved app splash assets.
- R-23 PASS: Fariz requested the layout and dummy store controls; no new imagery generated.
- R-24 PASS: All internal navigation destinations exist and were activated.
- R-25 PASS: Measured new text/background pairs exceed 4.5:1.
- R-26 PASS: Links navigate; dummy store controls carry visible unavailable labels and TODOs.
- R-27 PASS: Static page has no remote data state; asset/script failures release the loader.
- R-28 PASS: No FAQ added; existing support content remains unchanged.
- R-29 PASS: Existing sage, blue/peach stage tints and star accent follow the app's color system.
- R-30 PASS: Composition follows the requested app splash, not another product's site.
- R-31 PASS: Major visual decisions and their reasons are recorded in DESIGN.md.
- R-32 PASS: Keyboard skip navigation and retained visible focus styles verified.
- R-33 PASS: Changes made directly in HTML/CSS/JS with source patches, no rewriting script.
- R-34 PASS: No theme toggle; existing light palette verified.
- R-35 PASS: Local HTTP preview run, normal console clear, internal click evidence saved.
- R-36 PASS: No new security, performance or customer claims.
- R-37 PASS: Existing DESIGN.md and Fariz's explicit layout brief guided the revision.
- R-38 PASS: Product features use existing content; store availability is visibly a placeholder.
- Liveliness dials PASS: ENERGY 2 / RHYTHM 2 / MOTION 2 are recorded in DESIGN.md.
- Liveliness consistency PASS: Calm mascot introduction and varied existing section compositions.
- Focal point PASS: Centered phone in hero; existing artwork/headline pairs in later sections.
- Whitespace PASS: Viewport sections separate product topics; mobile content grows without clipping.
- Accent PASS: Sage wordmark/actions and earned-star artwork retain their specific roles.
- Identity motif PASS: Dina, Dino and FIRST/THEN repeat the app's own visual language.
- Design read PASS: Audience, visual direction and dials declared before editing.
- C-1 PASS: Reasons for layout, font, spacing and imagery recorded in DESIGN.md.
- C-2 PASS: Tested destinations or explicitly unavailable dummy controls.
- C-3 PASS: Existing sections cover the timer, stars, cards, modes, plans and privacy.
- C-4 PASS: Mobile, keyboard, reduced motion, no JavaScript and failed asset cases checked.
- C-5 PASS: No fabricated evidence or release availability added.

## Existing publication work

`[SUPPORT EMAIL]` remains in four document pages and legal-review comments remain in the
privacy pages. The strict pre-publish check still requires a real support email. These were
outside the requested revision. Store listings remain dummy placeholders. Root-relative
document links require hosting at the domain root. External Apple/GitHub links were unchanged
and inspected in source; no authenticated external flows were exercised. Browser checks used
Chromium, not Safari or a physical device.
