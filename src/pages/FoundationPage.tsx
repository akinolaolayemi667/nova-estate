import { ArrowRight, Heart, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { ImageReveal, Reveal, Stagger, StaggerItem } from '@/components/animations';
import { PropertyCard, PropertyStatusBadge } from '@/components/property';
import { SectionHeading } from '@/components/sections';
import {
  Badge,
  Button,
  Chip,
  Divider,
  Eyebrow,
  Field,
  Heading,
  IconButton,
  ImageWrapper,
  Input,
  Logo,
  Section,
  Select,
  Text,
} from '@/components/ui';
import { properties, propertyTypeOptions, siteConfig } from '@/data';
import { unsplash } from '@/lib/images';
import { PROPERTY_STATUSES } from '@/lib/types';

const palette = [
  {
    group: 'Surfaces',
    colors: [
      { name: 'Warm Cream', hex: '#F5F0E8', swatch: 'bg-cream' },
      { name: 'Off White', hex: '#FCFBF8', swatch: 'bg-ivory' },
      { name: 'Border', hex: '#DDD8CE', swatch: 'bg-line' },
    ],
  },
  {
    group: 'Navy & text',
    colors: [
      { name: 'Deep Navy', hex: '#0B1B2B', swatch: 'bg-navy' },
      { name: 'Dark Navy', hex: '#10283D', swatch: 'bg-navy-soft' },
      { name: 'Dark Text', hex: '#17202A', swatch: 'bg-ink' },
      { name: 'Muted Text', hex: '#68717A', swatch: 'bg-muted' },
    ],
  },
  {
    group: 'Accent — used sparingly',
    colors: [
      { name: 'Muted Gold', hex: '#B89B5E', swatch: 'bg-gold' },
      { name: 'Light Gold', hex: '#D8C49A', swatch: 'bg-gold-light' },
    ],
  },
] as const;

const typeScale = [
  { token: 'Display', spec: 'Cormorant 120 / 0.95', node: <p className="font-display text-display">Quiet luxury</p> },
  { token: 'H1', spec: 'Cormorant 76 / 1.02', node: <p className="font-display text-h1">Residences of consequence</p> },
  { token: 'H2', spec: 'Cormorant 56 / 1.08', node: <p className="font-display text-h2">Light, proportion and calm</p> },
  { token: 'H3', spec: 'Cormorant 32 / 1.15', node: <p className="font-display text-h3">A considered approach to property</p> },
  {
    token: 'Body Large',
    spec: 'Inter Light 19 / 1.65',
    node: (
      <Text variant="body-lg" className="max-w-2xl">
        For over fifteen years we have represented homes defined by their architecture, their setting and their
        sense of quiet.
      </Text>
    ),
  },
  {
    token: 'Body',
    spec: 'Inter 16 / 1.7',
    node: (
      <Text className="max-w-2xl">
        Every listing is visited, photographed and written in-house, so the details you read are the details you
        will find when you arrive.
      </Text>
    ),
  },
  { token: 'Small', spec: 'Inter 14 / 1.6', node: <Text variant="small">4 Beds · 4 Baths · 4,200 sq ft</Text> },
  { token: 'Caption', spec: 'Inter 12 / 1.5', node: <Text variant="caption" tone="muted">Photography: Belgrave Square, spring 2026</Text> },
  { token: 'Overline', spec: 'Inter Medium 11 / 0.22em', node: <p className="kicker">Private viewings by appointment</p> },
] as const;

/**
 * Design system reference — renders tokens and reusable components for review
 * before real pages are composed.
 */
export function FoundationPage() {
  const [lead, ...rest] = properties;

  return (
    <>
      <Section spacing="lg" aria-labelledby="system-title">
        <Reveal>
          <SectionHeading
            id="system-title"
            level={1}
            size="h1"
            align="split"
            eyebrow="Design system"
            index={1}
            title={
              <>
                The {siteConfig.name} <em>visual language</em>
              </>
            }
            description="Cream, off-white and deep navy carry every page. Gold appears only as a thin rule or a quiet highlight."
            action={<Logo size="lg" />}
          />
        </Reveal>
      </Section>

      <Section tone="ivory" ruled aria-labelledby="palette-title">
        <SectionHeading id="palette-title" eyebrow="Colour" index={2} title="Palette" size="h3" />
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
          {palette.map(({ group, colors }, groupIndex) => (
            <Stagger
              key={group}
              as="ul"
              className={
                groupIndex === 1 ? 'grid grid-cols-2 gap-4 lg:col-span-5' : 'grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-1'
              }
            >
              <li className="col-span-full">
                <p className="kicker text-muted">{group}</p>
              </li>
              {colors.map((color) => (
                <StaggerItem as="li" key={color.name}>
                  <div className={`aspect-[5/3] border border-line ${color.swatch}`} />
                  <p className="mt-3 font-display text-xl">{color.name}</p>
                  <p className="tabular text-caption text-muted">{color.hex}</p>
                </StaggerItem>
              ))}
            </Stagger>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="type-title">
        <SectionHeading
          id="type-title"
          eyebrow="Typography"
          index={3}
          size="h3"
          align="split"
          title="Cormorant Garamond headlines, Inter for reading."
          description="Headlines are set large and light to feel editorial. Body copy stays calm, generous and highly legible."
        />
        <dl className="mt-16">
          {typeScale.map(({ token, spec, node }) => (
            <div key={token} className="grid gap-4 border-t border-line py-8 md:grid-cols-12 md:items-baseline md:gap-8">
              <dt className="flex flex-col gap-1 md:col-span-3">
                <span className="kicker">{token}</span>
                <span className="text-caption text-muted">{spec}</span>
              </dt>
              <dd className="min-w-0 md:col-span-9">{node}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="ivory" ruled aria-labelledby="controls-title">
        <SectionHeading id="controls-title" eyebrow="Interface" index={4} size="h3" title="Buttons, badges and fields" />
        <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-10 lg:col-span-7">
            <div className="flex flex-col gap-4">
              <p className="kicker text-muted">Buttons</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={ArrowRight}>Explore Properties</Button>
                <Button variant="secondary">Schedule a Consultation</Button>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <Button variant="gold" size="sm">
                  Request valuation
                </Button>
                <Button variant="link" icon={ArrowRight}>
                  View all residences
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="kicker text-muted">Icon buttons</p>
              <div className="flex flex-wrap items-center gap-3">
                <IconButton icon={Search} label="Search properties" />
                <IconButton icon={SlidersHorizontal} label="Open filters" variant="solid" />
                <IconButton icon={Heart} label="Save property" variant="ghost" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="kicker text-muted">Status badges</p>
              <div className="flex flex-wrap items-center gap-2">
                {PROPERTY_STATUSES.map((status) => (
                  <PropertyStatusBadge key={status} status={status} className="border border-line" />
                ))}
                <Badge variant="cream">New development</Badge>
              </div>
            </div>
          </div>

          <form className="flex flex-col gap-8 lg:col-span-5" aria-label="Field examples" onSubmit={(event) => event.preventDefault()}>
            <p className="kicker text-muted">Fields</p>
            <Field label="Location" hint="City, neighbourhood or address">
              {(props) => <Input {...props} icon={MapPin} placeholder="Where are you looking?" />}
            </Field>
            <Field label="Property type">
              {(props) => <Select {...props} options={propertyTypeOptions} defaultValue="all" />}
            </Field>
            <div className="flex flex-wrap gap-2">
              <Chip selected>Waterfront</Chip>
              <Chip>City Center</Chip>
              <Chip>West End</Chip>
            </div>
          </form>
        </div>
      </Section>

      <Section aria-labelledby="imagery-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-4 lg:pt-10">
            <Eyebrow index={5}>Imagery & motion</Eyebrow>
            <Heading id="imagery-title" level={2} size="h3">
              Large architectural photography, revealed slowly.
            </Heading>
            <Text tone="muted">
              Natural light, wide landscapes and the occasional portrait crop. Images unveil from their lower edge and
              zoom subtly on hover. Every movement respects reduced-motion preferences.
            </Text>
          </div>
          <ImageReveal className="lg:col-span-8">
            <ImageWrapper
              src={unsplash('photo-1600596542815-ffad4c1539a9', 2000)}
              alt="Contemporary villa with glass walls opening onto a lit pool terrace"
              ratio="landscape"
              zoomOnHover
              sizes="(min-width: 1024px) 66vw, 100vw"
            />
          </ImageReveal>
          <Reveal variant="scale" className="lg:col-span-4 lg:col-start-2 lg:-mt-24">
            <ImageWrapper
              src={unsplash('photo-1600607687939-ce8a6c25118c', 1000)}
              alt="Double-height living room washed in daylight"
              ratio="portrait"
              zoomOnHover
              sizes="(min-width: 1024px) 33vw, 100vw"
              caption="Portrait crop · Belgravia penthouse"
            />
          </Reveal>
          <Reveal variant="fade" delay={0.2} className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <ImageWrapper
              src={unsplash('photo-1613490493576-7fde63acd811', 1400)}
              alt="White modernist villa above the sea at dusk"
              ratio="panorama"
              zoomOnHover
              sizes="(min-width: 1024px) 50vw, 100vw"
              caption="Panorama crop · Cap Ferrat"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="ivory" ruled aria-labelledby="cards-title">
        <SectionHeading
          id="cards-title"
          eyebrow="Property card"
          index={6}
          size="h3"
          align="split"
          title="The image leads. Details follow quietly."
          description="Status, favourite, type, title, location, price and specifications. Borders are kept to a single rule."
        />
        {lead && (
          <Reveal className="mt-16">
            <PropertyCard property={lead} layout="horizontal" />
          </Reveal>
        )}
        <Divider decorative className="my-20" />
        <Stagger as="ul" className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 6).map((property) => (
            <StaggerItem as="li" key={property.id}>
              <PropertyCard property={property} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="navy" spacing="lg" aria-labelledby="navy-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Eyebrow index={7} tone="inverse">
              Backgrounds
            </Eyebrow>
            <Heading id="navy-title" level={2} size="h2">
              Deep navy sections give the page its weight.
            </Heading>
            <Text variant="body-lg" tone="inverse-muted" className="max-w-xl">
              Used for moments of emphasis: valuations, consultations and brand statements. Cream and off-white
              sections do the rest.
            </Text>
          </div>
          <div className="flex flex-wrap gap-4 lg:col-span-5 lg:justify-end">
            <Button variant="inverse" icon={ArrowRight}>
              Sell with NOVA
            </Button>
            <Button variant="inverse-outline">Request a valuation</Button>
          </div>
        </div>
        <Divider tone="inverse" label={`Established ${siteConfig.established}`} className="mt-20 text-ivory" />
        <Stagger className="mt-16 grid gap-px bg-ivory/10 sm:grid-cols-3">
          {[
            { name: 'Cream', className: 'bg-cream text-ink', note: 'Default page surface' },
            { name: 'Off White', className: 'bg-ivory text-ink', note: 'Alternating sections, panels' },
            { name: 'Deep Navy', className: 'bg-navy-soft text-ivory', note: 'Emphasis sections' },
          ].map((tile) => (
            <StaggerItem key={tile.name} variant="fade" className={`flex min-h-44 flex-col justify-between p-8 ${tile.className}`}>
              <p className="font-display text-h4">{tile.name}</p>
              <p className="text-caption opacity-70">{tile.note}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
