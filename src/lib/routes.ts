/** App base path ("/" on Vercel, "/nova-estate/" on GitHub Pages), without the trailing slash. */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

const path = (segment: string) => `${base}${segment}`;

/** Central route builders so links stay consistent once a router is introduced. */
export const routes = {
  home: path('/'),
  properties: path('/properties'),
  property: (slug: string) => path(`/properties/${slug}`),
  buy: path('/buy'),
  sell: path('/sell'),
  locations: path('/locations'),
  location: (id: string) => path(`/locations/${id}`),
  about: path('/about'),
  insights: path('/insights'),
  agents: path('/agents'),
  agent: (id: string) => path(`/agents/${id}`),
  favorites: path('/favorites'),
  consultation: path('/consultation'),
  contact: path('/contact'),
} as const;
