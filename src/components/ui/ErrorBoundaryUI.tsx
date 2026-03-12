import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface ErrorBoundaryUIProps {
  onRetry?: () => void;
  message?: string;
}

const ErrorBoundaryUI: React.FC<ErrorBoundaryUIProps> = ({
  onRetry,
  message = 'Something went wrong. Please try again.',
}) => (
  <View style={styles.container}>
    <Text style={styles.icon}>⚠️</Text>
    <Text style={styles.title}>Oops!</Text>
    <Text style={styles.message}>{message}</Text>
    {onRetry && (
      <TouchableOpacity style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>Try Again</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl, gap: Spacing.md },
  icon: { fontSize: 48 },
  title: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes['2xl'] },
  message: { color: Colors.textSecondary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.base, textAlign: 'center' },
  btn: { backgroundColor: Colors.brandRed, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderRadius: 12 },
  btnText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
});

export default ErrorBoundaryUI;
