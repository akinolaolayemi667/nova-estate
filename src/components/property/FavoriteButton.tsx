import { Heart } from 'lucide-react';
import { IconButton, type IconButtonVariant } from '@/components/ui';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/cn';

export interface FavoriteButtonProps {
  propertyId: string;
  propertyTitle: string;
  variant?: IconButtonVariant;
  className?: string;
}

/** Lifts slightly when its parent card (`.group`) is hovered. */
export function FavoriteButton({ propertyId, propertyTitle, variant = 'overlay', className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(propertyId);

  return (
    <span
      className={cn(
        'inline-flex rounded-xs transition-[scale,box-shadow] duration-500 ease-architectural',
        'group-hover:shadow-[0_10px_24px_-12px_rgb(11_27_43/0.55)] motion-safe:group-hover:scale-110',
        className,
      )}
    >
      <IconButton
        icon={Heart}
        label={`Save ${propertyTitle}`}
        pressed={saved}
        variant={variant}
        size="sm"
        onClick={() => toggleFavorite(propertyId)}
        className="group-hover:bg-ivory"
        iconClassName={cn('transition-colors duration-300', saved && 'fill-navy')}
      />
    </span>
  );
}
