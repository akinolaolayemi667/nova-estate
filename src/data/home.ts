import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import type { GalleryImage, Property } from '@/lib/types';
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
  note: {
    eyebrow: 'The NOVA selection',
    title: 'Fewer homes, chosen with care.',
    body: 'We represent a small number of residences at a time, so each one is presented with the attention it deserves.',
    countLabel: 'Residences',
    cta: { label: 'Arrange a Viewing', href: routes.consultation },
  },
} as const;

export const propertyCategoriesContent = {
  eyebrow: 'Property categories',
  title: 'Find the Right Kind of Space',
  description:
    'From city apartments to private residences, explore properties suited to different ways of living.',
  cta: { label: 'Browse All Properties', href: routes.properties },
} as const;

export const locationsContent = {
  eyebrow: 'Locations',
  title: 'Explore Distinctive Locations',
  description:
    'Discover neighborhoods selected for their architecture, lifestyle, connectivity and character.',
  cta: { label: 'View All Locations', href: routes.locations },
  featuredLabel: 'Featured location',
  cardCta: 'Explore Properties',
  map: {
    eyebrow: 'Location index',
    countLabel: 'Demo locations',
    caption: 'Abstract illustration — not a geographic map',
    note: 'Not to scale',
  },
  disclaimer:
    'Locations shown are fictional neighborhoods created for this demonstration website and do not represent real areas.',
} as const;

/** The residence presented in the homepage showcase — demonstration content, not a real listing. */
export const showcaseProperty: Property = theGlassHouse;

export const showcaseGallery: GalleryImage[] = [
  {
    label: 'Exterior',
    src: unsplash('photo-1600607688960-e095ff83135c', 2000),
    alt: 'Garden side of a contemporary house in black cladding and warm timber, set beneath a mature gum tree',
    position: 'object-[50%_45%]',
  },
  {
    label: 'Living Room',
    src: unsplash('photo-1600607687939-ce8a6c25118c', 2000),
    alt: 'Open-plan living room with a pale sofa, timber-clad wall and full-height glazing onto the garden',
  },
  {
    label: 'Kitchen',
    src: unsplash('photo-1600585152220-90363fe7e115', 2000),
    alt: 'White kitchen with a stone island, timber stools and pendant lights beneath a high ceiling',
    position: 'object-[50%_55%]',
  },
  {
    label: 'Primary Bedroom',
    src: unsplash('photo-1617325247661-675ab4b64ae2', 2000),
    alt: 'Calm bedroom with a low timber bed frame, white linen and soft natural light',
  },
];

export const propertyShowcaseContent = {
  eyebrow: 'Property showcase',
  title: 'A Closer Look',
  description: 'Explore the architecture, details and atmosphere behind one of our featured residences.',
  label: 'Featured Residence',
  typeLabel: 'Private Residence',
  galleryLabel: 'Choose a view',
  featuresTitle: 'Residence highlights',
  features: ['Floor-to-ceiling glazing', 'Open-plan living', 'Private outdoor space', 'Contemporary architecture'],
  cta: { label: 'View Full Property', href: routes.property(theGlassHouse.slug) },
  disclaimer: 'Illustrative demo residence, presented for demonstration only. Not a real property for sale.',
} as const;
