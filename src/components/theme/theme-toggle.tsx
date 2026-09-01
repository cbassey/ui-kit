"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useTheme, type Theme } from "./theme-provider"

const OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

export interface ThemeToggleProps {
  className?: string
  /** Menu alignment against the trigger. */
  align?: "start" | "center" | "end"
}

/**
 * Icon button + three-way menu (Light / Dark / System). Grayscale, sized to
 * sit in header chrome next to nav links. Needs a `<ThemeProvider>` above it.
 */
export function ThemeToggle({ className, align = "end" }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  // Before mount the stored choice is unknown; show a stable neutral icon so
  // SSR and the first client render match.
  const TriggerIcon = !mounted
    ? Sun
    : theme === "system"
      ? Monitor
      : resolvedTheme === "dark"
        ? Moon
        : Sun

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Change theme"
          className={cn("h-8 w-8 text-muted-foreground", className)}
        >
          <TriggerIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-[8rem]">
        {OPTIONS.map(({ value, label, icon: ItemIcon }) => (
          <DropdownMenuItem
            key={value}
            onSelect={() => setTheme(value)}
            className={cn("gap-2", theme === value && "font-medium")}
          >
            <ItemIcon className="h-3.5 w-3.5" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
