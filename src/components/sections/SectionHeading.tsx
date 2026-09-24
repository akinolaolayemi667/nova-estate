import type { ReactNode } from 'react';
import { Eyebrow, Heading, type HeadingLevel, type HeadingSize } from '@/components/ui';
import { cn } from '@/lib/cn';

export interface SectionHeadingProps {
  title: ReactNode;
  eyebrow?: string;
  index?: number;
  description?: ReactNode;
  /** Right-hand slot for a link or control, aligned to the title baseline. */
  action?: ReactNode;
  align?: 'start' | 'center';
  level?: HeadingLevel;
  size?: HeadingSize;
  inverse?: boolean;
  id?: string;
  className?: string;
}

/**
 * Editorial section header: numbered eyebrow, serif title, optional lede and action.
 * Pass `id` and reference it from the parent section's `aria-labelledby`.
 */
export function SectionHeading({
  title,
  eyebrow,
  index,
  description,
  action,
  align = 'start',
  level = 2,
  size = 'md',
  inverse = false,
  id,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <header
      className={cn(
        'flex flex-col gap-8',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('flex max-w-3xl flex-col gap-5', centered && 'items-center')}>
        {eyebrow && (
          <Eyebrow index={index} tone={inverse ? 'inverse' : 'bronze'}>
            {eyebrow}
          </Eyebrow>
        )}
        <Heading id={id} level={level} size={size}>
          {title}
        </Heading>
        {description && (
          <p className={cn('max-w-xl text-base leading-relaxed md:text-lg', inverse ? 'text-paper/70' : 'text-slate')}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
