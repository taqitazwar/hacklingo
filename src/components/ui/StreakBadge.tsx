import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { Typography } from '../../constants';

interface StreakBadgeProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
}

const StreakBadge: React.FC<StreakBadgeProps> = ({ streak, size = 'md' }) => {
  const iconSize = size === 'lg' ? 22 : size === 'sm' ? 14 : 18;
  const fontSize = size === 'lg' ? Typography.size.lg : size === 'sm' ? 12 : Typography.size.md;

  return (
    <View style={[styles.container, size === 'sm' && styles.small]}>
      <Ionicons name="flame" size={iconSize} color={Colors.orange} />
      <Text style={[styles.text, { fontSize }]}>{streak}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.orange + '1A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  small: {
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  text: {
    color: Colors.orange,
    fontWeight: '700',
  },
});

export default StreakBadge;
