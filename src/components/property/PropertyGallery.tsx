import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ImageReveal, Stagger, StaggerItem } from '@/components/animations';
import { ImageWrapper } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatIndex } from '@/lib/format';
import type { GalleryImage } from '@/lib/types';

export interface PropertyGalleryProps {
  images: GalleryImage[];
  /** Accessible name for the thumbnail group, e.g. "Choose a view". */
  label: string;
  stageSizes?: string;
  /** Sizing for the main image — responsive `aspect-*` / `h-*` utilities. */
  stageClassName?: string;
  className?: string;
}

/**
 * Main image with a row of labelled thumbnails. Views cross-fade in place; arrow keys move
 * between thumbnails, and the thumbnail row scrolls horizontally on narrow screens.
 */
export function PropertyGallery({
  images,
  label,
  stageSizes = '(min-width: 1024px) 60vw, 100vw',
  stageClassName,
  className,
}: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageId = useId();
  const active = images[activeIndex];

  if (!active) return null;

  const select = (index: number) => {
    const next = (index + images.length) % images.length;
    setActiveIndex(next);
    thumbnailRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowDown: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      ArrowUp: activeIndex - 1,
      Home: 0,
      End: images.length - 1,
    };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target);
  };

  const counter = `${formatIndex(activeIndex + 1)} / ${formatIndex(images.length)}`;

  return (
    <div className={className}>
      <ImageReveal>
        <div id={stageId} className={cn('relative isolate overflow-hidden bg-navy-soft', stageClassName)}>
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={image.src}
                aria-hidden={!isActive}
                className={cn(
                  'absolute inset-0 transition-[opacity,scale] duration-[1200ms] ease-architectural',
                  isActive ? 'z-10 opacity-100' : 'opacity-0 motion-safe:scale-[1.04]',
                )}
              >
                <ImageWrapper
                  src={image.src}
                  alt={image.alt}
                  ratio="fill"
                  zoomOnHover
                  sizes={stageSizes}
                  imageClassName={image.position}
                />
              </div>
            );
          })}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 bg-linear-to-t from-navy/70 to-transparent px-5 pt-20 pb-5 md:px-7 md:pb-6"
          >
            <span className="kicker text-ivory">{active.label}</span>
            <span className="kicker tabular text-gold-light">{counter}</span>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 z-20 border border-ivory/15 md:inset-4"
          />
        </div>
      </ImageReveal>

      <p aria-live="polite" className="sr-only">
        Showing {active.label}, image {activeIndex + 1} of {images.length}
      </p>

      <div role="group" aria-label={label} onKeyDown={onKeyDown} className="mt-4 md:mt-5">
        <Stagger
          as="ul"
          stagger={0.1}
          delay={0.3}
          className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-3 [scrollbar-color:rgb(252_251_248/0.2)_transparent] [scrollbar-width:thin] sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-5"
        >
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <StaggerItem as="li" key={image.src} className="w-[42%] shrink-0 snap-start sm:w-auto">
                <button
                  ref={(node) => {
                    thumbnailRefs.current[index] = node;
                  }}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls={stageId}
                  onClick={() => setActiveIndex(index)}
                  className="group/thumb flex w-full cursor-pointer flex-col gap-3 text-left outline-offset-4 focus-visible:outline-2 focus-visible:outline-gold-light"
                >
                  <span className="relative block">
                    <ImageWrapper src={image.src} alt="" ratio="classic" sizes="(min-width: 640px) 15vw, 40vw" />
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-0 transition-colors duration-500 ease-architectural',
                        isActive ? 'bg-transparent ring-1 ring-gold-light ring-inset' : 'bg-navy/45 group-hover/thumb:bg-navy/15',
                      )}
                    />
                  </span>
                  <span className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'mt-[0.55em] h-px shrink-0 transition-[width,background-color] duration-500 ease-architectural',
                        isActive ? 'w-8 bg-gold-light' : 'w-4 bg-ivory/30 group-hover/thumb:w-6',
                      )}
                    />
                    <span
                      className={cn(
                        'kicker leading-relaxed transition-colors duration-500',
                        isActive ? 'text-ivory' : 'text-ivory/55 group-hover/thumb:text-ivory/85',
                      )}
                    >
                      <span className="sr-only">Show </span>
                      {image.label}
                    </span>
                  </span>
                </button>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </div>
  );
}
