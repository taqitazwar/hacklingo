import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface DragDropBlocksProps {
  blocks: string[];
  correctOrder: string[];
  onComplete: (correct: boolean) => void;
}

const DragDropBlocks: React.FC<DragDropBlocksProps> = ({ blocks, correctOrder, onComplete }) => {
  const [placed, setPlaced] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<string[]>([...blocks].sort(() => Math.random() - 0.5));
  const [submitted, setSubmitted] = useState(false);

  const placeBlock = (block: string) => {
    if (submitted) return;
    setRemaining(r => r.filter(b => b !== block));
    setPlaced(p => [...p, block]);
  };

  const removeBlock = (block: string, index: number) => {
    if (submitted) return;
    setPlaced(p => p.filter((_, i) => i !== index));
    setRemaining(r => [...r, block]);
  };

  const handleCheck = () => {
    setSubmitted(true);
    const correct = placed.every((b, i) => b === correctOrder[i]) && placed.length === correctOrder.length;
    onComplete(correct);
  };

  const isCorrect = (block: string, index: number) => block === correctOrder[index];

  return (
    <View style={styles.container}>
      <View style={styles.dropZone}>
        {placed.length === 0 && <Text style={styles.placeholder}>Tap blocks to place them here</Text>}
        {placed.map((block, i) => (
          <TouchableOpacity
            key={`${block}-${i}`}
            style={[styles.block, submitted && (isCorrect(block, i) ? styles.correct : styles.incorrect)]}
            onPress={() => removeBlock(block, i)}
          >
            <Text style={styles.blockText}>{block}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.source}>
        {remaining.map((block, i) => (
          <TouchableOpacity key={`${block}-${i}`} style={styles.block} onPress={() => placeBlock(block)}>
            <Text style={styles.blockText}>{block}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {!submitted && placed.length === correctOrder.length && (
        <TouchableOpacity style={styles.checkBtn} onPress={handleCheck}>
          <Text style={styles.checkText}>Check Answer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: Spacing.md, gap: Spacing.lg },
  dropZone: {
    minHeight: 80,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    borderWidth: 2,
    borderColor: Colors.backgroundTertiary,
    borderStyle: 'dashed',
    alignItems: 'flex-start',
  },
  placeholder: {
    color: Colors.textMuted,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    alignSelf: 'center',
    margin: 'auto' as any,
  },
  source: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  block: {
    backgroundColor: Colors.backgroundTertiary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  blockText: { color: Colors.textPrimary, fontFamily: 'monospace', fontSize: Typography.sizes.sm },
  correct: { backgroundColor: Colors.greenLight, borderWidth: 1, borderColor: Colors.green },
  incorrect: { backgroundColor: Colors.redLight, borderWidth: 1, borderColor: Colors.brandRed },
  checkBtn: { backgroundColor: Colors.green, borderRadius: 12, padding: Spacing.md, alignItems: 'center' },
  checkText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
});

export default DragDropBlocks;
