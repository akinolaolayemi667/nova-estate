import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type BadgeVariant = 'overlay' | 'navy' | 'gold' | 'cream' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Small square marker before the label. */
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  overlay: 'bg-ivory/92 text-navy backdrop-blur-sm',
  navy: 'bg-navy text-ivory',
  gold: 'bg-gold-light text-navy',
  cream: 'bg-cream text-ink',
  outline: 'border border-current/30 text-current',
};

export function Badge({ variant = 'overlay', dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center gap-2 rounded-xs px-3 font-sans text-overline font-medium tracking-nav whitespace-nowrap uppercase',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden="true" className="size-1.5 bg-gold" />}
      {children}
    </span>
  );
}
