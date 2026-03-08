import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/colors';
import { Typography, Spacing } from '../../constants';
import { Language } from '../../types';

interface LanguageDetailScreenProps {
  language: Language;
  onStart: () => void;
}

const LanguageDetailScreen: React.FC<LanguageDetailScreenProps> = ({
  language,
  onStart,
}) => {
  const totalLessons = language.sections.reduce(
    (sum, s) => sum + s.lessons.length,
    0
  );
  const totalChallenges = language.sections.reduce(
    (sum, s) =>
      sum + s.lessons.reduce((ls, l) => ls + l.challenges.length, 0),
    0
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <LinearGradient
          colors={[Colors.backgroundSecondary, Colors.backgroundPrimary]}
          style={styles.hero}
        >
          <Text style={styles.icon}>{language.icon}</Text>
          <Text style={styles.name}>{language.name}</Text>
          <Text style={styles.desc}>{language.description}</Text>
        </LinearGradient>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{language.sections.length}</Text>
            <Text style={styles.statLabel}>Sections</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalLessons}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalChallenges}</Text>
            <Text style={styles.statLabel}>Challenges</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>What you will learn</Text>
        {language.sections.map((section) => (
          <View key={section.id} style={styles.sectionCard}>
            <View style={[styles.dot, { backgroundColor: section.accentColor }]} />
            <View style={styles.sectionContent}>
              <Text style={styles.sectionName}>{section.title}</Text>
              <Text style={styles.sectionDesc}>{section.description}</Text>
              <Text style={styles.lessonCount}>
                {section.lessons.length} lessons
              </Text>
            </View>
          </View>
        ))}

        <Pressable onPress={onStart} style={styles.startButton}>
          <LinearGradient
            colors={[Colors.brandRed, Colors.brandRedDark]}
            style={styles.startGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.startText}>Start Learning</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.backgroundPrimary },
  scroll: { padding: Spacing.lg },
  hero: {
    alignItems: 'center',
    padding: Spacing.xxl,
    borderRadius: 20,
    marginBottom: Spacing.xl,
  },
  icon: { fontSize: 56, marginBottom: Spacing.md },
  name: {
    fontSize: Typography.size.xxl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  desc: {
    fontSize: Typography.size.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 22,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    justifyContent: 'space-evenly',
  },
  statItem: { alignItems: 'center' },
  statValue: {
    fontSize: Typography.size.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  statLabel: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: Colors.backgroundTertiary },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  sectionCard: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginTop: 5 },
  sectionContent: { flex: 1 },
  sectionName: {
    fontSize: Typography.size.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sectionDesc: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  lessonCount: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
  startButton: {
    marginTop: Spacing.xl,
    borderRadius: 16,
    overflow: 'hidden',
  },
  startGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  startText: {
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: '#fff',
  },
});

export default LanguageDetailScreen;
