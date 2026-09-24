import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { clipReveal, defaultViewport } from '@/lib/motion';

export interface ClipRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Unveils imagery from the bottom edge — suited to large architectural photography. */
export function ClipReveal({ children, delay = 0, className }: ClipRevealProps) {
  return (
    <motion.div
      className={className}
      variants={clipReveal}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
