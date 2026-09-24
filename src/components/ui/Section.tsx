import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { Container, type ContainerSize } from './Container';

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg';
export type SectionTone = 'paper' | 'linen' | 'ink';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article' | 'aside';
  spacing?: SectionSpacing;
  tone?: SectionTone;
  /** Wraps children in a `Container` of this size. Pass `false` for full-bleed content. */
  container?: ContainerSize | false;
  /** Draws a hairline rule along the top edge. */
  ruled?: boolean;
  containerClassName?: string;
}

const spacingClasses: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-16 md:py-20',
  md: 'py-20 md:py-28 lg:py-32',
  lg: 'py-24 md:py-36 lg:py-44',
};

const toneClasses: Record<SectionTone, string> = {
  paper: 'bg-paper text-ink',
  linen: 'bg-linen text-ink',
  ink: 'bg-ink text-paper',
};

export function Section({
  as: Tag = 'section',
  spacing = 'md',
  tone = 'paper',
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
        ruled && (tone === 'ink' ? 'border-t border-paper/15' : 'border-t border-ink/15'),
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
