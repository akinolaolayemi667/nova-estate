import { unsplash } from '@/lib/images';
import { routes } from '@/lib/routes';
import type { Location } from '@/lib/types';

const location = (entry: Omit<Location, 'href'>): Location => ({
  ...entry,
  href: routes.propertiesInLocation(entry.id),
});

/**
 * Fictional neighbourhoods for demonstration only — they do not describe real places.
 * Display order matters: the first location takes the featured tile.
 */
export const locations: Location[] = [
  location({
    id: 'city-center',
    name: 'City Center',
    description: 'Contemporary living close to culture, dining and everyday conveniences.',
    image: unsplash('photo-1486406146926-c627a92ad1ab', 2000),
    marker: { x: 50, y: 46, labelSide: 'right' },
  }),
  location({
    id: 'waterfront',
    name: 'Waterfront District',
    description: 'Private residences with open views and a slower pace of living.',
    image: unsplash('photo-1439066615861-d1af74d74000'),
    marker: { x: 68, y: 74, labelSide: 'left' },
  }),
  location({
    id: 'north-hills',
    name: 'North Hills',
    description: 'Spacious homes surrounded by quieter streets and green spaces.',
    image: unsplash('photo-1600607688969-a5bfcd646154'),
    marker: { x: 38, y: 18, labelSide: 'right' },
  }),
  location({
    id: 'west-end',
    name: 'West End',
    description: 'A refined neighborhood combining character, convenience and modern residences.',
    image: unsplash('photo-1464082354059-27db6ce50048'),
    marker: { x: 18, y: 58, labelSide: 'right' },
  }),
  location({
    id: 'residences-district',
    name: 'The Residences District',
    description: 'New developments designed around contemporary urban living.',
    image: unsplash('photo-1515263487990-61b07816b324'),
    marker: { x: 76, y: 32, labelSide: 'left' },
  }),
];

export function getLocationById(id: string) {
  return locations.find((entry) => entry.id === id);
}
