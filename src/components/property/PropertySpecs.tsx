import { cn } from '@/lib/cn';
import { formatArea, formatNumber } from '@/lib/format';
import type { Property } from '@/lib/types';

export interface PropertySpecsProps {
  property: Pick<Property, 'bedrooms' | 'bathrooms' | 'area'>;
  inverse?: boolean;
  className?: string;
}

/** "4 Beds | 4 Baths | 4,200 sq ft" as a description list. */
export function PropertySpecs({ property, inverse = false, className }: PropertySpecsProps) {
  const specs = [
    { term: 'Bedrooms', value: formatNumber(property.bedrooms), unit: property.bedrooms === 1 ? 'Bed' : 'Beds' },
    { term: 'Bathrooms', value: formatNumber(property.bathrooms), unit: property.bathrooms === 1 ? 'Bath' : 'Baths' },
    { term: 'Interior area', value: formatArea(property.area), unit: '' },
  ];

  return (
    <dl
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-1 text-small',
        inverse ? 'text-ivory/80' : 'text-muted',
        className,
      )}
    >
      {specs.map(({ term, value, unit }, index) => (
        <div
          key={term}
          className={cn(
            'relative flex items-baseline',
            index > 0 &&
              'before:absolute before:top-1/2 before:-left-2 before:h-3 before:w-px before:-translate-y-1/2',
            index > 0 && (inverse ? 'before:bg-ivory/25' : 'before:bg-line'),
          )}
        >
          <dt className="sr-only">{term}</dt>
          <dd className="tabular">
            <span className={inverse ? 'text-ivory' : 'text-ink'}>{value}</span>
            {unit && <span aria-hidden="true"> {unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
