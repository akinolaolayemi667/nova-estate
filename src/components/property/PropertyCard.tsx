import { Divider, Heading, ImageWrapper, type HeadingLevel } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatIndex, propertyTypeLabels } from '@/lib/format';
import { routes } from '@/lib/routes';
import type { Property } from '@/lib/types';
import { FavoriteButton } from './FavoriteButton';
import { PropertyPrice } from './PropertyPrice';
import { PropertySpecs } from './PropertySpecs';
import { PropertyStatusBadge } from './PropertyStatusBadge';

export type PropertyCardLayout = 'stacked' | 'horizontal';

export interface PropertyCardProps {
  property: Property;
  layout?: PropertyCardLayout;
  /** Defaults to the property's detail route. */
  href?: string;
  /** Editorial number shown before the location, e.g. 1 → "01". */
  index?: number;
  headingLevel?: HeadingLevel;
  showFavorite?: boolean;
  priority?: boolean;
  className?: string;
}

export function PropertyCard({
  property,
  layout = 'stacked',
  href = routes.property(property.slug),
  index,
  headingLevel = 3,
  showFavorite = true,
  priority = false,
  className,
}: PropertyCardProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <article
      className={cn(
        'group relative flex flex-col outline-offset-8 has-[a:focus-visible]:outline has-[a:focus-visible]:outline-1 has-[a:focus-visible]:outline-bronze',
        isHorizontal && 'md:flex-row md:items-stretch md:gap-10 lg:gap-14',
        className,
      )}
    >
      <ImageWrapper
        src={property.image}
        alt={property.imageAlt}
        ratio={isHorizontal ? 'landscape' : 'portrait'}
        zoomOnHover
        priority={priority}
        sizes={isHorizontal ? '(min-width: 768px) 50vw, 100vw' : undefined}
        className={cn(isHorizontal && 'md:w-1/2 md:shrink-0')}
      >
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4">
          {property.status ? <PropertyStatusBadge status={property.status} /> : <span />}
          {showFavorite && <FavoriteButton propertyId={property.id} propertyTitle={property.title} />}
        </div>
      </ImageWrapper>

      <div className={cn('flex flex-1 flex-col pt-6', isHorizontal && 'md:justify-center md:pt-0')}>
        <p className="eyebrow flex items-center justify-between gap-4 text-taupe">
          <span className="flex items-center gap-3">
            {index !== undefined && <span className="tabular text-bronze">{formatIndex(index)}</span>}
            {property.location}
          </span>
          <span className="shrink-0">{propertyTypeLabels[property.type]}</span>
        </p>

        <Heading level={headingLevel} size={isHorizontal ? 'sm' : 'xs'} className="mt-3">
          <a
            href={href}
            className={cn(
              'bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-left-bottom bg-no-repeat',
              'transition-[background-size] duration-700 ease-architectural group-hover:bg-size-[100%_1px]',
              'after:absolute after:inset-0 focus-visible:outline-none',
            )}
          >
            {property.title}
          </a>
        </Heading>

        <Divider decorative className="my-5" />

        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <PropertySpecs property={property} />
          <PropertyPrice property={property} />
        </div>
      </div>
    </article>
  );
}
