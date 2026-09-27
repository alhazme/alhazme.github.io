#!/usr/bin/env python3
"""
Generate responsive AVIF + WebP versions of the site images.

  images/<name>.png -> images/<name>-<w>.avif / .webp   (project mockups used by index.html)
  hero.png          -> images/hero-<w>.avif / .webp

Also writes images/manifest.json with each source size (used for width/height attributes).

Usage (repo root): python3 scripts/optimize_images.py
Requires: Pillow >= 11 (AVIF), numpy, scipy
"""
import json, os, re
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "images")
os.makedirs(OUT, exist_ok=True)

AVIF_Q, WEBP_Q = 58, 80
PROJECT_W = (640, 1024, 1600, 2400)
HERO_W = (480, 924)


def load(path):
    """RGBA; mockups exported on an opaque background get it cut out so they sit on any section color."""
    rgba = np.asarray(Image.open(path).convert("RGBA")).copy()
    if rgba[..., 3].min() >= 250:
        bg = rgba[0, 0, :3].astype(int)
        fg = np.abs(rgba[..., :3].astype(int) - bg).sum(-1) > 20
        fg = ndimage.binary_closing(fg, iterations=6)
        fg = ndimage.binary_fill_holes(fg)
        fg = ndimage.binary_erosion(fg, iterations=1)
        alpha = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))
        rgba[..., 3] = np.minimum(rgba[..., 3], np.asarray(alpha))
    return Image.fromarray(rgba)


def encode(im, name, widths):
    done = []
    for w in widths:
        w = min(w, im.width)
        if w in done:
            continue
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(os.path.join(OUT, f"{name}-{w}.avif"), quality=AVIF_Q, speed=6)
        r.save(os.path.join(OUT, f"{name}-{w}.webp"), quality=WEBP_Q, method=6)
        done.append(w)
    return done


html = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
names = sorted((set(re.findall(r'images/([\w-]+)\.png', html))
                | set(re.findall(r'images/([\w-]+)-\d+\.avif', html))) - {"hero"})

manifest = {}
for name in names:
    im = load(os.path.join(ROOT, "images", f"{name}.png"))
    manifest[name] = {"size": list(im.size), "widths": encode(im, name, PROJECT_W)}
    print(name, manifest[name])

hero = Image.open(os.path.join(ROOT, "hero.png")).convert("RGBA")
manifest["hero"] = {"size": list(hero.size), "widths": encode(hero, "hero", HERO_W)}

json.dump(manifest, open(os.path.join(OUT, "manifest.json"), "w"), indent=1)
total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT) if f.endswith((".avif", ".webp")))
print(f"images/ (avif+webp): {total / 1e6:.2f} MB")
