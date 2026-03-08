import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, GameConfig } from '../../constants';

interface HeartsDisplayProps {
  hearts: number;
}

const HeartIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <Text style={[styles.heart, filled ? styles.heartFilled : styles.heartEmpty]}>
    ♥
  </Text>
);

const HeartsDisplay: React.FC<HeartsDisplayProps> = ({ hearts }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: GameConfig.maxHearts }).map((_, index) => (
        <HeartIcon key={index} filled={index < hearts} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
  },
  heart: {
    fontSize: Typography.fontSize.md,
  },
  heartFilled: {
    color: Colors.heart,
  },
  heartEmpty: {
    color: Colors.heartEmpty,
  },
});

export default HeartsDisplay;
