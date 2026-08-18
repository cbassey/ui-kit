import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { cn } from "../../lib/utils"

/** Async action button: swap the label, dim the button, show a spinner. */
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
      className={cn(wide && "w-full", busy && "opacity-60", className)}
    >
      {busy ? <Spinner /> : null}
      {busy ? busyLabel : label}
    </Button>
  )
}
