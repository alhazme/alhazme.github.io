# Parent and child mode artwork

Section 5 now has two illustrations within the existing role columns. Parent Mode shows a
father and mother holding a plain gray tablet, with the mother's hand behind it and no
white display panel. Child Mode shows Dino and Dina writing beside a standing tablet
reading exactly "study". The earlier single Dina image was removed.

## Sources and decisions

Built-in imagegen used the app's inspected buddy_unlock_together.png reference for mascot
identities and painted style, then edited the generated scenes to follow Fariz's corrections.
The final assets are assets/img/parent_mode_setup.webp and assets/img/child_mode_study.webp,
quality-85 exports at 640x640 with transparent alpha preserved. Original generated PNGs
remain in Codex's generated_images directory. These are explanatory illustrations.

Each image sits below its own role heading so the scene and explanation stay together.
A shared 300px maximum width gives both roles equal emphasis; mobile columns stack.
Existing fonts, colors and text are retained to preserve the current story.

## Verification

- PASS: ID and EN at 320, 390, 760 and 1440 pixels wide, 900 pixels tall: both final images
  decode at 640x640, have alt text, fit the viewport and create no page overflow.
- PASS: Columns stack at 320/390 and appear side by side at 760/1440.
- PASS: Section height meets the available viewport minimum and grows for mobile content.
- PASS: No JavaScript errors during the eight final browser checks.
- PASS: python3 check.py --draft validates six pages; git diff --check passes.
- PASS: Final generated artwork inspection confirms the plain tablet and hand placement,
  and the exact lowercase word study. CSS changes only affect the role illustration size.
- Existing navigation, preview/card motion and controls are unchanged.

## Delivery gate

- R-01 PASS: No CSS gradients added; painted shading matches the app reference.
- R-02 PASS: Plain punctuation and draft HTML validation pass.
- R-03 PASS: ID and EN at 320, 390, 760 and 1440 pixels have no overflow.
- R-04 PASS: Tablet supports the parent/child explanation; existing meaningful icons retained.
- R-05 PASS: Two role columns compare parent setup and child activity, stacked on mobile.
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
- R-23 PASS: Both generated scenes and all edits explicitly requested by Fariz.
- R-24 PASS: Draft checker validates six pages and internal links.
- R-25 PASS: Text colors unchanged; study is large dark sage on a pale display.
- R-26 PASS: Interactive controls and handlers unchanged; store placeholders remain labeled.
- R-27 PASS: Local images have 640x640 dimensions and lazy loading.
- R-28 PASS: No FAQ added.
- R-29 PASS: Reference's sage, pink and warm neutrals guide the artwork palette.
- R-30 PASS: App mascots and tablet vocabulary preserve Langkah's identity.
- R-31 PASS: Sources, prompts, equal image sizing and placement reasons documented.
- R-32 PASS: Localized descriptive alt text; existing keyboard focus rules retained.
- R-33 PASS: Source edited with patches; cwebp only exports generated images.
- R-34 PASS: Both languages checked across four viewport widths.
- R-35 PASS: HTTP preview exercised; unchanged interaction checks remain in STORY-REVIEW.md.
- R-36 PASS: No invented security or developmental outcome claims.
- R-37 PASS: Existing DESIGN.md and section 6 mascot reference guided the work.
- R-38 PASS: Generated artwork is identified as illustration, not an app screenshot or customer proof.
- Dials PASS: ENERGY 2 / RHYTHM 2 / MOTION 2 retained from DESIGN.md.
- Dial consistency PASS: Two static supporting scenes accompany existing explanatory motion.
- Focal point PASS: Main heading introduces the two distinct parent/child roles.
- Whitespace PASS: Equal image boxes and existing grid gaps separate the explanations.
- Accent PASS: Sage and pink reference the app's recognizable mascots.
- Identity motif PASS: Dino, Dina and tablets repeat Langkah's visual vocabulary.
- Design read PASS: Declared direction was app-style illustration within each role column.
- C-1 PASS: Image purpose, sources, placement and size decisions documented.
- C-2 PASS: Existing controls retained, and draft link validation passes.
- C-3 PASS: Both images support specifically requested parent and child roles.
- C-4 PASS: Both languages, four widths and minimum section height verified.
- C-5 PASS: No fictional customer evidence, statistics or unsupported outcome claims.

## Generation prompts

