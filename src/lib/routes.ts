/** Central route builders so links stay consistent once a router is introduced. */
export const routes = {
  home: '/',
  properties: '/properties',
  property: (slug: string) => `/properties/${slug}`,
  locations: '/locations',
  location: (id: string) => `/locations/${id}`,
  agents: '/agents',
  agent: (id: string) => `/agents/${id}`,
  favorites: '/favorites',
  sell: '/sell',
  consultation: '/consultation',
  contact: '/contact',
} as const;
