import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level — controls the document outline. */
  level?: HeadingLevel;
  /** Visual size — independent from the semantic level. Defaults to match the level. */
  size?: HeadingSize;
}

const sizeClasses: Record<HeadingSize, string> = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
};

const defaultSizes: Record<HeadingLevel, HeadingSize> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h4',
  6: 'h4',
};

export function Heading({ level = 2, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      className={cn('font-display font-normal', sizeClasses[size ?? defaultSizes[level]], className)}
      {...props}
    />
  );
}
