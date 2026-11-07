---
name: svg-design
description: Design and build SVG graphics for the wedding site, such as wavy borders and frames, ornaments, dividers, botanical line art, icons and monograms. Covers parametric generation, inline vs. file SVG, responsive viewBox scaling, theming with currentColor/CSS variables, accessibility and optimization. Use whenever creating or changing an SVG, a decorative border or an illustration, or when someone says "draw", "ornament", "border", "icon" or "frame".
---

# SVG design for the wedding site

Decorative SVG carries a lot of this site's personality (wavy frames, bows,
sparkles, flowers). Treat it as code: reproducible, themable and accessible.

## 1. Pick the right approach

| Need                                                  | Approach                                                                                     |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Geometric/repeating shapes (wavy frame, scallops, dividers, dots) | **Generate from parameters** with a script (see `scripts/wavy-frame.mjs`). Never hand-edit coordinates. |
| Small icon or line ornament (< ~2 KB)                 | Inline JSX component, `viewBox` only, `fill`/`stroke="currentColor"`, as in the icons in `SaveTheDate.tsx` |
| Existing complex art (traced, drawn in a tool)        | File in `src/assets/`, optimize with svgo, import with `?raw` if it must be styled or filtered inline |
| Photo-like or very detailed illustration              | Not SVG; use an optimized PNG/WebP                                                           |

## 2. Parametric generation

- Put generators in `frontend/scripts/svg/` (copy from this skill's `scripts/`
  as a starting point). Each takes CLI flags and prints SVG. Commit both the
  generator and its output, and record the exact command in a comment at the
  top of the output file.
- `scripts/wavy-frame.mjs` builds a closed wavy rounded rectangle. It picks a
  whole number of waves so the pattern meets at the corners, smooths the path
  with Catmull-Rom → cubic Bézier, and prints the **content safe-region inset**
  as CSS:
  ```bash
  node .claude/skills/svg-design/scripts/wavy-frame.mjs --width 800 --height 1200 \
    --amplitude 14 --wavelength 110 --stroke 18 --radius 60 --color currentColor \
    --out frontend/src/assets/frames/rsvp-frame.svg
  # stderr → {"waves":34,"safeInsetCss":"inset: 7.4% 11.1%;"}
  ```
- To tweak the look, change parameters (amplitude, wavelength, phase), not path data.
  Generate 2–3 variants side by side for comparison (see the `design-review` skill).
- For organic hand-drawn feel, add small seeded noise to the amplitude rather
  than freehand edits, so the result stays reproducible.

## 3. Responsive behaviour

- Always set a `viewBox`. Omit `width`/`height` on inline SVG and size it with CSS.
- Frames that must stretch with their box use `preserveAspectRatio="none"` and
  match the container's `aspect-ratio`. Ornaments keep the default (`xMidYMid meet`).
- Keep content inside the frame's safe region: position the content box with
  the generated `inset`, or use container query units (`cqw`) as `SaveTheDate.scss` does.
- Stroke widths are in viewBox units and scale with the SVG. If a thin line
  must stay crisp at small sizes, check the 390px screenshot.

## 4. Colour and theming

- Use `currentColor` (inherit from CSS `color`) or CSS custom properties.
  Hard-code hex colours only for multi-colour art.
- Site palette (save-the-date): cream `#fce9dc`, ink red `#a42b34`, accent
  orange `#e7782f`. Main site sections have their own palettes; match the
  section's existing colours.
- Filters (`feMorphology`, `feGaussianBlur`) are fine for effects like the
  border thinning in `SaveTheDate.tsx`, but give each filter a unique `id`.
  Inline SVG ids are document-global.

## 5. Accessibility

- Decorative SVG gets `aria-hidden="true"` and `focusable="false"`, and no `<title>`.
- Meaningful SVG (a logo or a map pin standing alone) gets `role="img"` plus
  `<title>` (or `aria-label`) in Norwegian, with an `en` equivalent through i18n if
  it's rendered from React.
- Never put text the user must read inside SVG paths. Real text stays HTML.

## 6. Optimize and verify

```bash
npx svgo --multipass -i in.svg -o out.svg   # strip editor metadata (draw.io, Inkscape)
```
- Target under 5 KB for ornaments and under 15 KB for frames. Drop `xmlns:xlink`, `<?xml?>`,
  editor `content=` attributes and unnecessary precision (2 decimals is plenty).
- Verify visually with the `visual-check` skill at all three viewports. For a
  standalone SVG, render it quickly with Playwright `page.setContent()`, screenshot it,
  and look at the image.

## Existing assets

`frontend/src/assets/saveTheDate/`:
- `wavy_border_thinner.svg`: the live save-the-date frame, hand-traced, ~11 KB
- `wavy-border.svg` and `Border.svg` (draw.io): earlier versions
These are good candidates to replace with a `wavy-frame.mjs` output if the
frame is reused on the main site.
