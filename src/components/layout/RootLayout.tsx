import type { ReactNode } from 'react';
import { MAIN_CONTENT_ID, SkipLink } from './SkipLink';

export interface RootLayoutProps {
  children: ReactNode;
  /** Site header slot (navigation arrives in Phase 2). */
  header?: ReactNode;
  /** Site footer slot. */
  footer?: ReactNode;
}

export function RootLayout({ children, header, footer }: RootLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <SkipLink />
      {header}
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      {footer}
    </div>
  );
}
