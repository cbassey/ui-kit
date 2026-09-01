# @cbassey/ui-kit

Shared "Rams B&W" design system — extracted from `plop/ui`. See
[DESIGN.md](./DESIGN.md) for the design discipline this library encodes.

Not published to npm. Consume it from GitHub, which is what `hub`, `weld/web`
and `plop/ui` do. The `prepare` script builds `dist/` at install time:

```json
{
  "dependencies": {
    "@cbassey/ui-kit": "github:cbassey/ui-kit"
  }
}
```

Use `file:../ui-kit` instead only while you develop both repos at once.

## Entry points

| Import | Contents | Notes |
| --- | --- | --- |
| `@cbassey/ui-kit` | shadcn primitives, app chrome, data display, `cn` | Client. The bundle carries a `"use client"` banner, so a server component can render these but cannot call `cn` itself. |
| `@cbassey/ui-kit/brand` | `BrightsideMark`, `PlopMark`, `WeldMark`, `BrandTile`, `BrandLockup` | Static SVG, no banner. Renders in a server component and ships no JavaScript. |
| `@cbassey/ui-kit/theme-script` | `themeInitScript()`, `THEME_STORAGE_KEY` | No banner. The anti-flash `<head>` snippet — safe to import into a Next.js server layout. |
| `@cbassey/ui-kit/tailwind.preset` | tokens, fonts, keyframes | |
| `@cbassey/ui-kit/styles.css` | CSS custom properties | |

## Setup in a consuming app

1. `npm install` in the consumer picks up the built `dist/` output — run
   `npm run build` here first (or `npm run dev` for a watch build during
   active development across both repos).
2. Tailwind config:

   ```ts
   import uiKitPreset from '@cbassey/ui-kit/tailwind.preset'

   export default {
     presets: [uiKitPreset],
     content: [
       './app/**/*.{ts,tsx}',
       './node_modules/@cbassey/ui-kit/dist/**/*.js',
     ],
   }
   ```

3. Global CSS, before the `@tailwind` directives:

   ```css
   @import '@cbassey/ui-kit/styles.css';
   ```

4. Fonts: load Archivo / IBM Plex Sans / IBM Plex Mono yourself and define
   `--font-archivo`, `--font-plex-sans`, `--font-plex-mono`. This step is
   required. The preset writes `var(--font-archivo), Archivo, sans-serif`,
   and an undefined custom property voids the entire declaration, so the
   bare name after the comma is not a working fallback — the app silently
   renders in the inherited stack. DESIGN.md has the exact snippet for
   `next/font/google` and for a plain CSS `@import`.

5. Brand mark, if the app is a Brightside product:

   ```tsx
   import { BrandLockup, WeldMark } from '@cbassey/ui-kit/brand'

   <BrandLockup mark={WeldMark} name="Weld" />
   ```

   Add new marks to `src/brand/marks.tsx` here, not in the consuming app,
   so every surface picks up the same drawing.

6. Theme. Do **not** hardcode a `dark` class on `<html>`. With no class the
   tokens follow `prefers-color-scheme` on their own — light by default,
   dark when the OS asks. That is the whole setup for most apps.

   Only if an app needs a manual Light / Dark / System control, add
   `<ThemeProvider>` + `<ThemeToggle />` and inline the anti-flash script:

   ```tsx
   import { ThemeProvider, ThemeToggle } from '@cbassey/ui-kit'
   import { themeInitScript } from '@cbassey/ui-kit/theme-script'

   // <head>:
   <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
   ```

   See DESIGN.md → "Light and dark".

## Development

Two-terminal workflow while iterating across `ui-kit` and a consumer:

```
# terminal 1, in ui-kit/
npm run dev      # tsup --watch

# terminal 2, in the consumer app
npm run dev
```

Re-run `npm install` in the consumer after adding/removing exports (new
files), since `file:` dependencies don't auto-relink.
