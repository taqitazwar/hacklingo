import * as Haptics from 'expo-haptics';

/**
 * Wrapper around expo-haptics for consistent feedback.
 */
export function useHaptics() {
  const lightTap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const mediumTap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const heavyTap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const successFeedback = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const errorFeedback = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const warningFeedback = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  return {
    lightTap,
    mediumTap,
    heavyTap,
    successFeedback,
    errorFeedback,
    warningFeedback,
  };
}
