import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';
import Button from '../../components/ui/Button';
import Confetti from '../../components/ui/Confetti';
import Bug, { BugMood } from '../../components/mascot/Bug';

type ResultsNav = StackNavigationProp<RootStackParamList, 'Results'>;
type ResultsRoute = RouteProp<RootStackParamList, 'Results'>;
interface Props { navigation: ResultsNav; route: ResultsRoute; }

// ─── Stat card ────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: string;
  iconColor: string;
  bgColor: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, iconColor, bgColor, delay }) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(anim, { toValue: 1, tension: 70, friction: 9, delay, useNativeDriver: true }).start();
  }, []);
  return (
    <Animated.View style={[styles.statCard, {
      opacity: anim,
      transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }],
    }]}>
      <View style={[styles.statIconWrap, { backgroundColor: bgColor }]}>
        <Ionicons name={icon} size={22} color={iconColor} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
};

// ─── Main component ───────────────────────────────────────────────────────

const ResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { xpEarned, accuracy, streakDay, lessonTitle, isStreakMilestone } = route.params;

  const [showStats, setShowStats] = useState(false);

  // Celebration screen anims
  const celebAnim = useRef(new Animated.Value(0)).current;
  const mascotBounce = useRef(new Animated.Value(0)).current;
  // Stats screen anim
  const statsSlide = useRef(new Animated.Value(60)).current;
  const statsOpacity = useRef(new Animated.Value(0)).current;

  const mascotMood: BugMood = accuracy >= 90 ? 'celebrating' : accuracy >= 70 ? 'happy' : 'encouraging';
  const headline = accuracy >= 90 ? 'Bug is SO proud!' : accuracy >= 70 ? 'Lesson complete!' : 'You got this!';
  const subline = accuracy >= 90
    ? `You absolutely crushed "${lessonTitle}"!`
    : accuracy >= 70
    ? `You just completed "${lessonTitle}"`
    : "Every bug you find makes you a better developer.";

  useEffect(() => {
    // Animate celebration screen in
    Animated.parallel([
      Animated.spring(celebAnim, { toValue: 1, tension: 55, friction: 8, useNativeDriver: true }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(mascotBounce, { toValue: -12, duration: 400, useNativeDriver: true }),
          Animated.timing(mascotBounce, { toValue: 0, duration: 400, useNativeDriver: true }),
        ])
      ),
    ]).start();
  }, []);

  const handleClaimXp = () => {
    setShowStats(true);
    Animated.parallel([
      Animated.timing(statsOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.spring(statsSlide, { toValue: 0, tension: 60, friction: 9, useNativeDriver: true }),
    ]).start();
  };

  if (!showStats) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundPrimary} />

        {/* Confetti always fills the screen */}
        <Confetti count={32} active />

        <Animated.View style={[styles.celebrationScreen, {
          opacity: celebAnim,
          transform: [{ scale: celebAnim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }],
        }]}>
          {/* Mascot */}
          <Animated.View style={{ transform: [{ translateY: mascotBounce }] }}>
            <Bug mood={mascotMood} size={Layout.isSmallDevice ? 'md' : 'lg'} />
          </Animated.View>

          {/* Text */}
          <View style={styles.celebTextBlock}>
            <Text style={styles.celebHeadline}>{headline}</Text>
            <Text style={styles.celebSubline}>{subline}</Text>
          </View>

          {/* Quick stat pills */}
          <View style={styles.quickStats}>
            <QuickStat label="XP" value={`+${xpEarned}`} color={Colors.yellow} />
            <QuickStat label="Accuracy" value={`${accuracy}%`} color={Colors.green} />
            <QuickStat label="Streak" value={`${streakDay}d`} color={Colors.orange} />
          </View>
        </Animated.View>

        <View style={styles.bottomArea}>
          <Button label="Claim XP" onPress={handleClaimXp} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundPrimary} />

      <Animated.View style={[styles.statsScreen, { opacity: statsOpacity, transform: [{ translateY: statsSlide }] }]}>
        {/* Mascot + headline */}
        <View style={styles.statsHero}>
          <Bug mood={mascotMood} size="md" />
          <View style={styles.statsHeroText}>
            <Text style={styles.statsHeadline}>{headline}</Text>
            <Text style={styles.statsLessonTitle}>{lessonTitle}</Text>
          </View>
        </View>

        {/* Streak milestone */}
        {isStreakMilestone && (
          <View style={styles.milestoneBanner}>
            <Ionicons name="flame" size={20} color={Colors.orange} />
            <Text style={styles.milestoneText}>{streakDay}-day streak milestone!</Text>
          </View>
        )}

        {/* Stat cards */}
        <View style={styles.statsRow}>
          <StatCard icon="flash"  label="XP Earned"  value={`+${xpEarned}`}   iconColor={Colors.yellow} bgColor={Colors.yellowLight} delay={100} />
          <StatCard icon="trophy" label="Accuracy"   value={`${accuracy}%`}   iconColor={Colors.blue}   bgColor={Colors.blueLight}  delay={200} />
          <StatCard icon="flame"  label="Streak"     value={`${streakDay}d`}  iconColor={Colors.orange} bgColor={Colors.orangeLight} delay={300} />
        </View>
      </Animated.View>

      <View style={styles.bottomArea}>
        <Button label="Continue" onPress={() => navigation.navigate('MainTabs')} />
      </View>
    </SafeAreaView>
  );
};

// ─── Quick stat pill ──────────────────────────────────────────────────────

const QuickStat: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <View style={[styles.quickStatPill, { borderColor: color + '44' }]}>
    <Text style={[styles.quickStatValue, { color }]}>{value}</Text>
    <Text style={styles.quickStatLabel}>{label}</Text>
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  celebrationScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Layout.isSmallDevice ? Spacing.md : Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  celebTextBlock: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  celebHeadline: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Layout.isSmallDevice ? Typography.fontSize.xxl : Typography.fontSize.display,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  celebSubline: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.fontSize.base * 1.5,
  },
  quickStats: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  quickStatPill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: Layout.radiusMd,
    borderWidth: 1.5,
    backgroundColor: Colors.backgroundSecondary,
  },
  quickStatValue: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.lg,
  },
  quickStatLabel: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
  statsScreen: {
    flex: 1,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.xl,
    gap: Spacing.xl,
  },
  statsHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  statsHeroText: {
    flex: 1,
    gap: 4,
  },
  statsHeadline: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.xxl,
    color: Colors.textPrimary,
  },
  statsLessonTitle: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
  },
  milestoneBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.orangeLight,
    borderRadius: Layout.radiusMd,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.orange + '44',
  },
  milestoneText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.base,
    color: Colors.orange,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Layout.radiusLg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  statIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.xl,
    color: Colors.textPrimary,
  },
  statLabel: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  bottomArea: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.sm,
  },
});

export default ResultsScreen;
