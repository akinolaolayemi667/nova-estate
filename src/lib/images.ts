/** Builds a sized, auto-formatted Unsplash CDN URL from a photo id. */
export function unsplash(photoId: string, width = 1600, quality = 80): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

/** Responsive `srcSet` for Unsplash-hosted images. */
export function unsplashSrcSet(src: string, widths: readonly number[] = [480, 800, 1200, 1600]) {
  if (!src.startsWith('https://images.unsplash.com/')) return undefined;
  const url = new URL(src);
  return widths
    .map((width) => {
      url.searchParams.set('w', String(width));
      return `${url.toString()} ${width}w`;
    })
    .join(', ');
}
