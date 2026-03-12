import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';
import { getLevelFromXP, getXPForNextLevel } from '../../constants/xp';

interface XPProgressCardProps {
  totalXP: number;
  todayXP: number;
  dailyGoalXP: number;
}

const XPProgressCard: React.FC<XPProgressCardProps> = ({ totalXP, todayXP, dailyGoalXP }) => {
  const level = getLevelFromXP(totalXP);
  const nextLevelXP = getXPForNextLevel(totalXP);
  const progress = Math.min(1, totalXP / nextLevelXP);
  const goalProgress = Math.min(1, todayXP / dailyGoalXP);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.level}>Level {level}</Text>
          <Text style={styles.xp}>{totalXP.toLocaleString()} XP total</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Lv.{level}</Text>
        </View>
      </View>
      <View style={styles.barContainer}>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.nextLevel}>{nextLevelXP.toLocaleString()} XP</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.todayRow}>
        <Text style={styles.todayLabel}>Today's goal</Text>
        <Text style={styles.todayXP}>{todayXP} / {dailyGoalXP} XP</Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.goalFill, { width: `${goalProgress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: Spacing.lg,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  level: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.lg },
  xp: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.xs },
  badge: {
    backgroundColor: Colors.blue,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.xs },
  barContainer: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: { height: '100%', backgroundColor: Colors.blue, borderRadius: 4 },
  goalFill: { height: '100%', backgroundColor: Colors.green, borderRadius: 4 },
  nextLevel: { color: Colors.textMuted, fontSize: 10, fontFamily: Typography.fonts.regular },
  divider: { height: 1, backgroundColor: Colors.backgroundTertiary, marginBottom: Spacing.md },
  todayRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  todayLabel: { color: Colors.textSecondary, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.sm },
  todayXP: { color: Colors.green, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.sm },
});

export default XPProgressCard;
