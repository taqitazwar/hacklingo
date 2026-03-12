import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';
import { getLevelFromXP } from '../../constants/xp';

interface ProfileHeaderProps {
  username: string;
  totalXP: number;
  streak: number;
  lessonsCompleted: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, totalXP, streak, lessonsCompleted }) => {
  const level = getLevelFromXP(totalXP);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{username[0]?.toUpperCase() ?? '?'}</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{level}</Text>
        </View>
      </View>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.xp}>{totalXP.toLocaleString()} XP</Text>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>🔥 {streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>📚 {lessonsCompleted}</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>⭐ {level}</Text>
          <Text style={styles.statLabel}>Level</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: Spacing.xl },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.brandRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: 36 },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.backgroundPrimary,
  },
  levelText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: 11 },
  username: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.xl,
    marginBottom: 4,
  },
  xp: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm, marginBottom: Spacing.lg },
  stats: { flexDirection: 'row', gap: Spacing.xl },
  stat: { alignItems: 'center' },
  statValue: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  statLabel: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.xs },
  divider: { width: 1, backgroundColor: Colors.backgroundTertiary },
});

export default ProfileHeader;
