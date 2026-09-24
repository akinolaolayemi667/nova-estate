import type { Transition, Variants } from 'framer-motion';

/** Long, decelerating curve — movement should feel settled, never bouncy. */
export const easeArchitectural = [0.22, 1, 0.36, 1] as const;

export const durations = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
} as const;

export const baseTransition: Transition = {
  duration: durations.base,
  ease: easeArchitectural,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

/** Reveals content upward from a hard edge, like a blind being raised. */
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: durations.slow, ease: easeArchitectural },
  },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const defaultViewport = { once: true, amount: 0.2 } as const;
