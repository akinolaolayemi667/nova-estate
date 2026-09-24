export const siteConfig = {
  name: 'NOVA Estates',
  shortName: 'NOVA',
  tagline: 'Residences of consequence.',
  description:
    'A premium brokerage for luxury residences, private homes, modern apartments and investment property.',
  locale: 'en-US',
  currency: 'USD',
  areaUnit: 'sq ft',
  established: 2008,
  contact: {
    email: 'enquiries@novaestates.com',
    phone: '+1 (212) 555-0142',
    address: '41 Wooster Street, New York, NY 10013',
  },
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
