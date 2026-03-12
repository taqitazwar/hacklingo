import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants';

interface PulsingDotProps {
  color?: string;
  size?: number;
  active?: boolean;
}

const PulsingDot: React.FC<PulsingDotProps> = ({ color = Colors.green, size = 12, active = true }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) return;
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.6, duration: 600, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: 600, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0.3, duration: 600, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, [active]);

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View
        style={[
          styles.dot,
          { backgroundColor: color, width: size, height: size, borderRadius: size / 2, transform: [{ scale }], opacity },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dot: { position: 'absolute' },
});

export default PulsingDot;
