import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../constants';

interface HeartDisplayProps {
  hearts: number;
  maxHearts?: number;
}

const HeartDisplay: React.FC<HeartDisplayProps> = ({ hearts, maxHearts = 5 }) => {
  const shakes = useRef(hearts < maxHearts ? Array.from({ length: maxHearts }, () => new Animated.Value(0)) : []).current;
  const prevHearts = useRef(hearts);

  useEffect(() => {
    if (hearts < prevHearts.current) {
      const lostIndex = hearts;
      Animated.sequence([
        Animated.timing(shakes[lostIndex], { toValue: 6, duration: 50, useNativeDriver: true }),
        Animated.timing(shakes[lostIndex], { toValue: -6, duration: 50, useNativeDriver: true }),
        Animated.timing(shakes[lostIndex], { toValue: 4, duration: 50, useNativeDriver: true }),
        Animated.timing(shakes[lostIndex], { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
    prevHearts.current = hearts;
  }, [hearts]);

  return (
    <View style={styles.container}>
      {Array.from({ length: maxHearts }, (_, i) => (
        <Animated.Text
          key={i}
          style={[
            styles.heart,
            { opacity: i < hearts ? 1 : 0.25 },
            shakes[i] && { transform: [{ translateX: shakes[i] }] },
          ]}
        >
          ❤️
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 4 },
  heart: { fontSize: 20 },
});

export default HeartDisplay;
