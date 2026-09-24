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

export function FavoriteButton({ propertyId, propertyTitle, variant = 'overlay', className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(propertyId);

  return (
    <IconButton
      icon={Heart}
      label={`Save ${propertyTitle}`}
      pressed={saved}
      variant={variant}
      size="sm"
      onClick={() => toggleFavorite(propertyId)}
      className={className}
      iconClassName={cn('transition-colors duration-300', saved && 'fill-bronze text-bronze')}
    />
  );
}
