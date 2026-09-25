import type { PriceRangeOption, SelectOption } from '@/lib/types';

export const quickLocations = [
  'City Center',
  'Waterfront',
  'North Hills',
  'West End',
  'New Developments',
] as const;

export const locationSelectOptions: SelectOption[] = [
  { value: '', label: 'Anywhere' },
  ...quickLocations.map((location) => ({ value: location, label: location })),
];

export const priceRangeOptions: PriceRangeOption[] = [
  { value: 'all', label: 'Any price', min: null, max: null },
  { value: 'under-2.5m', label: 'Up to $2.5M', min: null, max: 2_500_000 },
  { value: '2.5m-5m', label: '$2.5M – $5M', min: 2_500_000, max: 5_000_000 },
  { value: '5m-10m', label: '$5M – $10M', min: 5_000_000, max: 10_000_000 },
  { value: '10m-plus', label: '$10M+', min: 10_000_000, max: null },
];

export const bedroomSelectOptions: SelectOption[] = [
  { value: 'all', label: 'Any' },
  ...[1, 2, 3, 4, 5].map((count) => ({ value: String(count), label: `${count}+ beds` })),
];
