import { cn } from '@/lib/cn';
import { siteConfig } from '@/data/site';

export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  tone?: 'navy' | 'ivory';
  size?: LogoSize;
  className?: string;
}

const sizeClasses: Record<LogoSize, { word: string; sub: string; rule: string }> = {
  sm: { word: 'text-[1.375rem]', sub: 'text-[0.5rem]', rule: 'w-3' },
  md: { word: 'text-[1.75rem]', sub: 'text-[0.5625rem]', rule: 'w-4' },
  lg: { word: 'text-[2.75rem]', sub: 'text-[0.8125rem]', rule: 'w-6' },
};

/** Text-only wordmark: NOVA set in wide serif caps above a ruled ESTATES. */
export function Logo({ tone = 'navy', size = 'md', className }: LogoProps) {
  const classes = sizeClasses[size];

  return (
    <span className={cn('inline-flex', tone === 'navy' ? 'text-navy' : 'text-ivory', className)}>
      <span aria-hidden="true" className="flex flex-col items-center leading-none">
        <span className={cn('-mr-[0.38em] font-display font-medium tracking-[0.38em]', classes.word)}>NOVA</span>
        <span className="mt-1 flex items-center gap-2">
          <span className={cn('h-px bg-gold', classes.rule)} />
          <span className={cn('-mr-[0.55em] font-display font-medium tracking-[0.55em]', classes.sub)}>
            ESTATES
          </span>
          <span className={cn('h-px bg-gold', classes.rule)} />
        </span>
      </span>
      <span className="sr-only">{siteConfig.name}</span>
    </span>
  );
}
