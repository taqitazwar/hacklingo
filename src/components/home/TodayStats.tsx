import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface TodayStatsProps {
  xpToday: number;
  minutesToday: number;
  lessonsToday: number;
  accuracyToday: number;
}

const TodayStats: React.FC<TodayStatsProps> = ({ xpToday, minutesToday, lessonsToday, accuracyToday }) => {
  const stats = [
    { label: 'XP', value: xpToday, icon: '⚡', color: Colors.green },
    { label: 'Minutes', value: minutesToday, icon: '⏱️', color: Colors.blue },
    { label: 'Lessons', value: lessonsToday, icon: '📚', color: Colors.orange },
    { label: 'Accuracy', value: `${accuracyToday}%`, icon: '🎯', color: Colors.yellow },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Today</Text>
      <View style={styles.grid}>
        {stats.map(stat => (
          <View key={stat.label} style={styles.statBox}>
            <Text style={styles.icon}>{stat.icon}</Text>
            <Text style={[styles.value, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.label}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: Spacing.md },
  heading: { color: Colors.textMuted, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.xs, textTransform: 'uppercase', letterSpacing: 1, marginBottom: Spacing.md },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { flex: 1, alignItems: 'center', gap: 2 },
  icon: { fontSize: 20 },
  value: { fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.lg },
  label: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: 10 },
});

export default TodayStats;
