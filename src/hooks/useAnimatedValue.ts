import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export function useAnimatedValue(initialValue: number) {
  const value = useRef(new Animated.Value(initialValue)).current;

  const animateTo = useCallback((
    toValue: number,
    config: { duration?: number; tension?: number; friction?: number; type?: 'spring' | 'timing' } = {}
  ) => {
    const { type = 'spring', duration = 300, tension = 100, friction = 10 } = config;
    const animation = type === 'spring'
      ? Animated.spring(value, { toValue, tension, friction, useNativeDriver: true })
      : Animated.timing(value, { toValue, duration, useNativeDriver: true });
    return new Promise<void>(resolve => animation.start(() => resolve()));
  }, [value]);

  return { value, animateTo };
}
