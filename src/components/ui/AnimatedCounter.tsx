import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../constants';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  style?: object;
  color?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  style,
  color = Colors.textPrimary,
}) => {
  const animValue = useRef(new Animated.Value(0)).current;
  const displayValue = useRef(0);

  useEffect(() => {
    Animated.timing(animValue, { toValue: value, duration, useNativeDriver: false }).start();
    animValue.addListener(({ value: v }) => { displayValue.current = Math.round(v); });
    return () => animValue.removeAllListeners();
  }, [value]);

  return (
    <Animated.Text style={[styles.text, { color }, style]}>
      {prefix}{Math.round(value)}{suffix}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: { fontFamily: Typography.fonts.bold, fontSize: 32 },
});

export default AnimatedCounter;
