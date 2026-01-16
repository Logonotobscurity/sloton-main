/**
 * Animation Variants
 * Centralized animation configurations for consistent motion design across the application
 * Uses Framer Motion variant syntax
 */

import type { Variants } from 'framer-motion';

/**
 * Standard animation durations (in seconds)
 */
export const AnimationDuration = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 0.8,
} as const;

/**
 * Standard animation delays (in seconds)
 */
export const AnimationDelay = {
  NONE: 0,
  SHORT: 0.1,
  MEDIUM: 0.2,
  LONG: 0.3,
} as const;

/**
 * Standard easing functions
 */
export const AnimationEasing = {
  EASE_IN_OUT: [0.4, 0, 0.2, 1],
  EASE_OUT: [0, 0, 0.2, 1],
  EASE_IN: [0.4, 0, 1, 1],
  LINEAR: [0, 0, 1, 1],
  SPRING: { type: 'spring' as const, stiffness: 100, damping: 10 },
  SMOOTH_SPRING: { type: 'spring' as const, stiffness: 50, damping: 20 },
} as const;

/**
 * Fade in animation
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: AnimationDuration.NORMAL,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Fade in with delay
 */
export const fadeInWithDelay = (delay: number = AnimationDelay.SHORT): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: AnimationDuration.NORMAL,
      delay,
      ease: AnimationEasing.EASE_OUT,
    },
  },
});

/**
 * Fade in from bottom
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: AnimationDuration.NORMAL,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Fade in from top
 */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: AnimationDuration.NORMAL,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Fade in from left
 */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: AnimationDuration.NORMAL,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Fade in from right
 */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: AnimationDuration.NORMAL,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Scale in animation
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: AnimationDuration.NORMAL,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Scale in with spring
 */
export const scaleInSpring: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: AnimationDuration.SLOW,
      ...AnimationEasing.SMOOTH_SPRING,
    },
  },
};

/**
 * Stagger children animation
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Stagger children with custom delay
 */
export const staggerContainerCustom = (
  staggerDelay: number = 0.1,
  delayChildren: number = 0.2
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/**
 * Stagger item (child of stagger container)
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: AnimationDuration.NORMAL,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Slide in from bottom
 */
export const slideInUp: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      duration: AnimationDuration.SLOW,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Slide in from top
 */
export const slideInDown: Variants = {
  hidden: { y: '-100%' },
  visible: {
    y: 0,
    transition: {
      duration: AnimationDuration.SLOW,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: {
      duration: AnimationDuration.SLOW,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      duration: AnimationDuration.SLOW,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Rotate in animation
 */
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: AnimationDuration.SLOW,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Blur in animation
 */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: AnimationDuration.SLOW,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Hover scale animation
 */
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: AnimationDuration.FAST,
    ease: AnimationEasing.EASE_OUT,
  },
};

/**
 * Hover lift animation (scale + shadow)
 */
export const hoverLift = {
  scale: 1.02,
  y: -5,
  transition: {
    duration: AnimationDuration.FAST,
    ease: AnimationEasing.EASE_OUT,
  },
};

/**
 * Tap scale animation
 */
export const tapScale = {
  scale: 0.95,
  transition: {
    duration: AnimationDuration.FAST,
    ease: AnimationEasing.EASE_IN_OUT,
  },
};

/**
 * Card hover animation
 */
export const cardHover: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: AnimationDuration.FAST,
      ease: AnimationEasing.EASE_IN_OUT,
    },
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: AnimationDuration.FAST,
      ease: AnimationEasing.EASE_OUT,
    },
  },
};

/**
 * Page transition animation
 */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: AnimationDuration.NORMAL,
      ease: AnimationEasing.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: AnimationDuration.FAST,
      ease: AnimationEasing.EASE_IN,
    },
  },
};

/**
 * Modal animation
 */
export const modalAnimation: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: AnimationDuration.NORMAL,
      ease: AnimationEasing.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: AnimationDuration.FAST,
      ease: AnimationEasing.EASE_IN,
    },
  },
};

/**
 * Backdrop animation
 */
export const backdropAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: AnimationDuration.FAST,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: AnimationDuration.FAST,
    },
  },
};

/**
 * Pulse animation (for loading states)
 */
export const pulse: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: AnimationEasing.EASE_IN_OUT,
    },
  },
};

/**
 * Bounce animation
 */
export const bounce: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: AnimationEasing.EASE_IN_OUT,
    },
  },
};

/**
 * Spin animation
 */
export const spin: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Create custom fade in with specific parameters
 */
export const createFadeIn = (
  duration: number = AnimationDuration.NORMAL,
  delay: number = 0,
  y: number = 0,
  x: number = 0
): Variants => ({
  hidden: { opacity: 0, y, x },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration,
      delay,
      ease: AnimationEasing.EASE_OUT,
    },
  },
});

/**
 * Create custom scale animation
 */
export const createScaleAnimation = (
  from: number = 0.8,
  to: number = 1,
  duration: number = AnimationDuration.NORMAL
): Variants => ({
  hidden: { opacity: 0, scale: from },
  visible: {
    opacity: 1,
    scale: to,
    transition: {
      duration,
      ease: AnimationEasing.EASE_OUT,
    },
  },
});
