import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { Typography, Spacing } from '../../constants';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  color?: string;
}

const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  color = Colors.blue,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        selected
          ? { backgroundColor: color, borderColor: color }
          : { backgroundColor: 'transparent', borderColor: color + '66' },
      ]}
    >
      <Text style={[styles.label, { color: selected ? '#fff' : color }]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
  },
});

export default Chip;
