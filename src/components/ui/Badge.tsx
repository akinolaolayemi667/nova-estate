import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type BadgeVariant = 'neutral' | 'ink' | 'bronze' | 'outline' | 'overlay' | 'sage' | 'clay';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Small square marker before the label. */
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-linen text-umber',
  ink: 'bg-ink text-paper',
  bronze: 'bg-bronze text-paper',
  outline: 'border border-current/30 text-current',
  overlay: 'bg-paper/90 text-ink backdrop-blur-sm',
  sage: 'bg-sage text-paper',
  clay: 'bg-clay text-paper',
};

export function Badge({ variant = 'neutral', dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'eyebrow inline-flex h-7 items-center gap-2 px-3 tracking-label whitespace-nowrap',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden="true" className="size-1.5 bg-current" />}
      {children}
    </span>
  );
}
