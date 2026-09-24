import { locations } from '@/data/locations';
import { propertyStatusLabels, propertyTypeLabels } from '@/lib/format';
import {
  INQUIRY_TYPES,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
  type AnyOption,
  type InquiryType,
  type PropertySort,
  type PropertyStatus,
  type PropertyType,
  type SelectOption,
} from '@/lib/types';

const anyOption = (label: string): SelectOption<AnyOption> => ({ value: 'all', label });

export const propertyTypeOptions: SelectOption<PropertyType | AnyOption>[] = [
  anyOption('All types'),
  ...PROPERTY_TYPES.map((value) => ({ value, label: propertyTypeLabels[value] })),
];

export const propertyStatusOptions: SelectOption<PropertyStatus | AnyOption>[] = [
  anyOption('Any status'),
  ...PROPERTY_STATUSES.map((value) => ({ value, label: propertyStatusLabels[value] })),
];

export const locationOptions: SelectOption[] = [
  anyOption('All locations'),
  ...locations.map((location) => ({ value: location.id, label: `${location.name}, ${location.city}` })),
];

export const sortOptions: SelectOption<PropertySort>[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-desc', label: 'Price — high to low' },
  { value: 'price-asc', label: 'Price — low to high' },
  { value: 'area-desc', label: 'Largest' },
];

export const bedroomOptions = [1, 2, 3, 4, 5, 6] as const;

export const priceBrackets = [
  1_000_000, 2_500_000, 5_000_000, 10_000_000, 20_000_000,
] as const;

const inquiryTypeLabels: Record<InquiryType, string> = {
  viewing: 'Arrange a viewing',
  buying: 'Buying a property',
  selling: 'Selling a property',
  consultation: 'Property consultation',
  general: 'General enquiry',
};

export const inquiryTypeOptions: SelectOption<InquiryType>[] = INQUIRY_TYPES.map((value) => ({
  value,
  label: inquiryTypeLabels[value],
}));
