import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface SectionProgressCardProps {
  title: string;
  icon: string;
  completedLessons: number;
  totalLessons: number;
  color: string;
}

const SectionProgressCard: React.FC<SectionProgressCardProps> = ({
  title, icon, completedLessons, totalLessons, color,
}) => {
  const progress = totalLessons > 0 ? completedLessons / totalLessons : 0;

  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: color + '22' }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{completedLessons}/{totalLessons} lessons</Text>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${progress * 100}%`, backgroundColor: color }]} />
        </View>
      </View>
      <Text style={[styles.percent, { color }]}>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  iconBox: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 22 },
  content: { flex: 1 },
  title: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  count: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.xs, marginBottom: 4 },
  barTrack: { height: 4, backgroundColor: Colors.backgroundTertiary, borderRadius: 2, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 2 },
  percent: { fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.sm },
});

export default SectionProgressCard;
