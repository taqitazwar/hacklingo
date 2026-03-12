import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors } from '../../constants';

interface ProgressBarProps {
  progress: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  animated?: boolean;
  borderRadius?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  color = Colors.green,
  backgroundColor = Colors.backgroundTertiary,
  animated = true,
  borderRadius = 4,
}) => {
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const clamped = Math.max(0, Math.min(1, progress));
    if (animated) {
      Animated.spring(width, {
        toValue: clamped,
        useNativeDriver: false,
        tension: 60,
        friction: 10,
      }).start();
    } else {
      width.setValue(clamped);
    }
  }, [progress]);

  return (
    <View style={[styles.track, { height, backgroundColor, borderRadius }]}>
      <Animated.View
        style={[
          styles.fill,
          {
            height,
            backgroundColor: color,
            borderRadius,
            width: width.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: { overflow: 'hidden', width: '100%' },
  fill: {},
});

export default ProgressBar;
