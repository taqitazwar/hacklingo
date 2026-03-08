import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PredictOutputChallenge as PredictOutputChallengeType } from '../../types';
import Colors from '../../constants/colors';
import { Typography, Spacing } from '../../constants';
import { CodeBlock } from '../ui';
import OptionButton from './OptionButton';

interface Props {
  challenge: PredictOutputChallengeType;
  selectedAnswer: string | null;
  answerResult: 'correct' | 'incorrect' | 'unanswered';
  onSelectAnswer: (answer: string) => void;
}

const PredictOutputChallenge: React.FC<Props> = ({
  challenge, selectedAnswer, answerResult, onSelectAnswer,
}) => {
  const getState = (opt: string) => {
    if (answerResult === 'unanswered') return opt === selectedAnswer ? 'selected' : 'default';
    if (opt === challenge.correctAnswer) return 'correct';
    if (opt === selectedAnswer) return 'incorrect';
    return 'default';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.typeLabel}>PREDICT THE OUTPUT</Text>
      <Text style={styles.instruction}>{challenge.instruction}</Text>
      <CodeBlock code={challenge.code} />
      <View style={styles.options}>
        {challenge.options.map(opt => (
          <OptionButton
            key={opt}
            label={opt}
            state={getState(opt)}
            onPress={() => onSelectAnswer(opt)}
            disabled={answerResult !== 'unanswered'}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: Spacing.md },
  typeLabel: {
    fontFamily: Typography.fontFamily.extraBold,
    fontSize: Typography.fontSize.xs,
    color: Colors.teal,
    letterSpacing: 1,
  },
  instruction: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.xl,
    color: Colors.textPrimary,
    lineHeight: Typography.fontSize.xl * 1.3,
  },
  options: { gap: Spacing.xs, marginTop: Spacing.xs },
});

export default PredictOutputChallenge;
