import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';
import { useProgressStore } from '../../store';

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  emoji: string;
  isCurrentUser: boolean;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Sarah K.',   xp: 4200, streak: 32, emoji: '🎯', isCurrentUser: false },
  { rank: 2, name: 'James T.',   xp: 3800, streak: 21, emoji: '🔥', isCurrentUser: false },
  { rank: 3, name: 'Priya M.',   xp: 3100, streak: 18, emoji: '⚡', isCurrentUser: false },
  { rank: 4, name: 'Alex R.',    xp: 2700, streak: 14, emoji: '🚀', isCurrentUser: false },
  { rank: 5, name: 'Marcus L.',  xp: 2100, streak: 9,  emoji: '💡', isCurrentUser: false },
  { rank: 6, name: 'You',        xp: 0,    streak: 0,  emoji: '🐍', isCurrentUser: true },
];

const MEDAL_GRADIENTS: Record<number, [string, string]> = {
  1: [Colors.yellow, Colors.orange],
  2: ['#C0C0C0', '#A8A8A8'],
  3: ['#CD7F32', '#A0522D'],
};

const LeaderboardRow: React.FC<{ entry: LeaderboardEntry; isLast: boolean }> = ({
  entry,
  isLast,
}) => {
  const isTopThree = entry.rank <= 3;

  return (
    <>
      <View style={[styles.row, entry.isCurrentUser && styles.currentUserRow]}>
        <View style={styles.rankBlock}>
          {isTopThree ? (
            <LinearGradient
              colors={MEDAL_GRADIENTS[entry.rank]}
              style={styles.medalGradient}
            >
              <Text style={styles.rankInMedal}>{entry.rank}</Text>
            </LinearGradient>
          ) : (
            <Text style={styles.rankNumber}>{entry.rank}</Text>
          )}
        </View>

        <View style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>{entry.emoji}</Text>
        </View>

        <View style={styles.nameBlock}>
          <Text style={[styles.name, entry.isCurrentUser && styles.currentUserName]}>
            {entry.name}
          </Text>
          <View style={styles.streakRow}>
            <Ionicons name="flame" size={11} color={Colors.orange} />
            <Text style={styles.streakText}>{entry.streak} day streak</Text>
          </View>
        </View>

        <View style={styles.xpBlock}>
          <Ionicons name="flash" size={13} color={Colors.orange} />
          <Text style={styles.xpText}>{entry.xp.toLocaleString()}</Text>
        </View>
      </View>
      {!isLast && <View style={styles.divider} />}
    </>
  );
};

const LeaderboardScreen: React.FC = () => {
  const { totalXp, currentStreak } = useProgressStore();

  const entries = MOCK_LEADERBOARD.map((e) =>
    e.isCurrentUser ? { ...e, xp: totalXp, streak: currentStreak } : e
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundPrimary} />

      <View style={styles.header}>
        <Text style={styles.screenTitle}>Leaderboard</Text>
        <Text style={styles.subtitle}>Weekly · resets Sunday</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top 3 podium banner */}
        <LinearGradient
          colors={[Colors.blue + '15', Colors.purple + '10']}
          style={styles.podiumBanner}
        >
          <Ionicons name="trophy" size={18} color={Colors.blue} />
          <Text style={styles.podiumText}>Top 3 this week win XP boosts</Text>
        </LinearGradient>

        <View style={[styles.card, Layout.shadowSm]}>
          {entries.map((entry, i) => (
            <LeaderboardRow
              key={entry.rank}
              entry={entry}
              isLast={i === entries.length - 1}
            />
          ))}
        </View>

        <View style={[styles.comingSoonCard, Layout.shadowSm]}>
          <Text style={styles.comingSoonEmoji}>🌍</Text>
          <Text style={styles.comingSoonTitle}>Global rankings coming soon</Text>
          <Text style={styles.comingSoonBody}>
            Compete with learners worldwide. Top performers get featured.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  podiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderRadius: Layout.radiusMd,
    padding: Spacing.md,
  },
  podiumText: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.sm,
    color: Colors.blue,
  },
  card: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: Layout.radiusXl,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  currentUserRow: {
    backgroundColor: Colors.blueLight,
  },
  rankBlock: {
    width: 30,
    alignItems: 'center',
  },
  medalGradient: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankInMedal: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
  },
  rankNumber: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.base,
    color: Colors.textMuted,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  nameBlock: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  currentUserName: {
    fontFamily: Typography.fontFamily.bold,
    color: Colors.blue,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  streakText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
  xpBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  xpText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.sm,
    color: Colors.orange,
  },
  divider: {
    height: 0.5,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.base,
  },
  comingSoonCard: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: Layout.radiusXl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  comingSoonEmoji: {
    fontSize: 40,
  },
  comingSoonTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  comingSoonBody: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: Typography.fontSize.sm * 1.6,
  },
});

export default LeaderboardScreen;
