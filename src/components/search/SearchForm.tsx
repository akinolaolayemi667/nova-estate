import { useId, useState, type FormEvent, type RefObject } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button, Chip, Field, Input, Select } from '@/components/ui';
import { bedroomSelectOptions, priceRangeOptions, propertyTypeOptions, quickLocations } from '@/data';
import { cn } from '@/lib/cn';
import { defaultSearchCriteria } from '@/lib/search';
import type { SearchCriteria } from '@/lib/types';

export interface SearchFormProps {
  onSubmit: (criteria: SearchCriteria) => void;
  initialCriteria?: Partial<SearchCriteria>;
  locationInputRef?: RefObject<HTMLInputElement | null>;
  className?: string;
}

/** Controlled property search form — shared by the header search panel and future hero search. */
export function SearchForm({ onSubmit, initialCriteria, locationInputRef, className }: SearchFormProps) {
  const [criteria, setCriteria] = useState<SearchCriteria>({ ...defaultSearchCriteria, ...initialCriteria });
  const quickLocationsLabelId = useId();

  const update = <TKey extends keyof SearchCriteria>(key: TKey, value: SearchCriteria[TKey]) =>
    setCriteria((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(criteria);
  };

  return (
    <form role="search" aria-label="Property search" onSubmit={handleSubmit} className={cn('flex flex-col', className)}>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_auto] lg:items-end">
        <Field label="Location">
          {(fieldProps) => (
            <Input
              {...fieldProps}
              ref={locationInputRef}
              icon={MapPin}
              name="location"
              autoComplete="off"
              placeholder="City, neighbourhood or address"
              value={criteria.location}
              onChange={(event) => update('location', event.target.value)}
            />
          )}
        </Field>

        <Field label="Property Type">
          {(fieldProps) => (
            <Select
              {...fieldProps}
              name="type"
              options={propertyTypeOptions}
              value={criteria.type}
              onChange={(event) => update('type', event.target.value as SearchCriteria['type'])}
            />
          )}
        </Field>

        <Field label="Price Range">
          {(fieldProps) => (
            <Select
              {...fieldProps}
              name="priceRange"
              options={priceRangeOptions}
              value={criteria.priceRange}
              onChange={(event) => update('priceRange', event.target.value)}
            />
          )}
        </Field>

        <Field label="Bedrooms">
          {(fieldProps) => (
            <Select
              {...fieldProps}
              name="bedrooms"
              options={bedroomSelectOptions}
              value={criteria.bedrooms}
              onChange={(event) => update('bedrooms', event.target.value)}
            />
          )}
        </Field>

        <Button type="submit" size="lg" icon={ArrowRight} className="sm:col-span-2 lg:col-span-1">
          Search Properties
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <p id={quickLocationsLabelId} className="kicker shrink-0 text-muted">
          Popular areas
        </p>
        <ul aria-labelledby={quickLocationsLabelId} className="flex flex-wrap gap-2">
          {quickLocations.map((location) => (
            <li key={location}>
              <Chip
                selected={criteria.location === location}
                onClick={() => update('location', criteria.location === location ? '' : location)}
              >
                {location}
              </Chip>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
