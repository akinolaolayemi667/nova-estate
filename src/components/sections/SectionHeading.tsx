import type { ReactNode } from 'react';
import { Eyebrow, Heading, Text, type HeadingLevel, type HeadingSize } from '@/components/ui';
import { cn } from '@/lib/cn';

export interface SectionHeadingProps {
  title: ReactNode;
  eyebrow?: string;
  index?: number;
  description?: ReactNode;
  /** Right-hand slot for a link or control, aligned to the title baseline. */
  action?: ReactNode;
  /** `split` places the title left and the description in a right column — the default editorial layout. */
  align?: 'start' | 'split' | 'center';
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
  size = 'h2',
  inverse = false,
  id,
  className,
}: SectionHeadingProps) {
  const lede = description && (
    <Text variant="body-lg" tone={inverse ? 'inverse-muted' : 'muted'} className="max-w-xl">
      {description}
    </Text>
  );

  const eyebrowNode = eyebrow && (
    <Eyebrow index={index} tone={inverse ? 'inverse' : 'default'}>
      {eyebrow}
    </Eyebrow>
  );

  if (align === 'split') {
    return (
      <header className={cn('grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16', className)}>
        <div className="flex flex-col gap-6 lg:col-span-7">
          {eyebrowNode}
          <Heading id={id} level={level} size={size}>
            {title}
          </Heading>
        </div>
        <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:pb-2">
          {lede}
          {action}
        </div>
      </header>
    );
  }

  const centered = align === 'center';

  return (
    <header
      className={cn(
        'flex flex-col gap-8',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('flex max-w-3xl flex-col gap-6', centered && 'items-center')}>
        {eyebrowNode}
        <Heading id={id} level={level} size={size}>
          {title}
        </Heading>
        {lede}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
