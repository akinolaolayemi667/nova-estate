import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type DividerTone = 'line' | 'navy' | 'gold' | 'inverse';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  tone?: DividerTone;
  /** Centered caption between two rules, e.g. "Est. 2008". */
  label?: ReactNode;
  /** Purely visual rules are hidden from assistive technology. */
  decorative?: boolean;
  className?: string;
}

const toneClasses: Record<DividerTone, string> = {
  line: 'bg-line',
  navy: 'bg-navy',
  gold: 'bg-gold',
  inverse: 'bg-ivory/15',
};

export function Divider({
  orientation = 'horizontal',
  tone = 'line',
  label,
  decorative = false,
  className,
}: DividerProps) {
  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'separator' as const, 'aria-orientation': orientation };

  if (orientation === 'vertical') {
    return <span {...a11y} className={cn('block w-px self-stretch', toneClasses[tone], className)} />;
  }

  if (label) {
    return (
      <div {...a11y} className={cn('flex items-center gap-5', className)}>
        <span className={cn('h-px flex-1', toneClasses[tone])} />
        <span className="kicker shrink-0 opacity-70">{label}</span>
        <span className={cn('h-px flex-1', toneClasses[tone])} />
      </div>
    );
  }

  return <div {...a11y} className={cn('h-px w-full', toneClasses[tone], className)} />;
}
