import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Layout } from '../../constants';

interface XPBadgeProps {
  xp: number;
  size?: 'small' | 'medium' | 'large';
}

const XPBadge: React.FC<XPBadgeProps> = ({ xp, size = 'medium' }) => {
  return (
    <View style={[styles.badge, styles[size]]}>
      <Text style={[styles.label, styles[`${size}Text`]]}>⚡ {xp} XP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: Colors.yellowLight,
    borderRadius: Layout.radiusFull,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.yellow,
  },
  small: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
  },
  medium: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  large: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  label: {
    color: Colors.xpGold,
    fontWeight: Typography.fontWeight.bold,
  },
  smallText: {
    fontSize: Typography.fontSize.xs,
  },
  mediumText: {
    fontSize: Typography.fontSize.sm,
  },
  largeText: {
    fontSize: Typography.fontSize.md,
  },
});

export default XPBadge;
