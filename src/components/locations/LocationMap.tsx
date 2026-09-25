import { Eyebrow } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Location } from '@/lib/types';

export interface LocationMapProps {
  locations: readonly Location[];
  /** Highlights the matching marker, e.g. while its card is hovered. */
  activeId?: string | null;
  eyebrow: string;
  countLabel: string;
  caption: string;
  note?: string;
  className?: string;
}

const gridLines = [10, 20, 30, 40, 50, 60, 70, 80, 90];

/** Freeform contour lines — deliberately abstract so they can't be read as real streets or coastlines. */
const contours = [
  'M0,64 C18,57 32,72 52,62 S84,48 100,57',
  'M0,33 C22,41 40,24 61,32 S88,43 100,30',
  'M8,100 C26,74 42,58 50,46 S66,22 80,0',
  'M0,86 C30,80 52,92 74,84 S94,76 100,79',
];

/**
 * Decorative navy panel with fine lines and pulsing markers. Lines use a stretched 100×100 viewBox
 * with non-scaling strokes, and markers are HTML positioned by percentage, so both stay aligned at
 * any aspect ratio.
 */
export function LocationMap({
  locations,
  activeId,
  eyebrow,
  countLabel,
  caption,
  note,
  className,
}: LocationMapProps) {
  const [hub, ...others] = locations;

  return (
    <figure className={cn('relative isolate flex flex-col overflow-hidden bg-navy text-ivory', className)}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 whitespace-nowrap p-6 md:p-7">
        <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
        <p className="flex items-baseline gap-2">
          <span className="tabular font-display text-[2rem] leading-none text-gold-light">
            {String(locations.length).padStart(2, '0')}
          </span>
          <span className="kicker text-ivory/60">{countLabel}</span>
        </p>
      </div>

      <div aria-hidden="true" className="relative mx-6 flex-1 md:mx-7">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          {gridLines.map((position) => (
            <g key={position} className="stroke-ivory/[0.07]">
              <line x1={position} y1="0" x2={position} y2="100" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1={position} x2="100" y2={position} vectorEffect="non-scaling-stroke" />
            </g>
          ))}
          {contours.map((d) => (
            <path key={d} d={d} fill="none" className="stroke-gold/35" vectorEffect="non-scaling-stroke" />
          ))}
          {hub &&
            others.map((location) => (
              <line
                key={location.id}
                x1={hub.marker.x}
                y1={hub.marker.y}
                x2={location.marker.x}
                y2={location.marker.y}
                strokeDasharray="2 5"
                vectorEffect="non-scaling-stroke"
                className={cn(
                  'transition-[stroke] duration-500',
                  activeId === location.id ? 'stroke-gold-light/70' : 'stroke-ivory/20',
                )}
              />
            ))}
        </svg>

        {hub && (
          <div
            className="absolute aspect-square h-[78%] -translate-1/2 rounded-full border border-ivory/10"
            style={{ left: `${hub.marker.x}%`, top: `${hub.marker.y}%` }}
          >
            <div className="absolute inset-[22%] rounded-full border border-ivory/10" />
          </div>
        )}

        {locations.map((location, index) => {
          const active = activeId === location.id;
          const isHub = index === 0;
          return (
            <div
              key={location.id}
              className="absolute -translate-1/2"
              style={{ left: `${location.marker.x}%`, top: `${location.marker.y}%` }}
            >
              <span className={cn('relative block rounded-full', isHub ? 'size-3' : 'size-2.5')}>
                <span
                  className="absolute inset-0 rounded-full bg-gold-light motion-safe:animate-marker-pulse"
                  style={{ animationDelay: `${index * 0.7}s` }}
                />
                <span
                  className={cn(
                    'absolute inset-0 rounded-full bg-gold-light transition-[scale,box-shadow] duration-500 ease-architectural',
                    active && 'scale-150 shadow-[0_0_0_6px_rgb(216_196_154/0.18),0_0_18px_4px_rgb(216_196_154/0.45)]',
                  )}
                />
              </span>
              <span
                className={cn(
                  'kicker absolute top-1/2 -translate-y-1/2 whitespace-nowrap transition-colors duration-500',
                  location.marker.labelSide === 'right' ? 'left-full ml-3' : 'right-full mr-3',
                  active ? 'text-gold-light' : 'text-ivory/65',
                )}
              >
                {location.name}
              </span>
            </div>
          );
        })}
      </div>

      <figcaption className="mx-6 mt-6 flex items-center justify-between gap-4 border-t border-ivory/10 py-5 md:mx-7">
        <span className="text-caption text-ivory/55">{caption}</span>
        {note && <span className="kicker shrink-0 text-ivory/40">{note}</span>}
      </figcaption>
    </figure>
  );
}
