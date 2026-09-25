import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import type { Property } from '@/lib/types';

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

/** Swap the image or listing here — the hero reads everything from this record. */
export const heroFeature: HeroFeature = {
  title: 'The Glass House',
  location: 'Waterfront District',
  price: 1_850_000,
  status: 'for-sale',
  bedrooms: 4,
  bathrooms: 3,
  area: 3240,
  image: unsplash('photo-1600585154340-be6161a56a0c', 2000),
  imageAlt: 'Contemporary two-storey house with floor-to-ceiling glass, lit from within at dusk beneath a mature gum tree',
  href: routes.property('the-glass-house'),
};
