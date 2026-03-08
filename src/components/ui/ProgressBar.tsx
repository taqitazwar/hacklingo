import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors, Layout } from '../../constants';

interface ProgressBarProps {
  progress: number;
  height?: number;
  trackColor?: string;
  fillColor?: string;
  animationDuration?: number;
}

const DEFAULT_HEIGHT = 8;
const DEFAULT_ANIMATION_DURATION = 350;

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = DEFAULT_HEIGHT,
  trackColor = Colors.borderLight,
  fillColor = Colors.black,
  animationDuration = DEFAULT_ANIMATION_DURATION,
}) => {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const widthAnimation = useRef(new Animated.Value(clampedProgress)).current;

  useEffect(() => {
    Animated.timing(widthAnimation, {
      toValue: clampedProgress,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  }, [clampedProgress, animationDuration]);

  const animatedWidth = widthAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const borderRadius = height / 2;

  return (
    <View style={[styles.track, { height, borderRadius, backgroundColor: trackColor }]}>
      <Animated.View
        style={[
          styles.fill,
          { width: animatedWidth, borderRadius, backgroundColor: fillColor },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});

export default ProgressBar;
