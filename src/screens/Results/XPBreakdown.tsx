import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface XPItem {
  label: string;
  xp: number;
  icon: string;
}

interface XPBreakdownProps {
  items: XPItem[];
  total: number;
}

const XPBreakdown: React.FC<XPBreakdownProps> = ({ items, total }) => (
  <View style={styles.container}>
    <Text style={styles.heading}>XP Breakdown</Text>
    {items.map((item, i) => (
      <View key={i} style={styles.row}>
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.xp}>+{item.xp}</Text>
      </View>
    ))}
    <View style={styles.divider} />
    <View style={styles.totalRow}>
      <Text style={styles.totalLabel}>Total XP</Text>
      <Text style={styles.total}>+{total}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.backgroundSecondary, borderRadius: 16, padding: Spacing.lg, gap: Spacing.sm },
  heading: { color: Colors.textMuted, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.xs, textTransform: 'uppercase', letterSpacing: 1, marginBottom: Spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  icon: { fontSize: 18, width: 28 },
  label: { flex: 1, color: Colors.textSecondary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.base },
  xp: { color: Colors.green, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  divider: { height: 1, backgroundColor: Colors.backgroundTertiary },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.lg },
  total: { color: Colors.green, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.xl },
});

export default XPBreakdown;
