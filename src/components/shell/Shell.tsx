import type { ReactNode } from 'react'

export function Shell({
  children,
  nav,
  action,
  brand,
}: {
  children: ReactNode
  nav: ReactNode
  action?: ReactNode
  brand: ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="page-shell flex h-14 items-center gap-3 sm:gap-8">
          <span className="shrink-0 font-display text-[15px] font-semibold tracking-tight">
            {brand}
          </span>
          <nav className="-mx-1 flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto px-1 [scrollbar-width:none] sm:gap-1 [&::-webkit-scrollbar]:hidden">
            {nav}
          </nav>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      </header>
      <main className="page-shell py-6 sm:py-12">{children}</main>
    </div>
  )
}
