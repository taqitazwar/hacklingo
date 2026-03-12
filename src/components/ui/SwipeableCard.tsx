import React, { useRef } from 'react';
import { View, PanResponder, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftColor?: string;
  rightColor?: string;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ children, onSwipeLeft, onSwipeRight }) => {
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: 0 });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        Animated.timing(position, { toValue: { x: SCREEN_WIDTH, y: 0 }, duration: 200, useNativeDriver: true }).start(() => {
          onSwipeRight?.();
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        Animated.timing(position, { toValue: { x: -SCREEN_WIDTH, y: 0 }, duration: 200, useNativeDriver: true }).start(() => {
          onSwipeLeft?.();
          position.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
      }
    },
  });

  const rotate = position.x.interpolate({ inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH], outputRange: ['-15deg', '0deg', '15deg'] });

  return (
    <Animated.View
      style={[styles.card, { transform: [{ translateX: position.x }, { rotate }] }]}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: { width: '100%' },
});

export default SwipeableCard;
