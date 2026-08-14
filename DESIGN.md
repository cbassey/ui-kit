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
- **IBM Plex Sans** (`font-sans`, the default) — all prose, UI copy, badges,
  section labels, and tabular numbers (pair with `.tabular`).
- **IBM Plex Mono** (`font-mono`) — code and literal technical strings only.
  Do not use mono for labels, badges, scores, or section titles.

The preset maps these to CSS variables, so every app must load the three
families and expose them under the same variable names. There is no fallback
that looks right — an app that skips this renders in the system stack.

Next.js (hub, weld/web) — in the root layout:

```tsx
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

const archivo = Archivo({ variable: '--font-archivo', subsets: ['latin'] })
const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

// <html className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
```

Vite or plain CSS (plop/ui) — at the top of the global stylesheet, before the
Tailwind directives:

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

:root {
  --font-archivo: 'Archivo';
  --font-plex-sans: 'IBM Plex Sans';
  --font-plex-mono: 'IBM Plex Mono';
}
```

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

## Page column

App chrome uses a single centered column: `--page-max-width` (72rem, same
as plop's `max-w-6xl`) with `1rem` inline padding (`2rem` from `sm`).
`<Shell>` applies the `.page-shell` utility to the header inner and the
main. Keep the shell wide enough for chrome and multi-column layouts
(e.g. content + sticky action rail). Don't invent a narrower `max-w-3xl`
page column in consuming apps — if reading measure needs to be narrower
(JD copy, a login card), constrain that text block with `max-w-xl` /
`max-w-2xl`, not the page shell.

## The `PageHeader` pattern

Every view's top-of-page pattern: optional muted eyebrow label →
`font-display` title → optional description → optional right-aligned action
slot. Reuse `<PageHeader>` rather than hand-rolling this per view.

## Async feedback

- **Toasts** — success and error for server actions / async work. Mount
  `<Toaster />` once at the app root and call `toast` from `sonner`.
  Stay grayscale: no green success or red error fills. Errors get a
  slightly stronger border/background; successes stay quiet.
- **Busy buttons** — use `<BusyButton>` (or the same pattern): swap the
  label (`Writing`, `Screening`), keep full opacity, show the
  `animate-sweep` bar. Do not dim the control and append `…`.

## Button `asChild`

`Button asChild` requires a **single React element child** (typically a
link). Whitespace or multiple children break Radix `Slot`. Prefer
`<Button asChild><Link …></Link></Button>`, not a fragment or mixed
text nodes.

## Motion vocabulary

Three keyframes only, all respecting `prefers-reduced-motion`:

- `animate-rise` — opacity 0→1 + translateY(8px→0), for content settling in
  (list rows, pane switches).
- `animate-fill` — scaleX(0→1), for progress/meter bars filling.
- `animate-sweep` — a loading shimmer sweep (busy buttons, light progress).

Don't add new keyframes without a strong reason; this vocabulary is meant to
stay small.

## Brand marks

Marks come from `@cbassey/ui-kit/brand`, a separate entry point with no
`"use client"` banner. They are static SVG, so they render in a server
component and ship no JavaScript. Import them from `/brand`, not from the
package root.

```tsx
import { BrandTile, BrandLockup, WeldMark, getBrandMark } from '@cbassey/ui-kit/brand'

<BrandLockup mark={WeldMark} name="Weld" />        // header, breadcrumb root
<BrandTile mark={getBrandMark(slug)} size="lg" />  // product avatar
```

A mark is not an icon. Icons label an action and come from `lucide-react`; a
mark identifies a product and never changes meaning with context. Rules for
drawing a new one:

- **Draw the noun in the name.** A drop for Plop, a seam for Weld. No abstract
  swoosh, no letter in a box — a letter tile is the default every generated
  interface reaches for, and it says nothing about the product.
- **`currentColor` only**, on the same 24x24 grid as the rest. A mark that
  needs a colour is the wrong mark, because the palette has no hue.
- **Check it at 18px first.** That is where marks live, in a header or a
  breadcrumb. Thin gaps close up at small sizes, and a mark that fuses into a
  blob has failed even if it looks right at 56px.

Sizes are fixed by `BrandTile`: 40px in a list, 56px at the top of a landing
page, inverted plate (`bg-foreground text-background`) in both cases.

## Icons

`lucide-react`, sized `h-3.5 w-3.5` to `h-5 w-5`, `text-muted-foreground` by
default, always paired with text except icon-only buttons with `aria-label`.
Chevron rotation (`rotate-90` on open) is the standard expand/collapse
affordance.
