import { ArrowRight } from 'lucide-react';
import { Heading, ImageWrapper, type HeadingLevel } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { PropertyCategoryEntry } from '@/lib/types';

export interface PropertyCategoryTileProps {
  category: PropertyCategoryEntry;
  /** Editorial numbering, e.g. "01". */
  index: string;
  /** `lead` sets a larger title and wider copy for the headline tile. */
  variant?: 'lead' | 'standard';
  headingLevel?: HeadingLevel;
  imageSizes?: string;
  /** Tune the crop per tile, e.g. `object-[50%_30%]`. */
  imagePosition?: string;
  /**
   * Sizing for the tile — responsive `aspect-*` utilities. The tile is not a scroll container,
   * so it grows past the ratio when the copy needs room. Avoid `min-h-*` with an aspect ratio:
   * the minimum is transferred to the width and overflows the column.
   */
  className?: string;
}

/** Photographic category link: the image fills the tile, details sit on a navy scrim at the base. */
export function PropertyCategoryTile({
  category,
  index,
  variant = 'standard',
  headingLevel = 3,
  imageSizes = '(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw',
  imagePosition,
  className,
}: PropertyCategoryTileProps) {
  const isLead = variant === 'lead';
  const Icon = category.icon;

  return (
    <a
      href={category.href}
      className={cn(
        'group relative isolate flex flex-col justify-between bg-navy text-ivory',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy',
        className,
      )}
    >
      <div className="absolute inset-0 -z-10">
        <ImageWrapper
          src={category.image}
          alt=""
          ratio="fill"
          zoomOnHover
          sizes={imageSizes}
          imageClassName={imagePosition}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy/10 transition-colors duration-700 ease-architectural group-hover:bg-navy/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-ivory/0 transition-colors duration-700 ease-architectural group-hover:border-ivory/30 md:inset-4"
      />

      <div className="flex items-center justify-between gap-4 bg-linear-to-b from-navy/60 to-transparent p-5 md:p-7">
        <span aria-hidden="true" className="kicker flex items-center gap-3 text-gold-light">
          <span className="tabular">{index}</span>
          <span className="h-px w-6 bg-gold-light/60 transition-[width] duration-700 ease-architectural group-hover:w-12" />
        </span>
        <span
          aria-hidden="true"
          className="grid size-10 place-items-center rounded-xs border border-ivory/25 text-ivory transition-colors duration-500 group-hover:border-gold-light/70 group-hover:text-gold-light"
        >
          <Icon strokeWidth={1.25} className="size-[1.125rem]" />
        </span>
      </div>

      <div
        className={cn(
          'bg-linear-to-t from-navy/90 via-navy/65 via-50% to-transparent px-5 pt-16 pb-5 md:px-7 md:pb-7',
          isLead && 'md:px-9 md:pt-24 md:pb-9 lg:px-10 lg:pb-10',
        )}
      >
        <Heading
          level={headingLevel}
          size={isLead ? 'h2' : 'h3'}
          className="text-ivory motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-architectural motion-safe:group-hover:-translate-y-1"
        >
          {category.name}
        </Heading>
        <p className={cn('mt-3 text-small text-ivory/75', isLead ? 'max-w-md md:text-body' : 'max-w-xs')}>
          {category.description}
        </p>
        <span aria-hidden="true" className="nav-label mt-5 flex items-center gap-2 text-ivory md:mt-6">
          Explore
          <ArrowRight
            strokeWidth={1.5}
            className="size-3.5 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:translate-x-1"
          />
        </span>
      </div>
    </a>
  );
}
