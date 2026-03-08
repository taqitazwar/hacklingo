/**
 * Duolingo-style option card.
 * Default: white card with gray border.
 * Selected: blue border + light blue tint.
 * Correct: green border + light green tint.
 * Incorrect: red border + light red tint.
 * Has a 3D shadow layer at bottom (matches Duolingo's card depth).
 */
import React, { useRef } from 'react';
import { Pressable, Text, View, StyleSheet, Animated } from 'react-native';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';

type OptionState = 'default' | 'selected' | 'correct' | 'incorrect';

interface OptionButtonProps {
  label: string;
  state: OptionState;
  onPress: () => void;
  disabled?: boolean;
}

const stateConfig: Record<
  OptionState,
  { border: string; background: string; text: string; shadow: string }
> = {
  default:   { border: Colors.borderMedium,  background: Colors.backgroundSecondary, text: Colors.textPrimary, shadow: Colors.borderLight },
  selected:  { border: Colors.blue,          background: Colors.blueLight,           text: Colors.blue,        shadow: Colors.blueDark },
  correct:   { border: Colors.green,         background: Colors.successLight,        text: Colors.green,       shadow: Colors.greenDark },
  incorrect: { border: Colors.red,           background: Colors.errorLight,          text: Colors.red,         shadow: Colors.redDark },
};

const DEPTH = 3;
const PRESS_DURATION = 60;

const OptionButton: React.FC<OptionButtonProps> = ({ label, state, onPress, disabled = false }) => {
  const depthAnim = useRef(new Animated.Value(0)).current;

  const pressIn = () => {
    if (disabled) return;
    Animated.timing(depthAnim, { toValue: DEPTH, duration: PRESS_DURATION, useNativeDriver: true }).start();
  };
  const pressOut = () => {
    if (disabled) return;
    Animated.timing(depthAnim, { toValue: 0, duration: PRESS_DURATION, useNativeDriver: true }).start();
    onPress();
  };

  const { border, background, text, shadow } = stateConfig[state];

  return (
    <Pressable
      onPressIn={pressIn}
      onPressOut={pressOut}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={[styles.wrapper, { height: Layout.buttonHeightSmall + DEPTH }]}>
        {/* Shadow layer */}
        <View style={[styles.shadowLayer, { backgroundColor: shadow, borderColor: shadow }]} />
        {/* Surface */}
        <Animated.View
          style={[
            styles.surface,
            { borderColor: border, backgroundColor: background, transform: [{ translateY: depthAnim }] },
          ]}
        >
          <Text style={[styles.label, { color: text }]} numberOfLines={2}>{label}</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  shadowLayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Layout.buttonHeightSmall,
    borderRadius: Layout.radiusMd,
    borderWidth: 2,
  },
  surface: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Layout.buttonHeightSmall,
    borderRadius: Layout.radiusMd,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
  },
  label: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
  },
});

export default OptionButton;
