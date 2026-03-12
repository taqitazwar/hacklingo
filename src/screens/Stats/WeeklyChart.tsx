import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface DayData {
  day: string;
  xp: number;
  minutesPracticed: number;
}

interface WeeklyChartProps {
  data: DayData[];
  metric: 'xp' | 'minutes';
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ data, metric }) => {
  const maxValue = Math.max(...data.map(d => metric === 'xp' ? d.xp : d.minutesPracticed), 1);

  return (
    <View style={styles.container}>
      <View style={styles.bars}>
        {data.map((d, i) => {
          const value = metric === 'xp' ? d.xp : d.minutesPracticed;
          const height = Math.max(4, (value / maxValue) * 120);
          return (
            <View key={i} style={styles.barGroup}>
              <Text style={styles.value}>{value > 0 ? (metric === 'xp' ? value : `${value}m`) : ''}</Text>
              <View style={[styles.bar, { height }]} />
              <Text style={styles.dayLabel}>{d.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: Spacing.md },
  bars: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 160 },
  barGroup: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 4 },
  value: { color: Colors.textMuted, fontSize: 9, fontFamily: Typography.fonts.regular },
  bar: {
    width: 24,
    backgroundColor: Colors.green,
    borderRadius: 4,
    opacity: 0.85,
  },
  dayLabel: {
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
    fontFamily: Typography.fonts.medium,
  },
});

export default WeeklyChart;
