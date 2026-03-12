import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface EmptyListProps {
  icon?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyList: React.FC<EmptyListProps> = ({ icon = '📭', title, message, actionLabel, onAction }) => (
  <View style={styles.container}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.title}>{title}</Text>
    {message && <Text style={styles.message}>{message}</Text>}
    {actionLabel && onAction && (
      <TouchableOpacity style={styles.btn} onPress={onAction}>
        <Text style={styles.btnText}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.md, padding: Spacing.xl },
  icon: { fontSize: 56 },
  title: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.xl, textAlign: 'center' },
  message: { color: Colors.textSecondary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.base, textAlign: 'center' },
  btn: { backgroundColor: Colors.green, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderRadius: 12, marginTop: Spacing.sm },
  btnText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
});

export default EmptyList;
