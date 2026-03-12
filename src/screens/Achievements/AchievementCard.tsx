import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';
import { Achievement } from '../../types/achievement';

interface AchievementCardProps {
  achievement: Achievement;
  progress?: number;
  unlocked?: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, progress = 0, unlocked }) => {
  const progressPercent = Math.min(100, Math.round((progress / achievement.requirement.value) * 100));

  return (
    <View style={[styles.card, !unlocked && styles.locked]}>
      <View style={[styles.iconBox, unlocked && styles.unlockedIcon]}>
        <Text style={[styles.icon, !unlocked && styles.lockedIcon]}>{achievement.icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, !unlocked && styles.lockedText]}>{achievement.title}</Text>
        <Text style={styles.description}>{achievement.description}</Text>
        {!unlocked && (
          <View style={styles.progressRow}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
            <Text style={styles.progressText}>{progressPercent}%</Text>
          </View>
        )}
      </View>
      <Text style={styles.xp}>+{achievement.xpReward}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  locked: { opacity: 0.6 },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unlockedIcon: { backgroundColor: Colors.greenLight },
  icon: { fontSize: 26 },
  lockedIcon: { opacity: 0.5 },
  content: { flex: 1 },
  title: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  lockedText: { color: Colors.textMuted },
  description: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.xs, marginTop: 2 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: 6 },
  progressTrack: { flex: 1, height: 4, backgroundColor: Colors.backgroundTertiary, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.green, borderRadius: 2 },
  progressText: { color: Colors.textMuted, fontSize: 10, fontFamily: Typography.fonts.regular },
  xp: { color: Colors.green, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.sm },
});

export default AchievementCard;
