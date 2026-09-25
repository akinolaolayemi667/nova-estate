import type { Transition, Variants } from 'framer-motion';

/** Long, decelerating curve — movement should feel settled, never bouncy. */
export const easeArchitectural = [0.22, 1, 0.36, 1] as const;
export const easeSettle = [0.65, 0, 0.35, 1] as const;

export const durations = {
  fast: 0.4,
  base: 0.9,
  slow: 1.4,
} as const;

export const baseTransition: Transition = {
  duration: durations.base,
  ease: easeArchitectural,
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.slow, ease: easeArchitectural } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: durations.slow, ease: easeArchitectural } },
};

/** Frame is unveiled from the bottom edge while the photograph settles from a slight zoom. */
export const imageRevealFrame: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: durations.slow, ease: easeSettle },
  },
};

export const imageRevealContent: Variants = {
  hidden: { scale: 1.12 },
  visible: { scale: 1, transition: { duration: durations.slow + 0.4, ease: easeArchitectural } },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const revealVariants = {
  fade,
  'fade-up': fadeUp,
  scale: scaleIn,
} as const;

export type RevealVariant = keyof typeof revealVariants;

export const defaultViewport = { once: true, amount: 0.2 } as const;
