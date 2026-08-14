# Changelog

All notable changes to this project are documented here, following
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed
- Page column width lives in tokens (`--page-max-width` / `.page-shell`).
  `Shell` uses it instead of hardcoded `max-w-6xl`.

## [0.1.0] — 2026-08-12

### Added
- Initial extraction from `plop/ui`: 12 shadcn "new-york" primitives, app
  chrome (`Shell`, `PageHeader`, `Field`, `NavLink`, `PrimaryButton`,
  `GhostButton`), generalized data-display components (`Meter`,
  `CategoryBreakdown`), `cn()`/`pct()` helpers, and the Rams B&W token set +
  Tailwind preset.
