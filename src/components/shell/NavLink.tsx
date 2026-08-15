import type { ReactNode } from 'react'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'

export function NavLink({
  active,
  onClick,
  children,
}: {
  active?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <Button
      type="button"
      variant={active ? 'secondary' : 'ghost'}
      size="sm"
      onClick={onClick}
      className={cn('shrink-0', !active && 'text-muted-foreground')}
    >
      {children}
    </Button>
  )
}
