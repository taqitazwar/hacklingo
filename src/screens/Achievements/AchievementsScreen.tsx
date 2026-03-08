import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { Typography, Spacing } from '../../constants';
import { useProgressStore } from '../../store';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  requirement: number;
  getValue: (store: ReturnType<typeof useProgressStore.getState>) => number;
  color: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    xpReward: 50,
    requirement: 1,
    getValue: (s) => s.completedLessons.length,
    color: Colors.green,
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    xpReward: 100,
    requirement: 7,
    getValue: (s) => s.longestStreak,
    color: Colors.orange,
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '⚡',
    xpReward: 500,
    requirement: 30,
    getValue: (s) => s.longestStreak,
    color: Colors.yellow,
  },
  {
    id: 'xp_500',
    title: 'XP Hunter',
    description: 'Earn 500 total XP',
    icon: '⭐',
    xpReward: 75,
    requirement: 500,
    getValue: (s) => s.totalXp,
    color: Colors.blue,
  },
  {
    id: 'xp_5000',
    title: 'XP Legend',
    description: 'Earn 5000 total XP',
    icon: '👑',
    xpReward: 500,
    requirement: 5000,
    getValue: (s) => s.totalXp,
    color: Colors.teal,
  },
  {
    id: 'lessons_10',
    title: 'Dedicated Learner',
    description: 'Complete 10 lessons',
    icon: '📚',
    xpReward: 200,
    requirement: 10,
    getValue: (s) => s.completedLessons.length,
    color: Colors.brandRed,
  },
];

const AchievementsScreen: React.FC = () => {
  const store = useProgressStore();

  const renderAchievement = (achievement: Achievement) => {
    const current = achievement.getValue(useProgressStore.getState());
    const unlocked = current >= achievement.requirement;
    const progress = Math.min(current / achievement.requirement, 1);

    return (
      <View
        key={achievement.id}
        style={[
          styles.card,
          !unlocked && styles.cardLocked,
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: achievement.color + '22' }]}>
          <Text style={styles.icon}>{achievement.icon}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, !unlocked && styles.cardTitleLocked]}>
            {achievement.title}
          </Text>
          <Text style={styles.cardDesc}>{achievement.description}</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress * 100}%` as any,
                  backgroundColor: unlocked ? achievement.color : Colors.textMuted,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {unlocked ? 'Completed!' : `${Math.min(current, achievement.requirement)} / ${achievement.requirement}`}
          </Text>
        </View>
        {unlocked && (
          <View style={[styles.xpBadge, { backgroundColor: Colors.green + '22' }]}>
            <Text style={styles.xpText}>+{achievement.xpReward}</Text>
          </View>
        )}
        {!unlocked && (
          <Ionicons name="lock-closed" size={20} color={Colors.textMuted} />
        )}
      </View>
    );
  };

  const unlockedCount = ACHIEVEMENTS.filter(
    (a) => a.getValue(useProgressStore.getState()) >= a.requirement
  ).length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Achievements</Text>
          <Text style={styles.subtitle}>
            {unlockedCount} / {ACHIEVEMENTS.length} unlocked
          </Text>
        </View>
        <View style={styles.list}>
          {ACHIEVEMENTS.map(renderAchievement)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.backgroundPrimary },
  scroll: { padding: Spacing.lg },
  header: { marginBottom: Spacing.xl },
  title: {
    fontSize: Typography.size.xxl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.size.md,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  list: { gap: Spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.backgroundTertiary,
  },
  cardLocked: { opacity: 0.6 },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 24 },
  cardContent: { flex: 1 },
  cardTitle: {
    fontSize: Typography.size.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  cardTitleLocked: { color: Colors.textSecondary },
  cardDesc: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 2 },
  progressText: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
  xpBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  xpText: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.green,
  },
});

export default AchievementsScreen;
