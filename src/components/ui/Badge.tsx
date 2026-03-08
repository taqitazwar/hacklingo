import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { Typography } from '../../constants';

interface BadgeProps {
  label: string;
  color?: string;
  size?: 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({
  label,
  color = Colors.brandRed,
  size = 'md',
}) => {
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color + '22', borderColor: color + '44' },
        isSmall && styles.small,
      ]}
    >
      <Text
        style={[
          styles.label,
          { color },
          isSmall && styles.labelSmall,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  small: {
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  label: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
  },
  labelSmall: {
    fontSize: 10,
  },
});

export default Badge;
