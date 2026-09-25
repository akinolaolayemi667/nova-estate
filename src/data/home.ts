import { routes } from '@/lib/routes';
import type { Property } from '@/lib/types';
import { theGlassHouse } from './properties';

export const heroContent = {
  eyebrow: 'Residential property advisory',
  headline: ['Find a Place', 'Worth Coming', 'Home To.'],
  description:
    'Discover carefully selected properties, distinctive architecture and spaces designed for the way you want to live.',
  primaryCta: { label: 'Explore Properties', href: routes.properties },
  secondaryCta: { label: 'Sell Your Property', href: routes.sell },
} as const;

export type HeroFeature = Pick<
  Property,
  'title' | 'location' | 'price' | 'status' | 'bedrooms' | 'bathrooms' | 'area' | 'image' | 'imageAlt'
> & { href: string };

/** Swap the listing here — the hero reads everything from this record. */
export const heroFeature: HeroFeature = {
  ...theGlassHouse,
  href: routes.property(theGlassHouse.slug),
};

export const featuredPropertiesContent = {
  eyebrow: 'Featured properties',
  title: 'Exceptional Properties',
  description:
    'Explore a selection of homes and spaces chosen for their architecture, location and character.',
  cta: { label: 'View All Properties', href: routes.properties },
  disclaimer: 'Listings shown are illustrative examples for demonstration purposes.',
} as const;
