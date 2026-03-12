import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export function useShake() {
  const position = useRef(new Animated.Value(0)).current;

  const shake = useCallback(() => {
    Animated.sequence([
      Animated.timing(position, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(position, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(position, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(position, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(position, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }, []);

  return { position, shake, style: { transform: [{ translateX: position }] } };
}
