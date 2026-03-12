import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const COLORS = [Colors.green, Colors.brandRed, Colors.blue, Colors.yellow, Colors.orange];
const PARTICLE_COUNT = 30;

interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  rotation: Animated.Value;
  color: string;
  size: number;
}

interface ConfettiViewProps {
  active: boolean;
}

const ConfettiView: React.FC<ConfettiViewProps> = ({ active }) => {
  const particles = useRef<Particle[]>(
    Array.from({ length: PARTICLE_COUNT }, () => ({
      x: new Animated.Value(Math.random() * SCREEN_WIDTH),
      y: new Animated.Value(-20),
      opacity: new Animated.Value(1),
      rotation: new Animated.Value(0),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 8 + 6,
    }))
  ).current;

  useEffect(() => {
    if (!active) return;
    particles.forEach((p, i) => {
      p.x.setValue(Math.random() * SCREEN_WIDTH);
      p.y.setValue(-20);
      p.opacity.setValue(1);
      p.rotation.setValue(0);
      Animated.parallel([
        Animated.timing(p.y, {
          toValue: SCREEN_HEIGHT + 20,
          duration: 2000 + Math.random() * 1000,
          delay: i * 50,
          useNativeDriver: true,
        }),
        Animated.timing(p.opacity, {
          toValue: 0,
          duration: 2500,
          delay: i * 50,
          useNativeDriver: true,
        }),
        Animated.timing(p.rotation, {
          toValue: 360 * (Math.random() > 0.5 ? 1 : -1),
          duration: 2000,
          delay: i * 50,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [active]);

  if (!active) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              backgroundColor: p.color,
              width: p.size,
              height: p.size,
              transform: [
                { translateX: p.x },
                { translateY: p.y },
                { rotate: p.rotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) },
              ],
              opacity: p.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  particle: {
    position: 'absolute',
    borderRadius: 2,
  },
});

export default ConfettiView;
