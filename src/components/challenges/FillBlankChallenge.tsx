import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FillBlankChallenge as FillBlankChallengeType } from '../../types';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';
import OptionButton from './OptionButton';

interface Props {
  challenge: FillBlankChallengeType;
  selectedAnswer: string | null;
  answerResult: 'correct' | 'incorrect' | 'unanswered';
  onSelectAnswer: (answer: string) => void;
}

const BLANK_TOKEN = '___';

const splitAtBlank = (code: string) => {
  const i = code.indexOf(BLANK_TOKEN);
  if (i === -1) return { before: code, after: '' };
  return { before: code.slice(0, i), after: code.slice(i + BLANK_TOKEN.length) };
};

const FillBlankChallenge: React.FC<Props> = ({
  challenge, selectedAnswer, answerResult, onSelectAnswer,
}) => {
  const { before, after } = splitAtBlank(challenge.codeWithBlank);
  const isCorrect = answerResult === 'correct';
  const isIncorrect = answerResult === 'incorrect';

  const blankBorderColor = isCorrect ? Colors.green : isIncorrect ? Colors.red : selectedAnswer ? Colors.blue : Colors.borderMedium;
  const blankBg = isCorrect ? Colors.successLight : isIncorrect ? Colors.redLight : selectedAnswer ? Colors.blueLight : Colors.backgroundTertiary;
  const blankTextColor = isCorrect ? Colors.green : isIncorrect ? Colors.red : selectedAnswer ? Colors.blue : Colors.textMuted;

  const getState = (opt: string) => {
    if (answerResult === 'unanswered') return opt === selectedAnswer ? 'selected' : 'default';
    if (opt === challenge.correctAnswer) return 'correct';
    if (opt === selectedAnswer) return 'incorrect';
    return 'default';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.typeLabel}>FILL IN THE BLANK</Text>
      <Text style={styles.instruction}>{challenge.instruction}</Text>

      <View style={styles.codeBox}>
        <View style={styles.codeLine}>
          {before ? <Text style={styles.codeText}>{before}</Text> : null}
          <View style={[styles.blank, { borderColor: blankBorderColor, backgroundColor: blankBg }]}>
            <Text style={[styles.blankText, { color: blankTextColor }]}>
              {selectedAnswer || BLANK_TOKEN}
            </Text>
          </View>
          {after ? <Text style={styles.codeText}>{after}</Text> : null}
        </View>
      </View>

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
    color: Colors.purple,
    letterSpacing: 1,
  },
  instruction: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.xl,
    color: Colors.textPrimary,
    lineHeight: Typography.fontSize.xl * 1.3,
  },
  codeBox: {
    backgroundColor: Colors.codeBackground,
    borderRadius: Layout.radiusMd,
    padding: Spacing.base,
  },
  codeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  codeText: {
    fontFamily: Typography.fontFamily.mono,
    fontSize: Typography.fontSize.md,
    color: Colors.codeText,
  },
  blank: {
    borderBottomWidth: 2.5,
    minWidth: 60,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: 'center',
  },
  blankText: {
    fontFamily: Typography.fontFamily.mono,
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
  },
  options: { gap: Spacing.xs },
});

export default FillBlankChallenge;
