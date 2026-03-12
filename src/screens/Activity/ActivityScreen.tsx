import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../constants';

interface ActivityItem {
  id: string;
  type: 'lesson_complete' | 'streak' | 'achievement' | 'level_up';
  message: string;
  timestamp: string;
  xp?: number;
}

const MOCK_ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'lesson_complete', message: 'Completed "Python Basics"', timestamp: '2h ago', xp: 50 },
  { id: '2', type: 'streak', message: '7-day streak achieved!', timestamp: '1d ago' },
  { id: '3', type: 'achievement', message: 'Earned "First Steps" badge', timestamp: '2d ago' },
  { id: '4', type: 'lesson_complete', message: 'Completed "Control Flow"', timestamp: '2d ago', xp: 75 },
  { id: '5', type: 'level_up', message: 'Reached Level 5!', timestamp: '3d ago' },
  { id: '6', type: 'lesson_complete', message: 'Completed "Lists & Methods"', timestamp: '4d ago', xp: 60 },
  { id: '7', type: 'achievement', message: 'Earned "Week Warrior" badge', timestamp: '5d ago' },
  { id: '8', type: 'lesson_complete', message: 'Completed "Dictionaries"', timestamp: '6d ago', xp: 80 },
];

const typeIcon: Record<ActivityItem['type'], string> = {
  lesson_complete: '✅',
  streak: '🔥',
  achievement: '🏆',
  level_up: '⬆️',
};

const typeColor: Record<ActivityItem['type'], string> = {
  lesson_complete: Colors.green,
  streak: Colors.orange,
  achievement: Colors.yellow,
  level_up: Colors.blue,
};

const ActivityScreen: React.FC = () => {
  const renderItem = ({ item }: { item: ActivityItem }) => (
    <View style={styles.item}>
      <View style={[styles.iconBox, { backgroundColor: typeColor[item.type] + '22' }]}>
        <Text style={styles.icon}>{typeIcon[item.type]}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.timestamp}</Text>
      </View>
      {item.xp && <Text style={styles.xp}>+{item.xp} XP</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Activity</Text>
      <FlatList
        data={MOCK_ACTIVITY}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.backgroundPrimary },
  title: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes['2xl'],
    padding: Spacing.lg,
  },
  list: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 20 },
  content: { flex: 1 },
  message: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.base,
  },
  time: {
    color: Colors.textMuted,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  xp: {
    color: Colors.green,
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.sm,
  },
});

export default ActivityScreen;
