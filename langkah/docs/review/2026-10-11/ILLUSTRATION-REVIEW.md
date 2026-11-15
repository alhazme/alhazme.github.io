# Illustration and preview-control revision

Fariz requested removal of the preview/card pause controls and images in sections 3, 5, 7.
Both landing languages are updated. The earlier story, section order and dummy downloads stay.

## Changes and sources

- Timer: Dino from the app's `buddy_ready_dino` asset above the existing two timer states.
- Modes: Dina from `buddy_handoff_dina`, below the heading so the hero anchor includes the image.
- Privacy: a local SVG showing cards and a voice recording inside a phone with a lock.
  It uses Langkah's palette and the existing Phosphor lock. It is an explanatory illustration,
  not a new app screen or a statement about encryption.
- Both mascot exports use cwebp quality 85 at 640x640. The inspected originals are the
  corresponding PNG files in `Langkah/Langkah/Resources/Assets.xcassets`.
- Visible pause controls and their unused styles/state/listeners are removed. Automatic
  preview/card loops remain. Focus and fine-pointer hover pause them for inspection.
  Offscreen and hidden-tab pauses remain. Reduced motion provides four manually scrollable
  preview screens and ten manually scrollable original cards, with repeated items hidden.

## Verification

- PASS: `python3 check.py --draft`, `node --check` for both changed scripts, `git diff --check`.
- PASS: Indonesia and English at 320, 390, 760, 1440 px wide and 900 px tall: no page overflow;
  all sections meet the viewport minimum height or grow to fit their content.
- PASS: All three requested section images decoded at every tested size, have localized alt
  text and stay within the page. The modes image follows the anchor heading.
- PASS: No `.preview-toggle` or `.cards-toggle` elements in either language. Preview animation
  runs, pauses on keyboard focus, and the card animation runs when visible.
- PASS: With reduced motion, neither track animates, four preview screens remain visible in
  the horizontal viewport, and only ten original cards are displayed.
- PASS: Without JavaScript at 390 px, static splash, ten cards, all three new images,
  no pause controls and no page overflow.
- PASS: No page errors during these browser checks. Native browser visual review includes
  the timer, modes and privacy sections. Existing link checks remain in STORY-REVIEW.md.

## Delivery gate

- R-01 PASS: No gradients added; SVG uses existing sage, neutral and surface tokens.
- R-02 PASS: HTML checker passes; authored text and SVG comment use plain punctuation.
- R-03 PASS: Eight language/viewport combinations without page overflow.
- R-04 PASS: Existing lock indicates private device storage; timer and star meanings remain.
- R-05 PASS: Timer pairs mascot and states; modes retains two role columns; privacy uses a split.
- R-06 PASS: Existing Nunito retained; the privacy SVG contains no typography.
- R-07 PASS: No decorative background pattern added.
- R-08 PASS: No new CTA arrows.
- R-09 PASS: No new badges; lock belongs to the storage illustration.
- R-10 PASS: Header and surfaces stay opaque without glassmorphism.
- R-11 PASS: New SVG phone/card corners follow the existing radius scale.
- R-12 PASS: No shadow added to the new images or sections.
- R-13 PASS: No glow added.
- R-14 PASS: Existing varied sections retained rather than adding a feature-card grid.
- R-15 PASS: Existing specific privacy and support destinations remain.
- R-16 PASS: Story copy retained, without marketing buzzwords.
- R-17 PASS: Existing source-backed card and reward counts unchanged.
- R-18 PASS: No testimonials or fictional people introduced.
- R-19 PASS: Explanatory loops retain their timing, hover/focus pauses and reduced-motion fallback.
- R-20 PASS: New mascot images are the app's Dina and Dino; SVG matches its phone/card vocabulary.
- R-21 PASS: Existing light-only brand retained.
- R-22 PASS: Native mascot sources and device-storage illustration have written content purposes above.
- R-23 PASS: Images and control removal explicitly requested by Fariz; no extra navigation or assets.
- R-24 PASS: Static checker passes all internal links and anchors.
- R-25 PASS: No text colors changed; existing contrast results in REVIEW.md still apply.
- R-26 PASS: Removed controls leave no buttons without handlers; dummy store controls remain labeled.
- R-27 PASS: Static images have intrinsic dimensions and lazy loading; no remote state introduced.
- R-28 PASS: No FAQ added.
- R-29 PASS: New SVG only uses existing application colors.
- R-30 PASS: Actual app artwork and local device illustration retain Langkah's identity.
- R-31 PASS: Image sources, placements and control behavior recorded in DESIGN.md and this report.
- R-32 PASS: Preview and card viewport remain keyboard focusable; focus pauses normal motion.
- R-33 PASS: Source edited directly with patches; cwebp only exports existing PNG artwork.
- R-34 PASS: Single theme checked in both languages and four widths.
- R-35 PASS: HTTP preview exercised for normal motion, reduced motion, no JavaScript and images.
- R-36 PASS: SVG depicts local storage without inventing security or outcome claims.
- R-37 PASS: Existing DESIGN.md and explicit image/control request guided the revision.
- R-38 PASS: Images have real app sources or are identified as an illustration; downloads stay dummy.
- Dials PASS: ENERGY 2 / RHYTHM 2 / MOTION 2 retained.
- Dial consistency PASS: Static supporting images accompany the existing explanatory loops.
- Focal point PASS: Dino/timer states, Dina/role explanation and device/privacy have visible hierarchy.
- Whitespace PASS: Images fit their section content; mobile sections can grow instead of clipping.
- Accent PASS: Existing sage actions and star reward remain deliberate accents.
- Identity motif PASS: Dina, Dino, picture cards and phone outline repeat the app's vocabulary.
- Design read PASS: Before edits, the declared direction was existing app mascots for timer/modes
  and a device-with-lock illustration for privacy, retaining the app palette and shapes.
- C-1 PASS: Every new image has a stated source and content purpose.
- C-2 PASS: Removed buttons have no leftover listeners; remaining links retain verified destinations.
- C-3 PASS: Images support the three sections the user identified.
- C-4 PASS: Responsive, reduced-motion and no-JavaScript checks above passed.
- C-5 PASS: No invented customer, usage or security proof.
