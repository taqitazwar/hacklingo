import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface ScoreDisplayProps {
  score: number;
  total?: number;
  label?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, total, label, color = Colors.green, size = 'md' }) => {
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, tension: 200, friction: 12, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  const fontSize = size === 'lg' ? 48 : size === 'md' ? 36 : 24;

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }], opacity }]}>
      <Text style={[styles.score, { color, fontSize }]}>
        {score}{total !== undefined && <Text style={styles.total}>/{total}</Text>}
      </Text>
      {label && <Text style={styles.label}>{label}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  score: { fontFamily: Typography.fonts.bold },
  total: { fontSize: 24, color: Colors.textMuted },
  label: {
    color: Colors.textSecondary,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    marginTop: Spacing.xs,
  },
});

export default ScoreDisplay;
