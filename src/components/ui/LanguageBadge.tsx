import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Typography, Spacing } from '../../constants';
import { LANGUAGE_META, SupportedLanguage } from '../../constants/languages';

interface LanguageBadgeProps {
  language: SupportedLanguage;
  size?: 'sm' | 'md' | 'lg';
}

const LanguageBadge: React.FC<LanguageBadgeProps> = ({ language, size = 'md' }) => {
  const meta = LANGUAGE_META[language];
  const pad = size === 'sm' ? 4 : size === 'md' ? 8 : 12;
  const fontSize = size === 'sm' ? 10 : size === 'md' ? 12 : 14;

  return (
    <View style={[styles.badge, { backgroundColor: meta.color + '22', paddingHorizontal: pad, borderColor: meta.color + '55' }]}>
      <Text style={{ fontSize: fontSize + 4 }}>{meta.icon}</Text>
      <Text style={[styles.label, { color: meta.color, fontSize }]}>{meta.displayName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  label: { fontFamily: Typography.fonts.medium },
});

export default LanguageBadge;
