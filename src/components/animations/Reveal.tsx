import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { defaultViewport, fadeUp } from '@/lib/motion';

export interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
  className?: string;
}

/** Fades content upward once, when it scrolls into view. */
export function Reveal({ children, variants = fadeUp, delay = 0, as = 'div', className }: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
