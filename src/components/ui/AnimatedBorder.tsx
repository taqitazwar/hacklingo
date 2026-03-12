import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants';

interface AnimatedBorderProps {
  children: React.ReactNode;
  active?: boolean;
  color?: string;
  borderRadius?: number;
}

const AnimatedBorder: React.FC<AnimatedBorderProps> = ({ children, active, color = Colors.green, borderRadius = 12 }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.4, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      opacity.setValue(0);
    }
  }, [active]);

  return (
    <View style={{ borderRadius }}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { borderRadius, borderWidth: 2, borderColor: color, opacity }]} />
      {children}
    </View>
  );
};

export default AnimatedBorder;
