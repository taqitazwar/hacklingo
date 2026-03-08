/**
 * Duolingo-style section header.
 * Green (or section-colored) rounded card with section title and START button.
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CourseSection } from '../../../types';
import Colors from '../../../constants/colors';
import { Typography, Spacing, Layout } from '../../../constants';

interface SectionHeaderProps {
  section: CourseSection;
  completedCount: number;
  totalCount: number;
  onStartPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  section,
  completedCount,
  totalCount,
  onStartPress,
}) => {
  const isComingSoon = totalCount === 0;
  const isComplete = !isComingSoon && completedCount === totalCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const bgColor = isComingSoon ? Colors.backgroundTertiary : section.accentColor;
  const textColor = isComingSoon ? Colors.textMuted : Colors.white;

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: bgColor }, !isComingSoon && styles.cardShadow]}>
        <View style={styles.topRow}>
          <View style={styles.titleBlock}>
            <Text style={[styles.sectionLabel, { color: isComingSoon ? Colors.textMuted : 'rgba(255,255,255,0.8)' }]}>
              SECTION {section.order}
            </Text>
            <Text style={[styles.sectionTitle, { color: textColor }]}>{section.title}</Text>
            <Text style={[styles.sectionDesc, { color: isComingSoon ? Colors.textMuted : 'rgba(255,255,255,0.85)' }]}>
              {section.description}
            </Text>
          </View>

          {isComingSoon ? (
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Soon</Text>
            </View>
          ) : isComplete ? (
            <View style={styles.completeBadge}>
              <Ionicons name="checkmark-circle" size={28} color={Colors.white} />
            </View>
          ) : (
            <Pressable
              style={styles.startButton}
              onPress={onStartPress}
              accessibilityLabel="Start section"
            >
              <Text style={[styles.startButtonText, { color: section.accentColor }]}>START</Text>
            </Pressable>
          )}
        </View>

        {!isComingSoon && totalCount > 0 && (
          <View style={styles.progressRow}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
            <Text style={styles.progressLabel}>{completedCount}/{totalCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
  },
  card: {
    borderRadius: Layout.radiusXl,
    padding: Spacing.base,
    gap: Spacing.md,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  titleBlock: {
    flex: 1,
    gap: 3,
  },
  sectionLabel: {
    fontFamily: Typography.fontFamily.extraBold,
    fontSize: Typography.fontSize.xs,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.lg,
  },
  sectionDesc: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.fontSize.sm * 1.4,
  },
  completeBadge: {
    paddingTop: 2,
  },
  startButton: {
    backgroundColor: Colors.white,
    borderRadius: Layout.radiusLg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  startButtonText: {
    fontFamily: Typography.fontFamily.extraBold,
    fontSize: Typography.fontSize.sm,
    letterSpacing: 0.5,
  },
  comingSoonBadge: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  comingSoonText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  progressTrack: {
    flex: 1,
    height: 7,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
  progressLabel: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255,255,255,0.9)',
    width: 28,
    textAlign: 'right',
  },
});

export default SectionHeader;
