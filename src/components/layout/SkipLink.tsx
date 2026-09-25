export const MAIN_CONTENT_ID = 'main-content';

export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="nav-label sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-xs focus:bg-navy focus:px-5 focus:py-3 focus:text-ivory"
    >
      Skip to content
    </a>
  );
}
