import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../constants';

interface NumberBadgeProps {
  count: number;
  max?: number;
  color?: string;
  size?: number;
}

const NumberBadge: React.FC<NumberBadgeProps> = ({ count, max = 99, color = Colors.brandRed, size = 20 }) => {
  if (count <= 0) return null;
  const display = count > max ? `${max}+` : String(count);
  return (
    <View style={[styles.badge, { backgroundColor: color, minWidth: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.text, { fontSize: size * 0.55 }]}>{display}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: Typography.fonts.bold,
  },
});

export default NumberBadge;
