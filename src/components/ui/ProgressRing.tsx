import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../constants';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 80,
  strokeWidth = 8,
  color = Colors.green,
  label,
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const innerSize = size - strokeWidth * 2;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.track, { width: size, height: size, borderRadius: size / 2, borderWidth: strokeWidth, borderColor: Colors.backgroundTertiary }]} />
      <View style={[styles.fill, { width: size, height: size, borderRadius: size / 2, borderWidth: strokeWidth, borderColor: color, opacity: clampedProgress }]} />
      <View style={[styles.inner, { width: innerSize, height: innerSize }]}>
        <Text style={[styles.percent, { color }]}>{Math.round(clampedProgress * 100)}%</Text>
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  track: { position: 'absolute' },
  fill: { position: 'absolute' },
  inner: { justifyContent: 'center', alignItems: 'center' },
  percent: { fontSize: Typography.sizes.sm, fontFamily: Typography.fonts.bold },
  label: { fontSize: 10, color: Colors.textMuted, fontFamily: Typography.fonts.regular },
});

export default ProgressRing;
