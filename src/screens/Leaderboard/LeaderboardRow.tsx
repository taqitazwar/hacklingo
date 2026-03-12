import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface LeaderboardRowProps {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  level: number;
  isCurrentUser?: boolean;
}

const RANK_COLORS: Record<number, string> = {
  1: '#FFD700',
  2: '#C0C0C0',
  3: '#CD7F32',
};

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ rank, name, xp, streak, level, isCurrentUser }) => {
  const rankColor = RANK_COLORS[rank] ?? Colors.textMuted;

  return (
    <View style={[styles.row, isCurrentUser && styles.currentUser]}>
      <Text style={[styles.rank, { color: rankColor }]}>
        {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
      </Text>
      <View style={[styles.avatar, { backgroundColor: isCurrentUser ? Colors.brandRed : Colors.blue }]}>
        <Text style={styles.avatarText}>{name[0].toUpperCase()}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}{isCurrentUser && ' (you)'}</Text>
        <Text style={styles.level}>Level {level}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.xp}>{xp.toLocaleString()} XP</Text>
        <Text style={styles.streak}>🔥 {streak}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  currentUser: { borderWidth: 1.5, borderColor: Colors.brandRed },
  rank: { width: 32, textAlign: 'center', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  info: { flex: 1 },
  name: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  level: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.xs },
  right: { alignItems: 'flex-end' },
  xp: { color: Colors.green, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.sm },
  streak: { color: Colors.orange, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.xs },
});

export default LeaderboardRow;
