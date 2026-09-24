import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'inverse' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'start' | 'end';
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;
type NativeAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>;

export type ButtonProps =
  | (ButtonBaseProps & NativeButtonProps & { href?: undefined })
  | (ButtonBaseProps & NativeAnchorProps & { href: string });

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-paper hover:bg-graphite',
  secondary: 'border border-ink/80 text-ink hover:bg-ink hover:text-paper',
  accent: 'bg-bronze text-paper hover:bg-bronze-deep',
  inverse: 'border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink',
  link: [
    'relative text-ink',
    'after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:bg-current',
    'after:transition-transform after:duration-500 after:ease-architectural hover:after:scale-x-50',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 px-5',
  md: 'h-12 px-7',
  lg: 'h-14 px-9',
};

interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

/** Exposed so router links (Phase 2) can share button styling. */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: ButtonClassOptions = {}) {
  return cn(
    'group/button label inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap',
    'transition-colors duration-500 ease-architectural',
    'disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40',
    variantClasses[variant],
    variant !== 'link' && sizeClasses[size],
    fullWidth && 'w-full',
    className,
  );
}

function ButtonContent({
  icon: Icon,
  iconPosition = 'end',
  children,
}: Pick<ButtonBaseProps, 'icon' | 'iconPosition' | 'children'>) {
  const icon = Icon ? (
    <Icon
      aria-hidden="true"
      strokeWidth={1.5}
      className={cn(
        'size-4 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-architectural',
        iconPosition === 'end'
          ? 'motion-safe:group-hover/button:translate-x-1'
          : 'motion-safe:group-hover/button:-translate-x-0.5',
      )}
    />
  ) : null;

  return (
    <>
      {iconPosition === 'start' && icon}
      <span>{children}</span>
      {iconPosition === 'end' && icon}
    </>
  );
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, icon, iconPosition, fullWidth, className, children, ...anchorProps } = props;
    return (
      <a className={buttonClasses({ variant, size, fullWidth, className })} {...anchorProps}>
        <ButtonContent icon={icon} iconPosition={iconPosition}>
          {children}
        </ButtonContent>
      </a>
    );
  }

  const {
    variant,
    size,
    icon,
    iconPosition,
    fullWidth,
    className,
    children,
    type = 'button',
    ...buttonProps
  } = props;

  return (
    <button type={type} className={buttonClasses({ variant, size, fullWidth, className })} {...buttonProps}>
      <ButtonContent icon={icon} iconPosition={iconPosition}>
        {children}
      </ButtonContent>
    </button>
  );
}
