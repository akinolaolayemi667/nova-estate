import type { HTMLAttributes } from 'react';

/** Content available to screen readers but hidden visually. */
export function VisuallyHidden(props: HTMLAttributes<HTMLSpanElement>) {
  return <span className="sr-only" {...props} />;
}
