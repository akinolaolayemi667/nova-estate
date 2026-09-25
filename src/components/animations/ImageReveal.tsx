import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { defaultViewport, imageRevealContent, imageRevealFrame } from '@/lib/motion';

export interface ImageRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Unveils large photography from the bottom edge while the image settles from a slight zoom.
 * Falls back to a simple fade when the user prefers reduced motion.
 */
export function ImageReveal({ children, delay = 0, className }: ImageRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      variants={imageRevealFrame}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      transition={delay ? { delay } : undefined}
    >
      <motion.div variants={imageRevealContent} className="size-full">
        {children}
      </motion.div>
    </motion.div>
  );
}
