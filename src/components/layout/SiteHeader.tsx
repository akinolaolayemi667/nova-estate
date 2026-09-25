import { useCallback, useState } from 'react';
import { Heart, Menu, Search } from 'lucide-react';
import { FAVORITES_PANEL_ID, FavoritesPanel } from '@/components/favorites';
import { SEARCH_PANEL_ID, SearchPanel } from '@/components/search';
import { Container, Logo } from '@/components/ui';
import { contactNavItem, primaryNavigation, siteConfig } from '@/data';
import { useFavorites } from '@/hooks/useFavorites';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';
import { pluralize } from '@/lib/format';
import { routes } from '@/lib/routes';
import type { SearchCriteria } from '@/lib/types';
import { AnnouncementBar } from './AnnouncementBar';
import { HeaderAction } from './HeaderAction';
import { MOBILE_MENU_ID, MobileMenu } from './MobileMenu';
import { NavLink } from './NavLink';

type Panel = 'search' | 'favorites' | 'menu';

export interface SiteHeaderProps {
  /** Receives search panel submissions. Wire to the properties page once routing exists. */
  onSearch?: (criteria: SearchCriteria) => void;
}

export function SiteHeader({ onSearch }: SiteHeaderProps) {
  const [panel, setPanel] = useState<Panel | null>(null);
  const scrolled = useScrolled(12);
  const { count } = useFavorites();

  const close = useCallback(() => setPanel(null), []);

  const triggerProps = (target: Panel, controls: string) => ({
    'aria-haspopup': 'dialog' as const,
    'aria-expanded': panel === target,
    'aria-controls': panel === target ? controls : undefined,
    onClick: () => setPanel(target),
  });

  return (
    <>
      <AnnouncementBar />

      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-architectural',
          scrolled ? 'border-line bg-cream/85 backdrop-blur-md' : 'border-line/70 bg-cream',
        )}
      >
        <Container
          size="wide"
          className="grid h-16 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 xl:h-[4.5rem]"
        >
          <div className="flex items-center">
            <HeaderAction
              icon={Menu}
              label="Menu"
              className="-ml-2.5 xl:hidden"
              {...triggerProps('menu', MOBILE_MENU_ID)}
            />
            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-6 2xl:gap-9">
                {primaryNavigation.map((item) => (
                  <li key={item.label}>
                    <NavLink href={item.href}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <a href={routes.home} aria-label={`${siteConfig.name}, home`} className="justify-self-center">
            <span className="block xl:hidden">
              <Logo size="sm" />
            </span>
            <span className="hidden xl:block">
              <Logo size="md" />
            </span>
          </a>

          <div className="flex items-center justify-end gap-7">
            <HeaderAction
              icon={Search}
              label="Search"
              className="-mr-2.5 xl:mr-0"
              {...triggerProps('search', SEARCH_PANEL_ID)}
            />
            <div className="hidden items-center gap-7 xl:flex">
              <HeaderAction
                icon={Heart}
                label="Favorites"
                count={count}
                countLabel={pluralize(count, 'saved property', 'saved properties')}
                {...triggerProps('favorites', FAVORITES_PANEL_ID)}
              />
              <NavLink href={contactNavItem.href}>{contactNavItem.label}</NavLink>
            </div>
          </div>
        </Container>
      </header>

      <SearchPanel open={panel === 'search'} onClose={close} onSearch={onSearch} />
      <FavoritesPanel open={panel === 'favorites'} onClose={close} />
      <MobileMenu
        open={panel === 'menu'}
        onClose={close}
        onOpenSearch={() => setPanel('search')}
        onOpenFavorites={() => setPanel('favorites')}
        favoritesCount={count}
      />
    </>
  );
}
