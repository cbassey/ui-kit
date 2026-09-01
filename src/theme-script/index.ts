/**
 * Anti-flash theme bootstrap. This entry point carries no `"use client"`
 * banner, so a Next.js server layout can import `themeInitScript` and inline
 * it in <head>:
 *
 * ```tsx
 * import { themeInitScript } from '@cbassey/ui-kit/theme-script'
 * // in <head>:
 * <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
 * ```
 *
 * Vite apps that render their own index.html can paste the same string into
 * a <script> in <head> before the module script.
 *
 * The `<ThemeProvider>` (from the package root) keeps the class in sync
 * afterwards; this script only prevents the first-paint flash for a visitor
 * whose stored choice differs from their OS preference.
 */

export const THEME_STORAGE_KEY = 'brightside-theme'

/**
 * Returns a self-invoking script that reads the stored theme and stamps the
 * matching class (`light` / `dark`, or neither for "system") plus
 * `color-scheme` onto <html> before the page paints. Safe to run with no
 * localStorage (private mode, SSR hydration) — it swallows its own errors.
 */
export function themeInitScript(storageKey: string = THEME_STORAGE_KEY): string {
  return `(function(){try{var k=${JSON.stringify(
    storageKey,
  )};var t=localStorage.getItem(k);var d=document.documentElement;d.classList.remove('light','dark');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='light'||t==='dark'){d.classList.add(t);d.style.colorScheme=t;}else{d.style.colorScheme=m?'dark':'light';}}catch(e){}})();`
}
