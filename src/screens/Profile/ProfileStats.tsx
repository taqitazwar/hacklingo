import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface ProfileStatsProps {
  totalXP: number;
  lessonsCompleted: number;
  streak: number;
  daysActive: number;
  accuracy: number;
  longestStreak: number;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  totalXP, lessonsCompleted, streak, daysActive, accuracy, longestStreak,
}) => {
  const rows = [
    [
      { label: 'Total XP', value: totalXP.toLocaleString(), color: Colors.green },
      { label: 'Lessons', value: String(lessonsCompleted), color: Colors.blue },
    ],
    [
      { label: 'Current Streak', value: `${streak} 🔥`, color: Colors.orange },
      { label: 'Best Streak', value: `${longestStreak} 🏆`, color: Colors.yellow },
    ],
    [
      { label: 'Days Active', value: String(daysActive), color: Colors.teal ?? Colors.blue },
      { label: 'Accuracy', value: `${accuracy}%`, color: Colors.green },
    ],
  ];

  return (
    <View style={styles.container}>
      {rows.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map(stat => (
            <View key={stat.label} style={styles.stat}>
              <Text style={[styles.value, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.label}>{stat.label}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: Spacing.sm },
  row: { flexDirection: 'row', gap: Spacing.sm },
  stat: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 2,
  },
  value: { fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.xl },
  label: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.xs },
});

export default ProfileStats;
