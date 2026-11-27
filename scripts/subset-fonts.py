#!/usr/bin/env python3
"""Trim the two site fonts to the characters the site uses.

The full Latin files from Fontsource are about 92 kB together, which was more than half
the page. This keeps only the characters listed in src/assets/fonts/charset.json and the
OpenType features the stylesheet relies on, and writes the results next to that file.

Run it by hand after changing charset.json or updating the Fontsource packages:

    pip install fonttools brotli
    python3 scripts/subset-fonts.py

The output is committed, so the normal build needs neither Python nor these tools.
"""

import json
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "assets" / "fonts"
SOURCES = {
    "bricolage-grotesque.woff2": ROOT
    / "node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2",
    "source-serif-4.woff2": ROOT
    / "node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2",
}
# Kerning, ligatures and contextual forms for reading; tabular and lining figures for the
# speed readout. Small caps, superscripts and the rest are not used anywhere.
FEATURES = ["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk", "tnum", "lnum", "pnum"]


def main() -> None:
    charset = json.loads((OUT / "charset.json").read_text())
    unicodes = [
        code
        for start, end in charset["ranges"]
        for code in range(int(start, 16), int(end, 16) + 1)
    ]

    for name, source in SOURCES.items():
        options = subset.Options()
        options.flavor = "woff2"
        options.layout_features = FEATURES
        options.name_IDs = [1, 2, 3, 4, 6]
        options.notdef_outline = True

        font = TTFont(source)
        subsetter = subset.Subsetter(options)
        subsetter.populate(unicodes=unicodes)
        subsetter.subset(font)
        font.save(OUT / name)

        before, after = source.stat().st_size, (OUT / name).stat().st_size
        print(f"{name}: {before / 1000:.1f} kB -> {after / 1000:.1f} kB")


if __name__ == "__main__":
    main()
