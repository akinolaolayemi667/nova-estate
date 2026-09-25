import { motion, type Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Heading, Text } from '@/components/ui';
import type { ProcessStep } from '@/data';
import { formatIndex } from '@/lib/format';
import { defaultViewport, easeArchitectural, easeSettle } from '@/lib/motion';

export interface ProcessTimelineProps {
  steps: ProcessStep[];
  className?: string;
}

const timelineVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeArchitectural, staggerChildren: 0.08, delayChildren: 0.05 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.22, ease: easeSettle } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeArchitectural } },
};

/** Draws from the top-left corner, so the same variant reads as left-to-right or top-to-bottom. */
const connectorVariants: Variants = {
  hidden: { clipPath: 'inset(0% 100% 100% 0%)' },
  visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.9, delay: 0.15, ease: easeArchitectural } },
};

/**
 * Numbered steps joined by thin connectors: a vertical timeline on mobile,
 * two wrapped rows on tablet and a single horizontal line on desktop.
 * Mount with a `key` inside `AnimatePresence` to cross-fade between timelines.
 */
export function ProcessTimeline({ steps, className }: ProcessTimelineProps) {
  return (
    <motion.ol
      className={className}
      variants={timelineVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={defaultViewport}
    >
      {steps.map(({ title, description, icon: Icon }, index) => {
        const isLast = index === steps.length - 1;
        return (
          <motion.li
            key={title}
            variants={stepVariants}
            className="group grid grid-cols-[3rem_1fr] gap-x-5 sm:grid-cols-[3.5rem_1fr] sm:gap-x-6 md:grid-cols-1 md:gap-x-0"
          >
            <div className="flex flex-col items-center md:flex-row md:gap-5">
              <span className="tabular font-display text-[2.25rem] leading-none text-gold md:text-[2.75rem]">
                <span className="sr-only">Step </span>
                {formatIndex(index + 1)}
              </span>
              {!isLast && (
                <motion.span
                  aria-hidden="true"
                  variants={connectorVariants}
                  className="relative my-4 flex min-h-10 w-3.5 flex-1 justify-center md:my-0 md:h-3.5 md:min-h-0 md:w-auto md:items-center md:justify-start lg:mr-6"
                >
                  <span className="h-full w-px bg-gold/50 md:h-px md:w-full" />
                  <ChevronRight
                    strokeWidth={1.25}
                    className="absolute bottom-0 left-1/2 size-3.5 -translate-x-1/2 rotate-90 text-gold md:top-1/2 md:right-0 md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2 md:rotate-0"
                  />
                </motion.span>
              )}
            </div>

            <div className={isLast ? 'md:mt-8 md:border-l md:border-line md:pl-6 lg:pr-8' : 'pb-12 md:mt-8 md:border-l md:border-line md:pb-0 md:pl-6 lg:pr-8'}>
              <span
                aria-hidden="true"
                className="flex size-11 items-center justify-center border border-line text-gold transition-colors duration-500 ease-architectural group-hover:border-gold/60"
              >
                <Icon strokeWidth={1.25} className="size-[1.125rem]" />
              </span>
              <Heading level={3} size="h3" className="mt-6">
                {title}
              </Heading>
              <Text variant="small" tone="muted" className="mt-3 max-w-xs">
                {description}
              </Text>
            </div>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
