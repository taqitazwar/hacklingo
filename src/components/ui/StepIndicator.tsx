import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants';

interface StepIndicatorProps {
  total: number;
  current: number;
  activeColor?: string;
  inactiveColor?: string;
  size?: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  total,
  current,
  activeColor = Colors.brandRed,
  inactiveColor = Colors.backgroundTertiary,
  size = 8,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              width: i === current ? size * 2.5 : size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: i === current ? activeColor : inactiveColor,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  dot: {},
});

export default StepIndicator;
