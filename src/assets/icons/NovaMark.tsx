import type { SVGProps } from 'react';

/** NOVA monogram: an "N" drawn as a single continuous architectural line. */
export function NovaMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.25} {...props}>
      <rect x="0.625" y="0.625" width="30.75" height="30.75" />
      <path d="M9 23V9l14 14V9" strokeLinecap="square" />
    </svg>
  );
}
