/**
 * Centralized theme configuration.
 */

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  round: 999,
} as const;

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export const Animation = {
  fast: 150,
  normal: 300,
  slow: 500,
  spring: {
    tension: 100,
    friction: 8,
  },
} as const;

export const ZIndex = {
  base: 0,
  overlay: 10,
  modal: 20,
  toast: 30,
} as const;
