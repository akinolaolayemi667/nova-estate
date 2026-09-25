import { X } from 'lucide-react';
import { IconButton, ImageWrapper } from '@/components/ui';
import { propertyTypeLabels } from '@/lib/format';
import { routes } from '@/lib/routes';
import type { Property } from '@/lib/types';
import { PropertyPrice } from './PropertyPrice';

export interface SavedPropertyItemProps {
  property: Property;
  onRemove: (id: string) => void;
  onNavigate?: () => void;
}

/** Compact row used in the favorites panel. */
export function SavedPropertyItem({ property, onRemove, onNavigate }: SavedPropertyItemProps) {
  return (
    <article className="group relative flex gap-4">
      <ImageWrapper
        src={property.image}
        alt=""
        ratio="square"
        zoomOnHover
        sizes="96px"
        className="w-24 shrink-0"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="kicker text-muted">{propertyTypeLabels[property.type]}</p>
        <h3 className="mt-1 truncate font-display text-xl leading-tight">
          <a
            href={routes.property(property.slug)}
            onClick={onNavigate}
            className="after:absolute after:inset-0 hover:underline hover:decoration-1 hover:underline-offset-4"
          >
            {property.title}
          </a>
        </h3>
        <p className="truncate text-caption text-muted">{property.location}</p>
        <PropertyPrice property={property} size="sm" className="mt-auto pt-1" />
      </div>
      <IconButton
        icon={X}
        label={`Remove ${property.title} from saved properties`}
        variant="ghost"
        size="sm"
        onClick={() => onRemove(property.id)}
        className="relative z-10 -mt-2 -mr-2"
      />
    </article>
  );
}
