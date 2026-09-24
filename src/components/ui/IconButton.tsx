import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export type IconButtonVariant = 'outline' | 'solid' | 'ghost' | 'overlay';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label' | 'aria-pressed'> {
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
  outline: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  solid: 'bg-ink text-paper hover:bg-graphite',
  ghost: 'text-ink hover:bg-ink/5',
  overlay: 'bg-paper/85 text-ink backdrop-blur-sm hover:bg-paper',
};

const sizeClasses: Record<IconButtonSize, { button: string; icon: string }> = {
  sm: { button: 'size-9', icon: 'size-4' },
  md: { button: 'size-11', icon: 'size-[1.125rem]' },
  lg: { button: 'size-14', icon: 'size-5' },
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
        'inline-flex shrink-0 items-center justify-center transition-colors duration-300 ease-architectural',
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
