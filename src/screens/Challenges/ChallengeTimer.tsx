import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../constants';

interface ChallengeTimerProps {
  totalSeconds: number;
  onExpire: () => void;
}

const ChallengeTimer: React.FC<ChallengeTimerProps> = ({ totalSeconds, onExpire }) => {
  const [remaining, setRemaining] = useState(totalSeconds);
  const progressWidth = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progressWidth, {
      toValue: 0,
      duration: totalSeconds * 1000,
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const urgent = remaining <= 10;
  const barColor = urgent ? Colors.brandRed : remaining <= 20 ? Colors.orange : Colors.green;

  return (
    <View style={styles.container}>
      <Text style={[styles.time, urgent && styles.urgent]}>{remaining}s</Text>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: progressWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }), backgroundColor: barColor }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 4 },
  time: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.sm, textAlign: 'right' },
  urgent: { color: Colors.brandRed },
  track: { height: 4, backgroundColor: Colors.backgroundTertiary, borderRadius: 2, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 2 },
});

export default ChallengeTimer;
