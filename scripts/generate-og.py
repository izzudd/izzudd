#!/usr/bin/env python3
"""Generates public/og.png (1200x630) in the site's neo-brutalist palette.

Run from the repo root:  python3 scripts/generate-og.py
Only uses PIL + the DejaVu fonts that ship with most Linux images, so it works
on a headless box with no design tooling.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
INK = (10, 10, 10)
PAPER = (231, 229, 228)
CANVAS = (250, 250, 249)
LIME = (132, 204, 22)
SKY = (14, 165, 233)
AMBER = (245, 158, 11)
FUCHSIA = (217, 70, 239)

SANS_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
MONO_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"

PAD = 72
FRAME = 16


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def text_height(f: ImageFont.FreeTypeFont, text: str) -> int:
    top, bottom = f.getbbox(text)[1::2]
    return bottom - top


def main() -> None:
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)

    d.rectangle([0, 0, W - 1, H - 1], outline=INK, width=FRAME)
    d.rectangle([W - 250, FRAME, W - FRAME, 110], fill=LIME)
    d.rectangle([W - 400, FRAME, W - 251, 110], fill=SKY)

    y = 84

    d.text((PAD, y), "// AI ENGINEER", font=font(MONO_BOLD, 26), fill=(80, 80, 80))
    y += 26 + 42

    name_font = font(SANS_BOLD, 116)
    for line in ("Daffa", "Izzuddin"):
        d.text((PAD, y), line, font=name_font, fill=INK)
        y += text_height(name_font, line) + 6

    y += 14
    d.rectangle([PAD, y, PAD + 520, y + 14], fill=AMBER)
    y += 14 + 40

    tagline_font = font(MONO, 32)
    tagline = "train \u2192 serve \u2192 monitor \u2192 iterate"
    d.text((PAD, y), tagline, font=tagline_font, fill=(55, 55, 55))
    y += text_height(tagline_font, tagline) + 46

    badge_font = font(MONO_BOLD, 28)
    badge_h = 68
    d.rectangle([PAD, y, PAD + 430, y + badge_h], outline=INK, width=6, fill=CANVAS)
    d.text((PAD + 22, y + 19), "me.izzudd.my.id", font=badge_font, fill=INK)

    second_x = PAD + 460
    second_w = 300
    d.rectangle([second_x, y, second_x + second_w, y + badge_h], outline=INK, width=6, fill=FUCHSIA)
    d.text((second_x + 22, y + 19), "NUXT \u00b7 PYTORCH", font=badge_font, fill=INK)

    out = Path(__file__).resolve().parent.parent / "public" / "og.png"
    img.save(out, optimize=True)
    print(f"wrote {out} ({out.stat().st_size} bytes, badges end at y={y + badge_h})")


if __name__ == "__main__":
    main()
