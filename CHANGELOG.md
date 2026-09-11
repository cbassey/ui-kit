# Changelog

All notable changes to this project are documented here, following
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.4.0] — 2026-09-11

### Added
- **Danger tokens.** `--danger`, `--danger-ink`, `--danger-wash` and
  `--danger-edge`, in light and dark. They are the only hue in the system and
  they mean two things: work that is overdue, and an action that destroys.
  Dark is lighter and less saturated, because a mid red on a near-black ground
  reads as brown. See DESIGN.md.
- Seven parts: `Checkbox` (three states, including indeterminate), `Dialog`,
  `Popover`, `Calendar` (the week starts on Monday, fixed here so a grouping
  rule and a picker cannot disagree), `Command` (a searchable list),
  `Tooltip`, and `Avatar` with `NameAvatar` and `initialsFromName`.

### Changed
- `<Button variant="destructive">` now carries the danger hue. `--destructive`
  itself stays ink, and so does `<Alert variant="destructive">`: everything
  else wearing that name is an error message, and an error message is not a
  hazard.

### Note for consumers
- `NameAvatar` takes a name and never an email address, so an initial cut from
  an address cannot reach another person's screen.

## [0.3.0] — 2026-09-01

### Added
- **Light and dark themes.** `styles.css` now defines the light palette on
  `:root`, the dark palette on `:root.dark`, and a
  `prefers-color-scheme: dark` fallback for visitors with no stored choice.
  Light mode keeps the zero-chroma discipline for ink and borders; only the
  ground carries a faint warm paper tone.
- `<ThemeProvider>` + `useTheme()` — framework-agnostic theme state
  (`light` / `dark` / `system`), persisted to `localStorage`, applied as a
  class on `<html>`. Defaults: `defaultTheme="system"`,
  `systemFallback="dark"`.
- `<ThemeToggle>` — grayscale icon button with a three-way Light / Dark /
  System menu, sized for header chrome.
- `@cbassey/ui-kit/theme-script` — a new bannerless entry exporting
  `themeInitScript()`, the anti-flash `<head>` snippet, plus
  `THEME_STORAGE_KEY`.

### Changed
- DESIGN.md: "Zero-chroma grayscale" reworded for the warm light ground; new
  "Light and dark" section with the wiring recipe. Consuming apps must stop
  hardcoding a `dark` class on `<html>` and build every surface from the
  semantic tokens.

## [0.2.0]

### Added
- `<Toaster />` — Rams-styled Sonner host for async success/error toasts.
- `<BusyButton />` — label swap + `animate-sweep` bar for in-flight actions.
- `@cbassey/ui-kit/brand` — a second entry point holding the studio and
  product marks: `BrightsideMark`, `PlopMark`, `WeldMark`,
  `PlaceholderMark`, the `brandMarks` / `getBrandMark` lookup, and the
  `BrandTile` and `BrandLockup` wrappers. The entry carries no
  `"use client"` banner, so the marks render in a server component and
  ship no JavaScript.

### Changed
- Page column width lives in tokens (`--page-max-width` / `.page-shell`).
  `Shell` uses it instead of hardcoded `max-w-6xl`.
- DESIGN.md: async feedback (toast + busy), `Button asChild` single-child
  rule, page shell vs local reading measure, the exact font-loading recipe
  for Next.js and for plain CSS, and the rules for drawing a brand mark.
- README: entry-point table, and the install source corrected to
  `github:cbassey/ui-kit`, which is what the consumers actually use.
- Build removes `dist/` once up front instead of per entry, so the two
  tsup configs cannot delete each other's output.

## [0.1.0] — 2026-08-12

### Added
- Initial extraction from `plop/ui`: 12 shadcn "new-york" primitives, app
  chrome (`Shell`, `PageHeader`, `Field`, `NavLink`, `PrimaryButton`,
  `GhostButton`), generalized data-display components (`Meter`,
  `CategoryBreakdown`), `cn()`/`pct()` helpers, and the Rams B&W token set +
  Tailwind preset.
