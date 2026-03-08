import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';
import Bug from '../../components/mascot/Bug';
import { useProgressStore } from '../../store';
import { RootStackParamList } from '../../types';
import { Lesson, CourseSection } from '../../types';
import pythonLanguage from '../../data/curriculum/python';

type ChallengesNav = StackNavigationProp<RootStackParamList>;

// ─── Daily lesson selection ────────────────────────────────────────────────────

const todayDateString = (): string => new Date().toISOString().split('T')[0];

const getDayOfYear = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000);
};

// All lessons from sections that have content
const ALL_CHALLENGE_LESSONS: Array<{ lesson: Lesson; section: CourseSection }> = [];
for (const section of pythonLanguage.sections) {
  for (const lesson of section.lessons) {
    ALL_CHALLENGE_LESSONS.push({ lesson, section });
  }
}

const getDailyChallenge = () => {
  if (ALL_CHALLENGE_LESSONS.length === 0) return null;
  return ALL_CHALLENGE_LESSONS[getDayOfYear() % ALL_CHALLENGE_LESSONS.length];
};

// ─── Countdown timer ─────────────────────────────────────────────────────────

const getMsUntilMidnight = (): number => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
};

const formatCountdown = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

// ─── Difficulty label ─────────────────────────────────────────────────────────

const DIFFICULTY_COLORS: Record<string, string> = {
  easy:   Colors.green,
  medium: Colors.yellow,
  hard:   Colors.red,
};

const getLessonDifficulty = (lesson: Lesson): string => {
  const diffs = lesson.challenges.map(c => c.difficulty);
  if (diffs.includes('hard'))   return 'hard';
  if (diffs.includes('medium')) return 'medium';
  return 'easy';
};

const getLessonXp = (lesson: Lesson): number =>
  lesson.lessonType === 'boss' ? 40 : lesson.completionXpBonus + 10;

// ─── Main screen ──────────────────────────────────────────────────────────────

