import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

type FilterOption = 'all' | 'unlocked' | 'locked' | 'streak' | 'xp' | 'lessons';

interface AchievementsFilterProps {
  selected: FilterOption;
  onSelect: (filter: FilterOption) => void;
}

const FILTERS: { id: FilterOption; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unlocked', label: 'Unlocked' },
  { id: 'locked', label: 'Locked' },
  { id: 'streak', label: 'Streak' },
  { id: 'xp', label: 'XP' },
  { id: 'lessons', label: 'Lessons' },
];

const AchievementsFilter: React.FC<AchievementsFilterProps> = ({ selected, onSelect }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
    {FILTERS.map(f => (
      <TouchableOpacity
        key={f.id}
        style={[styles.chip, selected === f.id && styles.active]}
        onPress={() => onSelect(f.id)}
      >
        <Text style={[styles.label, selected === f.id && styles.activeLabel]}>{f.label}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  active: { borderColor: Colors.yellow, backgroundColor: Colors.yellowLight },
  label: { color: Colors.textMuted, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.sm },
  activeLabel: { color: Colors.yellow },
});

export default AchievementsFilter;
