import { unsplash } from '@/lib/images';
import type { Location } from '@/lib/types';

export const locations: Location[] = [
  {
    id: 'belgravia',
    name: 'Belgravia',
    city: 'London',
    country: 'United Kingdom',
    description: 'Stucco terraces, garden squares and embassy-quiet streets in the heart of London.',
    image: unsplash('photo-1600607687939-ce8a6c25118c'),
    imageAlt: 'Light-filled living room with tall windows and neutral furnishings',
  },
  {
    id: 'cap-ferrat',
    name: 'Saint-Jean-Cap-Ferrat',
    city: 'Côte d’Azur',
    country: 'France',
    description: 'A private peninsula of pine-shaded villas above the Mediterranean.',
    image: unsplash('photo-1613490493576-7fde63acd811'),
    imageAlt: 'White villa with an infinity pool at dusk',
  },
  {
    id: 'tribeca',
    name: 'Tribeca',
    city: 'New York',
    country: 'United States',
    description: 'Cast-iron lofts and new-build residences on cobbled downtown streets.',
    image: unsplash('photo-1545324418-cc1a3fa10c00'),
    imageAlt: 'Modern residential tower with recessed balconies',
  },
  {
    id: 'lisbon',
    name: 'Príncipe Real',
    city: 'Lisbon',
    country: 'Portugal',
    description: 'Tiled façades, hidden gardens and river light across the seven hills.',
    image: unsplash('photo-1600047509807-ba8f99d2cdde'),
    imageAlt: 'Contemporary townhouse façade with warm timber detailing',
  },
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    city: 'Dubai',
    country: 'United Arab Emirates',
    description: 'Beachfront frond villas with private moorings and skyline views.',
    image: unsplash('photo-1600596542815-ffad4c1539a9'),
    imageAlt: 'Modern villa with glass walls and a lit pool terrace',
  },
];

export function getLocationById(id: string) {
  return locations.find((location) => location.id === id);
}
