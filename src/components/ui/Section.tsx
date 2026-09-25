import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { Container, type ContainerSize } from './Container';

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg';
export type SectionTone = 'cream' | 'ivory' | 'navy';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article' | 'aside';
  spacing?: SectionSpacing;
  tone?: SectionTone;
  /** Wraps children in a `Container` of this size. Pass `false` for full-bleed content. */
  container?: ContainerSize | false;
  /** Draws a thin rule along the top edge. */
  ruled?: boolean;
  containerClassName?: string;
}

const spacingClasses: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-16 md:py-20',
  md: 'py-20 md:py-28 lg:py-36',
  lg: 'py-24 md:py-36 lg:py-48',
};

const toneClasses: Record<SectionTone, string> = {
  cream: 'bg-cream text-ink',
  ivory: 'bg-ivory text-ink',
  navy: 'bg-navy text-ivory',
};

export function Section({
  as: Tag = 'section',
  spacing = 'md',
  tone = 'cream',
  container = 'content',
  ruled = false,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      data-tone={tone}
      className={cn(
        'relative',
        spacingClasses[spacing],
        toneClasses[tone],
        ruled && (tone === 'navy' ? 'border-t border-ivory/10' : 'border-t border-line'),
        className,
      )}
      {...props}
    >
      {container === false ? (
        children
      ) : (
        <Container size={container} className={containerClassName}>
          {children}
        </Container>
      )}
    </Tag>
  );
}
