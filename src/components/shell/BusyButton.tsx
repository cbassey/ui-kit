import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

/**
 * Async action button: swap the label, keep full opacity, show a sweep bar.
 * Prefer this over dimming the button or appending "…".
 */
export function BusyButton({
  label,
  busyLabel,
  busy,
  wide,
  onClick,
  type = "button",
  variant = "outline",
  size = "sm",
  className,
}: {
  label: string
  busyLabel: string
  busy: boolean
  wide?: boolean
  onClick?: () => void
  type?: "button" | "submit"
  variant?: "outline" | "default" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg"
  className?: string
}) {
  return (
    <Button
      type={type}
      size={size}
      variant={variant}
      aria-busy={busy}
      disabled={busy}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden",
        wide && "w-full",
        busy && "disabled:opacity-100",
        className,
      )}
    >
      <span className={busy ? "text-muted-foreground" : undefined}>
        {busy ? busyLabel : label}
      </span>
      {busy ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-1 bottom-1 h-0.5 overflow-hidden rounded-full bg-muted"
        >
          <span className="absolute inset-y-0 w-1/3 animate-sweep rounded-full bg-foreground" />
        </span>
      ) : null}
    </Button>
  )
}
