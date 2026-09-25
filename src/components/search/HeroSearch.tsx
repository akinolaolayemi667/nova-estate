import { useId, useState, type FormEvent } from 'react';
import { ArrowRight, Banknote, BedDouble, Building2, ChevronDown, MapPin, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { bedroomSelectOptions, locationSelectOptions, priceRangeOptions, propertyTypeOptions } from '@/data';
import { cn } from '@/lib/cn';
import { defaultSearchCriteria } from '@/lib/search';
import type { SearchCriteria, SelectOption } from '@/lib/types';

export interface HeroSearchProps {
  onSubmit?: (criteria: SearchCriteria) => void;
  /** Short context shown opposite the title on larger screens. */
  meta?: string;
  className?: string;
}

interface SearchFieldConfig {
  name: keyof SearchCriteria;
  label: string;
  icon: LucideIcon;
  options: readonly SelectOption[];
}

const fields: SearchFieldConfig[] = [
  { name: 'location', label: 'Location', icon: MapPin, options: locationSelectOptions },
  { name: 'type', label: 'Property Type', icon: Building2, options: propertyTypeOptions },
  { name: 'priceRange', label: 'Price', icon: Banknote, options: priceRangeOptions },
  { name: 'bedrooms', label: 'Bedrooms', icon: BedDouble, options: bedroomSelectOptions },
];

/** Horizontal search bar for the homepage hero. Stacks on small screens. */
export function HeroSearch({ onSubmit, meta, className }: HeroSearchProps) {
  const [criteria, setCriteria] = useState<SearchCriteria>(defaultSearchCriteria);
  const id = useId();
  const titleId = `${id}-title`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(criteria);
  };

  return (
    <form
      role="search"
      aria-labelledby={titleId}
      onSubmit={handleSubmit}
      className={cn(
        'border border-line bg-ivory shadow-[0_40px_80px_-48px_rgb(11_27_43/0.45)]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-6 border-b border-line px-5 py-4 sm:px-6">
        <h2 id={titleId} className="flex items-center gap-3 font-display text-[1.375rem] leading-tight text-navy">
          <span aria-hidden="true" className="h-px w-6 bg-gold" />
          Find Your Next Address
        </h2>
        {meta && <p className="kicker hidden text-muted md:block">{meta}</p>}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_0.85fr_auto]">
        {fields.map(({ name, label, icon: Icon, options }, index) => {
          const fieldId = `${id}-${name}`;

          return (
            <div
              key={name}
              className={cn(
                'relative border-b border-line transition-colors duration-500 hover:bg-cream/70 focus-within:bg-cream/70 lg:border-b-0',
                index % 2 === 1 && 'sm:border-l',
                index > 0 && 'lg:border-l',
              )}
            >
              <label
                htmlFor={fieldId}
                className="kicker pointer-events-none absolute top-5 left-5 flex items-center gap-2 text-muted sm:left-6"
              >
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-3.5 text-gold" />
                {label}
              </label>
              <select
                id={fieldId}
                name={name}
                value={criteria[name]}
                onChange={(event) => setCriteria((current) => ({ ...current, [name]: event.target.value }))}
                className="block w-full cursor-pointer appearance-none truncate bg-transparent pt-12 pr-10 pb-5 pl-5 text-body text-ink focus-visible:outline-offset-[-3px] sm:pl-6"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.5}
                className="pointer-events-none absolute top-[3.35rem] right-4 size-4 text-navy sm:right-5"
              />
            </div>
          );
        })}

        <div className="p-3 sm:col-span-2 lg:col-span-1">
          <Button type="submit" size="lg" icon={ArrowRight} fullWidth className="lg:h-full lg:px-10">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
