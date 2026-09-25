import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { defaultViewport, revealVariants, type RevealVariant } from '@/lib/motion';

export interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'figure';
  className?: string;
}

/** Animates content once as it scrolls into view: fade, fade-up or subtle scale. */
export function Reveal({ children, variant = 'fade-up', delay = 0, as = 'div', className }: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={revealVariants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
