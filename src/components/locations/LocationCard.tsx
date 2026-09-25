import { ArrowRight } from 'lucide-react';
import { Heading, ImageWrapper, type HeadingLevel } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Location } from '@/lib/types';

export interface LocationCardProps {
  location: Location;
  /** Editorial numbering, e.g. "02". */
  index: string;
  ctaLabel: string;
  /** Short note shown on the image, e.g. "3 residences". */
  meta?: string;
  headingLevel?: HeadingLevel;
  imageSizes?: string;
  /** Responsive `aspect-*` utilities for the image frame. */
  imageClassName?: string;
  onActiveChange?: (active: boolean) => void;
  className?: string;
}

/** Image-led location card with a map-style marker label; copy sits below the photograph. */
export function LocationCard({
  location,
  index,
  ctaLabel,
  meta,
  headingLevel = 3,
  imageSizes = '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw',
  imageClassName,
  onActiveChange,
  className,
}: LocationCardProps) {
  return (
    <article
      onMouseEnter={() => onActiveChange?.(true)}
      onMouseLeave={() => onActiveChange?.(false)}
      onFocus={() => onActiveChange?.(true)}
      onBlur={() => onActiveChange?.(false)}
      className={cn(
        'group relative flex flex-col',
        'outline-offset-8 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-navy',
        className,
      )}
    >
      <ImageWrapper
        src={location.image}
        alt=""
        ratio="none"
        zoomOnHover
        sizes={imageSizes}
        className={imageClassName}
      >
        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 bg-linear-to-b from-navy/65 to-transparent p-4 pb-10 md:p-5 md:pb-12">
          <span className="kicker flex items-center gap-2.5 text-ivory">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 rounded-full bg-gold-light opacity-0 transition-opacity duration-500 group-hover:opacity-60 motion-safe:group-hover:animate-marker-pulse" />
              <span className="relative size-2.5 rounded-full bg-gold-light transition-shadow duration-500 group-hover:shadow-[0_0_14px_3px_rgb(216_196_154/0.55)]" />
            </span>
            <span className="tabular">{index}</span>
          </span>
          {meta && <span className="kicker bg-navy/75 px-2 py-1 text-ivory">{meta}</span>}
        </div>
      </ImageWrapper>

      <div className="flex flex-1 flex-col border-b border-line pt-6 pb-5 transition-colors duration-500 group-hover:border-navy/35">
        <Heading level={headingLevel} size="h4" className="text-navy">
          <a
            href={location.href}
            className={cn(
              'bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-left-bottom bg-no-repeat',
              'transition-[background-size] duration-700 ease-architectural group-hover:bg-size-[100%_1px]',
              'after:absolute after:inset-0 focus-visible:outline-none',
            )}
          >
            {location.name}
          </a>
        </Heading>
        <p className="mt-2 max-w-xs text-small text-muted">{location.description}</p>
        <span aria-hidden="true" className="nav-label mt-5 flex items-center gap-2 text-navy lg:mt-auto lg:pt-5">
          {ctaLabel}
          <ArrowRight
            strokeWidth={1.5}
            className="size-3.5 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
