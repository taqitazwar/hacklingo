import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { Typography, Spacing } from '../../constants';
import { useProgressStore } from '../../store';
import { formatXP } from '../../utils/formatters';

interface StatCardProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  label: string;
  value: string | number;
  subValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, color, label, value, subValue }) => (
  <View style={[styles.statCard, { borderColor: color + '33' }]}>
    <View style={[styles.statIcon, { backgroundColor: color + '1A' }]}>
      <Ionicons name={icon} size={22} color={color} />
    </View>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
    {subValue ? <Text style={styles.statSub}>{subValue}</Text> : null}
  </View>
);

const StatsScreen: React.FC = () => {
  const {
    totalXp,
    currentStreak,
    longestStreak,
    completedLessons,
    hearts,
  } = useProgressStore();

  const accuracy = completedLessons.length > 0 ? 87 : 0; // placeholder

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Your Stats</Text>

        <View style={styles.grid}>
          <StatCard
            icon="star"
            color={Colors.yellow}
            label="Total XP"
            value={formatXP(totalXp)}
          />
          <StatCard
            icon="flame"
            color={Colors.orange}
            label="Current Streak"
            value={currentStreak}
            subValue={`Best: ${longestStreak}`}
          />
          <StatCard
            icon="checkmark-circle"
            color={Colors.green}
            label="Lessons Done"
            value={completedLessons.length}
          />
          <StatCard
            icon="heart"
            color={Colors.brandRed}
            label="Hearts"
            value={hearts}
            subValue="of 5"
          />
          <StatCard
            icon="trophy"
            color={Colors.blue}
            label="Best Streak"
            value={longestStreak}
            subValue="days"
          />
          <StatCard
            icon="analytics"
            color={Colors.teal}
            label="Accuracy"
            value={`${accuracy}%`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.backgroundPrimary },
  scroll: { padding: Spacing.lg },
  title: {
    fontSize: Typography.size.xxl,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    gap: Spacing.sm,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: Typography.size.xl,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  statSub: {
    fontSize: 11,
    color: Colors.textMuted,
  },
});

export default StatsScreen;
