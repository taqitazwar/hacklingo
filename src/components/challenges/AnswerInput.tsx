import React, { useRef, useEffect } from 'react';
import { TextInput, StyleSheet, Animated } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface AnswerInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  submitted?: boolean;
  correct?: boolean;
  autoFocus?: boolean;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Type your answer...',
  submitted,
  correct,
  autoFocus,
}) => {
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (submitted && !correct) {
      Animated.sequence([
        Animated.timing(shake, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 6, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
    }
  }, [submitted]);

  const borderColor = submitted
    ? correct ? Colors.green : Colors.brandRed
    : Colors.backgroundTertiary;

  return (
    <Animated.View style={{ transform: [{ translateX: shake }] }}>
      <TextInput
        style={[styles.input, { borderColor }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        editable={!submitted}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.base,
  },
});

export default AnswerInput;
