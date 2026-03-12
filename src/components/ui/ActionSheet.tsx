import React from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface ActionSheetOption {
  label: string;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  title?: string;
  options: ActionSheetOption[];
  onDismiss: () => void;
}

const ActionSheet: React.FC<ActionSheetProps> = ({ visible, title, options, onDismiss }) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.sheet}>
        {title && <Text style={styles.title}>{title}</Text>}
        {options.map((opt, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.option, i < options.length - 1 && styles.optionBorder, opt.disabled && styles.disabled]}
            onPress={() => { opt.onPress(); onDismiss(); }}
            disabled={opt.disabled}
          >
            <Text style={[styles.optionText, opt.destructive && { color: Colors.brandRed }]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.cancel} onPress={onDismiss}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: {
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.lg,
    paddingBottom: 40,
  },
  title: {
    color: Colors.textMuted,
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  option: { paddingVertical: Spacing.md },
  optionBorder: { borderBottomWidth: 1, borderBottomColor: Colors.backgroundTertiary },
  optionText: { color: Colors.textPrimary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.base, textAlign: 'center' },
  disabled: { opacity: 0.4 },
  cancel: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelText: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
});

export default ActionSheet;
