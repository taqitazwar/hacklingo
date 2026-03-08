/**
 * Bug — Hacklingo's ladybug mascot.
 * Uses the illustrated PNG asset with mood-driven Animated transforms.
 *
 * Sizes: sm | md | lg
 * Moods: idle | happy | celebrating | sad | encouraging | thinking | waving | reading
 */
import React, { useEffect, useRef, useCallback } from 'react';
import { Image, StyleSheet, Animated } from 'react-native';

// ─── Types ───────────────────────────────────────────────────────────────────

export type BugMood =
  | 'idle'
  | 'happy'
  | 'celebrating'
  | 'sad'
  | 'encouraging'
  | 'thinking'
  | 'waving'
  | 'reading';

export type BugSize = 'sm' | 'md' | 'lg';

interface BugProps {
  mood?: BugMood;
  size?: BugSize;
}

// ─── Size map ────────────────────────────────────────────────────────────────

const SIZE_PX: Record<BugSize, number> = {
  sm: 80,
  md: 120,
  lg: 180,
};

// ─── Mascot image ────────────────────────────────────────────────────────────

const BUG_IMAGE = require('../../../assets/bug-mascot.png');

// ─── Main component ──────────────────────────────────────────────────────────

const Bug: React.FC<BugProps> = ({ mood = 'idle', size = 'md' }) => {
  const px = SIZE_PX[size];

  const bodyY   = useRef(new Animated.Value(0)).current;
  const bodyRot = useRef(new Animated.Value(0)).current;
  const scale   = useRef(new Animated.Value(1)).current;

  const stopAll = useCallback(() => {
    bodyY.stopAnimation();
    bodyRot.stopAnimation();
    scale.stopAnimation();
    bodyY.setValue(0);
    bodyRot.setValue(0);
    scale.setValue(1);
  }, [bodyY, bodyRot, scale]);

  useEffect(() => {
    stopAll();

    switch (mood) {
      case 'idle':
        Animated.loop(
          Animated.sequence([
            Animated.timing(bodyY, { toValue: -6, duration: 1400, useNativeDriver: true }),
            Animated.timing(bodyY, { toValue: 0,  duration: 1400, useNativeDriver: true }),
          ])
        ).start();
        break;

      case 'happy':
      case 'encouraging':
        Animated.loop(
          Animated.sequence([
            Animated.spring(bodyY, { toValue: -12, tension: 80, friction: 5, useNativeDriver: true }),
            Animated.spring(bodyY, { toValue: 0,   tension: 80, friction: 5, useNativeDriver: true }),
          ])
        ).start();
        break;

      case 'celebrating':
        Animated.loop(
          Animated.sequence([
            Animated.spring(bodyY,   { toValue: -24, tension: 120, friction: 5, useNativeDriver: true }),
            Animated.spring(bodyY,   { toValue: 0,   tension: 120, friction: 5, useNativeDriver: true }),
          ])
        ).start();
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale, { toValue: 1.08, duration: 200, useNativeDriver: true }),
            Animated.timing(scale, { toValue: 1,    duration: 200, useNativeDriver: true }),
          ])
        ).start();
        break;

      case 'sad':
        Animated.spring(bodyY, { toValue: 6, tension: 40, friction: 10, useNativeDriver: true }).start();
        break;

      case 'thinking':
        Animated.loop(
          Animated.sequence([
            Animated.timing(bodyRot, { toValue: -5, duration: 900, useNativeDriver: true }),
            Animated.timing(bodyRot, { toValue:  5, duration: 900, useNativeDriver: true }),
          ])
        ).start();
        break;

      case 'waving':
        Animated.loop(
          Animated.sequence([
            Animated.timing(bodyRot, { toValue: -12, duration: 350, useNativeDriver: true }),
            Animated.timing(bodyRot, { toValue:  12, duration: 350, useNativeDriver: true }),
          ])
        ).start();
        break;

      case 'reading':
        Animated.loop(
          Animated.sequence([
            Animated.timing(bodyY, { toValue: -3, duration: 2000, useNativeDriver: true }),
            Animated.timing(bodyY, { toValue:  0, duration: 2000, useNativeDriver: true }),
          ])
        ).start();
        break;
    }
  }, [mood]);

  const rotateStr = bodyRot.interpolate({
    inputRange: [-20, 20],
    outputRange: ['-20deg', '20deg'],
  });

  return (
    <Animated.Image
      source={BUG_IMAGE}
      style={[
        styles.image,
        {
          width: px,
          height: px,
          transform: [
            { translateY: bodyY },
            { rotate: rotateStr },
            { scale },
          ],
        },
      ]}
      resizeMode="contain"
    />
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  image: {
    // Image component handles its own sizing via width/height props above
  },
});

export default Bug;
