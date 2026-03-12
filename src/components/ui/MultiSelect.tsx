import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface Option<T> {
  value: T;
  label: string;
}

interface MultiSelectProps<T> {
  options: Option<T>[];
  selected: T[];
  onSelectionChange: (selected: T[]) => void;
  maxSelect?: number;
}

function MultiSelect<T extends string | number>({ options, selected, onSelectionChange, maxSelect }: MultiSelectProps<T>) {
  const toggle = (value: T) => {
    if (selected.includes(value)) {
      onSelectionChange(selected.filter(s => s !== value));
    } else if (!maxSelect || selected.length < maxSelect) {
      onSelectionChange([...selected, value]);
    }
  };

  return (
    <View style={styles.container}>
      {options.map(opt => {
        const active = selected.includes(opt.value);
        return (
          <TouchableOpacity
            key={String(opt.value)}
            style={[styles.option, active && styles.active]}
            onPress={() => toggle(opt.value)}
          >
            <Text style={[styles.label, active && styles.activeLabel]}>{opt.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  option: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  active: { borderColor: Colors.green, backgroundColor: Colors.greenLight },
  label: { color: Colors.textSecondary, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.sm },
  activeLabel: { color: Colors.green },
});

export default MultiSelect;
