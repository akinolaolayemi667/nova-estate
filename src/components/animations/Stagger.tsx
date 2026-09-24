import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { defaultViewport, fadeUp, staggerContainer } from '@/lib/motion';

export interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  as?: 'div' | 'ul' | 'ol';
  className?: string;
}

/** Orchestrates `StaggerItem` children so they enter in sequence. */
export function Stagger({ children, stagger = 0.1, delay = 0, as = 'div', className }: StaggerProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {children}
    </MotionTag>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  as?: 'div' | 'li' | 'article';
  className?: string;
}

export function StaggerItem({ children, as = 'div', className }: StaggerItemProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
