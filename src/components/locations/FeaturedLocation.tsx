import { ArrowRight, MapPin } from 'lucide-react';
import { PropertyPrice } from '@/components/property';
import { Eyebrow, Heading, ImageWrapper, Text, type HeadingLevel } from '@/components/ui';
import { cn } from '@/lib/cn';
import { routes } from '@/lib/routes';
import type { Location, Property } from '@/lib/types';

export interface FeaturedLocationProps {
  location: Location;
  index: string;
  label: string;
  meta?: string;
  /** A residence in this location, shown as a small inset card beside the location photograph. */
  property?: Property;
  headingLevel?: HeadingLevel;
  onActiveChange?: (active: boolean) => void;
  /** Sizing for the tile — responsive `aspect-*` / `h-*` utilities. */
  className?: string;
}

/** Large photographic location tile; the whole tile links to the location, the inset links to its property. */
export function FeaturedLocation({
  location,
  index,
  label,
  meta,
  property,
  headingLevel = 3,
  onActiveChange,
  className,
}: FeaturedLocationProps) {
  return (
    <article
      onMouseEnter={() => onActiveChange?.(true)}
      onMouseLeave={() => onActiveChange?.(false)}
      onFocus={() => onActiveChange?.(true)}
      onBlur={() => onActiveChange?.(false)}
      className={cn(
        'group relative isolate flex flex-col justify-between bg-navy text-ivory',
        'outline-offset-4 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-navy',
        className,
      )}
    >
      {/* Negative z-index keeps the photo beneath the in-flow copy and the stretched link. */}
      <div className="absolute inset-0 -z-10">
        <ImageWrapper
          src={location.image}
          alt=""
          ratio="fill"
          zoomOnHover
          sizes="(min-width: 1024px) 66vw, 100vw"
          imageClassName="object-[50%_35%]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy/10 transition-colors duration-700 ease-architectural group-hover:bg-navy/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-ivory/0 transition-colors duration-700 ease-architectural group-hover:border-ivory/30 md:inset-4"
      />

      <div className="flex items-start justify-between gap-6 bg-linear-to-b from-navy/55 to-transparent p-5 md:p-8 lg:p-10">
        <Eyebrow tone="inverse">{label}</Eyebrow>
        {property && (
          <a
            href={routes.property(property.slug)}
            className="relative z-10 hidden w-64 items-center gap-3 bg-ivory p-2.5 text-ink shadow-[0_18px_40px_-24px_rgb(11_27_43/0.7)] transition-transform duration-500 ease-architectural hover:-translate-y-0.5 sm:flex"
          >
            <ImageWrapper
              src={property.image}
              alt=""
              ratio="square"
              sizes="80px"
              className="w-18 shrink-0"
            />
            <span className="flex min-w-0 flex-col gap-1">
              <span className="kicker text-muted">In {location.name}</span>
              <span className="truncate font-display text-lg leading-tight text-navy">{property.title}</span>
              <PropertyPrice property={property} size="sm" className="text-ink" />
            </span>
          </a>
        )}
      </div>

      <div className="bg-linear-to-t from-navy/90 via-navy/60 via-55% to-transparent px-5 pt-24 pb-6 md:px-8 md:pb-8 lg:px-10 lg:pb-10">
        <p className="kicker flex items-center gap-3 text-ivory/75">
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 rounded-full bg-gold-light motion-safe:animate-marker-pulse" />
            <span className="relative size-2.5 rounded-full bg-gold-light transition-shadow duration-500 group-hover:shadow-[0_0_16px_4px_rgb(216_196_154/0.55)]" />
          </span>
          <span className="tabular text-gold-light">{index}</span>
          {meta && (
            <>
              <span aria-hidden="true" className="h-px w-6 bg-ivory/30" />
              {meta}
            </>
          )}
        </p>
        <Heading level={headingLevel} size="h1" className="mt-4 text-ivory">
          <a href={location.href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {location.name}
          </a>
        </Heading>
        <Text tone="inverse-muted" className="mt-4 max-w-md">
          {location.description}
        </Text>
        <span aria-hidden="true" className="nav-label mt-7 flex items-center gap-2 text-ivory">
          <MapPin strokeWidth={1.5} className="size-3.5 text-gold-light" />
          Explore {location.name}
          <ArrowRight
            strokeWidth={1.5}
            className="size-3.5 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
