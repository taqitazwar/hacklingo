import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface AccuracyGaugeProps {
  correct: number;
  total: number;
}

const AccuracyGauge: React.FC<AccuracyGaugeProps> = ({ correct, total }) => {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const color = pct >= 80 ? Colors.green : pct >= 60 ? Colors.orange : Colors.brandRed;
  const label = pct === 100 ? 'Perfect!' : pct >= 80 ? 'Great!' : pct >= 60 ? 'Good' : 'Keep going!';

  return (
    <View style={styles.container}>
      <Text style={[styles.pct, { color }]}>{pct}%</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.detail}>{correct} / {total} correct</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: Spacing.sm },
  pct: { fontFamily: Typography.fonts.bold, fontSize: Typography.sizes['4xl'] ?? 36 },
  label: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.lg },
  detail: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm },
  track: { width: '100%', height: 8, backgroundColor: Colors.backgroundTertiary, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
});

export default AccuracyGauge;
