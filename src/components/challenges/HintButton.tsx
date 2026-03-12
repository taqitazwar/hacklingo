import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface HintButtonProps {
  hint: string;
  cost?: number;
  onUse?: () => void;
}

const HintButton: React.FC<HintButtonProps> = ({ hint, cost = 1, onUse }) => {
  const [revealed, setRevealed] = useState(false);

  const handlePress = () => {
    if (!revealed) {
      setRevealed(true);
      onUse?.();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={handlePress} disabled={revealed}>
        <Text style={styles.btnIcon}>💡</Text>
        <Text style={styles.btnText}>{revealed ? 'Hint' : `Hint (-${cost}❤️)`}</Text>
      </TouchableOpacity>
      {revealed && (
        <View style={styles.hintBox}>
          <Text style={styles.hintText}>{hint}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: Spacing.sm },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.yellow,
  },
  btnIcon: { fontSize: 16 },
  btnText: { color: Colors.yellow, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.sm },
  hintBox: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.yellow,
  },
  hintText: { color: Colors.textSecondary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm },
});

export default HintButton;
