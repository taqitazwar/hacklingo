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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout, GameConfig } from '../../constants';
import { useProgressStore } from '../../store';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface StatRowProps {
  icon: IoniconName;
  iconColor: string;
  label: string;
  value: string | number;
}

const StatRow: React.FC<StatRowProps> = ({ icon, iconColor, label, value }) => (
  <View style={styles.statRow}>
    <View style={[styles.statIcon, { backgroundColor: iconColor + '1A' }]}>
      <Ionicons name={icon} size={16} color={iconColor} />
    </View>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type ProfileNav = StackNavigationProp<RootStackParamList, 'MainTabs'>;
interface Props { navigation: ProfileNav; }

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const {
    totalXp,
    currentStreak,
    longestStreak,
    hearts,
    completedLessons,
    aiHelpsUsedToday,
  } = useProgressStore();

  const completedCount = Object.keys(completedLessons).length;
  const aiHelpsRemaining = Math.max(0, GameConfig.freeAiHelpsPerDay - aiHelpsUsedToday);

  const XP_PER_LEVEL = 500;
  const currentLevel = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const xpInLevel = totalXp % XP_PER_LEVEL;
  const levelProgress = xpInLevel / XP_PER_LEVEL;

  const comingSoonFeatures: { icon: IoniconName; label: string; description: string }[] = [
    { icon: 'git-pull-request',  label: 'Pull Requests',     description: 'Submit code like a real dev' },
    { icon: 'eye-outline',       label: 'Code Reviews',       description: 'Review others\' solutions' },
    { icon: 'hardware-chip',     label: 'AI Pair Programmer', description: '3 free hints per day' },
    { icon: 'briefcase-outline', label: 'Career Simulator',   description: 'Work at a simulated company' },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundPrimary} />

      <View style={styles.header}>
        <Text style={styles.screenTitle}>Profile</Text>
        <Pressable onPress={() => navigation.navigate('Settings')} hitSlop={8}>
          <Ionicons name="settings-outline" size={24} color={Colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar card with gradient */}
        <View style={[styles.avatarCard, Layout.shadowMd]}>
          <LinearGradient
            colors={[Colors.blue, Colors.teal]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarGradient}
          >
            <Text style={styles.avatarEmoji}>🐍</Text>
          </LinearGradient>
          <View style={styles.avatarInfo}>
            <Text style={styles.levelText}>Level {currentLevel}</Text>
            <View style={styles.xpPill}>
              <Ionicons name="flash" size={13} color={Colors.orange} />
              <Text style={styles.xpPillText}>{totalXp} XP</Text>
            </View>
            <View style={styles.levelBarContainer}>
              <View style={styles.levelBarTrack}>
                <View style={[styles.levelBarFill, { width: `${levelProgress * 100}%` }]} />
              </View>
              <Text style={styles.levelBarLabel}>
                {xpInLevel}/{XP_PER_LEVEL} to Level {currentLevel + 1}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats card */}
        <View style={[styles.card, Layout.shadowSm]}>
          <Text style={styles.cardTitle}>Your Stats</Text>
          <StatRow icon="flame"           iconColor={Colors.orange} label="Current streak"    value={`${currentStreak} days`} />
          <View style={styles.divider} />
          <StatRow icon="medal-outline"   iconColor={Colors.yellow} label="Longest streak"    value={`${longestStreak} days`} />
          <View style={styles.divider} />
          <StatRow icon="book-outline"    iconColor={Colors.blue}   label="Lessons done"      value={completedCount} />
          <View style={styles.divider} />
          <StatRow icon="heart"           iconColor={Colors.red}    label="Hearts"             value={`${hearts}/${GameConfig.maxHearts}`} />
          <View style={styles.divider} />
          <StatRow icon="hardware-chip-outline" iconColor={Colors.purple} label="AI helps left today" value={aiHelpsRemaining} />
        </View>

        {/* Coming soon */}
        <View style={[styles.card, Layout.shadowSm]}>
          <Text style={styles.cardTitle}>Coming Soon</Text>
          {comingSoonFeatures.map((f, i) => (
            <React.Fragment key={f.label}>
              <View style={styles.comingSoonRow}>
                <View style={[styles.comingSoonIcon, { backgroundColor: Colors.backgroundSecondary }]}>
                  <Ionicons name={f.icon} size={18} color={Colors.textMuted} />
                </View>
                <View style={styles.comingSoonText}>
                  <Text style={styles.comingSoonTitle}>{f.label}</Text>
                  <Text style={styles.comingSoonDesc}>{f.description}</Text>
                </View>
                <View style={styles.soonBadge}>
                  <Text style={styles.soonBadgeText}>Soon</Text>
                </View>
              </View>
              {i < comingSoonFeatures.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
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
  content: {
    padding: Spacing.base,
    gap: Spacing.md,
    paddingBottom: Spacing.section,
  },
  avatarCard: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: Layout.radiusXl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    padding: Spacing.base,
  },
  avatarGradient: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 38,
  },
  avatarInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  levelText: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.lg,
    color: Colors.textPrimary,
  },
  xpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: Colors.orangeLight,
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  xpPillText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xs,
    color: Colors.orange,
  },
  levelBarContainer: {
    gap: 3,
  },
  levelBarTrack: {
    height: 6,
    backgroundColor: Colors.borderLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  levelBarFill: {
    height: '100%',
    backgroundColor: Colors.blue,
    borderRadius: 3,
  },
  levelBarLabel: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
  card: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: Layout.radiusXl,
    padding: Spacing.base,
    gap: Spacing.md,
  },
  cardTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: Typography.fontFamily.semibold,
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  statValue: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
  },
  divider: {
    height: 0.5,
    backgroundColor: Colors.borderLight,
    marginVertical: Spacing.xxs,
  },
  comingSoonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  comingSoonIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    flex: 1,
  },
  comingSoonTitle: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
  },
  comingSoonDesc: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    marginTop: 1,
  },
  soonBadge: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  soonBadgeText: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
});

export default ProfileScreen;
