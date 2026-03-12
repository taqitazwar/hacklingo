import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface StreakAlertProps {
  streak: number;
  visible: boolean;
}

const StreakAlert: React.FC<StreakAlertProps> = ({ streak, visible }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(opacity, { toValue: 1, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: -20, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <Text style={styles.emoji}>🔥</Text>
      <Text style={styles.text}>{streak} day streak!</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.orange,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 24,
    alignSelf: 'center',
    gap: Spacing.sm,
    position: 'absolute',
    top: 60,
    zIndex: 100,
  },
  emoji: { fontSize: 20 },
  text: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
});

export default StreakAlert;
