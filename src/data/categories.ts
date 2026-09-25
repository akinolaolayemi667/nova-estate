import { Building, Building2, Construction, House, Landmark, TrendingUp } from 'lucide-react';
import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import type { PropertyCategoryEntry } from '@/lib/types';

const category = (entry: Omit<PropertyCategoryEntry, 'href'>): PropertyCategoryEntry => ({
  ...entry,
  href: routes.propertyCategory(entry.id),
});

/** Display order matters: the first category takes the large lead tile. */
export const propertyCategories: PropertyCategoryEntry[] = [
  category({
    id: 'apartments',
    name: 'Apartments',
    description: 'Contemporary apartments in connected urban locations.',
    icon: Building2,
    image: unsplash('photo-1479839672679-a46483c0e7c8', 2000),
  }),
  category({
    id: 'villas',
    name: 'Villas',
    description: 'Private residences designed for space, comfort and privacy.',
    icon: House,
    image: unsplash('photo-1613490493576-7fde63acd811'),
  }),
  category({
    id: 'penthouses',
    name: 'Penthouses',
    description: 'Exceptional residences with elevated views and refined interiors.',
    icon: Building,
    image: unsplash('photo-1600585154084-4e5fe7c39198'),
  }),
  category({
    id: 'estates',
    name: 'Estates',
    description: 'Expansive properties with distinctive architecture and grounds.',
    icon: Landmark,
    image: unsplash('photo-1580587771525-78b9dba3b914'),
  }),
  category({
    id: 'new-developments',
    name: 'New Developments',
    description: 'Discover newly built residences and thoughtfully planned communities.',
    icon: Construction,
    image: unsplash('photo-1523217582562-09d0def993a6'),
  }),
  category({
    id: 'investment-properties',
    name: 'Investment Properties',
    description: 'Explore properties suited to long-term ownership and investment strategies.',
    icon: TrendingUp,
    image: unsplash('photo-1580041065738-e72023775cdc'),
  }),
];
