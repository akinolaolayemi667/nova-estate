import type { ComponentPropsWithRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface InputProps extends ComponentPropsWithRef<'input'> {
  icon?: LucideIcon;
}

export const controlClasses = cn(
  'h-12 w-full border-0 border-b border-line bg-transparent text-body text-ink',
  'placeholder:text-muted/80 transition-colors duration-300',
  'hover:border-navy/50 focus:border-navy focus:shadow-[0_1px_0_0_var(--color-navy)] focus:outline-none focus-visible:outline-none',
);

export function Input({ icon: Icon, className, ...props }: InputProps) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          aria-hidden="true"
          strokeWidth={1.5}
          className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-muted"
        />
      )}
      <input className={cn(controlClasses, Icon && 'pl-7', className)} {...props} />
    </div>
  );
}
