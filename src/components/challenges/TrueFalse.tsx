import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface TrueFalseProps {
  question: string;
  correctAnswer: boolean;
  explanation: string;
  onAnswer: (correct: boolean) => void;
}

const TrueFalse: React.FC<TrueFalseProps> = ({ question, correctAnswer, explanation, onAnswer }) => {
  const [selected, setSelected] = useState<boolean | null>(null);
  const answered = selected !== null;

  const handlePress = (choice: boolean) => {
    if (answered) return;
    setSelected(choice);
    onAnswer(choice === correctAnswer);
  };

  const getBgColor = (choice: boolean) => {
    if (!answered || selected !== choice) return Colors.backgroundSecondary;
    return choice === correctAnswer ? Colors.greenLight : Colors.redLight;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.buttons}>
        {([true, false] as const).map(choice => (
          <TouchableOpacity
            key={String(choice)}
            style={[styles.btn, { backgroundColor: getBgColor(choice) }]}
            onPress={() => handlePress(choice)}
          >
            <Text style={styles.btnText}>{choice ? 'True' : 'False'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {answered && <Text style={styles.explanation}>{explanation}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: Spacing.lg },
  question: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.lg,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  buttons: { flexDirection: 'row', gap: Spacing.md },
  btn: {
    flex: 1,
    paddingVertical: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.base,
  },
  explanation: {
    color: Colors.textSecondary,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    marginTop: Spacing.lg,
    textAlign: 'center',
  },
});

export default TrueFalse;
