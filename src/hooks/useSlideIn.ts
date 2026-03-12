import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

type Direction = 'left' | 'right' | 'up' | 'down';

export function useSlideIn(direction: Direction = 'up', offset = 30, delay = 0) {
  const translateX = useRef(new Animated.Value(direction === 'left' ? -offset : direction === 'right' ? offset : 0)).current;
  const translateY = useRef(new Animated.Value(direction === 'up' ? offset : direction === 'down' ? -offset : 0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, { toValue: 0, tension: 80, friction: 12, delay, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, tension: 80, friction: 12, delay, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 200, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return { style: { transform: [{ translateX }, { translateY }], opacity } };
}
