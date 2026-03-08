/**
 * Duolingo-style 3D button.
 * The surface sits on top of a darker shadow layer. Pressing moves the surface
 * down by the depth amount, giving a satisfying "press into the screen" feel.
 */
import React, { useRef } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors from '../../constants/colors';
import { Typography, Layout } from '../../constants';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

const DEPTH = Layout.buttonDepth;
const PRESS_DURATION = 80;

const variantConfig: Record<
  ButtonVariant,
  { surface: string; shadow: string; text: string }
> = {
  primary:   { surface: Colors.green,               shadow: Colors.greenDark,  text: Colors.white },
  secondary: { surface: Colors.backgroundSecondary, shadow: Colors.borderMedium, text: Colors.textPrimary },
  success:   { surface: Colors.green,               shadow: Colors.greenDark,  text: Colors.white },
  danger:    { surface: Colors.red,                 shadow: Colors.redDark,    text: Colors.white },
  ghost:     { surface: Colors.transparent,         shadow: Colors.transparent, text: Colors.green },
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
  textStyle,
  testID,
}) => {
  const depthAnim = useRef(new Animated.Value(0)).current;

  const pressIn = () => {
    Animated.timing(depthAnim, {
      toValue: DEPTH,
      duration: PRESS_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.timing(depthAnim, {
      toValue: 0,
      duration: PRESS_DURATION,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  const { surface, shadow, text } = variantConfig[variant];

  if (disabled || loading) {
    return (
      <View style={[styles.wrapper, fullWidth && styles.fullWidth, style]}>
        <View style={[styles.shadowLayer, { backgroundColor: Colors.borderMedium }]} />
        <View style={[styles.surfaceLayer, styles.disabledSurface]}>
          {loading
            ? <ActivityIndicator color={Colors.textMuted} size="small" />
            : <Text style={[styles.label, { color: Colors.textMuted }, textStyle]}>{label}</Text>
          }
        </View>
      </View>
    );
  }

  return (
    <Pressable
      onPressIn={pressIn}
      onPressOut={pressOut}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={fullWidth && styles.fullWidth}
    >
      <View style={[styles.wrapper, style]}>
        {/* Shadow layer — always at the bottom */}
        <View style={[styles.shadowLayer, { backgroundColor: shadow }]} />
        {/* Surface layer — moves down on press */}
        <Animated.View
          style={[
            styles.surfaceLayer,
            { backgroundColor: surface, transform: [{ translateY: depthAnim }] },
          ]}
        >
          <Text style={[styles.label, { color: text }, textStyle]}>{label}</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  wrapper: {
    height: Layout.buttonHeight + DEPTH,
    position: 'relative',
  },
  shadowLayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Layout.buttonHeight,
    borderRadius: Layout.radiusXl,
  },
  surfaceLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Layout.buttonHeight,
    borderRadius: Layout.radiusXl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSurface: {
    backgroundColor: Colors.backgroundTertiary,
  },
  label: {
    fontFamily: Typography.fontFamily.extraBold,
    fontSize: Typography.fontSize.base,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

export default Button;
