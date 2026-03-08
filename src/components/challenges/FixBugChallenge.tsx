import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FixBugChallenge as FixBugChallengeType } from '../../types';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';
import { CodeBlock } from '../ui';
import OptionButton from './OptionButton';

interface Props {
  challenge: FixBugChallengeType;
  selectedAnswer: string | null;
  answerResult: 'correct' | 'incorrect' | 'unanswered';
  onSelectAnswer: (answer: string) => void;
}

const FixBugChallenge: React.FC<Props> = ({
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
      <Text style={styles.typeLabel}>FIX THE BUG</Text>
      <Text style={styles.instruction}>{challenge.instruction}</Text>
      <View style={styles.bugTag}>
        <Text style={styles.bugTagText}>🐛  Buggy code — line {challenge.bugLineIndex + 1} is highlighted</Text>
      </View>
      <CodeBlock code={challenge.buggyCode} highlightLineIndex={challenge.bugLineIndex} />
      <Text style={styles.pickLabel}>Select the corrected line:</Text>
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
    color: Colors.red,
    letterSpacing: 1,
  },
  instruction: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.xl,
    color: Colors.textPrimary,
    lineHeight: Typography.fontSize.xl * 1.3,
  },
  bugTag: {
    backgroundColor: Colors.redLight,
    borderRadius: Layout.radiusSm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    alignSelf: 'flex-start',
  },
  bugTagText: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.xs,
    color: Colors.redDark,
  },
  pickLabel: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  options: { gap: Spacing.xs },
});

export default FixBugChallenge;
