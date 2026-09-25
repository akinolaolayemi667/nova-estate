import { useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import placeholderImage from '@/assets/images/placeholder-property.svg';
import { cn } from '@/lib/cn';
import { unsplashSrcSet } from '@/lib/images';

export type ImageRatio =
  | 'portrait'
  | 'tall'
  | 'classic'
  | 'landscape'
  | 'wide'
  | 'panorama'
  | 'square'
  | 'fill'
  /** No aspect class — supply responsive `aspect-*` utilities via `className`. */
  | 'none';
export type ImageOverlay = 'none' | 'scrim' | 'bottom';

export interface ImageWrapperProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'className' | 'children'> {
  src: string;
  /** Required. Pass an empty string only for purely decorative images. */
  alt: string;
  ratio?: ImageRatio;
  overlay?: ImageOverlay;
  zoomOnHover?: boolean;
  /** Above-the-fold images load eagerly with high fetch priority. */
  priority?: boolean;
  caption?: ReactNode;
  className?: string;
  imageClassName?: string;
  /** Content layered above the image (badges, controls, captions). */
  children?: ReactNode;
}

const ratioClasses: Record<ImageRatio, string> = {
  portrait: 'aspect-[4/5]',
  tall: 'aspect-[3/4]',
  classic: 'aspect-[4/3]',
  landscape: 'aspect-[3/2]',
  wide: 'aspect-video',
  panorama: 'aspect-[21/9]',
  square: 'aspect-square',
  fill: 'size-full',
  none: '',
};

const overlayClasses: Record<Exclude<ImageOverlay, 'none'>, string> = {
  scrim: 'bg-navy/30',
  bottom: 'bg-linear-to-t from-navy/60 via-navy/10 to-transparent',
};

export function ImageWrapper({
  src,
  alt,
  ratio = 'landscape',
  overlay = 'none',
  zoomOnHover = false,
  priority = false,
  caption,
  className,
  imageClassName,
  children,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  srcSet,
  onLoad,
  onError,
  ...imgProps
}: ImageWrapperProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const failed = failedSrc === src;
  const loaded = loadedSrc === src || failed;
  const resolvedSrc = failed ? placeholderImage : src;
  const resolvedSrcSet = failed ? undefined : (srcSet ?? unsplashSrcSet(src));

  const frame = (
    <div className={cn('group relative overflow-hidden bg-line/60', ratioClasses[ratio], className)}>
      <img
        src={resolvedSrc}
        srcSet={resolvedSrcSet}
        sizes={resolvedSrcSet ? sizes : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={(event) => {
          setLoadedSrc(src);
          onLoad?.(event);
        }}
        onError={(event) => {
          setFailedSrc(src);
          onError?.(event);
        }}
        className={cn(
          'size-full object-cover',
          'motion-safe:transition-[opacity,scale] motion-safe:duration-[1400ms] motion-safe:ease-architectural',
          loaded ? 'opacity-100' : 'opacity-0',
          zoomOnHover && 'motion-safe:group-hover:scale-[1.035]',
          imageClassName,
        )}
        {...imgProps}
      />
      {overlay !== 'none' && (
        <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', overlayClasses[overlay])} />
      )}
      {children}
    </div>
  );

  if (!caption) return frame;

  return (
    <figure>
      {frame}
      <figcaption className="mt-3 text-caption text-muted">{caption}</figcaption>
    </figure>
  );
}
