import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { ReorderBlocksChallenge as ReorderBlocksChallengeType } from '../../types';
import { Colors, Typography, Spacing, Layout } from '../../constants';

interface Props {
  challenge: ReorderBlocksChallengeType;
  answerResult: 'correct' | 'incorrect' | 'unanswered';
  onOrderChange: (newOrder: string[]) => void;
}

/**
 * Tap-to-place reorder challenge.
 * User taps blocks from the source bank to build the ordered answer.
 * Tapping a placed block returns it to the bank.
 */
const ReorderBlocksChallenge: React.FC<Props> = ({
  challenge,
  answerResult,
  onOrderChange,
}) => {
  const [placedBlocks, setPlacedBlocks] = useState<string[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<string[]>(
    [...challenge.shuffledBlocks]
  );

  const isAnswered = answerResult !== 'unanswered';

  const placeBlock = (block: string) => {
    if (isAnswered) return;
    const newAvailable = availableBlocks.filter((b) => b !== block);
    const newPlaced = [...placedBlocks, block];
    setAvailableBlocks(newAvailable);
    setPlacedBlocks(newPlaced);
    onOrderChange(newPlaced);
  };

  const removeBlock = (block: string, placedIndex: number) => {
    if (isAnswered) return;
    const newPlaced = placedBlocks.filter((_, i) => i !== placedIndex);
    const newAvailable = [...availableBlocks, block];
    setAvailableBlocks(newAvailable);
    setPlacedBlocks(newPlaced);
    onOrderChange(newPlaced);
  };

  const getPlacedBlockStyle = (block: string, index: number) => {
    if (answerResult === 'unanswered') return styles.placedBlockDefault;
    const isCorrect = challenge.correctOrder[index] === block;
    return isCorrect ? styles.placedBlockCorrect : styles.placedBlockIncorrect;
  };

  const getPlacedBlockTextStyle = (block: string, index: number) => {
    if (answerResult === 'unanswered') return styles.blockTextDefault;
    const isCorrect = challenge.correctOrder[index] === block;
    return isCorrect ? styles.blockTextCorrect : styles.blockTextIncorrect;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>{challenge.instruction}</Text>

      {/* Answer zone */}
      <View style={styles.answerZone}>
        <Text style={styles.zonelabel}>Your answer</Text>
        <ScrollView
          style={styles.placedContainer}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
        >
          {placedBlocks.length === 0 ? (
            <Text style={styles.emptyPlaceholder}>Tap blocks below to place them here</Text>
          ) : (
            placedBlocks.map((block, index) => (
              <Pressable
                key={`placed-${index}`}
                onPress={() => removeBlock(block, index)}
                style={[styles.codeBlock, getPlacedBlockStyle(block, index)]}
              >
                <Text style={[styles.blockText, getPlacedBlockTextStyle(block, index)]}>
                  {block}
                </Text>
              </Pressable>
            ))
          )}
        </ScrollView>
      </View>

      {/* Source bank */}
      <View style={styles.bankContainer}>
        <Text style={styles.zonelabel}>Available blocks</Text>
        <View style={styles.bankBlocks}>
          {availableBlocks.map((block, index) => (
            <Pressable
              key={`bank-${index}`}
              onPress={() => placeBlock(block)}
              style={[styles.codeBlock, styles.bankBlock]}
              disabled={isAnswered}
            >
              <Text style={[styles.blockText, styles.blockTextDefault]}>{block}</Text>
            </Pressable>
          ))}
          {availableBlocks.length === 0 && (
            <Text style={styles.emptyPlaceholder}>All blocks placed</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Spacing.base,
  },
  instruction: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: Typography.fontSize.lg * Typography.lineHeight.normal,
  },
  answerZone: {
    flex: 1,
    gap: Spacing.xs,
  },
  zonelabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wider,
  },
  placedContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Layout.radiusMd,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    minHeight: 80,
    padding: Spacing.sm,
    gap: Spacing.xs,
  },
  bankContainer: {
    gap: Spacing.xs,
  },
  bankBlocks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  codeBlock: {
    borderRadius: Layout.radiusSm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1.5,
    marginBottom: Spacing.xs,
  },
  placedBlockDefault: {
    backgroundColor: Colors.backgroundSecondary,
    borderColor: Colors.borderMedium,
  },
  placedBlockCorrect: {
    backgroundColor: Colors.successLight,
    borderColor: Colors.success,
  },
  placedBlockIncorrect: {
    backgroundColor: Colors.errorLight,
    borderColor: Colors.error,
  },
  bankBlock: {
    backgroundColor: Colors.codeBackground,
    borderColor: Colors.codeBackground,
  },
  blockText: {
    fontFamily: Typography.fontFamily.mono,
    fontSize: Typography.fontSize.sm,
  },
  blockTextDefault: {
    color: Colors.codeText,
  },
  blockTextCorrect: {
    color: Colors.successDark,
  },
  blockTextIncorrect: {
    color: Colors.errorDark,
  },
  emptyPlaceholder: {
    color: Colors.textMuted,
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
    paddingVertical: Spacing.base,
  },
});

export default ReorderBlocksChallenge;
