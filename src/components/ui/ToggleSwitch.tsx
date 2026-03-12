import React, { useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Colors } from '../../constants';

interface ToggleSwitchProps {
  value: boolean;
  onToggle: (value: boolean) => void;
  activeColor?: string;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onToggle, activeColor = Colors.green, disabled }) => {
  const translateX = useRef(new Animated.Value(value ? 20 : 2)).current;

  const toggle = () => {
    if (disabled) return;
    const newValue = !value;
    Animated.spring(translateX, {
      toValue: newValue ? 20 : 2,
      useNativeDriver: true,
    }).start();
    onToggle(newValue);
  };

  return (
    <TouchableOpacity
      style={[styles.track, { backgroundColor: value ? activeColor : Colors.backgroundTertiary }]}
      onPress={toggle}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 46,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.textPrimary,
  },
});

export default ToggleSwitch;
