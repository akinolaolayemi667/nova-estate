import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type TextVariant = 'body-lg' | 'body' | 'small' | 'caption';
export type TextTone = 'default' | 'muted' | 'inverse' | 'inverse-muted';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div';
  variant?: TextVariant;
  tone?: TextTone;
}

const variantClasses: Record<TextVariant, string> = {
  'body-lg': 'text-body-lg font-light',
  body: 'text-body',
  small: 'text-small',
  caption: 'text-caption tracking-[0.02em]',
};

const toneClasses: Record<TextTone, string> = {
  default: 'text-ink',
  muted: 'text-muted',
  inverse: 'text-ivory',
  'inverse-muted': 'text-ivory/70',
};

export function Text({ as: Tag = 'p', variant = 'body', tone = 'default', className, ...props }: TextProps) {
  return <Tag className={cn(variantClasses[variant], toneClasses[tone], className)} {...props} />;
}
