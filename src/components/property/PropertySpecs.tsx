import { Bath, BedDouble, Ruler, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { formatArea, formatNumber } from '@/lib/format';
import type { Property } from '@/lib/types';

export interface PropertySpecsProps {
  property: Pick<Property, 'bedrooms' | 'bathrooms' | 'area'>;
  className?: string;
}

interface Spec {
  label: string;
  value: string;
  icon: LucideIcon;
}

export function PropertySpecs({ property, className }: PropertySpecsProps) {
  const specs: Spec[] = [
    { label: 'Bedrooms', value: formatNumber(property.bedrooms), icon: BedDouble },
    { label: 'Bathrooms', value: formatNumber(property.bathrooms), icon: Bath },
    { label: 'Interior area', value: formatArea(property.area), icon: Ruler },
  ];

  return (
    <dl className={cn('flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate', className)}>
      {specs.map(({ label, value, icon: Icon }) => (
        <div key={label} className="flex items-center gap-2">
          <dt>
            <Icon aria-hidden="true" strokeWidth={1.25} className="size-4 text-taupe" />
            <span className="sr-only">{label}</span>
          </dt>
          <dd className="tabular">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
