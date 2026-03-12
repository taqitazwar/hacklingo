import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

type PracticeType = 'flashcard' | 'quiz' | 'speed' | 'review';

interface PracticeModeCardProps {
  type: PracticeType;
  title: string;
  description: string;
  icon: string;
  color: string;
  onStart: () => void;
}

const PracticeModeCard: React.FC<PracticeModeCardProps> = ({ title, description, icon, color, onStart }) => (
  <TouchableOpacity style={[styles.modeCard, { borderColor: color + '44' }]} onPress={onStart}>
    <Text style={styles.modeIcon}>{icon}</Text>
    <View style={styles.modeText}>
      <Text style={[styles.modeTitle, { color }]}>{title}</Text>
      <Text style={styles.modeDesc}>{description}</Text>
    </View>
    <Text style={[styles.arrow, { color }]}>›</Text>
  </TouchableOpacity>
);

const PracticeMode: React.FC = () => {
  const modes: PracticeModeCardProps[] = [
    { type: 'flashcard', title: 'Flashcards', description: 'Review key concepts', icon: '🃏', color: Colors.blue, onStart: () => {} },
    { type: 'quiz', title: 'Quick Quiz', description: '10 random challenges', icon: '⚡', color: Colors.green, onStart: () => {} },
    { type: 'speed', title: 'Speed Run', description: 'Answer as fast as you can', icon: '🏃', color: Colors.orange, onStart: () => {} },
    { type: 'review', title: 'Review Mistakes', description: 'Practice incorrect answers', icon: '🔄', color: Colors.brandRed, onStart: () => {} },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practice Modes</Text>
      <Text style={styles.subtitle}>Choose how you want to practice</Text>
      {modes.map(mode => <PracticeModeCard key={mode.type} {...mode} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, gap: Spacing.md },
  title: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes['2xl'] },
  subtitle: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm, marginBottom: Spacing.sm },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: Spacing.lg,
    borderWidth: 1,
    gap: Spacing.md,
  },
  modeIcon: { fontSize: 32 },
  modeText: { flex: 1 },
  modeTitle: { fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  modeDesc: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm },
  arrow: { fontSize: 24, fontFamily: Typography.fonts.bold },
});

export default PracticeMode;
