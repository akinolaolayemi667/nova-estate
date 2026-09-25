import { priceRangeOptions } from '@/data/search';
import type { PropertyFilters, SearchCriteria } from '@/lib/types';

export const defaultSearchCriteria: SearchCriteria = {
  location: '',
  type: 'all',
  priceRange: 'all',
  bedrooms: 'all',
};

/** Maps search panel values onto listing filters for the properties page. */
export function criteriaToFilters(criteria: SearchCriteria): Partial<PropertyFilters> {
  const range = priceRangeOptions.find((option) => option.value === criteria.priceRange);

  return {
    query: criteria.location.trim(),
    type: criteria.type,
    minPrice: range?.min ?? null,
    maxPrice: range?.max ?? null,
    minBedrooms: criteria.bedrooms === 'all' ? null : Number(criteria.bedrooms),
  };
}

/** Serialises non-default criteria for a shareable `/properties?…` URL. */
export function criteriaToSearchParams(criteria: SearchCriteria): URLSearchParams {
  const params = new URLSearchParams();
  (Object.keys(criteria) as (keyof SearchCriteria)[]).forEach((key) => {
    const value = criteria[key].trim();
    if (value && value !== defaultSearchCriteria[key]) params.set(key, value);
  });
  return params;
}
