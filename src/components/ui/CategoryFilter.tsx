import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface Category {
  id: string;
  label: string;
  count?: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selected, onSelect }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
    {categories.map(cat => {
      const active = cat.id === selected;
      return (
        <TouchableOpacity
          key={cat.id}
          style={[styles.chip, active && styles.active]}
          onPress={() => onSelect(cat.id)}
        >
          <Text style={[styles.label, active && styles.activeLabel]}>{cat.label}</Text>
          {cat.count !== undefined && (
            <View style={[styles.badge, active && styles.activeBadge]}>
              <Text style={styles.badgeText}>{cat.count}</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  active: { borderColor: Colors.green, backgroundColor: Colors.greenLight },
  label: { color: Colors.textMuted, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.sm },
  activeLabel: { color: Colors.green },
  badge: {
    backgroundColor: Colors.backgroundTertiary,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  activeBadge: { backgroundColor: Colors.green },
  badgeText: { color: Colors.textMuted, fontSize: 10 },
});

export default CategoryFilter;
