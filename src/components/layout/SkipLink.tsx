export const MAIN_CONTENT_ID = 'main-content';

export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
    >
      Skip to content
    </a>
  );
}
