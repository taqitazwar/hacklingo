import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../constants';

interface CountdownTimerProps {
  seconds: number;
  onExpire?: () => void;
  color?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ seconds, onExpire, color = Colors.textPrimary }) => {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire?.();
      return;
    }
    const timer = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  const urgent = remaining <= 10;

  return (
    <Text style={[styles.text, { color: urgent ? Colors.brandRed : color }]}>
      {String(Math.floor(remaining / 60)).padStart(2, '0')}:{String(remaining % 60).padStart(2, '0')}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.lg,
  },
});

export default CountdownTimer;
