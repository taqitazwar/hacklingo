import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Reusable animation helpers.
 */
export function useAnimation() {
  const value = useRef(new Animated.Value(0)).current;

  const fadeIn = (duration = 300) =>
    Animated.timing(value, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    });

  const fadeOut = (duration = 300) =>
    Animated.timing(value, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    });

  const pulse = () =>
    Animated.sequence([
      Animated.timing(value, { toValue: 1.1, duration: 150, useNativeDriver: true }),
      Animated.timing(value, { toValue: 1.0, duration: 150, useNativeDriver: true }),
    ]);

  const shake = () =>
    Animated.sequence([
      Animated.timing(value, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(value, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(value, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(value, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(value, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]);

  const springIn = () =>
    Animated.spring(value, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    });

  return { value, fadeIn, fadeOut, pulse, shake, springIn };
}
