import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';
import Button from '../ui/Button';

interface FeedbackBarProps {
  result: 'correct' | 'incorrect' | 'unanswered';
  explanation: string;
  onContinue: () => void;
}

const CORRECT_HEADINGS = ['Bug is proud of you!', 'Nailed it!', 'You got this!', 'Great debug!', 'Flawless!'];
const INCORRECT_HEADINGS = ['Oops! Try again!', 'Keep going!', 'Almost there!', 'Good attempt!'];

const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const FeedbackBar: React.FC<FeedbackBarProps> = ({ result, explanation, onContinue }) => {
  const slideAnim = useRef(new Animated.Value(200)).current;
  const isVisible = result !== 'unanswered';
  const isCorrect = result === 'correct';

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(200);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const heading = isCorrect ? pickRandom(CORRECT_HEADINGS) : pickRandom(INCORRECT_HEADINGS);
  const bgColor = isCorrect ? Colors.successLight : Colors.errorLight;
  const iconColor = isCorrect ? Colors.green : Colors.red;
  const headingColor = isCorrect ? Colors.green : Colors.red;
  const iconName: React.ComponentProps<typeof Ionicons>['name'] = isCorrect
    ? 'checkmark-circle'
    : 'close-circle';

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: bgColor, transform: [{ translateY: slideAnim }] }]}
    >
      <View style={[styles.topAccent, { backgroundColor: iconColor }]} />
      <View style={styles.inner}>
        <View style={styles.headingRow}>
          <Ionicons name={iconName} size={26} color={iconColor} />
          <Text style={[styles.heading, { color: headingColor }]}>{heading}</Text>
        </View>
        {explanation ? (
          <Text style={styles.explanation}>{explanation}</Text>
        ) : null}
        <Button
          label="Continue"
          onPress={onContinue}
          variant={isCorrect ? 'success' : 'danger'}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: Layout.radiusXxl,
    borderTopRightRadius: Layout.radiusXxl,
    overflow: 'hidden',
  },
  topAccent: {
    height: 3,
  },
  inner: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.md,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  heading: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.xl,
  },
  explanation: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    lineHeight: Typography.fontSize.sm * 1.6,
  },
});

export default FeedbackBar;
