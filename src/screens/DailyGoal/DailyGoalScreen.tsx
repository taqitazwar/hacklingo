import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';
import { Typography, Spacing, GameConfig } from '../../constants';

const GOAL_OPTIONS = [
  { minutes: 5, label: 'Casual', icon: '🌱', description: '5 min/day' },
  { minutes: 10, label: 'Regular', icon: '📚', description: '10 min/day' },
  { minutes: 15, label: 'Serious', icon: '🎯', description: '15 min/day' },
  { minutes: 20, label: 'Intense', icon: '🚀', description: '20 min/day' },
];

interface DailyGoalScreenProps {
  onGoalSelected: (minutes: number) => void;
  currentGoal?: number;
}

const DailyGoalScreen: React.FC<DailyGoalScreenProps> = ({
  onGoalSelected,
  currentGoal = 10,
}) => {
  const [selected, setSelected] = useState(currentGoal);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Daily Goal</Text>
        <Text style={styles.subtitle}>
          How much time do you want to practice each day?
        </Text>

        <View style={styles.options}>
          {GOAL_OPTIONS.map((option) => {
            const isSelected = selected === option.minutes;
            return (
              <Pressable
                key={option.minutes}
                onPress={() => setSelected(option.minutes)}
                style={[
                  styles.option,
                  isSelected && { borderColor: Colors.green },
                ]}
              >
                <Text style={styles.optionIcon}>{option.icon}</Text>
                <View>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionDesc}>{option.description}</Text>
                </View>
                {isSelected && (
                  <View style={styles.check}>
                    <Text style={styles.checkMark}>✓</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={() => onGoalSelected(selected)}
          style={styles.button}
        >
          <LinearGradient
            colors={[Colors.green, Colors.teal]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Set Goal</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.backgroundPrimary },
  container: { flex: 1, padding: Spacing.xl },
  title: {
    fontSize: Typography.size.xxl,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.size.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
    lineHeight: 22,
  },
  options: { gap: Spacing.md, flex: 1 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.backgroundTertiary,
  },
  optionIcon: { fontSize: 28 },
  optionLabel: {
    fontSize: Typography.size.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  optionDesc: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  check: {
    marginLeft: 'auto',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { color: '#fff', fontWeight: '700', fontSize: 16 },
  button: { marginTop: Spacing.xl, borderRadius: 16, overflow: 'hidden' },
  buttonGradient: { padding: Spacing.lg, alignItems: 'center' },
  buttonText: {
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: '#fff',
  },
});

export default DailyGoalScreen;
