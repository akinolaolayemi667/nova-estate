import { AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { Reveal } from '@/components/animations';
import { ProcessTimeline } from '@/components/process';
import { Button, Heading, Section } from '@/components/ui';
import { processContent } from '@/data';
import { cn } from '@/lib/cn';
import { SectionHeading } from './SectionHeading';

export const PROCESS_ID = 'process';

const timelineClassName =
  'grid grid-cols-1 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-4 lg:gap-x-0';

export function Process() {
  const { eyebrow, title, description, tabsLabel, tracks, cta } = processContent;
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const titleId = `${PROCESS_ID}-title`;
  const panelId = `${baseId}-panel`;
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const active = tracks[activeIndex];

  if (!active) return null;

  const select = (index: number) => {
    const next = (index + tracks.length) % tracks.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: tracks.length - 1,
    };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target);
  };

  return (
    <Section id={PROCESS_ID} tone="ivory" ruled container="wide" aria-labelledby={titleId}>
      <Reveal>
        <SectionHeading
          id={titleId}
          eyebrow={eyebrow}
          index={6}
          align="split"
          title={title.map((line, index) => (
            <span key={line} className={index === title.length - 1 ? 'block italic' : 'block'}>
              {line}
            </span>
          ))}
          description={description}
        />
      </Reveal>

      <Reveal className="mt-14 md:mt-20 lg:mt-24">
        <div role="tablist" aria-label={tabsLabel} onKeyDown={onKeyDown} className="flex gap-6 border-b border-line sm:gap-12">
          {tracks.map((track, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={track.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={tabId(index)}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'nav-label relative -mb-px flex-1 cursor-pointer py-5 text-left transition-colors duration-500 ease-architectural sm:flex-none',
                  selected ? 'text-navy' : 'text-muted hover:text-ink',
                )}
              >
                {track.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold transition-transform duration-500 ease-architectural',
                    selected ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </button>
            );
          })}
        </div>
      </Reveal>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(activeIndex)}
        tabIndex={0}
        className="mt-12 grid grid-cols-1 outline-offset-8 md:mt-16 lg:mt-20"
      >
        {tracks.map((track) => (
          <div key={track.id} aria-hidden="true" className="invisible [grid-area:1/1]">
            <ProcessTimeline steps={track.steps} className={timelineClassName} />
          </div>
        ))}
        <AnimatePresence mode="wait">
          <ProcessTimeline
            key={active.id}
            steps={active.steps}
            className={cn('[grid-area:1/1]', timelineClassName)}
          />
        </AnimatePresence>
      </div>

      <Reveal className="mt-16 flex flex-col items-start gap-6 border-t border-line pt-10 md:mt-24 md:flex-row md:items-center md:justify-between md:pt-12">
        <Heading level={3} size="h3" className="italic">
          {cta.prompt}
        </Heading>
        <Button href={cta.href} size="lg" icon={ArrowRight}>
          {cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
