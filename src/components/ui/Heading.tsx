import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level — controls document outline. */
  level?: HeadingLevel;
  /** Visual size — independent from the semantic level. */
  size?: HeadingSize;
}

const sizeClasses: Record<HeadingSize, string> = {
  xl: 'text-display-xl',
  lg: 'text-display-lg',
  md: 'text-display-md',
  sm: 'text-display-sm',
  xs: 'text-display-xs',
};

export function Heading({ level = 2, size = 'md', className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cn('font-display font-normal', sizeClasses[size], className)} {...props} />;
}
