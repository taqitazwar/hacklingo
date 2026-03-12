import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: 'top' | 'bottom';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, placement = 'top' }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        {children}
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setVisible(false)}>
          <View style={styles.tooltip}>
            <Text style={styles.content}>{content}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  tooltip: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
    maxWidth: 280,
    borderWidth: 1,
    borderColor: Colors.backgroundTertiary,
  },
  content: { color: Colors.textPrimary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm, lineHeight: 20 },
});

export default Tooltip;
