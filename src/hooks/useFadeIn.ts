import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export function useFadeIn(delay = 0, duration = 300) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return opacity;
}
