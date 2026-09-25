export const PROPERTY_TYPES = [
  'house',
  'villa',
  'penthouse',
  'apartment',
  'townhouse',
  'estate',
  'loft',
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const PROPERTY_STATUSES = [
  'featured',
  'new-listing',
  'private-sale',
  'for-sale',
  'for-rent',
  'reserved',
  'sold',
  'off-market',
] as const;

export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];

export type PropertyCategory = 'residential' | 'investment';

export interface PropertyImage {
  src: string;
  alt: string;
}

/** A named view in a property gallery, e.g. "Kitchen". */
export interface GalleryImage extends PropertyImage {
  label: string;
  /** Tailwind `object-[x_y]` crop for the main stage. */
  position?: string;
}

/** Listing summary — everything a card, search result or map pin needs. */
export interface Property {
  id: string;
  slug: string;
  title: string;
  /** Human-readable address line, e.g. "Belgravia, London". */
  location: string;
  locationId: string;
  type: PropertyType;
  category: PropertyCategory;
  price: number;
  bedrooms: number;
  bathrooms: number;
  /** Interior area in the unit configured in `siteConfig.areaUnit`. */
  area: number;
  image: string;
  imageAlt: string;
  /** One or two sentences for larger editorial cards. */
  summary?: string;
  featured?: boolean;
  status?: PropertyStatus;
  agentId?: string;
  yearBuilt?: number;
  /** ISO date the listing went live — drives "newest" sorting. */
  listedAt: string;
  tags?: string[];
}

/** Full listing record for the property details page. */
export interface PropertyDetails extends Property {
  description: string;
  gallery: PropertyImage[];
  amenities: string[];
  lotSize?: number;
  parkingSpaces?: number;
  floors?: number;
  coordinates?: { lat: number; lng: number };
  floorPlanUrl?: string;
  virtualTourUrl?: string;
}
