import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/animations';
import { FeaturedPropertyCard, PropertyCard } from '@/components/property';
import { Button, Section, Text } from '@/components/ui';
import { featuredPropertiesContent, properties } from '@/data';
import { getFeaturedProperties } from '@/lib/properties';
import { SectionHeading } from './SectionHeading';

export const FEATURED_PROPERTIES_ID = 'featured-properties';

/**
 * Staggered editorial rhythm for the supporting cards: a wide/narrow pair,
 * then three portraits with the middle one dropped. Mobile uses 4:3 throughout.
 */
const supportingLayout = [
  { item: 'lg:col-span-7', image: 'aspect-[4/3] lg:aspect-[3/2]', sizes: '(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw' },
  { item: 'lg:col-span-5 lg:mt-28', image: 'aspect-[4/3]', sizes: '(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw' },
  { item: 'lg:col-span-4', image: 'aspect-[4/3] lg:aspect-[4/5]', sizes: '(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw' },
  { item: 'lg:col-span-4 lg:mt-28', image: 'aspect-[4/3] lg:aspect-[4/5]', sizes: '(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw' },
  {
    item: 'md:col-span-2 lg:col-span-4',
    image: 'aspect-[4/3] md:aspect-[21/9] lg:aspect-[4/5]',
    sizes: '(min-width: 1024px) 32vw, 100vw',
  },
] as const;

export function FeaturedProperties() {
  const [lead, ...supporting] = getFeaturedProperties(properties, supportingLayout.length + 1);
  const { eyebrow, title, description, cta, disclaimer } = featuredPropertiesContent;
  const titleId = `${FEATURED_PROPERTIES_ID}-title`;

  if (!lead) return null;

  return (
    <Section id={FEATURED_PROPERTIES_ID} tone="ivory" ruled container="wide" aria-labelledby={titleId}>
      <Reveal>
        <SectionHeading
          id={titleId}
          eyebrow={eyebrow}
          index={1}
          title={title}
          description={description}
          align="split"
          action={
            <Button href={cta.href} variant="link" icon={ArrowRight} className="text-navy">
              {cta.label}
            </Button>
          }
        />
      </Reveal>

      <Reveal delay={0.15} className="mt-16 md:mt-20 lg:mt-24">
        <FeaturedPropertyCard property={lead} />
      </Reveal>

      <Stagger
        as="ul"
        stagger={0.14}
        className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-20 lg:mt-28 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-24"
      >
        {supporting.map((property, index) => {
          const layout = supportingLayout[index] ?? supportingLayout[2];
          return (
            <StaggerItem as="li" key={property.id} className={layout.item}>
              <PropertyCard
                property={property}
                imageRatio="none"
                imageClassName={layout.image}
                imageSizes={layout.sizes}
              />
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal
        variant="fade"
        className="mt-20 flex flex-col-reverse items-start gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between lg:mt-28"
      >
        <Text variant="caption" tone="muted">
          {disclaimer}
        </Text>
        <Button href={cta.href} variant="secondary" icon={ArrowRight}>
          {cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
