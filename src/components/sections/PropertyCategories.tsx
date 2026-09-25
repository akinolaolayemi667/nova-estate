import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/animations';
import { PropertyCategoryTile } from '@/components/property';
import { Button, Section } from '@/components/ui';
import { propertyCategories, propertyCategoriesContent } from '@/data';
import { SectionHeading } from './SectionHeading';

export const PROPERTY_CATEGORIES_ID = 'property-categories';

interface TileLayout {
  item: string;
  tile: string;
  sizes: string;
  image?: string;
}

/**
 * Desktop: a panoramic lead, a wide/narrow pair, then a tall portrait (right) beside two stacked
 * landscapes (dense flow fills the left). One tile per row sets the height via its ratio; its
 * partner stretches to match. Tablet: 2 columns; mobile: one column alternating 4:5 and square.
 */
const tileLayouts: TileLayout[] = [
  {
    item: 'md:col-span-2 lg:col-span-12',
    tile: 'aspect-[4/5] sm:aspect-[3/2] md:aspect-[16/9] lg:aspect-[5/2]',
    sizes: '100vw',
    image: 'object-[50%_40%]',
  },
  {
    item: 'lg:col-span-7',
    tile: 'aspect-square md:aspect-[4/5] lg:aspect-[7/5]',
    sizes: '(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw',
  },
  {
    item: 'lg:col-span-5',
    tile: 'aspect-[4/5] lg:aspect-auto lg:h-full',
    sizes: '(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw',
  },
  {
    item: 'lg:col-span-5 lg:col-start-8 lg:row-span-2',
    tile: 'aspect-[4/5] lg:aspect-auto lg:h-full',
    sizes: '(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw',
    image: 'object-[60%_center]',
  },
  {
    item: 'lg:col-span-7',
    tile: 'aspect-square md:aspect-[4/5] lg:aspect-[2/1]',
    sizes: '(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw',
  },
  {
    item: 'md:col-span-2 lg:col-span-7',
    tile: 'aspect-square md:aspect-[21/9] lg:aspect-[2/1]',
    sizes: '(min-width: 1024px) 58vw, 100vw',
  },
];

const formatIndex = (position: number) => String(position).padStart(2, '0');

export function PropertyCategories() {
  const { eyebrow, title, description, cta } = propertyCategoriesContent;
  const titleId = `${PROPERTY_CATEGORIES_ID}-title`;

  return (
    <Section id={PROPERTY_CATEGORIES_ID} tone="cream" ruled container="wide" aria-labelledby={titleId}>
      <Reveal>
        <SectionHeading
          id={titleId}
          eyebrow={eyebrow}
          index={2}
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
        className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5 lg:mt-24 lg:grid-flow-dense lg:grid-cols-12"
      >
        {propertyCategories.map((category, position) => {
          const layout = tileLayouts[position % tileLayouts.length] as TileLayout;
          return (
            <StaggerItem as="li" key={category.id} className={layout.item}>
              <PropertyCategoryTile
                category={category}
                index={formatIndex(position + 1)}
                variant={position === 0 ? 'lead' : 'standard'}
                imageSizes={layout.sizes}
                imagePosition={layout.image}
                className={layout.tile}
              />
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
