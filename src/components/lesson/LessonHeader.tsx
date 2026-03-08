import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { Spacing, Layout } from '../../constants';
import ProgressBar from '../ui/ProgressBar';

interface LessonHeaderProps {
  progress: number;
  hearts: number;
  onClose: () => void;
}

const MAX_HEARTS = 5;

const LessonHeader: React.FC<LessonHeaderProps> = ({ progress, hearts, onClose }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onClose}
        style={styles.closeButton}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityRole="button"
        accessibilityLabel="Close lesson"
      >
        <Ionicons name="close" size={22} color={Colors.textMuted} />
      </Pressable>

      <View style={styles.progressWrapper}>
        <ProgressBar
          progress={progress}
          height={14}
          fillColor={Colors.green}
          trackColor={Colors.borderLight}
        />
      </View>

      <View style={styles.heartsRow}>
        {Array.from({ length: MAX_HEARTS }).map((_, i) => (
          <Ionicons
            key={i}
            name={i < hearts ? 'heart' : 'heart-outline'}
            size={18}
            color={i < hearts ? Colors.red : Colors.borderMedium}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.backgroundPrimary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  closeButton: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressWrapper: {
    flex: 1,
  },
  heartsRow: {
    flexDirection: 'row',
    gap: 2,
  },
});

export default LessonHeader;
