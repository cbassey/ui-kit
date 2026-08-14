import { ArrowRight } from 'lucide-react'
import { pct } from '../../lib/format'

export interface GaugeStat {
  label: string
  rate: number
  detail?: string
}

function Gauge({ stat, tone }: { stat: GaugeStat; tone: 'muted' | 'strong' }) {
  return (
    <div className="flex-1">
      <div className="mb-2 flex items-baseline justify-between text-[12px] text-muted-foreground">
        <span>{stat.label}</span>
        {stat.detail && (
          <span className="tabular text-[11px]">{stat.detail}</span>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="font-display text-6xl font-extrabold leading-none tabular text-foreground">
          {pct(stat.rate)}
        </span>
        <span className="mb-1 text-sm text-muted-foreground">%</span>
      </div>
      <div className="relative mt-3 h-1.5 overflow-hidden rounded-sm bg-muted">
        <div
          className={
            'h-full origin-left animate-fill rounded-sm ' +
            (tone === 'strong' ? 'bg-foreground' : 'bg-foreground/45')
          }
          style={{ width: `${stat.rate * 100}%` }}
        />
      </div>
    </div>
  )
}

function EmptyGauge({ label }: { label: string }) {
  return (
    <div className="flex-1">
      <div className="mb-2 text-[12px] text-muted-foreground">{label}</div>
      <div className="font-display text-6xl font-extrabold leading-none text-muted-foreground/40">
        --
      </div>
      <div className="mt-3 h-1.5 rounded-sm bg-muted" />
    </div>
  )
}

export function Meter({
  title,
  eyebrow,
  left,
  right,
  leftEmptyLabel,
  rightEmptyLabel,
  compact,
}: {
  title?: string
  eyebrow?: string
  left: GaugeStat | null
  right: GaugeStat | null
  leftEmptyLabel?: string
  rightEmptyLabel?: string
  compact?: boolean
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8">
      {!compact && title && (
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            {eyebrow && (
              <p className="mt-1 text-xs text-muted-foreground">
                {eyebrow}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="flex items-center gap-5">
        {left ? (
          <Gauge stat={left} tone="muted" />
        ) : (
          <EmptyGauge label={leftEmptyLabel ?? ''} />
        )}
        <ArrowRight className="mb-6 h-5 w-5 shrink-0 text-muted-foreground" />
        {right ? (
          <Gauge stat={right} tone="strong" />
        ) : (
          <EmptyGauge label={rightEmptyLabel ?? ''} />
        )}
      </div>
    </div>
  )
}
