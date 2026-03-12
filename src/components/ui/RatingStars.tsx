import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RatingStarsProps {
  value: number;
  max?: number;
  onRate?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({ value, max = 5, onRate, size = 24, readonly }) => {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <View style={styles.container}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < display;
        return (
          <TouchableOpacity
            key={i}
            onPress={() => !readonly && onRate?.(i + 1)}
            disabled={readonly}
          >
            <Text style={{ fontSize: size, color: filled ? '#FFD700' : '#4D6B85' }}>★</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 2 },
});

export default RatingStars;
