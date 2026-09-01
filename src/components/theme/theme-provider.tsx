"use client"

import * as React from "react"

import { THEME_STORAGE_KEY } from "../../theme-script"

export type Theme = "light" | "dark" | "system"
export type ResolvedTheme = "light" | "dark"

interface ThemeContextValue {
  /** The stored choice, including "system". */
  theme: Theme
  /** What "system" currently resolves to — always "light" or "dark". */
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function systemTheme(fallback: ResolvedTheme): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return fallback
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function applyClass(theme: Theme, resolved: ResolvedTheme) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  root.classList.remove("light", "dark")
  // "system" leaves both classes off so the stylesheet's prefers-color-scheme
  // rule governs — SSR, no-JS, and the live page then all agree.
  if (theme !== "system") root.classList.add(theme)
  root.style.colorScheme = resolved
}

export interface ThemeProviderProps {
  children: React.ReactNode
  /** Used until a stored choice is read. */
  defaultTheme?: Theme
  storageKey?: string
  /** Resolved theme when the OS preference can't be read. */
  systemFallback?: ResolvedTheme
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
  systemFallback = "dark",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] =
    React.useState<ResolvedTheme>(systemFallback)

  // Read the stored choice once, on mount.
  React.useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(storageKey)
    } catch {
      /* private mode — stay on the default */
    }
    if (stored === "light" || stored === "dark" || stored === "system") {
      setThemeState(stored)
    }
  }, [storageKey])

  // Apply the class, and track the OS while on "system".
  React.useEffect(() => {
    const resolved =
      theme === "system" ? systemTheme(systemFallback) : theme
    setResolvedTheme(resolved)
    applyClass(theme, resolved)

    if (
      theme !== "system" ||
      typeof window === "undefined" ||
      !window.matchMedia
    ) {
      return
    }
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      const next: ResolvedTheme = mq.matches ? "dark" : "light"
      setResolvedTheme(next)
      applyClass("system", next)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [theme, systemFallback])

  const setTheme = React.useCallback(
    (next: Theme) => {
      try {
        localStorage.setItem(storageKey, next)
      } catch {
        /* private mode — the choice lasts for this session only */
      }
      setThemeState(next)
    },
    [storageKey],
  )

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>")
  }
  return ctx
}
