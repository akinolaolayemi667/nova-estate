import type { ComponentPropsWithRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export type IconButtonVariant = 'outline' | 'solid' | 'ghost' | 'overlay' | 'inverse';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends Omit<ComponentPropsWithRef<'button'>, 'children' | 'aria-label' | 'aria-pressed'> {
  icon: LucideIcon;
  /** Accessible name — required because the button has no visible text. */
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Set for toggle buttons (e.g. favorites) to expose `aria-pressed`. */
  pressed?: boolean;
  iconClassName?: string;
}

const variantClasses: Record<IconButtonVariant, string> = {
  outline: 'border border-line text-navy hover:border-navy',
  solid: 'bg-navy text-ivory hover:bg-navy-soft',
  ghost: 'text-navy hover:bg-navy/5',
  overlay: 'bg-ivory/90 text-navy backdrop-blur-sm hover:bg-ivory',
  inverse: 'border border-ivory/25 text-ivory hover:border-ivory',
};

const sizeClasses: Record<IconButtonSize, { button: string; icon: string }> = {
  sm: { button: 'size-10', icon: 'size-4' },
  md: { button: 'size-11', icon: 'size-[1.125rem]' },
  lg: { button: 'size-12', icon: 'size-5' },
};

export function IconButton({
  icon: Icon,
  label,
  variant = 'outline',
  size = 'md',
  pressed,
  type = 'button',
  className,
  iconClassName,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-xs transition-colors duration-300 ease-architectural',
        'disabled:pointer-events-none disabled:opacity-40',
        variantClasses[variant],
        sizeClasses[size].button,
        className,
      )}
      {...props}
    >
      <Icon aria-hidden="true" strokeWidth={1.5} className={cn(sizeClasses[size].icon, iconClassName)} />
    </button>
  );
}
