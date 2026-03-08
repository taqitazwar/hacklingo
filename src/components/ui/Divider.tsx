import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

interface DividerProps {
  color?: string;
  thickness?: number;
  margin?: number;
}

const Divider: React.FC<DividerProps> = ({
  color = Colors.textMuted,
  thickness = 1,
  margin = 16,
}) => {
  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: color + '33',
          height: thickness,
          marginVertical: margin,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});

export default Divider;
