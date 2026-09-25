import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { PropertyPrice, PropertySpecs } from '@/components/property';
import { HeroSearch } from '@/components/search';
import { Button, Container, Eyebrow, ImageWrapper } from '@/components/ui';
import { heroContent, heroFeature, properties } from '@/data';
import { durations, easeArchitectural, easeSettle } from '@/lib/motion';
import type { SearchCriteria } from '@/lib/types';

export interface HeroProps {
  /** Receives hero search submissions. Wire to the properties page once routing exists. */
  onSearch?: (criteria: SearchCriteria) => void;
}

/** Entrance on page load (not on scroll) so the sequence plays once, in order. */
function enter(delay: number, from: TargetAndTransition = { y: 32 }) {
  return {
    initial: { opacity: 0, ...from },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: durations.base, ease: easeArchitectural, delay },
  };
}

const FEATURE_TITLE_ID = 'hero-feature-title';

export function Hero({ onSearch }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, headline, description, primaryCta, secondaryCta } = heroContent;

  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip pt-8 pb-16 sm:pt-12 lg:pt-14 lg:pb-24">
      <Container size="wide">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col justify-center lg:col-span-5 lg:pt-8 lg:pb-28">
            <motion.div {...enter(0.3, { y: 16 })}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>

            <h1
              id="hero-title"
              className="mt-7 font-display text-[clamp(3rem,9vw,4.75rem)] leading-[0.98] tracking-[-0.02em] text-navy lg:mt-9 lg:text-[clamp(3.5rem,5.4vw,6.5rem)]"
            >
              {headline.map((line, index) => (
                <motion.span
                  key={line}
                  className={index === headline.length - 1 ? 'block italic' : 'block'}
                  {...enter(0.4 + index * 0.12, { y: 40 })}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-7 max-w-md text-body-lg font-light text-muted lg:mt-8"
              {...enter(0.85, { y: 20 })}
            >
              {description}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-10 lg:grid lg:w-fit lg:grid-cols-1 lg:gap-3 2xl:flex 2xl:gap-4"
              {...enter(1, { y: 20 })}
            >
              <Button href={primaryCta.href} size="lg" icon={ArrowRight}>
                {primaryCta.label}
              </Button>
              <Button href={secondaryCta.href} size="lg" variant="secondary">
                {secondaryCta.label}
              </Button>
            </motion.div>
          </div>

          <div className="relative lg:col-span-7">
            <motion.div
              className="aspect-[4/5] overflow-hidden sm:aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[34rem] xl:min-h-[min(80svh,52rem)]"
              initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: durations.slow, ease: easeSettle, delay: 0.1 }}
            >
              <motion.div
                className="size-full"
                initial={reduceMotion ? false : { scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: durations.slow + 0.6, ease: easeArchitectural, delay: 0.1 }}
              >
                <ImageWrapper
                  src={heroFeature.image}
                  alt={heroFeature.imageAlt}
                  ratio="fill"
                  priority
                  zoomOnHover
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  imageClassName="object-[62%_center]"
                />
              </motion.div>
            </motion.div>

            <motion.article
              aria-labelledby={FEATURE_TITLE_ID}
              className="relative mx-4 -mt-16 border border-line/70 bg-ivory p-6 shadow-[0_30px_60px_-36px_rgb(11_27_43/0.45)] sm:absolute sm:bottom-8 sm:left-8 sm:mx-0 sm:mt-0 sm:w-[19rem] sm:p-7 lg:bottom-28 lg:w-[17.5rem] lg:p-6 xl:w-[19rem] xl:p-7 2xl:-left-14"
              {...enter(1.35, { x: -24 })}
            >
              <Eyebrow as="p">Featured Property</Eyebrow>
              <h2 id={FEATURE_TITLE_ID} className="mt-5 font-display text-h4 text-navy">
                {heroFeature.title}
              </h2>
              <p className="mt-1.5 flex items-center gap-1.5 text-small text-muted">
                <MapPin aria-hidden="true" strokeWidth={1.5} className="size-3.5 shrink-0" />
                {heroFeature.location}
              </p>
              <PropertyPrice property={heroFeature} className="mt-5 text-navy" />
              <PropertySpecs property={heroFeature} className="mt-3" />
              <div className="mt-5 border-t border-line pt-4">
                <Button
                  href={heroFeature.href}
                  variant="link"
                  icon={ArrowRight}
                  aria-label={`View Property: ${heroFeature.title}`}
                  className="text-navy"
                >
                  View Property
                </Button>
              </div>
            </motion.article>
          </div>
        </div>

        <motion.div className="relative z-10 mt-10 sm:mt-12 lg:-mt-20" {...enter(1.15, { y: 40 })}>
          <HeroSearch onSubmit={onSearch} meta={`${properties.length} residences currently available`} />
        </motion.div>
      </Container>
    </section>
  );
}
