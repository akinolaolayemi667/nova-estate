import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
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

  const trigger: Variants = { hidden: {}, visible: { transition: { delayChildren: delay } } };

  // The viewport trigger must sit outside the clipped frame: a fully clipped element never intersects.
  return (
    <motion.div className={className} variants={trigger} initial="hidden" whileInView="visible" viewport={defaultViewport}>
      <motion.div variants={imageRevealFrame} className="size-full overflow-hidden">
        <motion.div variants={imageRevealContent} className="size-full">
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
