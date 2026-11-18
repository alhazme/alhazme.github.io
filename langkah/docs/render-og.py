"""Render the og-source.html composition without a browser: python3 docs/render-og.py."""
from pathlib import Path
import re

from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parent.parent
tokens = dict(re.findall(r"--([\w-]+):\s*(#[0-9a-f]{6});", (root / "assets/styles.css").read_text()))
scale = 3
canvas = Image.new("RGB", (1200 * scale, 630 * scale), tokens["background"])
draw = ImageDraw.Draw(canvas)


def font(size, weight):
    face = ImageFont.truetype(str(root / "assets/fonts/nunito-latin-var.woff2"), size * scale)
    face.set_variation_by_axes([weight])
    return face


def text(value, x, y, size, weight, color, spacing=0):
    face = font(size, weight)
    cursor = x * scale
    baseline = y * scale - face.getbbox("H", anchor="ls")[1]
    for letter in value:
        draw.text((cursor, baseline), letter, font=face, fill=tokens[color], anchor="ls")
        cursor += draw.textlength(letter, font=face) + spacing * scale


def width(value, size, weight, spacing=0):
    face = font(size, weight)
    return sum(draw.textlength(letter, font=face) for letter in value) / scale + spacing * (len(value) - 1)


def rounded(box, radius, fill, border=None):
    draw.rounded_rectangle(tuple(round(n * scale) for n in box), radius=radius * scale,
                           fill=tokens[fill], outline=tokens[border] if border else None,
                           width=round(1.5 * scale))


def artwork(name, x, y, w, h):
    image = Image.open(root / "assets/img" / name).convert("RGBA")
    image.thumbnail((w * scale, h * scale), Image.Resampling.LANCZOS)
    canvas.paste(image, (round(x * scale + (w * scale - image.width) / 2),
                         round(y * scale + (h * scale - image.height) / 2)), image)


name = "Langkah: First Then App"
name_width = width(name, 60, 900, -1.2)
brand_x = (1200 - 72 - 20 - name_width) / 2
icon = Image.open(root / "assets/img/app-icon.webp").convert("RGB").resize((72 * scale, 72 * scale), Image.Resampling.LANCZOS)
mask = Image.new("L", icon.size)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, 72 * scale - 1, 72 * scale - 1), radius=18 * scale, fill=255)
canvas.paste(icon, (round(brand_x * scale), 62 * scale), mask)
text(name, brand_x + 92, 77, 60, 900, "sage-dark", -1.2)
tagline = "First this. Then that."
text(tagline, (1200 - width(tagline, 40, 800)) / 2, 161, 40, 800, "ink")

for x, stage, activity, image, tint, ink in (
    (200, "FIRST", "Learn", "splash_reading_dina.webp", "first-tint", "first-ink"),
    (680, "THEN", "Play", "splash_play_dino.webp", "then-tint", "then-ink"),
):
    rounded((x, 236, x + 320, 569), 32, "surface", "line")
    text(stage, x + (320 - width(stage, 28, 900, 1.68)) / 2, 254, 28, 900, ink, 1.68)
    rounded((x + 18, 296, x + 302, 512), 22, tint)
    artwork(image, x + 18, 296, 284, 216)
    text(activity, x + (320 - width(activity, 28, 900)) / 2, 529, 28, 900, "ink")

# Same directional cue as the Phosphor arrow in the site's splash preview.
arrow_x, arrow_y = 568, 370.5
points = [(10, 32), (56, 32), (38, 14)]
draw.line([(round((arrow_x + x) * scale), round((arrow_y + y) * scale)) for x, y in points],
          fill=tokens["sage-dark"], width=6 * scale, joint="curve")
draw.line([(round((arrow_x + 56) * scale), round((arrow_y + 32) * scale)),
           (round((arrow_x + 38) * scale), round((arrow_y + 50) * scale))],
          fill=tokens["sage-dark"], width=6 * scale)
for x, y in [(10, 32), (56, 32), (38, 14), (38, 50)]:
    draw.ellipse(((arrow_x + x - 3) * scale, (arrow_y + y - 3) * scale,
                  (arrow_x + x + 3) * scale, (arrow_y + y + 3) * scale), fill=tokens["sage-dark"])

output = root / "assets/img/og.png"
canvas.resize((1200, 630), Image.Resampling.LANCZOS).save(output, optimize=True)
print(f"{output.relative_to(root)}: 1200x630, {output.stat().st_size} bytes")
