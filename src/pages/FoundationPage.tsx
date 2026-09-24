import { ArrowRight, ArrowUpRight, Heart, Search, SlidersHorizontal } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/animations';
import { PropertyCard, PropertyStatusBadge } from '@/components/property';
import { SectionHeading } from '@/components/sections';
import { Badge, Button, Divider, Eyebrow, Heading, IconButton, Logo, Section } from '@/components/ui';
import { properties, siteConfig } from '@/data';
import { PROPERTY_STATUSES } from '@/lib/types';

const swatches = [
  { name: 'Paper', hex: '#F3EFE8', className: 'bg-paper border border-ink/10' },
  { name: 'Linen', hex: '#EBE5DA', className: 'bg-linen border border-ink/10' },
  { name: 'Sand', hex: '#DCD3C4', className: 'bg-sand' },
  { name: 'Stone', hex: '#C4B8A5', className: 'bg-stone' },
  { name: 'Taupe', hex: '#8A8174', className: 'bg-taupe' },
  { name: 'Bronze', hex: '#9A7A4F', className: 'bg-bronze' },
  { name: 'Graphite', hex: '#2B2925', className: 'bg-graphite' },
  { name: 'Ink', hex: '#1B1A17', className: 'bg-ink' },
] as const;

const typeScale = [
  { token: 'display-xl', size: 'xl', sample: 'Residences' },
  { token: 'display-lg', size: 'lg', sample: 'Of consequence' },
  { token: 'display-md', size: 'md', sample: 'Light, proportion, calm' },
  { token: 'display-sm', size: 'sm', sample: 'A considered approach to property' },
  { token: 'display-xs', size: 'xs', sample: 'The Halden Residence' },
] as const;

/**
 * Phase 1 reference page — renders the design tokens and foundation
 * components so they can be reviewed before real pages are composed.
 */
export function FoundationPage() {
  const [lead, ...rest] = properties;

  return (
    <>
      <Section spacing="lg" aria-labelledby="foundation-title">
        <Reveal className="flex flex-col gap-10">
          <Logo />
          <Divider decorative />
          <SectionHeading
            id="foundation-title"
            level={1}
            size="lg"
            eyebrow="Design foundation"
            index={1}
            title={
              <>
                The {siteConfig.name} <em className="text-bronze">system</em>
              </>
            }
            description="Tokens, primitives and property components that every page of the site will be composed from."
          />
        </Reveal>
      </Section>

      <Section tone="linen" aria-labelledby="palette-title">
        <SectionHeading
          id="palette-title"
          eyebrow="Palette"
          index={2}
          size="sm"
          title="Limestone, graphite and a single bronze accent."
        />
        <Stagger as="ul" className="mt-14 grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-4">
          {swatches.map((swatch) => (
            <StaggerItem as="li" key={swatch.name} className="bg-linen p-5">
              <div className={`aspect-[4/3] ${swatch.className}`} />
              <p className="mt-4 font-display text-xl">{swatch.name}</p>
              <p className="eyebrow mt-1 text-taupe">{swatch.hex}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section aria-labelledby="type-title">
        <SectionHeading
          id="type-title"
          eyebrow="Typography"
          index={3}
          size="sm"
          title="Cormorant Garamond for display, Manrope for everything else."
        />
        <div className="mt-14 flex flex-col">
          {typeScale.map(({ token, size, sample }) => (
            <div
              key={token}
              className="grid gap-4 border-t border-ink/15 py-8 md:grid-cols-[12rem_1fr] md:items-baseline"
            >
              <p className="eyebrow text-taupe">{token}</p>
              <Heading level={3} size={size} className="truncate">
                {sample}
              </Heading>
            </div>
          ))}
          <div className="grid gap-4 border-t border-ink/15 py-8 md:grid-cols-[12rem_1fr]">
            <p className="eyebrow text-taupe">body</p>
            <p className="max-w-2xl text-lg leading-relaxed text-slate">
              For over fifteen years we have represented homes defined by their architecture, their setting
              and their sense of quiet. Every listing is visited, photographed and written in-house.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="ink" aria-labelledby="controls-title">
        <SectionHeading
          id="controls-title"
          eyebrow="Controls"
          index={4}
          size="sm"
          inverse
          title="Buttons, icon buttons and badges."
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6 bg-paper p-8 text-ink md:p-10">
            <Eyebrow tone="muted">On paper</Eyebrow>
            <div className="flex flex-wrap items-center gap-4">
              <Button icon={ArrowRight}>View residences</Button>
              <Button variant="secondary">Book a viewing</Button>
              <Button variant="accent" size="sm">
                Consultation
              </Button>
              <Button variant="link" icon={ArrowUpRight}>
                All locations
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <IconButton icon={Search} label="Search properties" />
              <IconButton icon={SlidersHorizontal} label="Open filters" variant="solid" />
              <IconButton icon={Heart} label="Save property" variant="ghost" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {PROPERTY_STATUSES.map((status) => (
                <PropertyStatusBadge key={status} status={status} className="border border-ink/10" />
              ))}
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="outline" dot>
                New listing
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-6 border border-paper/15 p-8 md:p-10">
            <Eyebrow tone="inverse">On ink</Eyebrow>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="inverse" icon={ArrowRight}>
                Sell with NOVA
              </Button>
              <Button variant="accent">Request valuation</Button>
            </div>
            <Divider tone="inverse" label={`Est. ${siteConfig.established}`} />
            <Logo tone="paper" />
          </div>
        </div>
      </Section>

      <Section aria-labelledby="cards-title">
        <SectionHeading
          id="cards-title"
          eyebrow="Property components"
          index={5}
          size="sm"
          title="PropertyCard — stacked and horizontal layouts."
          description="Status, favorites, specifications and price are composed from smaller property primitives."
        />
        {lead && (
          <Reveal className="mt-14">
            <PropertyCard property={lead} layout="horizontal" index={1} />
          </Reveal>
        )}
        <Divider decorative className="my-16" />
        <Stagger as="ul" className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 6).map((property, i) => (
            <StaggerItem as="li" key={property.id}>
              <PropertyCard property={property} index={i + 2} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
