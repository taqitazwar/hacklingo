import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../constants';

const GOALS = [
  { minutes: 5, label: 'Casual', description: '5 min / day', emoji: '🌱' },
  { minutes: 10, label: 'Regular', description: '10 min / day', emoji: '📚' },
  { minutes: 15, label: 'Serious', description: '15 min / day', emoji: '🎯' },
  { minutes: 20, label: 'Intense', description: '20 min / day', emoji: '🔥' },
];

interface GoalScreenProps {
  onSelect: (minutes: number) => void;
}

const GoalScreen: React.FC<GoalScreenProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.heading}>Set your daily goal</Text>
        <Text style={styles.subheading}>Consistency beats intensity. Pick a goal you can stick to.</Text>
        <View style={styles.goals}>
          {GOALS.map(goal => (
            <TouchableOpacity
              key={goal.minutes}
              style={[styles.goalCard, selected === goal.minutes && styles.selected]}
              onPress={() => setSelected(goal.minutes)}
            >
              <Text style={styles.emoji}>{goal.emoji}</Text>
              <View style={styles.goalText}>
                <Text style={[styles.goalLabel, selected === goal.minutes && { color: Colors.green }]}>
                  {goal.label}
                </Text>
                <Text style={styles.goalDesc}>{goal.description}</Text>
              </View>
              {selected === goal.minutes && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.btn, !selected && styles.btnDisabled]}
          onPress={() => selected && onSelect(selected)}
          disabled={!selected}
        >
          <Text style={styles.btnText}>Set Goal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.backgroundPrimary },
  content: { flex: 1, padding: Spacing.xl, justifyContent: 'center' },
  heading: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes['2xl'],
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subheading: {
    color: Colors.textSecondary,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.base,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  goals: { gap: Spacing.sm, marginBottom: Spacing.xl },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: Spacing.md,
  },
  selected: { borderColor: Colors.green, backgroundColor: Colors.greenLight },
  emoji: { fontSize: 24 },
  goalText: { flex: 1 },
  goalLabel: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  goalDesc: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm },
  check: { color: Colors.green, fontSize: 20, fontFamily: Typography.fonts.bold },
  btn: {
    backgroundColor: Colors.green,
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
});

export default GoalScreen;
