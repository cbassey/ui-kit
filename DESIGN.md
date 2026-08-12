# Design discipline

This library encodes a specific visual point of view, not a generic component
kit. The rules below are load-bearing — deviating from them (adding a hue,
adding a shadow, breaking the type hierarchy) is a design regression, not a
style preference.

## Zero-chroma grayscale

Every color in the system is pure grayscale (HSL with 0% saturation). State —
pass/fail, active/inactive, selected/unselected, even destructive actions —
is communicated through **value, opacity, and weight**, never hue. There is
no red for "destructive"; it's still white-on-black, just as loud as
"primary." If a component needs a new visual state, reach for a grayscale
value or an opacity step before reaching for color.

## Three-typeface hierarchy

- **Archivo** (`font-display`, weights 500–800) — page titles, big numeric
  displays (gauges, hero stats), card headings. Never body text.
- **IBM Plex Sans** (`font-sans`, the default) — all prose and UI copy.
- **IBM Plex Mono** (`font-mono`) — anything numeric or tabular, eyebrow
  labels (`uppercase tracking-[0.16em] text-[11px]`), badges, code.

Font sizes frequently use arbitrary bracket values (`text-[11px]`,
`text-[13px]`, `text-[15px]`) rather than Tailwind's default scale — this is
deliberate fine-grained control, not an oversight. Stick to the 11/12/13/14/
15/16px steps already in use rather than introducing new sizes ad hoc.

## Tabular numbers

Apply the `.tabular` utility (`font-variant-numeric: tabular-nums`) to any
numeric display that updates or is compared against another number (gauges,
counts, scores). Digits should align.

## Flat surfaces

Cards and panels are `rounded-xl`/`rounded-2xl` with `border border-border`
and `bg-card`. Shadows are avoided or kept to `shadow-none`/minimal — this is
a flat, print-like surface language, not a soft-UI one.

## The `PageHeader` pattern

Every view's top-of-page pattern: optional uppercase-tracked eyebrow label →
`font-display` title → optional description → optional right-aligned action
slot. Reuse `<PageHeader>` rather than hand-rolling this per view.

## Motion vocabulary

Three keyframes only, all respecting `prefers-reduced-motion`:

- `animate-rise` — opacity 0→1 + translateY(8px→0), for content settling in
  (list rows, pane switches).
- `animate-fill` — scaleX(0→1), for progress/meter bars filling.
- `animate-sweep` — a loading shimmer sweep.

Don't add new keyframes without a strong reason; this vocabulary is meant to
stay small.

## Icons

`lucide-react`, sized `h-3.5 w-3.5` to `h-5 w-5`, `text-muted-foreground` by
default, always paired with text except icon-only buttons with `aria-label`.
Chevron rotation (`rotate-90` on open) is the standard expand/collapse
affordance.
