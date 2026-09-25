import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/animations';
import { FeaturedLocation, LocationCard, LocationMap } from '@/components/locations';
import { Button, Section, Text } from '@/components/ui';
import { locations, locationsContent, properties } from '@/data';
import { getPropertiesByLocation } from '@/lib/properties';
import { SectionHeading } from './SectionHeading';

export const LOCATIONS_ID = 'locations';

/** Offsets the second and fourth cards on desktop for an editorial, un-gridded rhythm. */
const cardOffsets = ['', 'lg:mt-16', '', 'lg:mt-16'];

const formatIndex = (position: number) => String(position).padStart(2, '0');

const residenceCount = (locationId: string) => {
  const count = getPropertiesByLocation(properties, locationId).length;
  if (count === 0) return undefined;
  return `${count} ${count === 1 ? 'residence' : 'residences'}`;
};

export function Locations() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { eyebrow, title, description, cta, featuredLabel, cardCta, map, disclaimer } = locationsContent;
  const titleId = `${LOCATIONS_ID}-title`;

  const [featured, ...supporting] = locations;
  if (!featured) return null;

  const activate = (id: string) => (active: boolean) =>
    setActiveId((current) => (active ? id : current === id ? null : current));

  return (
    <Section id={LOCATIONS_ID} tone="ivory" ruled container="wide" aria-labelledby={titleId}>
      <Reveal>
        <SectionHeading
          id={titleId}
          eyebrow={eyebrow}
          index={3}
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

      <div className="mt-14 grid gap-4 md:mt-20 md:gap-5 lg:mt-24 lg:grid-cols-12">
        <Reveal delay={0.1} className="lg:col-span-7 xl:col-span-8">
          <FeaturedLocation
            location={featured}
            index={formatIndex(1)}
            label={featuredLabel}
            meta={residenceCount(featured.id)}
            property={getPropertiesByLocation(properties, featured.id)[0]}
            onActiveChange={activate(featured.id)}
            className="aspect-[4/5] sm:aspect-[3/2]"
          />
        </Reveal>
        <Reveal delay={0.25} variant="fade" className="lg:col-span-5 xl:col-span-4">
          <LocationMap
            locations={locations}
            activeId={activeId}
            eyebrow={map.eyebrow}
            countLabel={map.countLabel}
            caption={map.caption}
            note={map.note}
            className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full"
          />
        </Reveal>
      </div>

      <Stagger
        as="ul"
        stagger={0.12}
        className="mt-14 grid gap-x-5 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-y-14 lg:grid-cols-4"
      >
        {supporting.map((location, position) => (
          <StaggerItem as="li" key={location.id} className={cardOffsets[position % cardOffsets.length]}>
            <LocationCard
              location={location}
              index={formatIndex(position + 2)}
              ctaLabel={cardCta}
              meta={residenceCount(location.id)}
              imageClassName="aspect-[4/3] md:aspect-[4/5]"
              onActiveChange={activate(location.id)}
              className="h-full"
            />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal variant="fade" className="mt-16 border-t border-line pt-8 lg:mt-24">
        <Text variant="caption" tone="muted">
          {disclaimer}
        </Text>
      </Reveal>
    </Section>
  );
}
