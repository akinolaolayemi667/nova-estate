import type { AnyOption, SelectOption } from './filters';
import type { PropertyType } from './property';

/** Values captured by the search panel (and, later, the hero search). */
export interface SearchCriteria {
  location: string;
  type: PropertyType | AnyOption;
  /** Id of a `PriceRangeOption`, or "all". */
  priceRange: string;
  /** Minimum bedrooms as a string select value, or "all". */
  bedrooms: string;
}

export interface PriceRangeOption extends SelectOption {
  min: number | null;
  max: number | null;
}
