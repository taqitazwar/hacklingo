import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface QuestionCounterProps {
  current: number;
  total: number;
}

const QuestionCounter: React.FC<QuestionCounterProps> = ({ current, total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.current}>{current}</Text>
        <Text style={styles.separator}> / </Text>
        <Text style={styles.total}>{total}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
  },
  text: {},
  current: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.base,
  },
  separator: {
    color: Colors.textMuted,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.base,
  },
  total: {
    color: Colors.textMuted,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.base,
  },
});

export default QuestionCounter;
