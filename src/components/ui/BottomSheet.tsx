import React, { useEffect, useRef } from 'react';
import { View, Modal, Animated, StyleSheet, Dimensions, TouchableWithoutFeedback, PanResponder } from 'react-native';
import { Colors } from '../../constants';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ visible, onClose, children, height = SCREEN_HEIGHT * 0.5 }) => {
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, tension: 80, friction: 12 }).start();
    } else {
      Animated.timing(translateY, { toValue: height, duration: 250, useNativeDriver: true }).start();
    }
  }, [visible]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, g) => { if (g.dy > 0) translateY.setValue(g.dy); },
    onPanResponderRelease: (_, g) => {
      if (g.dy > height * 0.3) { onClose(); }
      else { Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start(); }
    },
  });

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.sheet, { height, transform: [{ translateY }] }]}>
        <View style={styles.handle} {...panResponder.panHandlers} />
        {children}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 2,
    marginVertical: 12,
  },
});

export default BottomSheet;
