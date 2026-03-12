import React from 'react';
import { View, StyleSheet } from 'react-native';

// Placeholder for Lottie animations — would use lottie-react-native when installed
interface LottieWrapperProps {
  source: string;
  loop?: boolean;
  autoPlay?: boolean;
  size?: number;
  style?: object;
}

const LottieWrapper: React.FC<LottieWrapperProps> = ({ size = 120, style }) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]} />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LottieWrapper;
