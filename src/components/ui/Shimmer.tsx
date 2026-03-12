import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants';

interface ShimmerProps {
  width: number | string;
  height: number;
  borderRadius?: number;
}

const Shimmer: React.FC<ShimmerProps> = ({ width, height, borderRadius = 8 }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.6] });

  return <Animated.View style={{ width, height, borderRadius, backgroundColor: Colors.backgroundTertiary, opacity }} />;
};

export default Shimmer;
