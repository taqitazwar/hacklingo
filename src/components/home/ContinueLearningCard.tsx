import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface ContinueLearningCardProps {
  lessonTitle: string;
  sectionTitle: string;
  progress: number;
  xpReward: number;
  onPress: () => void;
}

const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({
  lessonTitle,
  sectionTitle,
  progress,
  xpReward,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.top}>
        <View>
          <Text style={styles.section}>{sectionTitle}</Text>
          <Text style={styles.lesson}>{lessonTitle}</Text>
        </View>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{xpReward} XP</Text>
        </View>
      </View>
      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.min(100, progress * 100)}%` }]} />
        </View>
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>Continue →</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.backgroundTertiary,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  section: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.xs },
  lesson: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.lg },
  xpBadge: {
    backgroundColor: Colors.greenLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  xpText: { color: Colors.green, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.xs },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: Colors.green, borderRadius: 3 },
  progressText: { color: Colors.textMuted, fontSize: Typography.sizes.xs, fontFamily: Typography.fonts.regular },
  btn: {
    backgroundColor: Colors.green,
    borderRadius: 10,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  btnText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
});

export default ContinueLearningCard;
