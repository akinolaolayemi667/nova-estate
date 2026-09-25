import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { formatIndex } from '@/lib/format';

export type EyebrowTone = 'default' | 'muted' | 'inverse';

export interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span';
  /** Editorial section number rendered as "01 —". */
  index?: number;
  tone?: EyebrowTone;
}

const toneClasses: Record<EyebrowTone, { text: string; rule: string }> = {
  default: { text: 'text-navy', rule: 'bg-gold' },
  muted: { text: 'text-muted', rule: 'bg-line' },
  inverse: { text: 'text-gold-light', rule: 'bg-gold' },
};

/** Small uppercase label with a thin gold rule — the system's main use of gold. */
export function Eyebrow({ as: Tag = 'p', index, tone = 'default', className, children, ...props }: EyebrowProps) {
  const { text, rule } = toneClasses[tone];

  return (
    <Tag className={cn('kicker flex items-center gap-3', text, className)} {...props}>
      {index !== undefined && <span className="tabular">{formatIndex(index)}</span>}
      <span aria-hidden="true" className={cn('h-px w-8', rule)} />
      <span>{children}</span>
    </Tag>
  );
}
