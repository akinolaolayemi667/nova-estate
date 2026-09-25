import { siteConfig } from '@/data/site';
import type { PropertyStatus, PropertyType } from '@/lib/types';

const priceFormatter = new Intl.NumberFormat(siteConfig.locale, {
  style: 'currency',
  currency: siteConfig.currency,
  maximumFractionDigits: 0,
});

const compactPriceFormatter = new Intl.NumberFormat(siteConfig.locale, {
  style: 'currency',
  currency: siteConfig.currency,
  notation: 'compact',
  maximumFractionDigits: 1,
});

const numberFormatter = new Intl.NumberFormat(siteConfig.locale);

export function formatPrice(price: number, options: { compact?: boolean } = {}): string {
  return options.compact ? compactPriceFormatter.format(price) : priceFormatter.format(price);
}

export function formatArea(area: number): string {
  return `${numberFormatter.format(area)} ${siteConfig.areaUnit}`;
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export const propertyTypeLabels: Record<PropertyType, string> = {
  house: 'House',
  villa: 'Villa',
  penthouse: 'Penthouse',
  apartment: 'Apartment',
  townhouse: 'Townhouse',
  estate: 'Private Estate',
  loft: 'Loft',
};

export const propertyStatusLabels: Record<PropertyStatus, string> = {
  featured: 'Featured',
  'new-listing': 'New Listing',
  'private-sale': 'Private Sale',
  'for-sale': 'For Sale',
  'for-rent': 'For Rent',
  reserved: 'Reserved',
  sold: 'Sold',
  'off-market': 'Off Market',
};

/** Zero-padded index for editorial numbering: 1 → "01". */
export function formatIndex(index: number): string {
  return String(index).padStart(2, '0');
}
