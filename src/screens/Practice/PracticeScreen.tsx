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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';
import Bug from '../../components/mascot/Bug';
import { useProgressStore } from '../../store';
import { RootStackParamList } from '../../types';
import { Lesson, CourseSection } from '../../types';
import pythonLanguage from '../../data/curriculum/python';

type PracticeNav = StackNavigationProp<RootStackParamList>;

// ─── Lesson lookup map ────────────────────────────────────────────────────────

const LESSON_MAP: Record<string, { lesson: Lesson; section: CourseSection }> = {};
for (const section of pythonLanguage.sections) {
  for (const lesson of section.lessons) {
    LESSON_MAP[lesson.id] = { lesson, section };
  }
}

// ─── Review card ─────────────────────────────────────────────────────────────

interface ReviewCardProps {
  lesson: Lesson;
  section: CourseSection;
  accuracy: number;
  xpEarned: number;
  onReview: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ lesson, section, accuracy, xpEarned, onReview }) => {
  const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;
  const accentColor = section.accentColor;

  return (
    <View style={styles.card}>
      <View style={[styles.cardAccent, { backgroundColor: accentColor }]} />
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.lessonTitle} numberOfLines={1}>{lesson.title}</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3].map(i => (
                <Ionicons
                  key={i}
                  name="star"
                  size={13}
                  color={i <= stars ? Colors.yellow : Colors.backgroundTertiary}
                />
              ))}
            </View>
          </View>
          <Text style={styles.sectionName}>{section.title}</Text>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.pill}>
            <Ionicons name="checkmark-circle" size={12} color={Colors.green} />
            <Text style={styles.pillText}>{accuracy}% accurate</Text>
          </View>
          <View style={styles.pill}>
            <Ionicons name="flash" size={12} color={Colors.yellow} />
            <Text style={styles.pillText}>{xpEarned} XP earned</Text>
          </View>
          <Pressable
            style={[styles.reviewBtn, { borderColor: accentColor + '60' }]}
            onPress={onReview}
            accessibilityRole="button"
            accessibilityLabel={`Review ${lesson.title}`}
          >
            <Text style={[styles.reviewBtnText, { color: accentColor }]}>Review</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

// ─── Main screen ──────────────────────────────────────────────────────────────

const PracticeScreen: React.FC = () => {
  const navigation = useNavigation<PracticeNav>();
  const { completedLessons } = useProgressStore();

  const completed = Object.entries(completedLessons)
    .map(([id, progress]) => {
      const entry = LESSON_MAP[id];
      if (!entry) return null;
      return { ...progress, lesson: entry.lesson, section: entry.section };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b!.completedAt).getTime() - new Date(a!.completedAt).getTime()) as Array<{
      lessonId: string;
      accuracy: number;
      xpEarned: number;
      completedAt: string;
      lesson: Lesson;
      section: CourseSection;
    }>;

  const handleReview = (lesson: Lesson, section: CourseSection) => {
    navigation.navigate('Lesson', {
      lesson,
      sectionTitle: section.title,
      accentColor: section.accentColor,
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundPrimary} />

      <View style={styles.header}>
        <Text style={styles.screenTitle}>Practice</Text>
        <Text style={styles.subtitle}>
          {completed.length > 0 ? 'Redo completed lessons to reinforce your skills' : 'Review unlocks as you complete lessons'}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {completed.length === 0 ? (
          <View style={styles.emptyState}>
            <Bug mood="encouraging" size="md" />
            <Text style={styles.emptyTitle}>Nothing to review yet!</Text>
            <Text style={styles.emptyBody}>
              Complete your first lesson on the Learn tab — it'll appear here for review.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.statsRow}>
              <View style={styles.statChip}>
                <Ionicons name="book" size={14} color={Colors.blue} />
                <Text style={styles.statChipText}>{completed.length} lesson{completed.length !== 1 ? 's' : ''} done</Text>
              </View>
              <View style={styles.statChip}>
                <Ionicons name="flash" size={14} color={Colors.yellow} />
                <Text style={styles.statChipText}>
                  {completed.reduce((sum, c) => sum + c.xpEarned, 0)} total XP
                </Text>
              </View>
            </View>

            {completed.map(item => (
              <ReviewCard
                key={item.lessonId}
                lesson={item.lesson}
                section={item.section}
                accuracy={item.accuracy}
                xpEarned={item.xpEarned}
                onReview={() => handleReview(item.lesson, item.section)}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

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
    gap: Spacing.sm,
    paddingBottom: Spacing.section,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  statChipText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  card: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: Layout.radiusLg,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardAccent: {
    width: 4,
  },
  cardBody: {
    flex: 1,
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  cardTop: {
    gap: 3,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  lessonTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    flex: 1,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  sectionName: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  pillText: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: 11,
    color: Colors.textMuted,
  },
  reviewBtn: {
    marginLeft: 'auto',
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderWidth: 1.5,
  },
  reviewBtnText: {
    fontFamily: Typography.fontFamily.extraBold,
    fontSize: Typography.fontSize.xs,
    letterSpacing: 0.3,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.section,
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

export default PracticeScreen;
