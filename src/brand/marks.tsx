import type { ComponentType, ReactNode } from 'react'

/**
 * Brand marks for the Brightside studio and its products.
 *
 * These are not UI icons. `lucide-react` covers UI; a mark identifies a
 * product and never changes meaning with context. Each one is a literal
 * reading of the name (a disc lit on one side, a drop landing, two plates
 * joined by a seam), drawn on the same 24x24 grid so the set reads as a
 * family without sharing a silhouette.
 *
 * Rules for adding one:
 * - Draw the noun in the name. No abstract swoosh, no letter in a box.
 * - `currentColor` only. The palette is zero-chroma, so a mark that needs
 *   a colour is the wrong mark.
 * - Check it at 18px before you check it at 56px. The small size is where
 *   these live, and thin gaps close up first.
 *
 * This module holds no client state and imports nothing, so it renders in a
 * React Server Component without shipping any JavaScript. Keep it that way:
 * do not import `cn` here.
 */

export type BrandMarkProps = {
  className?: string
}

export type BrandMarkComponent = ComponentType<BrandMarkProps>

function classes(...values: (string | undefined | false)[]): string {
  return values.filter(Boolean).join(' ')
}

/** Brightside — a disc lit from one side. The mark is the bright side. */
export function BrightsideMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={classes('shrink-0', className)}
      fill="none"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" />
    </svg>
  )
}

/** Plop — a drop above its ripple. The ripple is what says it landed. */
export function PlopMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={classes('shrink-0', className)}
      fill="none"
    >
      <path
        d="M12 2.5c3.1 4.2 4.6 7 4.6 8.4a4.6 4.6 0 1 1-9.2 0c0-1.4 1.5-4.2 4.6-8.4Z"
        fill="currentColor"
      />
      <path
        d="M3.5 18.4c2.2 1.6 5.1 2.4 8.5 2.4s6.3-.8 8.5-2.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Weld — two plates and three seam beads. The join carries the weight, so
 * the plates stay quiet. The gap is wide on purpose: at 18px a narrower one
 * fuses the beads into the plates and the mark reads as a single bar.
 */
export function WeldMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={classes('shrink-0', className)}
      fill="none"
    >
      <rect x="1.8" y="4" width="6.4" height="16" rx="1.4" fill="currentColor" />
      <rect x="15.8" y="4" width="6.4" height="16" rx="1.4" fill="currentColor" />
      <circle cx="12" cy="7.4" r="1.7" fill="currentColor" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
      <circle cx="12" cy="16.6" r="1.7" fill="currentColor" />
    </svg>
  )
}

/** Fallback for a product with no mark yet: an empty plate, not a letter. */
export function PlaceholderMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={classes('shrink-0', className)}
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

/** Lookup by product slug, for data-driven lists. */
export const brandMarks: Record<string, BrandMarkComponent> = {
  brightside: BrightsideMark,
  plop: PlopMark,
  weld: WeldMark,
}

export function getBrandMark(slug: string): BrandMarkComponent {
  return brandMarks[slug] ?? PlaceholderMark
}

const TILE_SIZES = {
  sm: { tile: 'h-10 w-10 rounded-lg', glyph: 'h-5 w-5' },
  lg: { tile: 'h-14 w-14 rounded-xl', glyph: 'h-7 w-7' },
} as const

export type BrandTileSize = keyof typeof TILE_SIZES

/**
 * A mark in an inverted plate. This is the product avatar: 40px in lists,
 * 56px at the top of a landing page. It inverts rather than tints, because
 * the palette has no hue to tint with.
 */
export function BrandTile({
  mark: Mark,
  size = 'sm',
  className,
}: {
  mark: BrandMarkComponent
  size?: BrandTileSize
  className?: string
}) {
  const step = TILE_SIZES[size]
  return (
    <span
      className={classes(
        'flex shrink-0 items-center justify-center bg-foreground text-background',
        step.tile,
        className,
      )}
    >
      <Mark className={step.glyph} />
    </span>
  )
}

/**
 * Mark plus wordmark, for a header or a breadcrumb root. The name is set in
 * `font-display` at the same optical size as the mark, so the pair reads as
 * one object.
 */
export function BrandLockup({
  mark: Mark,
  name,
  className,
  markClassName,
}: {
  mark: BrandMarkComponent
  name: ReactNode
  className?: string
  markClassName?: string
}) {
  return (
    <span className={classes('flex items-center gap-2', className)}>
      <Mark className={classes('h-[18px] w-[18px]', markClassName)} />
      <span className="font-display text-[15px] font-semibold tracking-tight">
        {name}
      </span>
    </span>
  )
}
