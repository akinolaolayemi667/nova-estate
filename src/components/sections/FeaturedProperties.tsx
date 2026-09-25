import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/animations';
import { PropertyTile } from '@/components/property';
import { Button, Eyebrow, Heading, Section, Text } from '@/components/ui';
import { featuredPropertiesContent, properties } from '@/data';
import { getFeaturedProperties } from '@/lib/properties';
import { SectionHeading } from './SectionHeading';

export const FEATURED_PROPERTIES_ID = 'featured-properties';

const tileSizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';

/**
 * Bento placement for the supporting tiles, relying on dense auto-flow:
 * tablet 2 columns (tall tiles interlock), desktop 12 columns with two portrait columns
 * framing a landscape pair. Mobile gives tall tiles extra height to keep the rhythm.
 */
const supportingTiles = [
  { item: 'h-[26rem] md:h-auto lg:col-span-4' },
  { item: 'h-[32rem] md:h-auto md:row-span-2 lg:col-span-4', image: 'object-[60%_center]' },
  { item: 'h-[26rem] md:h-auto lg:col-span-4' },
  { item: 'h-[32rem] md:h-auto md:row-span-2 lg:col-span-4', image: 'object-[40%_center]' },
  { item: 'h-[26rem] md:h-auto lg:col-span-4' },
] as const;

const formatIndex = (position: number) => String(position).padStart(2, '0');

export function FeaturedProperties() {
  const [lead, ...supporting] = getFeaturedProperties(properties, supportingTiles.length + 1);
  const { eyebrow, title, description, cta, disclaimer, note } = featuredPropertiesContent;
  const titleId = `${FEATURED_PROPERTIES_ID}-title`;

  if (!lead) return null;

  const [firstSupporting, ...remaining] = supporting;
  const selectionCount = formatIndex(supporting.length + 1);

  const renderTile = (property: (typeof supporting)[number], position: number) => {
    const layout = supportingTiles[position] ?? supportingTiles[0];
    return (
      <StaggerItem as="li" key={property.id} className={layout.item}>
        <PropertyTile
          property={property}
          index={formatIndex(position + 2)}
          imageSizes={tileSizes}
          imagePosition={'image' in layout ? layout.image : undefined}
        />
      </StaggerItem>
    );
  };

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

      <Stagger
        as="ul"
        stagger={0.12}
        className="mt-14 grid gap-4 md:mt-20 md:auto-rows-[minmax(20rem,auto)] md:grid-flow-dense md:grid-cols-2 md:gap-5 lg:mt-24 lg:grid-cols-12 xl:auto-rows-[minmax(21.5rem,auto)]"
      >
        <StaggerItem as="li" className="h-[36rem] sm:h-[40rem] md:col-span-2 md:row-span-2 md:h-auto lg:col-span-8">
          <PropertyTile
            property={lead}
            variant="lead"
            index={formatIndex(1)}
            imageSizes="(min-width: 1024px) 66vw, 100vw"
          />
        </StaggerItem>

        {firstSupporting && renderTile(firstSupporting, 0)}

        <StaggerItem as="li" className="lg:col-span-4">
          <aside className="flex size-full flex-col justify-between gap-10 bg-navy p-7 text-ivory md:p-8">
            <div>
              <Eyebrow tone="inverse">{note.eyebrow}</Eyebrow>
              <Heading level={3} size="h3" className="mt-5 text-ivory">
                {note.title}
              </Heading>
              <Text variant="small" tone="inverse-muted" className="mt-3 max-w-sm">
                {note.body}
              </Text>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-ivory/20 pt-5">
              <p className="flex items-baseline gap-3">
                <span className="tabular font-display text-[2.75rem] leading-none text-gold-light">
                  {selectionCount}
                </span>
                <span className="kicker text-ivory/70">{note.countLabel}</span>
              </p>
              <Button href={note.cta.href} variant="link" icon={ArrowRight} className="text-ivory hover:text-gold-light">
                {note.cta.label}
              </Button>
            </div>
          </aside>
        </StaggerItem>

        {remaining.map((property, position) => renderTile(property, position + 1))}
      </Stagger>

      <Reveal
        variant="fade"
        className="mt-16 flex flex-col-reverse items-start gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between lg:mt-20"
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
