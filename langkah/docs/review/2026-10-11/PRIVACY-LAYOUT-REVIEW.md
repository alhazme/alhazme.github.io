# Privacy section order

Fariz requested text on the left and the image on the right in section 7. Both landing
languages now put the section-copy before the illustration in HTML and remove art-first
from this image. The existing split grid handles desktop placement without new CSS.
Below its 760px breakpoint, the text appears above the image in the same reading order.

## Verification

- PASS: ID and EN at 320, 390, 760 and 1440 pixels wide, 900 pixels tall:
  text is above artwork at 320/390; text is left of artwork at 760/1440.
- PASS: All eight checks have no page overflow; privacy image decodes at 640px.
- PASS: Section meets the viewport minimum height and no JavaScript errors occur.
- PASS: python3 check.py --draft validates all six pages and links; git diff --check passes.
- Artwork, alt text, privacy copy, links, CSS and scripts are unchanged in this commit.
- MODE-ARTWORK-REVIEW.md records the separately committed final section 5 artwork.

## Delivery gate

- R-01 PASS: No CSS gradients added; painted shading matches the app reference.
- R-02 PASS: Plain punctuation and draft HTML validation pass.
- R-03 PASS: ID and EN at 320, 390, 760 and 1440 pixels have no overflow.
- R-04 PASS: Tablet supports the parent/child explanation; existing meaningful icons retained.
- R-05 PASS: Privacy text is on the left and mascot artwork on the right; mobile stacks text first.
- R-06 PASS: Existing Nunito retained; tablet word study is explicitly requested.
- R-07 PASS: No background pattern introduced.
- R-08 PASS: No decorative arrows added.
- R-09 PASS: No badges added.
- R-10 PASS: Opaque page surfaces retained.
- R-11 PASS: Existing interface radius scale retained.
- R-12 PASS: No CSS shadows added.
- R-13 PASS: No glow added.
- R-14 PASS: Plain role columns retained, without feature cards.
- R-15 PASS: Specific privacy and support destinations retained.
- R-16 PASS: Existing story copy retained without new marketing claims.
- R-17 PASS: Existing source-backed card and star counts retained.
- R-18 PASS: Parents are explanatory illustrated characters, not fabricated testimonials.
- R-19 PASS: Motion scripts and reduced-motion rules unchanged.
- R-20 PASS: Dino and Dina retain their dinosaur costumes, faces and painted style.
- R-21 PASS: Existing light theme retained.
- R-22 PASS: New images directly depict the roles requested by Fariz.
- R-23 PASS: Fariz explicitly requested moving the privacy image right and text left.
- R-24 PASS: Draft checker validates six pages and internal links.
- R-25 PASS: Text colors unchanged; study is large dark sage on a pale display.
- R-26 PASS: Interactive controls and handlers unchanged; store placeholders remain labeled.
- R-27 PASS: Local images have 640x640 dimensions and lazy loading.
- R-28 PASS: No FAQ added.
- R-29 PASS: Reference's sage, pink and warm neutrals guide the artwork palette.
- R-30 PASS: App mascots and tablet vocabulary preserve Langkah's identity.
- R-31 PASS: DESIGN.md records privacy document order and the existing 760px breakpoint.
- R-32 PASS: Localized descriptive alt text; existing keyboard focus rules retained.
- R-33 PASS: Source edited with patches; cwebp only exports generated images.
- R-34 PASS: Both languages checked across four viewport widths.
- R-35 PASS: HTTP preview exercised; unchanged interaction checks remain in STORY-REVIEW.md.
- R-36 PASS: No invented security or developmental outcome claims.
- R-37 PASS: Existing DESIGN.md and section 6 mascot reference guided the work.
- R-38 PASS: Generated artwork is identified as illustration, not an app screenshot or customer proof.
- Dials PASS: ENERGY 2 / RHYTHM 2 / MOTION 2 retained from DESIGN.md.
- Dial consistency PASS: Two static supporting scenes accompany existing explanatory motion.
- Focal point PASS: Privacy heading and explanation lead the left column, followed by the yellow lock artwork.
- Whitespace PASS: Existing split gap and 420px image width retained.
- Accent PASS: Sage and pink reference the app's recognizable mascots.
- Identity motif PASS: Dino, Dina and tablets repeat Langkah's visual vocabulary.
- Design read PASS: Declared direction was privacy text left, mascot artwork right, text first on mobile.
- C-1 PASS: Image purpose, sources, placement and size decisions documented.
- C-2 PASS: Existing controls retained, and draft link validation passes.
- C-3 PASS: New privacy order follows the specific requested placement.
- C-4 PASS: Both languages, four widths and minimum section height verified.
- C-5 PASS: No fictional customer evidence, statistics or unsupported outcome claims.
