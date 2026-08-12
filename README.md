# @cbassey/ui-kit

Shared "Rams B&W" design system — extracted from `plop/ui`. See
[DESIGN.md](./DESIGN.md) for the design discipline this library encodes.

Local-only package for now (no npm publish). Consume it from a sibling repo
via a `file:` dependency:

```json
{
  "dependencies": {
    "@cbassey/ui-kit": "file:../ui-kit"
  }
}
```

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

4. Fonts: load Archivo / IBM Plex Sans / IBM Plex Mono yourself (e.g. via
   `next/font/google`) and expose them as `--font-archivo`,
   `--font-plex-sans`, `--font-plex-mono` CSS variables — the preset's
   `fontFamily` falls back to the bare Google Fonts names if you don't.

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
