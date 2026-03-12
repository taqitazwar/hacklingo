import React, { useRef } from 'react';
import { TouchableOpacity, Text, Animated, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants';

interface FloatingActionButtonProps {
  icon: string;
  onPress: () => void;
  color?: string;
  size?: number;
  style?: ViewStyle;
  label?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon, onPress, color = Colors.green, size = 56, style, label,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={[styles.container, style, { transform: [{ scale }] }]}>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: color, width: size, height: size, borderRadius: size / 2 }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={{ fontSize: size * 0.4 }}>{icon}</Text>
      </TouchableOpacity>
      {label && <Text style={styles.label}>{label}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 4 },
  btn: { justifyContent: 'center', alignItems: 'center', elevation: 6, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  label: { color: Colors.textSecondary, fontSize: 10 },
});

export default FloatingActionButton;
