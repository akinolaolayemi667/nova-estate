import { ImageReveal, Reveal, Stagger, StaggerItem } from '@/components/animations';
import { Heading, ImageWrapper, Section, Text } from '@/components/ui';
import { whyNovaContent } from '@/data';
import { formatIndex } from '@/lib/format';
import { SectionHeading } from './SectionHeading';

export const WHY_NOVA_ID = 'why-nova';

export function WhyNova() {
  const { eyebrow, title, description, image, principles } = whyNovaContent;
  const titleId = `${WHY_NOVA_ID}-title`;

  return (
    <Section id={WHY_NOVA_ID} tone="cream" container="wide" aria-labelledby={titleId}>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-20">
        <ImageReveal className="md:sticky md:top-28 md:self-start lg:static lg:col-span-6 lg:self-stretch xl:col-span-7">
          <div className="relative aspect-[4/3] sm:aspect-[3/2] md:aspect-auto md:h-[min(38rem,calc(100svh-9rem))] md:min-h-[28rem] lg:h-full lg:min-h-[32rem]">
            <ImageWrapper
              src={image.src}
              alt={image.alt}
              ratio="fill"
              sizes="(min-width: 1280px) 58vw, (min-width: 768px) 50vw, 100vw"
              imageClassName="object-[35%_center] md:object-[58%_center] xl:object-[35%_center]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 border border-ivory/35 md:inset-4"
            />
          </div>
        </ImageReveal>

        <div className="lg:col-span-6 lg:py-6 xl:col-span-5">
          <Reveal>
            <SectionHeading
              id={titleId}
              eyebrow={eyebrow}
              index={5}
              title={title.map((line, index) => (
                <span key={line} className={index === title.length - 1 ? 'block italic' : 'block'}>
                  {line}
                </span>
              ))}
              description={description}
            />
          </Reveal>

          <Stagger as="ol" stagger={0.12} delay={0.15} className="mt-12 border-t border-line md:mt-14 lg:mt-16">
            {principles.map(({ title: principle, description: detail, icon: Icon }, index) => (
              <StaggerItem
                as="li"
                key={principle}
                className="group relative isolate grid grid-cols-[2.75rem_1fr_auto] items-start gap-x-4 border-b border-line py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-6 md:grid-cols-[2.75rem_1fr_auto] md:gap-x-4 md:py-7 lg:grid-cols-[3.5rem_1fr_auto] lg:gap-x-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -inset-x-4 -z-10 bg-ivory opacity-0 transition-opacity duration-500 ease-architectural group-hover:opacity-100 md:-inset-x-5"
                />
                <span className="tabular font-display text-[1.75rem] leading-none text-gold transition-transform duration-500 ease-architectural motion-safe:group-hover:translate-x-1">
                  {formatIndex(index + 1)}
                </span>
                <div>
                  <Heading level={3} size="h4">
                    {principle}
                  </Heading>
                  <Text variant="small" tone="muted" className="mt-2 max-w-md">
                    {detail}
                  </Text>
                </div>
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center border border-line text-muted/60 transition-colors duration-500 ease-architectural group-hover:border-gold/60 group-hover:text-gold"
                >
                  <Icon strokeWidth={1.25} className="size-4" />
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
