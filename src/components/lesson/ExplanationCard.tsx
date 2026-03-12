import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface ExplanationCardProps {
  correct: boolean;
  explanation: string;
  correctAnswer?: string;
  userAnswer?: string;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({ correct, explanation, correctAnswer, userAnswer }) => {
  const color = correct ? Colors.green : Colors.brandRed;
  const bgColor = correct ? Colors.greenLight : Colors.redLight;
  const label = correct ? '✓ Correct!' : '✗ Not quite';

  return (
    <View style={[styles.card, { backgroundColor: bgColor, borderColor: color }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
      {!correct && correctAnswer && (
        <Text style={styles.correct}>Correct answer: <Text style={[styles.answer, { color }]}>{correctAnswer}</Text></Text>
      )}
      <Text style={styles.explanation}>{explanation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  label: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.base,
  },
  correct: {
    color: Colors.textSecondary,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
  },
  answer: {
    fontFamily: Typography.fonts.bold,
  },
  explanation: {
    color: Colors.textSecondary,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
  },
});

export default ExplanationCard;
