import { useMemo, useRef } from 'react';
import { ArrowRight, Heart, X } from 'lucide-react';
import { SavedPropertyItem } from '@/components/property';
import { Button, Eyebrow, Heading, IconButton, Sheet, Text } from '@/components/ui';
import { properties } from '@/data';
import { useFavorites } from '@/hooks/useFavorites';
import { pluralize } from '@/lib/format';
import { routes } from '@/lib/routes';

export const FAVORITES_PANEL_ID = 'favorites-panel';
const TITLE_ID = 'favorites-panel-title';

export interface FavoritesPanelProps {
  open: boolean;
  onClose: () => void;
}

export function FavoritesPanel({ open, onClose }: FavoritesPanelProps) {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Removed items take their focused button with them; keep focus inside the panel.
  const handleRemove = (id: string) => {
    removeFavorite(id);
    closeButtonRef.current?.focus();
  };

  const handleClear = () => {
    clearFavorites();
    closeButtonRef.current?.focus();
  };

  const saved = useMemo(
    () => favorites.map((id) => properties.find((property) => property.id === id)).filter((p) => p !== undefined),
    [favorites],
  );

  return (
    <Sheet open={open} onClose={onClose} side="right" id={FAVORITES_PANEL_ID} labelledBy={TITLE_ID}>
      <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-6 sm:px-8">
        <div className="flex flex-col gap-3">
          <Eyebrow>Favorites</Eyebrow>
          <Heading id={TITLE_ID} level={2} size="h3">
            Your Saved Properties
          </Heading>
        </div>
        <IconButton ref={closeButtonRef} icon={X} label="Close saved properties" onClick={onClose} />
      </header>

      {saved.length === 0 ? (
        <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6 py-12 sm:px-8">
          <span aria-hidden="true" className="flex size-14 items-center justify-center border border-line text-navy">
            <Heart strokeWidth={1.25} className="size-5" />
          </span>
          <Text variant="body-lg" tone="muted" className="max-w-xs">
            Properties you save will appear here.
          </Text>
          <Button href={routes.properties} icon={ArrowRight} onClick={onClose}>
            Browse Properties
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
            <p aria-live="polite" className="kicker mb-6 text-muted">
              {pluralize(saved.length, 'property', 'properties')} saved
            </p>
            <ul className="flex flex-col divide-y divide-line">
              {saved.map((property) => (
                <li key={property.id} className="py-5 first:pt-0">
                  <SavedPropertyItem property={property} onRemove={handleRemove} onNavigate={onClose} />
                </li>
              ))}
            </ul>
          </div>
          <footer className="flex items-center justify-between gap-4 border-t border-line px-6 py-5 sm:px-8">
            <Button variant="link" onClick={handleClear} className="text-muted hover:text-navy">
              Clear all
            </Button>
            <Button href={routes.properties} icon={ArrowRight} size="sm" onClick={onClose}>
              Browse Properties
            </Button>
          </footer>
        </>
      )}
    </Sheet>
  );
}
