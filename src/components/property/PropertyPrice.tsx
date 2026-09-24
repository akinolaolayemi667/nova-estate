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
  md: 'text-2xl',
  lg: 'text-display-sm',
} as const;

export function PropertyPrice({ property, size = 'md', className }: PropertyPriceProps) {
  const { price, status } = property;

  if (status === 'off-market') {
    return <p className={cn('font-display italic text-slate', sizeClasses[size], className)}>Price on request</p>;
  }

  return (
    <p
      className={cn(
        'font-display tabular whitespace-nowrap',
        sizeClasses[size],
        status === 'sold' && 'text-taupe line-through decoration-1',
        className,
      )}
    >
      {status === 'sold' && <span className="sr-only">Sold. Last asking price </span>}
      {formatPrice(price)}
      {status === 'for-rent' && <span className="ml-1 font-sans text-xs text-taupe">/ month</span>}
    </p>
  );
}
