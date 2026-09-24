import { unsplash } from '@/lib/images';
import type { Agent } from '@/lib/types';

export const agents: Agent[] = [
  {
    id: 'eleanor-vance',
    name: 'Eleanor Vance',
    role: 'Managing Partner',
    email: 'eleanor@novaestates.com',
    phone: '+44 20 7946 0321',
    image: unsplash('photo-1494790108377-be9c29b29330', 800),
    bio: 'Eleanor has advised private clients on prime London residences for over fifteen years.',
    specialties: ['Prime residential', 'Off-market acquisitions'],
    languages: ['English', 'French'],
    locationIds: ['belgravia', 'cap-ferrat'],
    yearsOfExperience: 16,
  },
  {
    id: 'marcus-hale',
    name: 'Marcus Hale',
    role: 'Director, Investment',
    email: 'marcus@novaestates.com',
    phone: '+1 212 555 0178',
    image: unsplash('photo-1507003211169-0a1dd7228f2d', 800),
    bio: 'Marcus leads the investment desk, structuring portfolio acquisitions across three continents.',
    specialties: ['Investment property', 'New developments'],
    languages: ['English', 'Spanish'],
    locationIds: ['tribeca', 'palm-jumeirah'],
    yearsOfExperience: 12,
  },
  {
    id: 'ines-carvalho',
    name: 'Inês Carvalho',
    role: 'Senior Advisor',
    email: 'ines@novaestates.com',
    phone: '+351 21 555 0194',
    image: unsplash('photo-1438761681033-6461ffad8d80', 800),
    bio: 'Inês specialises in heritage townhouses and restoration projects throughout Lisbon.',
    specialties: ['Heritage homes', 'Relocation'],
    languages: ['Portuguese', 'English', 'French'],
    locationIds: ['lisbon'],
    yearsOfExperience: 9,
  },
  {
    id: 'julian-reyes',
    name: 'Julian Reyes',
    role: 'Senior Advisor',
    email: 'julian@novaestates.com',
    phone: '+971 4 555 0116',
    image: unsplash('photo-1500648767791-00dcc994a43e', 800),
    bio: 'Julian represents buyers and sellers of waterfront villas across the Gulf.',
    specialties: ['Waterfront villas', 'Property selling'],
    languages: ['English', 'Arabic'],
    locationIds: ['palm-jumeirah'],
    yearsOfExperience: 11,
  },
];

export function getAgentById(id: string) {
  return agents.find((agent) => agent.id === id);
}
