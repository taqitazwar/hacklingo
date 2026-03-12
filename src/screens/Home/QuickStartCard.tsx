import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface QuickStartCardProps {
  onStart: () => void;
  language: string;
  xpToday: number;
  dailyGoalXP: number;
}

const QuickStartCard: React.FC<QuickStartCardProps> = ({ onStart, language, xpToday, dailyGoalXP }) => {
  const goalMet = xpToday >= dailyGoalXP;

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.lang}>{language}</Text>
        <Text style={styles.label}>{goalMet ? 'Goal met today! Keep going 💪' : 'Continue learning'}</Text>
        <Text style={styles.xp}>{xpToday} / {dailyGoalXP} XP today</Text>
      </View>
      <TouchableOpacity style={[styles.btn, goalMet && styles.btnGold]} onPress={onStart}>
        <Text style={styles.btnText}>{goalMet ? '🔥 Go!' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: Spacing.lg,
  },
  left: { flex: 1, gap: 2 },
  lang: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.xs },
  label: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  xp: { color: Colors.green, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.sm },
  btn: {
    backgroundColor: Colors.green,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 12,
  },
  btnGold: { backgroundColor: Colors.orange },
  btnText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
});

export default QuickStartCard;
