# Privacy mascot illustration

Fariz requested replacing section 7 with Dino and Dina showing a phone with a yellow padlock,
using section 6 as the visual reference. Both languages use
assets/img/buddy_privacy_together.webp with localized alt text and 640x640 dimensions.

## Asset source and generation

Built-in imagegen generated this illustration from the inspected native app asset
Langkah/Langkah/Resources/Assets.xcassets/buddy_unlock_together.imageset/buddy_unlock_together.png.
The generated PNG remains in Codex's generated_images directory. The workspace image is an
80,072-byte quality-85 WebP export at 640x640, with alpha preserved. The obsolete privacy
schematic was removed. DESIGN.md records the new provenance.

Final generation prompt:

```text
Use case: illustration-story
Asset type: transparent mascot illustration for section 7 of the Langkah website.
Input image 1 is a reference for the exact character identities, clothing, rendering style and yellow-gold padlock color, not the composition to copy.
Primary request: Dino and Dina together presenting a smartphone facing the viewer. Its screen displays one large CLOSED yellow-gold padlock, clearly centered and easy to recognize at small website sizes.
Subject: preserve the reference's two adorable chibi children: Dino on the left with brown hair, huge brown eyes and a green dinosaur hooded costume with cream tummy; Dina on the right with brown pigtails, huge brown eyes and a pink dinosaur hooded costume with cream tummy. They smile warmly and each supports one side of the same upright portrait phone, showing it to us. Show their complete heads and bodies, with the phone in the foreground between them.
Style: match the reference's soft hand-painted watercolor texture, gentle dimensional shading, rounded forms, warm child-friendly faces and clean cutout edges.
Phone: rounded sage-green frame, pale warm screen, large closed golden-yellow padlock with dark gold outlines and a visible keyhole. Keep the screen simple, no interface text.
Composition: centered square illustration with modest transparent margins, balanced character sizes, full figures visible, suitable for a 420px-wide website illustration.
Background: genuinely transparent alpha, no backdrop or checkerboard drawn into the artwork.
Avoid: treasure chest, key, activity cards, open padlock, extra characters, extra phones, extra limbs, logos, lettering, watermark.
```

## Verification

- PASS: python3 check.py --draft, all six pages and internal links.
- PASS: git diff --check.
- PASS: ID and EN at 320, 390, 760 and 1440 pixels wide and 900 pixels tall: new image
  decodes at 640x640, stays inside the viewport and has localized alt text.
- PASS: No page overflow or JavaScript errors in these eight browser checks.
- PASS: Generated image inspection confirms both mascots, one phone, a closed yellow
  padlock on its screen and transparency.
- CSS, scripts, section order, section 6 artwork, copy and existing interactions are unchanged.

## Delivery gate

- R-01 PASS: No CSS gradient added; painted shading matches the reference.
- R-02 PASS: Plain punctuation and static HTML checks pass.
- R-03 PASS: Eight responsive combinations have no overflow.
- R-04 PASS: Padlock illustrates the existing privacy section.
- R-05 PASS: Existing split layout retained.
- R-06 PASS: Typography retained; illustration contains no text.
- R-07 PASS: No background pattern added.
- R-08 PASS: No CTA arrows added.
- R-09 PASS: No badges added.
- R-10 PASS: Existing opaque surfaces retained.
- R-11 PASS: No interface radius changes.
- R-12 PASS: No CSS shadow added.
- R-13 PASS: No glow added.
- R-14 PASS: Existing varied section layouts retained.
- R-15 PASS: Specific privacy and support destinations retained.
- R-16 PASS: Existing story copy retained.
- R-17 PASS: Activity and reward counts retained.
- R-18 PASS: No testimonials or fictional users introduced.
- R-19 PASS: Motion scripts and reduced-motion rules unchanged.
- R-20 PASS: Dino and Dina match reference costumes, faces and painted texture.
- R-21 PASS: Existing theme retained.
- R-22 PASS: Reference source and privacy purpose documented.
- R-23 PASS: Exact replacement explicitly requested by Fariz.
- R-24 PASS: Draft checker passes internal links and anchors.
- R-25 PASS: No text color changes; large yellow lock has dark gold outline and keyhole.
- R-26 PASS: Controls and handlers unchanged.
- R-27 PASS: Local image has intrinsic dimensions and lazy loading.
- R-28 PASS: No FAQ added.
- R-29 PASS: Green, pink and yellow follow section 6's illustration palette.
- R-30 PASS: Both mascots continue Langkah's identity.
- R-31 PASS: Source, generation prompt and placement documented.
- R-32 PASS: Localized alt text; focus behavior unchanged.
- R-33 PASS: Source edited with patches; cwebp exports the generated image.
- R-34 PASS: Both languages checked at four widths.
- R-35 PASS: HTTP preview loads and decodes the asset at every tested size.
- R-36 PASS: Illustration adds no encryption or outcome claim.
- R-37 PASS: DESIGN.md and section 6 reference guided replacement.
- R-38 PASS: Artwork explicitly identified as AI-generated from a supplied reference.
- Dials PASS: ENERGY 2 / RHYTHM 2 / MOTION 2 retained.
- Dial consistency PASS: Static supporting illustration fits existing motion.
- Focal point PASS: Two mascots present one phone with a prominent closed padlock.
- Whitespace PASS: Transparent margins and existing 420px limit retain spacing.
- Accent PASS: Yellow padlock follows requested section 6 color.
- Identity motif PASS: Dino, Dina and phone repeat Langkah's vocabulary.
- Design read PASS: Declared direction was section 6 mascot style with a locked phone.
- C-1 PASS: Source, prompt and purpose recorded.
- C-2 PASS: Links and interactions retained; link checks pass.
- C-3 PASS: Replacement supports requested privacy section.
- C-4 PASS: Both languages and four widths verified.
- C-5 PASS: No invented customer, usage or security evidence.
