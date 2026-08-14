# Changelog

All notable changes to this project are documented here, following
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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
