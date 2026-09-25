import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface HeaderActionProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: LucideIcon;
  label: string;
  /** Visually shows the label from the `xl` breakpoint; below that the label is screen-reader only. */
  collapseLabel?: boolean;
  /** Optional count badge, e.g. saved properties. */
  count?: number;
  countLabel?: string;
}

export function HeaderAction({
  icon: Icon,
  label,
  collapseLabel = true,
  count,
  countLabel,
  type = 'button',
  className,
  ...props
}: HeaderActionProps) {
  const showCount = count !== undefined && count > 0;

  return (
    <button
      type={type}
      aria-label={showCount && countLabel ? `${label}, ${countLabel}` : undefined}
      className={cn(
        'group nav-label relative inline-flex h-11 min-w-11 items-center justify-center gap-3.5 text-navy',
        'transition-colors duration-300 hover:text-navy-soft',
        className,
      )}
      {...props}
    >
      <span className="relative">
        <Icon aria-hidden="true" strokeWidth={1.5} className="size-[1.125rem]" />
        {showCount && (
          <span
            aria-hidden="true"
            className="tabular absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-navy px-1 text-[0.5625rem] font-semibold text-ivory"
          >
            {count}
          </span>
        )}
      </span>
      <span className={cn(collapseLabel && 'sr-only xl:not-sr-only')}>{label}</span>
    </button>
  );
}
