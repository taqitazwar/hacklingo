import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface HeatmapCalendarProps {
  data: Record<string, number>;
  weeks?: number;
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function getIntensityColor(value: number, max: number): string {
  if (value === 0) return Colors.backgroundSecondary;
  const ratio = value / max;
  if (ratio < 0.25) return '#1A3A22';
  if (ratio < 0.5) return '#2D5A3B';
  if (ratio < 0.75) return '#3D7A4F';
  return Colors.green;
}

const HeatmapCalendar: React.FC<HeatmapCalendarProps> = ({ data, weeks = 12 }) => {
  const allValues = Object.values(data);
  const maxValue = Math.max(...allValues, 1);

  const cells: { date: string; value: number }[] = [];
  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    cells.push({ date: dateStr, value: data[dateStr] ?? 0 });
  }

  const columns: { date: string; value: number }[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    columns.push(cells.slice(i, i + 7));
  }

  return (
    <View style={styles.container}>
      <View style={styles.dayLabels}>
        {DAYS.map((d, i) => (
          <Text key={i} style={styles.dayLabel}>{d}</Text>
        ))}
      </View>
      <View style={styles.grid}>
        {columns.map((col, ci) => (
          <View key={ci} style={styles.column}>
            {col.map((cell, ri) => (
              <View
                key={ri}
                style={[styles.cell, { backgroundColor: getIntensityColor(cell.value, maxValue) }]}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: Spacing.sm },
  dayLabels: { gap: 3, paddingTop: 2 },
  dayLabel: { color: Colors.textMuted, fontSize: 9, height: 14, textAlign: 'center', fontFamily: Typography.fonts.regular },
  grid: { flexDirection: 'row', gap: 3, flex: 1 },
  column: { gap: 3 },
  cell: { width: 12, height: 12, borderRadius: 2 },
});

export default HeatmapCalendar;
