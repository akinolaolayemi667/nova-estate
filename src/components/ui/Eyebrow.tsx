import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { formatIndex } from '@/lib/format';

export type EyebrowTone = 'bronze' | 'muted' | 'inverse';

export interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span';
  /** Editorial section number rendered as "01 —". */
  index?: number;
  tone?: EyebrowTone;
}

const toneClasses: Record<EyebrowTone, string> = {
  bronze: 'text-bronze',
  muted: 'text-taupe',
  inverse: 'text-paper/70',
};

export function Eyebrow({ as: Tag = 'p', index, tone = 'bronze', className, children, ...props }: EyebrowProps) {
  return (
    <Tag className={cn('eyebrow flex items-center gap-3', toneClasses[tone], className)} {...props}>
      {index !== undefined && (
        <>
          <span className="tabular">{formatIndex(index)}</span>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
        </>
      )}
      <span>{children}</span>
    </Tag>
  );
}
