export const ANIMATION_CONFIG = {
  SPRING_FAST: {
    tension: 300,
    friction: 20,
    useNativeDriver: true,
  },
  SPRING_BOUNCY: {
    tension: 200,
    friction: 10,
    useNativeDriver: true,
  },
  SPRING_SLOW: {
    tension: 100,
    friction: 25,
    useNativeDriver: true,
  },
  TIMING_FAST: {
    duration: 150,
    useNativeDriver: true,
  },
  TIMING_NORMAL: {
    duration: 300,
    useNativeDriver: true,
  },
  TIMING_SLOW: {
    duration: 500,
    useNativeDriver: true,
  },
  FADE_IN_DURATION: 200,
  SLIDE_DURATION: 250,
  BOUNCE_HEIGHT: -12,
} as const;
