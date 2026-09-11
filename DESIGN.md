# Design discipline

This library encodes a specific visual point of view, not a generic component
kit. The rules below are load-bearing — deviating from them (adding a hue,
adding a shadow, breaking the type hierarchy) is a design regression, not a
style preference.

## Zero-chroma grayscale

State — pass/fail, active/inactive, selected/unselected — is communicated
through **value, opacity, and weight**, not hue. If a component needs a new
visual state, reach for a grayscale value or an opacity step before reaching
for color.

Ink, borders, rings, and every foreground token are pure grayscale (HSL with
0% saturation) in both themes. The single concession to warmth is the light
**ground**: `--background` / `--card` / `--popover` carry a faint paper tone
(hue 40, ~12–24% saturation, 97–99% lightness) so a light surface reads as
paper, not a clinical white. Nothing painted *on* the ground picks up that
hue. Dark mode is zero-chroma apart from the danger tokens below.

There is exactly one hue in the system, and it has exactly two jobs.

## Danger, the one hue

`--danger`, `--danger-ink`, `--danger-wash` and `--danger-edge` are red in both
themes, lighter and less saturated in dark, because a mid red on a near-black
ground reads as brown. They mean one of two things and nothing else:

1. **Work that is overdue.** Always with the word beside it, never colour
   alone — a reader who cannot tell the colours apart reads the word.
2. **An action that destroys.** `<Button variant="destructive">` is the only
   component that wears it.

`--destructive` itself stays ink, and so does `<Alert variant="destructive">`.
That is deliberate: everything else wearing the destructive name is an error
message, and an error message is not a hazard. It says what went wrong; the
red button says what is about to be destroyed.

Spend the hue on a third thing and it stops meaning either of the first two.

## Light and dark

The token set is dual-theme. `styles.css` defines:

- `:root` — the **light** palette (the default).
- `:root.dark` — the **dark** palette (an explicit choice).
- an `@media (prefers-color-scheme: dark)` block that applies the dark
  palette when no `light` / `dark` class is set, so a visitor with no stored
  choice follows their OS.

### Default: follow the OS, no wiring

An app that imports `styles.css` and puts **no** theme class on `<html>`
already tracks the OS — light by default, dark under
`prefers-color-scheme: dark`, switching live when the visitor flips their
system appearance. `color-scheme` is set in the same rules, so native
controls and scrollbars follow too. This is the expected setup. `hub` uses
exactly this.

### Optional: an in-app override

Only if an app needs a manual Light / Dark / System control on top of the OS
default:

```tsx
import { ThemeProvider, ThemeToggle } from '@cbassey/ui-kit'
import { themeInitScript } from '@cbassey/ui-kit/theme-script'

// Next.js — inline in the root <head> to stop the first-paint flash:
<script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
// Vite — paste the same string into a <script> in index.html's <head>.

<ThemeProvider>{children}</ThemeProvider>   // defaultTheme "system",
//                                             systemFallback "dark"
<ThemeToggle />                             // in the header chrome
```

`useTheme()` returns `{ theme, resolvedTheme, setTheme }` (`theme` may be
`"system"`; `resolvedTheme` is always `"light"` or `"dark"`).

Do **not** hardcode a `dark` class on `<html>` any more, and do not add a
`dark:` variant to hand-tune a component for one theme — every surface must
be built from the semantic tokens (`bg-background`, `text-foreground`,
`border-border`, `bg-card`, `text-muted-foreground`, …) so it tracks the
theme for free. A raw `bg-black` / `text-white` / `bg-white` is a regression
for the same reason a hue is.

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
