import type { Property, PropertyFilters, PropertySort } from '@/lib/types';

export const defaultPropertyFilters: PropertyFilters = {
  query: '',
  type: 'all',
  status: 'all',
  locationId: 'all',
  minPrice: null,
  maxPrice: null,
  minBedrooms: null,
  minBathrooms: null,
  sort: 'featured',
};

function matchesQuery(property: Property, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;

  const haystack = [property.title, property.location, property.type, ...(property.tags ?? [])]
    .join(' ')
    .toLowerCase();

  return haystack.includes(needle);
}

export function matchesFilters(property: Property, filters: PropertyFilters): boolean {
  if (!matchesQuery(property, filters.query)) return false;
  if (filters.type !== 'all' && property.type !== filters.type) return false;
  if (filters.status !== 'all' && property.status !== filters.status) return false;
  if (filters.locationId !== 'all' && property.locationId !== filters.locationId) return false;
  if (filters.minPrice !== null && property.price < filters.minPrice) return false;
  if (filters.maxPrice !== null && property.price > filters.maxPrice) return false;
  if (filters.minBedrooms !== null && property.bedrooms < filters.minBedrooms) return false;
  if (filters.minBathrooms !== null && property.bathrooms < filters.minBathrooms) return false;
  return true;
}

const comparators: Record<PropertySort, (a: Property, b: Property) => number> = {
  featured: (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  newest: (a, b) => Date.parse(b.listedAt) - Date.parse(a.listedAt),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'area-desc': (a, b) => b.area - a.area,
};

export function sortProperties(properties: readonly Property[], sort: PropertySort): Property[] {
  return [...properties].sort(comparators[sort]);
}

export function filterProperties(
  properties: readonly Property[],
  filters: PropertyFilters,
): Property[] {
  return sortProperties(
    properties.filter((property) => matchesFilters(property, filters)),
    filters.sort,
  );
}

/** Number of filters that differ from their defaults (ignores sort). */
export function countActiveFilters(filters: PropertyFilters): number {
  return (Object.keys(defaultPropertyFilters) as (keyof PropertyFilters)[]).filter(
    (key) => key !== 'sort' && filters[key] !== defaultPropertyFilters[key],
  ).length;
}

export function getPropertyBySlug(properties: readonly Property[], slug: string) {
  return properties.find((property) => property.slug === slug);
}

export function getFeaturedProperties(properties: readonly Property[], limit?: number) {
  const featured = properties.filter((property) => property.featured);
  return limit === undefined ? featured : featured.slice(0, limit);
}

export function getPropertiesByLocation(properties: readonly Property[], locationId: string) {
  return properties.filter((property) => property.locationId === locationId);
}

export function getPropertiesByAgent(properties: readonly Property[], agentId: string) {
  return properties.filter((property) => property.agentId === agentId);
}
