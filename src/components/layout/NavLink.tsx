import type { AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  current?: boolean;
}

/** Header link with a thin gold rule that draws in on hover, focus and when current. */
export function NavLink({ current = false, className, children, ...props }: NavLinkProps) {
  return (
    <a
      aria-current={current ? 'page' : undefined}
      className={cn(
        'nav-label relative inline-flex h-11 items-center text-navy',
        'after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-left after:bg-gold',
        'after:transition-transform after:duration-500 after:ease-architectural',
        current ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
