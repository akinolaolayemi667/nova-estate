import { NovaMark } from '@/assets/icons';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/data/site';

export interface LogoProps {
  tone?: 'ink' | 'paper';
  showMark?: boolean;
  className?: string;
}

export function Logo({ tone = 'ink', showMark = true, className }: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3',
        tone === 'ink' ? 'text-ink' : 'text-paper',
        className,
      )}
    >
      {showMark && <NovaMark aria-hidden="true" className="size-8 text-bronze" />}
      <span aria-hidden="true" className="flex flex-col leading-none">
        <span className="font-display text-2xl tracking-[0.32em]">NOVA</span>
        <span className="eyebrow mt-1 text-[0.5625rem] tracking-[0.5em] opacity-70">Estates</span>
      </span>
      <span className="sr-only">{siteConfig.name}</span>
    </span>
  );
}
