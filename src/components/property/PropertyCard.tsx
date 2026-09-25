import { ArrowRight, MapPin } from 'lucide-react';
import { Heading, ImageWrapper, type HeadingLevel, type ImageRatio } from '@/components/ui';
import { cn } from '@/lib/cn';
import { propertyTypeLabels } from '@/lib/format';
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
  /** Override the image crop, e.g. `portrait` for an occasional editorial card. */
  imageRatio?: ImageRatio;
  /** Extra classes for the image frame — pair with `imageRatio="none"` for responsive crops. */
  imageClassName?: string;
  imageSizes?: string;
  /** Defaults to the property's detail route. */
  href?: string;
  headingLevel?: HeadingLevel;
  showFavorite?: boolean;
  priority?: boolean;
  className?: string;
}

export function PropertyCard({
  property,
  layout = 'stacked',
  imageRatio,
  imageClassName,
  imageSizes,
  href = routes.property(property.slug),
  headingLevel = 3,
  showFavorite = true,
  priority = false,
  className,
}: PropertyCardProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <article
      className={cn(
        'group relative flex flex-col',
        'outline-offset-8 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-navy',
        isHorizontal && 'md:grid md:grid-cols-12 md:items-center md:gap-10 lg:gap-16',
        className,
      )}
    >
      <ImageWrapper
        src={property.image}
        alt={property.imageAlt}
        ratio={imageRatio ?? (isHorizontal ? 'landscape' : 'classic')}
        zoomOnHover
        priority={priority}
        sizes={imageSizes ?? (isHorizontal ? '(min-width: 768px) 60vw, 100vw' : undefined)}
        className={cn(isHorizontal && 'md:col-span-7', imageClassName)}
      >
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4 md:p-5">
          {property.status ? <PropertyStatusBadge status={property.status} /> : <span />}
          {showFavorite && <FavoriteButton propertyId={property.id} propertyTitle={property.title} />}
        </div>
      </ImageWrapper>

      <div className={cn('flex flex-1 flex-col pt-6', isHorizontal && 'md:col-span-5 md:pt-0')}>
        <p className="kicker text-muted">{propertyTypeLabels[property.type]}</p>

        <Heading level={headingLevel} size={isHorizontal ? 'h2' : 'h4'} className="mt-2">
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

        <p className="mt-2 flex items-center gap-1.5 text-small text-muted">
          <MapPin aria-hidden="true" strokeWidth={1.5} className="size-3.5 shrink-0" />
          {property.location}
        </p>

        <PropertyPrice property={property} size={isHorizontal ? 'lg' : 'md'} className="mt-5" />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-line pt-4 transition-colors duration-500 group-hover:border-navy/35">
          <PropertySpecs property={property} />
          <span aria-hidden="true" className="nav-label flex items-center gap-2 text-navy">
            View Property
            <ArrowRight
              strokeWidth={1.5}
              className="size-3.5 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
