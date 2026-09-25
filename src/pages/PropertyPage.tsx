import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { Reveal } from '@/components/animations';
import { FavoriteButton, PropertyPrice, PropertySpecs, PropertyStatusBadge } from '@/components/property';
import { Button, Eyebrow, Heading, ImageWrapper, Section, Text } from '@/components/ui';
import { properties, siteConfig } from '@/data';
import { propertyTypeLabels } from '@/lib/format';
import { getPropertyBySlug } from '@/lib/properties';
import { routes } from '@/lib/routes';

export interface PropertyPageProps {
  slug: string;
}

const backHref = `${routes.home}#featured-properties`;

/**
 * Placeholder property detail route (`/properties/:slug`).
 * The full experience — gallery, floor plans, viewing requests — replaces this in Phase 16.
 */
export function PropertyPage({ slug }: PropertyPageProps) {
  const property = getPropertyBySlug(properties, slug);

  useEffect(() => {
    document.title = `${property?.title ?? 'Property not found'} — ${siteConfig.name}`;
  }, [property]);

  if (!property) {
    return (
      <Section spacing="lg" aria-labelledby="property-title">
        <div className="flex max-w-xl flex-col items-start gap-6">
          <Eyebrow>Property</Eyebrow>
          <Heading id="property-title" level={1} size="h2">
            This property could not be found.
          </Heading>
          <Text tone="muted">It may have been withdrawn, or the link may be incomplete.</Text>
          <Button href={backHref} icon={ArrowLeft} iconPosition="start" variant="secondary">
            Back to Exceptional Properties
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section spacing="sm" container="wide" aria-labelledby="property-title">
      <Button href={backHref} variant="link" icon={ArrowLeft} iconPosition="start" className="text-muted hover:text-navy">
        Back to Exceptional Properties
      </Button>

      <Reveal className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="flex flex-col gap-4 lg:col-span-8">
          <Eyebrow>{propertyTypeLabels[property.type]}</Eyebrow>
          <Heading id="property-title" level={1} size="h1" className="text-navy">
            {property.title}
          </Heading>
          <p className="flex items-center gap-1.5 text-muted">
            <MapPin aria-hidden="true" strokeWidth={1.5} className="size-4 shrink-0" />
            {property.location}
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
          <PropertyPrice property={property} size="lg" className="text-navy" />
          <PropertySpecs property={property} />
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 lg:mt-14">
        <ImageWrapper src={property.image} alt={property.imageAlt} ratio="wide" priority sizes="100vw">
          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4 md:p-6">
            {property.status ? <PropertyStatusBadge status={property.status} /> : <span />}
            <FavoriteButton propertyId={property.id} propertyTitle={property.title} />
          </div>
        </ImageWrapper>
      </Reveal>

      <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12">
        {property.summary && (
          <Text variant="body-lg" tone="muted" className="max-w-2xl lg:col-span-7">
            {property.summary}
          </Text>
        )}
        <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:col-start-8">
          <p className="kicker text-muted">Full property details coming soon</p>
          <Text>
            Gallery, floor plans and viewing requests for this residence are being prepared. In the meantime, our
            advisors can arrange a private viewing.
          </Text>
          <Button href={routes.consultation} icon={ArrowRight}>
            Arrange a Viewing
          </Button>
        </div>
      </div>
    </Section>
  );
}
