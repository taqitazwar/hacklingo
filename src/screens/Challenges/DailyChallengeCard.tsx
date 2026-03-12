import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface DailyChallengeCardProps {
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  expiresIn: string;
  onStart: () => void;
}

const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  title, description, xpReward, completed, expiresIn, onStart,
}) => {
  return (
    <View style={[styles.card, completed && styles.completed]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>DAILY</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.footer}>
        <View style={styles.reward}>
          <Text style={styles.xp}>+{xpReward} XP</Text>
          <Text style={styles.expires}>Expires in {expiresIn}</Text>
        </View>
        <TouchableOpacity
          style={[styles.btn, completed && styles.completedBtn]}
          onPress={onStart}
          disabled={completed}
        >
          <Text style={styles.btnText}>{completed ? '✓ Done' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.yellow + '44',
  },
  completed: { opacity: 0.7 },
  badge: {
    backgroundColor: Colors.yellow,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  badgeText: { color: '#000', fontFamily: Typography.fonts.bold, fontSize: 10 },
  title: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.lg, marginBottom: 4 },
  description: { color: Colors.textSecondary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm, marginBottom: Spacing.md },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reward: {},
  xp: { color: Colors.green, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  expires: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.xs },
  btn: { backgroundColor: Colors.green, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: 10 },
  completedBtn: { backgroundColor: Colors.backgroundTertiary },
  btnText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.sm },
});

export default DailyChallengeCard;
