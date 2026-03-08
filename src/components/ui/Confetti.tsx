/**
 * Confetti — animated falling particles for celebration screens.
 * Uses only React Native Animated (no external deps).
 */
import React, { useEffect, useRef, useMemo } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const COLORS = [
  '#E03232', // brandRed
  '#4ADE80', // green
  '#FACC15', // yellow
  '#60A5FA', // blue
  '#C084FC', // purple
  '#FB923C', // orange
  '#2DD4BF', // teal
];

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
}

interface ConfettiProps {
  count?: number;
  active?: boolean;
}

const ConfettiParticle: React.FC<{ particle: Particle }> = ({ particle }) => {
  const translateY = useRef(new Animated.Value(-20)).current;
  const opacity    = useRef(new Animated.Value(0)).current;
  const rotate     = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.sequence([
      Animated.delay(particle.delay),
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_H + 30,
          duration: particle.duration,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 1, duration: 100, useNativeDriver: true }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: particle.duration * 0.3,
            delay: particle.duration * 0.6,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(rotate, {
          toValue: particle.rotation,
          duration: particle.duration,
          useNativeDriver: true,
        }),
      ]),
    ]);
    anim.start();
    return () => anim.stop();
  }, []);

  const rotateStr = rotate.interpolate({
    inputRange: [0, 720],
    outputRange: ['0deg', '720deg'],
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: particle.x,
          width: particle.size,
          height: particle.size,
          borderRadius: particle.size * 0.2,
          backgroundColor: particle.color,
          opacity,
          transform: [{ translateY }, { rotate: rotateStr }],
        },
      ]}
    />
  );
};

const Confetti: React.FC<ConfettiProps> = ({ count = 30, active = true }) => {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * SCREEN_W,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 8,
        rotation: 360 + Math.random() * 360,
        delay: Math.random() * 600,
        duration: 1800 + Math.random() * 1000,
      })),
    [count]
  );

  if (!active) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((p) => (
        <ConfettiParticle key={p.id} particle={p} />
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
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    top: -20,
  },
});

export default Confetti;
