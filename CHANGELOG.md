# Changelog

All notable changes to this project are documented here, following
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- `<Toaster />` — Rams-styled Sonner host for async success/error toasts.
- `<BusyButton />` — label swap + `animate-sweep` bar for in-flight actions.

### Changed
- Page column width lives in tokens (`--page-max-width` / `.page-shell`).
  `Shell` uses it instead of hardcoded `max-w-6xl`.
- DESIGN.md: async feedback (toast + busy), `Button asChild` single-child
  rule, and page shell vs local reading measure.

## [0.1.0] — 2026-08-12

### Added
- Initial extraction from `plop/ui`: 12 shadcn "new-york" primitives, app
  chrome (`Shell`, `PageHeader`, `Field`, `NavLink`, `PrimaryButton`,
  `GhostButton`), generalized data-display components (`Meter`,
  `CategoryBreakdown`), `cn()`/`pct()` helpers, and the Rams B&W token set +
  Tailwind preset.
