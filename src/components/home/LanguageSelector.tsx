import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';
import { LANGUAGE_META, SUPPORTED_LANGUAGES, SupportedLanguage } from '../../constants/languages';

interface LanguageSelectorProps {
  selected: SupportedLanguage;
  onSelect: (lang: SupportedLanguage) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selected, onSelect }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {SUPPORTED_LANGUAGES.map(lang => {
        const meta = LANGUAGE_META[lang];
        const active = lang === selected;
        return (
          <TouchableOpacity
            key={lang}
            style={[styles.chip, active && { borderColor: meta.color }]}
            onPress={() => onSelect(lang)}
          >
            <Text style={styles.icon}>{meta.icon}</Text>
            <Text style={[styles.label, active && { color: meta.color }]}>{meta.displayName}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  icon: { fontSize: 16 },
  label: {
    color: Colors.textSecondary,
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.sm,
  },
});

export default LanguageSelector;
