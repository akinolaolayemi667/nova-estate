import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/format';
import type { Property } from '@/lib/types';

export interface PropertyPriceProps {
  property: Pick<Property, 'price' | 'status'>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'text-xl',
  md: 'text-[1.75rem] leading-none',
  lg: 'text-h3',
} as const;

export function PropertyPrice({ property, size = 'md', className }: PropertyPriceProps) {
  const { price, status } = property;

  if (status === 'off-market') {
    return <p className={cn('font-display italic', sizeClasses[size], className)}>Price on request</p>;
  }

  return (
    <p
      className={cn(
        'font-display font-medium tabular whitespace-nowrap',
        sizeClasses[size],
        status === 'sold' && 'text-muted line-through decoration-1',
        className,
      )}
    >
      {status === 'sold' && <span className="sr-only">Sold. Last asking price </span>}
      {formatPrice(price)}
      {status === 'for-rent' && <span className="ml-1 font-sans text-caption font-normal text-muted">/ month</span>}
    </p>
  );
}
