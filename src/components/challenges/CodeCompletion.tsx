import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface CodeCompletionProps {
  question: string;
  codePrefix: string;
  codeSuffix: string;
  correctAnswer: string;
  explanation: string;
  onAnswer: (correct: boolean) => void;
}

const CodeCompletion: React.FC<CodeCompletionProps> = ({
  question, codePrefix, codeSuffix, correctAnswer, explanation, onAnswer
}) => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const correct = input.trim() === correctAnswer.trim();

  const handleSubmit = () => {
    setSubmitted(true);
    onAnswer(correct);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.codeBlock}>
        <Text style={styles.code}>{codePrefix}</Text>
        <TextInput
          style={[styles.input, submitted && { color: correct ? Colors.green : Colors.brandRed }]}
          value={input}
          onChangeText={setInput}
          editable={!submitted}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.code}>{codeSuffix}</Text>
      </View>
      {!submitted && (
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Check</Text>
        </TouchableOpacity>
      )}
      {submitted && <Text style={styles.explanation}>{explanation}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: Spacing.lg },
  question: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.base,
    marginBottom: Spacing.lg,
  },
  codeBlock: {
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 8,
    padding: Spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  code: {
    color: Colors.textSecondary,
    fontFamily: 'monospace',
    fontSize: Typography.sizes.sm,
  },
  input: {
    color: Colors.green,
    fontFamily: 'monospace',
    fontSize: Typography.sizes.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.green,
    minWidth: 60,
    paddingHorizontal: 4,
  },
  btn: {
    backgroundColor: Colors.green,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  btnText: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.base,
  },
  explanation: {
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});

export default CodeCompletion;
