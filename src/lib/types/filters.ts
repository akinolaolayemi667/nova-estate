import type { PropertyStatus, PropertyType } from './property';

export const PROPERTY_SORTS = ['featured', 'newest', 'price-asc', 'price-desc', 'area-desc'] as const;

export type PropertySort = (typeof PROPERTY_SORTS)[number];

export type AnyOption = 'all';

export interface PropertyFilters {
  query: string;
  type: PropertyType | AnyOption;
  status: PropertyStatus | AnyOption;
  locationId: string | AnyOption;
  minPrice: number | null;
  maxPrice: number | null;
  minBedrooms: number | null;
  minBathrooms: number | null;
  sort: PropertySort;
}

export interface SelectOption<TValue extends string = string> {
  value: TValue;
  label: string;
}