Parent scene:
```text
Use case: illustration-story
Asset type: transparent square illustration for the Parent Mode column of the Langkah website.
Input image 1 is a STYLE reference only: match its warm, soft hand-painted watercolor texture, rounded approachable forms, brown eyes and gentle shading. The people in this new illustration must be clearly adult parents, not the child mascots.
Primary request: a father and mother together holding a tablet and configuring its settings. Both have warm light-medium skin, brown hair and kind faces. Father wears a simple sage-green shirt, mother a soft pink cardigan over a cream top. They sit side by side behind a small light wooden tabletop. The father supports one landscape tablet while the mother touches the screen with one finger as they both look attentively at it.
The tablet is angled gently toward the viewer so its pale screen is visible, with a simple gear symbol and two clear settings toggles. This is an explanatory illustration, not a detailed real application screenshot. No words on the screen.
Composition: centered square, two complete heads and upper bodies fully visible, one tablet and their hands clearly visible, modest transparent margins. Compact tabletop cutout with no room or surrounding furniture. Similar visual density to the reference, legible at 280px wide.
Background: genuine transparent alpha, no backdrop, no drawn checkerboard.
Constraints: exactly two adults, adult proportions with playful children's-book rendering, no dinosaur costumes on parents, no children, no extra device, no letters, logos, watermark or extra limbs.
```

Child scene:
```text
Use case: illustration-story
Asset type: transparent square illustration for the Child Mode column of the Langkah website.
Input image 1 is a reference for exact Dino and Dina identities, costumes, face style, watercolor texture and warm painted shading. Do not copy its chest or key.
Primary request: Dino and Dina sitting together at a small light wooden tabletop, each writing with a pencil on their own piece of paper. Between them is ONE tablet standing upright in a clearly visible support stand. Its screen faces the viewer and reads exactly "learn" in large legible lowercase letters.
Subject: Dino on the left, brown-haired child with huge brown eyes in the reference's green dinosaur hooded costume with cream tummy. Dina on the right, brown pigtails and huge brown eyes in the reference's pink dinosaur hooded costume with cream tummy. Preserve these recognizable characters. Gentle focused smiles, each child holds one pencil with the tip touching their own paper. A few simple pencil strokes on the paper, no readable words there.
Tablet: sage-green portrait tablet upright on a little stand on the tabletop, positioned between the children without hiding their faces or writing hands. Pale warm screen with only the exact word "learn" in dark sage, no other text. Render the letters l-e-a-r-n accurately, all lowercase, horizontal and large.
Style: same soft hand-painted watercolor texture, rounded child-friendly forms, gentle dimensional shading and clean cutout edges as the reference. Small light wooden tabletop, no room or surrounding furniture.
Composition: centered square, both complete heads and upper bodies visible, tablet, pencils, writing hands and papers fully visible. Balanced size and compact composition suitable for a 280px website column. Modest transparent margins.
Background: genuine transparent alpha, no backdrop or drawn checkerboard.
Avoid: parents, extra children, extra tablets, chest, key, padlock, logos, watermark, extra arms, any other readable words.
```

Parent hand and screen edit:
```text
Use case: precise-object-edit
Edit the provided Parent Mode illustration, preserving the father, mother, clothing, faces, watercolor style, wooden tabletop, tablet position, composition, scale and transparent background exactly.
Change only these two details:
1. Remove the gear and both settings toggles from the tablet display. The screen must be completely blank pale warm cream, with no icons, no words, no symbols and no interface.
2. Move the mother's extended index finger BEHIND the tablet. Her right-side hand supports the tablet from behind its right edge; the tablet occludes the extended finger. No pointing finger or hand crosses in front of the tablet screen or front bezel. Preserve the mother's arm and its natural position; show only what would naturally be visible behind the tablet.
The father still holds the tablet. Keep everything else unchanged. Preserve genuine transparent alpha, do not add a backdrop or checkerboard.
```

Final parent tablet edit:
```text
Use case: precise-object-edit
Edit only the tablet surface in this transparent father-and-mother illustration.
REMOVE the pale white/cream rectangle inside the tablet completely. The entire visible face of the tablet must now be a single plain slate-gray tablet back, extending over the whole tablet body, matching the gray color of its existing rim. It should look like the solid back of a tablet facing the viewer, NOT a display. Gentle painted shading is okay, but NO white rectangle, NO inset rectangular screen, NO screen border, NO light panel, NO icons, NO words, NO logo. Keep the small existing camera dot near the upper left if it helps read as the tablet back.
Keep the tablet's existing outer rounded rectangular shape, angle and size unchanged. The father still holds the edge and the mother's hand remains behind the tablet, with no pointing finger in front.
Preserve all other pixels and elements as closely as possible: parents' faces, hair, clothing, arms, wooden tabletop, composition, watercolor texture, colors and transparent alpha. No new backdrop, checkerboard or watermark.
```

Final child text edit:
```text
Use case: precise-object-edit
Change ONLY the text on the tablet screen in the supplied transparent Dino and Dina writing illustration.
Replace the exact lowercase word "learn" with the exact lowercase word "study". Spell it s-t-u-d-y, five lowercase letters. Match the existing large dark sage, rounded friendly lettering, centered in the pale tablet screen. No other words.
Preserve Dino and Dina's exact faces, costumes, poses, pencils and writing hands, papers, wooden tabletop, tablet frame and support stand, small yellow rays, composition, colors, painted watercolor texture and transparent alpha background. No new objects, backdrop, checkerboard or watermark.
```
