import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed'> {
  selected?: boolean;
}

/** Toggleable suggestion button. */
export function Chip({ selected = false, type = 'button', className, ...props }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        'inline-flex min-h-10 items-center rounded-xs border px-4 text-small transition-colors duration-300',
        selected
          ? 'border-navy bg-navy text-ivory'
          : 'border-line text-ink hover:border-navy hover:text-navy',
        className,
      )}
      {...props}
    />
  );
}
