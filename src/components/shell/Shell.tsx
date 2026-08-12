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
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-8 px-5 sm:px-8">
          <span className="font-display text-[15px] font-semibold tracking-tight">
            {brand}
          </span>
          <nav className="flex flex-1 items-center gap-1">{nav}</nav>
          {action}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        {children}
      </main>
    </div>
  )
}
