import { useCallback, useMemo, useState } from 'react';
import { countActiveFilters, defaultPropertyFilters, filterProperties } from '@/lib/properties';
import type { Property, PropertyFilters } from '@/lib/types';

export function usePropertyFilters(
  properties: readonly Property[],
  initial: Partial<PropertyFilters> = {},
) {
  const [filters, setFilters] = useState<PropertyFilters>(() => ({
    ...defaultPropertyFilters,
    ...initial,
  }));

  const setFilter = useCallback(
    <TKey extends keyof PropertyFilters>(key: TKey, value: PropertyFilters[TKey]) => {
      setFilters((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const resetFilters = useCallback(() => setFilters(defaultPropertyFilters), []);

  const results = useMemo(() => filterProperties(properties, filters), [properties, filters]);
  const activeCount = useMemo(() => countActiveFilters(filters), [filters]);

  return { filters, setFilter, setFilters, resetFilters, results, activeCount };
}
