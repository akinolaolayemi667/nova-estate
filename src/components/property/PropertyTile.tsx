import { ArrowRight, MapPin } from 'lucide-react';
import { Eyebrow, Heading, ImageWrapper, Text, type HeadingLevel } from '@/components/ui';
import { cn } from '@/lib/cn';
import { propertyTypeLabels } from '@/lib/format';
import { routes } from '@/lib/routes';
import type { Property } from '@/lib/types';
import { FavoriteButton } from './FavoriteButton';
import { PropertyPrice } from './PropertyPrice';
import { PropertySpecs } from './PropertySpecs';
import { PropertyStatusBadge } from './PropertyStatusBadge';

export interface PropertyTileProps {
  property: Property;
  /** `lead` adds the label, summary and a larger title for the hero tile of a bento grid. */
  variant?: 'lead' | 'standard';
  /** Editorial numbering shown before the property type, e.g. "01". */
  index?: string;
  label?: string;
  href?: string;
  headingLevel?: HeadingLevel;
  imageSizes?: string;
  /** Tune the crop per tile, e.g. `object-[35%_center]` for portrait tiles. */
  imagePosition?: string;
  className?: string;
}

/**
 * Full-bleed bento tile: the photograph fills the tile and the details sit on a navy scrim.
 * Fills its parent's height, so the grid cell decides the proportions.
 */
export function PropertyTile({
  property,
  variant = 'standard',
  index,
  label = 'Featured Residence',
  href = routes.property(property.slug),
  headingLevel = 3,
  imageSizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  imagePosition,
  className,
}: PropertyTileProps) {
  const isLead = variant === 'lead';

  return (
    <article
      className={cn(
        'group relative isolate flex size-full flex-col justify-end overflow-hidden bg-navy text-ivory',
        'outline-offset-4 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-navy',
        className,
      )}
    >
      {/* Negative z-index keeps the photo and vignette beneath the in-flow text and stretched link. */}
      <div className="absolute inset-0 -z-10">
        <ImageWrapper
          src={property.image}
          alt={property.imageAlt}
          ratio="fill"
          zoomOnHover
          sizes={imageSizes}
          imageClassName={imagePosition}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-navy/35 to-transparent to-30%"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-ivory/0 transition-colors duration-700 ease-architectural group-hover:border-ivory/30 md:inset-4"
      />

      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4 md:p-6">
        {property.status ? <PropertyStatusBadge status={property.status} /> : <span />}
        <FavoriteButton propertyId={property.id} propertyTitle={property.title} />
      </div>

      {/* The scrim lives on the text block so its depth always matches the copy, whatever the tile height. */}
      <div
        className={cn(
          'bg-linear-to-t from-navy/95 via-navy/80 via-55% to-transparent px-5 pt-24 pb-5 md:px-7 md:pb-7',
          isLead && 'md:px-9 md:pt-36 md:pb-9 lg:px-10 lg:pb-10',
        )}
      >
        {isLead && (
          <Eyebrow tone="inverse" className="mb-6">
            {label}
          </Eyebrow>
        )}

        <p className="kicker flex items-center gap-3 text-ivory/70">
          {index && (
            <>
              <span className="tabular text-gold-light">{index}</span>
              <span aria-hidden="true" className="h-px w-5 bg-ivory/30" />
            </>
          )}
          {propertyTypeLabels[property.type]}
        </p>

        <Heading level={headingLevel} size={isLead ? 'h2' : 'h4'} className="mt-3 text-ivory">
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

        <p className="mt-2 flex items-center gap-1.5 text-small text-ivory/75">
          <MapPin aria-hidden="true" strokeWidth={1.5} className="size-3.5 shrink-0" />
          {property.location}
        </p>

        {isLead && property.summary && (
          <Text tone="inverse-muted" className="mt-5 hidden max-w-lg sm:block">
            {property.summary}
          </Text>
        )}

        <div
          className={cn(
            'mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-ivory/20 pt-4',
            'transition-colors duration-700 group-hover:border-ivory/45',
            isLead && 'md:mt-7 md:pt-5',
          )}
        >
          <div className="flex flex-col gap-2">
            <PropertyPrice property={property} size={isLead ? 'lg' : 'md'} />
            <PropertySpecs property={property} inverse />
          </div>
          <span aria-hidden="true" className="nav-label flex items-center gap-2 pb-0.5 text-ivory">
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
