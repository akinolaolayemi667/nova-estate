import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type ContainerSize = 'narrow' | 'content' | 'wide' | 'full';

type ContainerElement = 'div' | 'section' | 'header' | 'footer' | 'article' | 'nav' | 'aside';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ContainerElement;
  size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
  narrow: 'max-w-narrow',
  content: 'max-w-content',
  wide: 'max-w-wide',
  full: 'max-w-none',
};

export function Container({ as: Tag = 'div', size = 'content', className, ...props }: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', sizeClasses[size], className)}
      {...props}
    />
  );
}
