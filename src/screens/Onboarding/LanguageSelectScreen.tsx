import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../constants';
import { LANGUAGE_META, SUPPORTED_LANGUAGES, SupportedLanguage } from '../../constants/languages';

interface LanguageSelectScreenProps {
  onSelect: (language: SupportedLanguage) => void;
}

const LanguageSelectScreen: React.FC<LanguageSelectScreenProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<SupportedLanguage | null>(null);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.heading}>What do you want to learn?</Text>
        <Text style={styles.sub}>Choose your first programming language</Text>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
          {SUPPORTED_LANGUAGES.map(lang => {
            const meta = LANGUAGE_META[lang];
            const isSelected = selected === lang;
            const isAvailable = lang === 'python';
            return (
              <TouchableOpacity
                key={lang}
                style={[styles.card, isSelected && { borderColor: meta.color }, !isAvailable && styles.disabled]}
                onPress={() => isAvailable && setSelected(lang)}
                disabled={!isAvailable}
              >
                <Text style={styles.icon}>{meta.icon}</Text>
                <View style={styles.cardText}>
                  <Text style={[styles.name, isSelected && { color: meta.color }]}>{meta.displayName}</Text>
                  <Text style={styles.tagline}>{isAvailable ? meta.tagline : 'Coming soon'}</Text>
                </View>
                {isSelected && <Text style={[styles.check, { color: meta.color }]}>✓</Text>}
                {!isAvailable && (
                  <View style={styles.soonBadge}>
                    <Text style={styles.soonText}>Soon</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={[styles.btn, !selected && styles.btnDisabled]}
          onPress={() => selected && onSelect(selected)}
          disabled={!selected}
        >
          <Text style={styles.btnText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.backgroundPrimary },
  content: { flex: 1, padding: Spacing.xl },
  heading: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes['2xl'],
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  sub: {
    color: Colors.textSecondary,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.base,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  list: { gap: Spacing.sm, paddingBottom: Spacing.lg },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: Spacing.md,
  },
  disabled: { opacity: 0.5 },
  icon: { fontSize: 32 },
  cardText: { flex: 1 },
  name: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  tagline: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm },
  check: { fontSize: 22, fontFamily: Typography.fonts.bold },
  soonBadge: {
    backgroundColor: Colors.backgroundTertiary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
  },
  soonText: { color: Colors.textMuted, fontSize: 10, fontFamily: Typography.fonts.medium },
  btn: {
    backgroundColor: Colors.brandRed,
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
});

export default LanguageSelectScreen;
