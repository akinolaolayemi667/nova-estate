import { routes } from '@/lib/routes';

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNavigation: NavItem[] = [
  { label: 'Properties', href: routes.properties },
  { label: 'Buy', href: routes.buy },
  { label: 'Sell', href: routes.sell },
  { label: 'Locations', href: routes.locations },
  { label: 'About', href: routes.about },
  { label: 'Insights', href: routes.insights },
];

export const contactNavItem: NavItem = { label: 'Contact', href: routes.contact };

export const mobileNavigation: NavItem[] = [...primaryNavigation, contactNavItem];

export const announcement = 'Private viewings available by appointment';
