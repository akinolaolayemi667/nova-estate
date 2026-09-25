import { ArrowRight, MapPin } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/animations';
import { PropertyGallery, PropertyPrice } from '@/components/property';
import { Button, Eyebrow, Heading, Section } from '@/components/ui';
import { propertyShowcaseContent, showcaseGallery, showcaseProperty, siteConfig } from '@/data';
import { cn } from '@/lib/cn';
import { formatNumber } from '@/lib/format';
import { SectionHeading } from './SectionHeading';

export const PROPERTY_SHOWCASE_ID = 'property-showcase';

export function PropertyShowcase() {
  const { eyebrow, title, description, label, typeLabel, galleryLabel, featuresTitle, features, cta, disclaimer } =
    propertyShowcaseContent;
  const property = showcaseProperty;
  const titleId = `${PROPERTY_SHOWCASE_ID}-title`;

  const specs = [
    { term: property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms', value: formatNumber(property.bedrooms) },
    { term: property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms', value: formatNumber(property.bathrooms) },
    { term: siteConfig.areaUnit, value: formatNumber(property.area) },
  ];

  return (
    <Section id={PROPERTY_SHOWCASE_ID} tone="navy" container="wide" aria-labelledby={titleId}>
      <Reveal>
        <SectionHeading id={titleId} eyebrow={eyebrow} index={4} title={title} description={description} align="split" inverse />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 lg:mt-24 lg:grid-cols-12 lg:gap-14 xl:gap-20">
        <PropertyGallery
          images={showcaseGallery}
          label={`${galleryLabel} of ${property.title}`}
          stageSizes="(min-width: 1280px) 62vw, (min-width: 1024px) 55vw, 100vw"
          stageClassName="aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] xl:aspect-[5/4]"
          className="lg:col-span-7 xl:col-span-8"
        />

        <Stagger
          stagger={0.1}
          delay={0.2}
          className="md:grid md:grid-cols-2 md:gap-x-12 lg:col-span-5 lg:block xl:col-span-4"
        >
          <div>
            <StaggerItem>
              <Eyebrow tone="inverse">{label}</Eyebrow>
            </StaggerItem>
            <StaggerItem>
              <Heading level={3} size="h1" className="mt-6 text-ivory">
                {property.title}
              </Heading>
              <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-ivory/70">
                <span className="flex items-center gap-2">
                  <MapPin aria-hidden="true" strokeWidth={1.5} className="size-4 text-gold-light" />
                  {property.location}
                </span>
                <span aria-hidden="true" className="h-3 w-px bg-ivory/25" />
                <span>{typeLabel}</span>
              </p>
            </StaggerItem>
            <StaggerItem className="mt-8 border-t border-ivory/20 pt-7 lg:mt-10">
              <PropertyPrice property={property} size="lg" className="text-ivory" />
            </StaggerItem>
            <StaggerItem>
              <dl className="mt-7 grid grid-cols-3 border-y border-ivory/20">
                {specs.map(({ term, value }, index) => (
                  <div
                    key={term}
                    className={cn(
                      'flex flex-col-reverse justify-end gap-3 py-5',
                      index > 0 ? 'border-l border-ivory/20 pl-4 sm:pl-6' : 'pr-4',
                    )}
                  >
                    <dt className="kicker text-ivory/60">{term}</dt>
                    <dd className="tabular font-display text-[2rem] leading-none text-ivory">{value}</dd>
                  </div>
                ))}
              </dl>
            </StaggerItem>
          </div>

          <div className="mt-10 md:mt-0 lg:mt-10">
            <StaggerItem>
              <h4 className="kicker text-gold-light">{featuresTitle}</h4>
              <ul className="mt-5 flex flex-col">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-4 border-b border-ivory/10 py-3.5 text-small text-ivory/85 first:pt-0"
                  >
                    <span aria-hidden="true" className="h-px w-4 shrink-0 bg-gold-light" />
                    {feature}
                  </li>
                ))}
              </ul>
            </StaggerItem>
            <StaggerItem className="mt-9">
              <Button href={cta.href} variant="inverse" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
                {cta.label}
              </Button>
              <p className="mt-5 max-w-xs text-caption tracking-[0.02em] text-ivory/50">{disclaimer}</p>
            </StaggerItem>
          </div>
        </Stagger>
      </div>
    </Section>
  );
}
