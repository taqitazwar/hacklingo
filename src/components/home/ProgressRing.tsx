import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { Typography } from '../../constants';

interface ProgressRingProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

/**
 * A simple View-based progress ring indicator.
 * Uses border radius trick for circular appearance.
 */
const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 80,
  strokeWidth = 6,
  color = Colors.green,
  label,
  sublabel,
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const innerSize = size - strokeWidth * 2;

  return (
    <View style={[styles.outer, { width: size, height: size, borderRadius: size / 2, borderWidth: strokeWidth, borderColor: Colors.backgroundTertiary }]}>
      <View style={[styles.inner, { width: innerSize, height: innerSize, borderRadius: innerSize / 2 }]}>
        {label ? (
          <>
            <Text style={[styles.label, { color }]}>{label}</Text>
            {sublabel ? <Text style={styles.sublabel}>{sublabel}</Text> : null}
          </>
        ) : null}
      </View>
      {/* Progress arc approximation with border hack */}
      <View
        style={[
          styles.progressArc,
          {
            borderColor: color,
            borderWidth: strokeWidth,
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity: clampedProgress,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  inner: {
    backgroundColor: Colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressArc: {
    position: 'absolute',
    borderStyle: 'solid',
  },
  label: {
    fontSize: Typography.size.sm,
    fontWeight: '800',
  },
  sublabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
});

export default ProgressRing;
