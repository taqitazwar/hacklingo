import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

interface ChallengeProgressProps {
  total: number;
  current: number;
  correctCount: number;
}

const ChallengeProgress: React.FC<ChallengeProgressProps> = ({
  total,
  current,
  correctCount,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }, (_, i) => {
        const isDone = i < current;
        const isCorrect = i < correctCount;
        const isCurrent = i === current;

        return (
          <View
            key={i}
            style={[
              styles.dot,
              isDone && (isCorrect ? styles.dotCorrect : styles.dotWrong),
              isCurrent && styles.dotCurrent,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.backgroundTertiary,
  },
  dotCorrect: { backgroundColor: Colors.green },
  dotWrong: { backgroundColor: Colors.brandRed },
  dotCurrent: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.blue,
  },
});

export default ChallengeProgress;
