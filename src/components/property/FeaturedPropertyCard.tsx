import { ArrowRight, MapPin } from 'lucide-react';
import { Eyebrow, Heading, ImageWrapper, Text, type HeadingLevel } from '@/components/ui';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/cn';
import { formatNumber, propertyTypeLabels } from '@/lib/format';
import { routes } from '@/lib/routes';
import type { Property } from '@/lib/types';
import { FavoriteButton } from './FavoriteButton';
import { PropertyPrice } from './PropertyPrice';
import { PropertyStatusBadge } from './PropertyStatusBadge';

export interface FeaturedPropertyCardProps {
  property: Property;
  label?: string;
  href?: string;
  headingLevel?: HeadingLevel;
  className?: string;
}

/** Editorial lead card: wide photograph with a full detail column. */
export function FeaturedPropertyCard({
  property,
  label = 'Featured Residence',
  href = routes.property(property.slug),
  headingLevel = 3,
  className,
}: FeaturedPropertyCardProps) {
  const specs = [
    { term: 'Bedrooms', value: formatNumber(property.bedrooms) },
    { term: 'Bathrooms', value: formatNumber(property.bathrooms) },
    { term: 'Interior', value: formatNumber(property.area), unit: siteConfig.areaUnit },
  ];

  return (
    <article
      className={cn(
        'group relative grid gap-8 md:gap-10 lg:grid-cols-12 lg:gap-12',
        'outline-offset-8 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-navy',
        className,
      )}
    >
      <ImageWrapper
        src={property.image}
        alt={property.imageAlt}
        ratio="none"
        zoomOnHover
        sizes="(min-width: 1024px) 66vw, 100vw"
        className="aspect-[4/3] md:aspect-[16/9] lg:col-span-8 lg:aspect-[16/10]"
      >
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4 md:p-6">
          {property.status ? <PropertyStatusBadge status={property.status} /> : <span />}
          <FavoriteButton propertyId={property.id} propertyTitle={property.title} />
        </div>
      </ImageWrapper>

      <div className="flex flex-col lg:col-span-4 lg:py-1">
        <Eyebrow>{label}</Eyebrow>

        <p className="kicker mt-8 text-muted lg:mt-10">{propertyTypeLabels[property.type]}</p>
        <Heading level={headingLevel} size="h2" className="mt-3 text-navy">
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
        <p className="mt-3 flex items-center gap-1.5 text-small text-muted">
          <MapPin aria-hidden="true" strokeWidth={1.5} className="size-3.5 shrink-0" />
          {property.location}
        </p>

        {property.summary && (
          <Text tone="muted" className="mt-6 max-w-md">
            {property.summary}
          </Text>
        )}

        <dl className="mt-8 grid grid-cols-3 divide-x divide-line border-y border-line transition-colors duration-500 group-hover:border-navy/35">
          {specs.map(({ term, value, unit }) => (
            <div key={term} className="flex min-w-0 flex-col gap-1.5 px-3 py-4 first:pl-0 sm:px-4">
              <dt className="kicker text-muted">{term}</dt>
              <dd className="tabular font-display text-[1.5rem] leading-none whitespace-nowrap text-navy sm:text-[1.75rem]">
                {value}
                {unit && <span className="ml-1 font-sans text-caption text-muted">{unit}</span>}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 lg:mt-auto lg:pt-8">
          <PropertyPrice property={property} size="lg" className="text-navy" />
          <span aria-hidden="true" className="nav-label flex items-center gap-2 pb-1 text-navy">
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
