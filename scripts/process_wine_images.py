#!/usr/bin/env python3
"""Normalizza le foto bottiglia al canvas Marciliano (298×1024).

- Blasi e Marciliano: foto su sfondo nero da studio → flood-fill ai bordi (come prima).
- Altri vini: PNG già scontornati → si preserva l'alpha.
"""
from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image


def save_rgba(path: Path, rgba: np.ndarray) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(rgba, "RGBA").save(path, optimize=True)


def alpha_bbox(rgba: np.ndarray, thr: int = 24) -> tuple[int, int, int, int]:
    a = rgba[:, :, 3]
    ys, xs = np.where(a > thr)
    if len(ys) == 0:
        h, w = rgba.shape[:2]
        return 0, 0, w, h
    return int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1


def load_cutout_rgba(src: Path) -> np.ndarray:
    """Carica l'immagine in RGBA senza alterare bordi né trasparenza già presente."""
    im = Image.open(src)
    return np.array(im.convert("RGBA"), dtype=np.uint8)


def remove_black_studio_bg(rgb: np.ndarray) -> np.ndarray:
    """Sfondo nero da studio: flood-fill dai bordi (stessa logica storica)."""
    a = rgb.astype(np.float32)
    h, w, _ = a.shape
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    chroma = np.abs(r - g) + np.abs(g - b) + np.abs(b - r)
    seen = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()
    Lt, Ct = 5.0, 6.0
    for x in range(w):
        for y in (0, h - 1):
            if lum[y, x] < Lt and chroma[y, x] < Ct:
                seen[y, x] = True
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if not seen[y, x] and lum[y, x] < Lt and chroma[y, x] < Ct:
                seen[y, x] = True
                q.append((x, y))
    while q:
        x, y = q.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not seen[ny, nx]:
                if lum[ny, nx] < 14.0 and chroma[ny, nx] < 14.0:
                    seen[ny, nx] = True
                    q.append((nx, ny))
    alpha = np.where(seen, 0, 255).astype(np.uint8)
    return np.dstack([rgb.astype(np.uint8), alpha])


def black_studio_rgba(src: Path) -> np.ndarray:
    rgb = np.array(Image.open(src).convert("RGB"))
    return remove_black_studio_bg(rgb)


def center_crop_to_aspect(rgba: np.ndarray, aspect_wh: float) -> np.ndarray:
    """Ritaglia centrando per avere larghezza/altezza = aspect_wh (es. 242/1003)."""
    h, w = rgba.shape[0], rgba.shape[1]
    crop_h = min(h, w / aspect_wh)
    crop_w = crop_h * aspect_wh
    if crop_w > w:
        crop_w = float(w)
        crop_h = crop_w / aspect_wh
    crop_w_i, crop_h_i = int(round(crop_w)), int(round(crop_h))
    crop_w_i = min(crop_w_i, w)
    crop_h_i = min(crop_h_i, h)
    a = rgba[:, :, 3].astype(np.float32)
    total = float(a.sum()) + 1e-6
    yy = float(np.sum(np.arange(h)[:, None] * a) / total)
    xx = float(np.sum(np.arange(w)[None, :] * a) / total)
    x0 = int(round(xx - crop_w_i / 2))
    y0 = int(round(yy - crop_h_i / 2))
    x0 = max(0, min(x0, w - crop_w_i))
    y0 = max(0, min(y0, h - crop_h_i))
    return rgba[y0 : y0 + crop_h_i, x0 : x0 + crop_w_i]


def scale_to_max_box(rgba: np.ndarray, max_h: int, max_w: int) -> np.ndarray:
    """Scala uniformemente (LANCZOS) per entrare in max_h × max_w."""
    ch, cw = rgba.shape[0], rgba.shape[1]
    s = min(max_h / ch, max_w / cw)
    nh, nw = max(1, int(round(ch * s))), max(1, int(round(cw * s)))
    pil = Image.fromarray(rgba, "RGBA").resize((nw, nh), Image.Resampling.LANCZOS)
    return np.array(pil)


def paste_center(canvas: np.ndarray, piece: np.ndarray, *, bottom_pad: int | None = None) -> None:
    ch, cw = canvas.shape[0], canvas.shape[1]
    ph, pw = piece.shape[0], piece.shape[1]
    y0 = ch - ph - bottom_pad if bottom_pad is not None else (ch - ph) // 2
    x0 = (cw - pw) // 2
    canvas[y0 : y0 + ph, x0 : x0 + pw] = piece


def normalize_to_marciliano_canvas(
    rgba: np.ndarray,
    canvas_w: int,
    canvas_h: int,
    ref_h: int,
    ref_w: int,
    *,
    needs_aspect_crop: bool,
    align_bottom: bool = False,
) -> np.ndarray:
    """ref_h/ref_w = altezza e larghezza contenuto Marciliano (bottiglia)."""
    aspect_wh = ref_w / ref_h
    work = rgba
    if needs_aspect_crop:
        work = center_crop_to_aspect(work, aspect_wh)
    x0, y0, x1, y1 = alpha_bbox(work, thr=24)
    cropped = work[y0:y1, x0:x1]
    scaled = scale_to_max_box(cropped, ref_h, ref_w)
    canvas = np.zeros((canvas_h, canvas_w, 4), dtype=np.uint8)
    bottom_pad = (canvas_h - ref_h + 1) // 2 if align_bottom else None
    paste_center(canvas, scaled, bottom_pad=bottom_pad)
    return canvas


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    src_dir = Path(__file__).resolve().parent / "source"
    out_dir = root / "public" / "wines"

    marc = black_studio_rgba(src_dir / "marciliano.png")
    mx0, my0, mx1, my1 = alpha_bbox(marc, thr=24)
    ref_w = mx1 - mx0
    ref_h = my1 - my0

    canvas_w, canvas_h = 298, 1024

    default_box = (ref_h, ref_w)
    current_tasting_box = (ref_h, canvas_w - 12)

    jobs: list[tuple[str, np.ndarray, bool, tuple[int, int], bool]] = [
        ("grechetto-blasi.png", black_studio_rgba(src_dir / "blasi.png"), True, default_box, False),
        ("grechetto-casaioli.png", load_cutout_rgba(src_dir / "casaioli.png"), False, default_box, False),
        ("travertino.png", load_cutout_rgba(src_dir / "travertino.png"), False, default_box, False),
        ("ciliegiolo-pilar.png", load_cutout_rgba(src_dir / "ciliegiolo-pilar.png"), False, default_box, False),
        ("marciliano.png", marc, False, default_box, False),
        ("asla-rosato.png", load_cutout_rgba(src_dir / "asla-rosato.png"), False, current_tasting_box, True),
        ("trebbiano-bocale.png", load_cutout_rgba(src_dir / "trebbiano-bocale.png"), False, current_tasting_box, True),
        ("opra-madrevite.png", load_cutout_rgba(src_dir / "opra-madrevite.png"), False, current_tasting_box, True),
    ]

    for name, rgba, aspect_crop, (max_h, max_w), align_bottom in jobs:
        out = normalize_to_marciliano_canvas(
            rgba,
            canvas_w,
            canvas_h,
            max_h,
            max_w,
            needs_aspect_crop=aspect_crop,
            align_bottom=align_bottom,
        )
        dst = out_dir / name
        save_rgba(dst, out)
        print("OK", dst.relative_to(root), out.shape[1], out.shape[0], "box", max_w, max_h)


if __name__ == "__main__":
    main()
