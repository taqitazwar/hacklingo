import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface DailyStreakCardProps {
  currentStreak: number;
  longestStreak: number;
  todayComplete: boolean;
}

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const DailyStreakCard: React.FC<DailyStreakCardProps> = ({ currentStreak, longestStreak, todayComplete }) => {
  const today = new Date().getDay();
  const mondayOffset = (today + 6) % 7;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.streakNumber}>{currentStreak}</Text>
          <Text style={styles.streakLabel}>Day Streak</Text>
        </View>
        <Text style={styles.flame}>🔥</Text>
      </View>
      <View style={styles.week}>
        {DAY_LABELS.map((day, i) => {
          const dayOffset = i - mondayOffset;
          const active = dayOffset < 0 || (dayOffset === 0 && todayComplete);
          const isToday = dayOffset === 0;
          return (
            <View key={i} style={styles.dayCol}>
              <View style={[styles.circle, active && styles.activeCircle, isToday && styles.todayCircle]}>
                <Text style={[styles.checkmark, active && styles.activeCheckmark]}>
                  {active ? '✓' : ''}
                </Text>
              </View>
              <Text style={[styles.dayLabel, isToday && styles.todayLabel]}>{day}</Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.best}>Personal best: {longestStreak} days</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: Spacing.lg,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.lg },
  streakNumber: { color: Colors.orange, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes['3xl'] },
  streakLabel: { color: Colors.textSecondary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.xs },
  flame: { fontSize: 36 },
  week: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md },
  dayCol: { alignItems: 'center', gap: 4 },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: { backgroundColor: Colors.orange },
  todayCircle: { borderWidth: 2, borderColor: Colors.orange },
  checkmark: { color: 'transparent', fontSize: 14, fontFamily: Typography.fonts.bold },
  activeCheckmark: { color: '#FFFFFF' },
  dayLabel: { color: Colors.textMuted, fontSize: 10, fontFamily: Typography.fonts.medium },
  todayLabel: { color: Colors.orange },
  best: { color: Colors.textMuted, fontSize: Typography.sizes.xs, fontFamily: Typography.fonts.regular },
});

export default DailyStreakCard;
