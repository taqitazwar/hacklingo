import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { Typography, Spacing } from '../../constants';

interface ReorderBlocksProps {
  shuffledBlocks: string[];
  onAnswer: (orderedBlocks: string[]) => void;
  disabled?: boolean;
}

const ReorderBlocks: React.FC<ReorderBlocksProps> = ({
  shuffledBlocks,
  onAnswer,
  disabled = false,
}) => {
  const [available, setAvailable] = useState<string[]>([...shuffledBlocks]);
  const [ordered, setOrdered] = useState<string[]>([]);

  const addBlock = (block: string, index: number) => {
    if (disabled) return;
    const newAvailable = [...available];
    newAvailable.splice(index, 1);
    const newOrdered = [...ordered, block];
    setAvailable(newAvailable);
    setOrdered(newOrdered);
    if (newAvailable.length === 0) {
      onAnswer(newOrdered);
    }
  };

  const removeBlock = (block: string, index: number) => {
    if (disabled) return;
    const newOrdered = [...ordered];
    newOrdered.splice(index, 1);
    setOrdered(newOrdered);
    setAvailable([...available, block]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your answer:</Text>
      <View style={styles.answerArea}>
        {ordered.length === 0 ? (
          <Text style={styles.placeholder}>Tap blocks below to order them</Text>
        ) : (
          ordered.map((block, i) => (
            <Pressable key={i} onPress={() => removeBlock(block, i)} style={styles.block}>
              <Text style={styles.blockText}>{block}</Text>
              <Ionicons name="close-circle" size={16} color={Colors.textMuted} />
            </Pressable>
          ))
        )}
      </View>

      <Text style={styles.label}>Blocks:</Text>
      <View style={styles.blocksContainer}>
        {available.map((block, i) => (
          <Pressable key={i} onPress={() => addBlock(block, i)} style={styles.availableBlock}>
            <Text style={styles.blockText}>{block}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: Spacing.md },
  label: {
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  answerArea: {
    minHeight: 60,
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 12,
    padding: Spacing.md,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.textMuted + '33',
  },
  placeholder: {
    color: Colors.textMuted,
    fontSize: Typography.size.sm,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  blocksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.blue + '44',
  },
  availableBlock: {
    backgroundColor: Colors.blue + '1A',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.blue + '44',
  },
  blockText: {
    fontSize: Typography.size.sm,
    color: Colors.textPrimary,
    fontFamily: 'monospace',
  },
});

export default ReorderBlocks;
