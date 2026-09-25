import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Search, X } from 'lucide-react';
import { Button, Container, IconButton, Logo, Sheet } from '@/components/ui';
import { mobileNavigation, siteConfig } from '@/data';
import { formatIndex, pluralize } from '@/lib/format';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { routes } from '@/lib/routes';

export const MOBILE_MENU_ID = 'mobile-menu';
const TITLE_ID = 'mobile-menu-title';

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  favoritesCount: number;
}

export function MobileMenu({ open, onClose, onOpenSearch, onOpenFavorites, favoritesCount }: MobileMenuProps) {
  return (
    <Sheet open={open} onClose={onClose} side="full" id={MOBILE_MENU_ID} labelledBy={TITLE_ID} className="bg-cream">
      <h2 id={TITLE_ID} className="sr-only">
        Menu
      </h2>

      <div className="border-b border-line">
        <Container size="wide" className="grid h-16 grid-cols-[1fr_auto_1fr] items-center">
          <IconButton icon={X} label="Close menu" variant="ghost" onClick={onClose} className="-ml-2.5" />
          <a href={routes.home} onClick={onClose} aria-label={`${siteConfig.name}, home`}>
            <Logo size="sm" />
          </a>
          <IconButton
            icon={Search}
            label="Search properties"
            variant="ghost"
            onClick={onOpenSearch}
            className="-mr-2.5 justify-self-end"
          />
        </Container>
      </div>

      <Container size="wide" className="flex flex-1 flex-col py-8">
        <nav aria-label="Mobile">
          <motion.ul variants={staggerContainer(0.06, 0.15)} initial="hidden" animate="visible">
            {mobileNavigation.map((item, index) => (
              <motion.li key={item.label} variants={fadeUp} className="border-b border-line">
                <a
                  href={item.href}
                  onClick={onClose}
                  className="group flex min-h-16 items-center justify-between gap-4 py-3"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="tabular kicker text-muted">{formatIndex(index + 1)}</span>
                    <span className="font-display text-[2.125rem] leading-none text-navy">{item.label}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="size-5 text-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        <motion.div
          className="mt-auto flex flex-col gap-8 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.8 } }}
        >
          <button
            type="button"
            onClick={onOpenFavorites}
            aria-label={`Saved properties, ${pluralize(favoritesCount, 'saved property', 'saved properties')}`}
            className="nav-label flex min-h-11 items-center gap-3 self-start text-navy"
          >
            <Heart aria-hidden="true" strokeWidth={1.5} className="size-[1.125rem]" />
            Saved properties
            <span aria-hidden="true" className="text-muted">
              ({favoritesCount})
            </span>
          </button>

          <div className="grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
            <div className="flex flex-col gap-1 text-small">
              <p className="kicker mb-1 text-muted">Enquiries</p>
              <a href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, '')}`} className="text-navy">
                {siteConfig.contact.phone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-navy">
                {siteConfig.contact.email}
              </a>
            </div>
            <Button href={routes.consultation} variant="secondary" onClick={onClose} className="self-end">
              Schedule a Consultation
            </Button>
          </div>
        </motion.div>
      </Container>
    </Sheet>
  );
}
