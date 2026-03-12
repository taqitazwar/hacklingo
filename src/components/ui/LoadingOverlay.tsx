import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Modal } from 'react-native';
import { Colors, Typography } from '../../constants';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, message }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.box}>
        <ActivityIndicator size="large" color={Colors.green} />
        {message && <Text style={styles.text}>{message}</Text>}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  box: { backgroundColor: Colors.backgroundSecondary, borderRadius: 16, padding: 32, alignItems: 'center', gap: 16 },
  text: { color: Colors.textSecondary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.base },
});

export default LoadingOverlay;