const ChallengesScreen: React.FC = () => {
  const navigation = useNavigation<ChallengesNav>();
  const { completedLessons } = useProgressStore();

  const [countdown, setCountdown] = useState(getMsUntilMidnight());
  const [isCompleted, setIsCompleted] = useState(false);

  const daily = getDailyChallenge();

  // Check if today's challenge is completed
  const checkCompletion = useCallback(() => {
    if (!daily) return;
    const progress = completedLessons[daily.lesson.id];
    const today = todayDateString();
    setIsCompleted(!!progress && progress.completedAt.startsWith(today));
  }, [daily, completedLessons]);

  // Refresh completion status each time the tab comes into focus
  useFocusEffect(checkCompletion);

  // Countdown timer
  useEffect(() => {
    const tick = setInterval(() => {
      setCountdown(getMsUntilMidnight());
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const handleStart = () => {
    if (!daily) return;
    navigation.navigate('Lesson', {
      lesson: daily.lesson,
      sectionTitle: daily.section.title,
      accentColor: daily.section.accentColor,
    });
  };

  if (!daily) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundPrimary} />
        <View style={styles.emptyState}>
          <Bug mood="thinking" size="md" />
          <Text style={styles.emptyTitle}>No challenges yet</Text>
          <Text style={styles.emptyBody}>Complete the first section to unlock daily challenges.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const difficulty = getLessonDifficulty(daily.lesson);
  const xpReward = getLessonXp(daily.lesson);
  const diffColor = DIFFICULTY_COLORS[difficulty] ?? Colors.green;
  const gradientColors: [string, string] = [daily.section.accentColor + 'CC', daily.section.accentColor + '66'];

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundPrimary} />

      <View style={styles.header}>
        <Text style={styles.screenTitle}>Challenges</Text>
        <Text style={styles.subtitle}>A new challenge every day</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Daily challenge card ─────────────────────────────────── */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dailyCard}
        >
          <View style={styles.dailyCardTop}>
            <View style={styles.dailyBadge}>
              <Ionicons name="flash" size={13} color={Colors.yellow} />
              <Text style={styles.dailyBadgeText}>DAILY CHALLENGE</Text>
            </View>
            <View style={styles.countdownChip}>
              <Ionicons name="time-outline" size={12} color={Colors.textSecondary} />
              <Text style={styles.countdownText}>{formatCountdown(countdown)}</Text>
            </View>
          </View>

          <View style={styles.dailyCardCenter}>
            {isCompleted ? (
              <Bug mood="celebrating" size="md" />
            ) : (
              <Bug mood="encouraging" size="md" />
            )}
            <View style={styles.dailyInfo}>
              <Text style={styles.dailyLessonTitle}>{daily.lesson.title}</Text>
              <Text style={styles.dailySection}>{daily.section.title}</Text>
              <View style={styles.dailyMeta}>
                <View style={[styles.diffBadge, { backgroundColor: diffColor + '22', borderColor: diffColor + '44' }]}>
                  <Text style={[styles.diffText, { color: diffColor }]}>{difficulty.toUpperCase()}</Text>
                </View>
                <View style={styles.xpBadge}>
                  <Ionicons name="flash" size={11} color={Colors.yellow} />
                  <Text style={styles.xpText}>+{xpReward} XP</Text>
                </View>
                <View style={styles.questionsBadge}>
                  <Ionicons name="help-circle-outline" size={11} color={Colors.textSecondary} />
                  <Text style={styles.questionsText}>{daily.lesson.challenges.length} questions</Text>
                </View>
              </View>
            </View>
          </View>

          {isCompleted ? (
            <View style={styles.completedBanner}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.green} />
              <Text style={styles.completedText}>Challenge complete! Come back tomorrow.</Text>
            </View>
          ) : (
            <Pressable
              style={styles.startBtn}
              onPress={handleStart}
              accessibilityRole="button"
              accessibilityLabel="Start daily challenge"
            >
              <Text style={styles.startBtnText}>START CHALLENGE</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.white} />
            </Pressable>
          )}
        </LinearGradient>

        {/* ── How it works ───────────────────────────────────────────── */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>How it works</Text>
          <InfoRow icon="flash" color={Colors.yellow}  text="A new challenge drops every day at midnight" />
          <InfoRow icon="star"  color={Colors.orange}  text="Earn bonus XP for completing the daily challenge" />
          <InfoRow icon="flame" color={Colors.red}     text="Build a daily challenge streak to earn achievements" />
          <InfoRow icon="trophy" color={Colors.blue}   text="Top daily challengers appear on the leaderboard" />
        </View>

        {/* ── Coming soon features ───────────────────────────────────── */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Coming Soon</Text>
          <InfoRow icon="timer-outline"  color={Colors.purple} text="Speed runs — race the clock on classic lessons" />
          <InfoRow icon="golf-outline"   color={Colors.teal}   text="Code golf — solve it in the fewest characters" />
          <InfoRow icon="people-outline" color={Colors.blue}   text="Weekly tournaments with leaderboard prizes" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Info row sub-component ───────────────────────────────────────────────────

const InfoRow: React.FC<{ icon: React.ComponentProps<typeof Ionicons>['name']; color: string; text: string }> = ({ icon, color, text }) => (
  <View style={styles.infoRow}>
    <View style={[styles.infoIconWrap, { backgroundColor: color + '18' }]}>
      <Ionicons name={icon} size={15} color={color} />
    </View>
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.backgroundPrimary,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderLight,
  },
  screenTitle: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.xl,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  content: {
    padding: Spacing.base,
    gap: Spacing.md,
    paddingBottom: Spacing.section,
  },
  dailyCard: {
    borderRadius: Layout.radiusXl,
    padding: Spacing.base,
    gap: Spacing.base,
  },
  dailyCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  dailyBadgeText: {
    fontFamily: Typography.fontFamily.black,
    fontSize: 10,
    color: Colors.yellow,
    letterSpacing: 0.5,
  },
  countdownChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  countdownText: {
    fontFamily: Typography.fontFamily.mono,
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  dailyCardCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  dailyInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  dailyLessonTitle: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.lg,
    color: Colors.white,
  },
  dailySection: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255,255,255,0.7)',
  },
  dailyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  diffBadge: {
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderWidth: 1,
  },
  diffText: {
    fontFamily: Typography.fontFamily.extraBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  xpText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 11,
    color: Colors.yellow,
  },
  questionsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  questionsText: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.successLight,
    borderRadius: Layout.radiusMd,
    padding: Spacing.md,
  },
  completedText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.sm,
    color: Colors.green,
    flex: 1,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: Layout.radiusXl,
    paddingVertical: Spacing.md,
  },
  startBtnText: {
    fontFamily: Typography.fontFamily.extraBold,
    fontSize: Typography.fontSize.base,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: Layout.radiusXl,
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  infoTitle: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  infoIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: Typography.fontSize.sm * 1.4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
  },
  emptyTitle: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.xl,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  emptyBody: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.fontSize.base * 1.5,
  },
});

export default ChallengesScreen;
