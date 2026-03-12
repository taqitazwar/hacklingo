import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const AccordionItemComponent: React.FC<AccordionItem & { defaultOpen?: boolean }> = ({ title, content, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const height = useRef(new Animated.Value(open ? 1 : 0)).current;

  const toggle = () => {
    setOpen(o => !o);
    Animated.spring(height, { toValue: open ? 0 : 1, useNativeDriver: false }).start();
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.header} onPress={toggle}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.arrow, open && styles.arrowOpen]}>›</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.body, { opacity: height, maxHeight: height.interpolate({ inputRange: [0, 1], outputRange: [0, 200] }) }]}>
        <Text style={styles.content}>{content}</Text>
      </Animated.View>
    </View>
  );
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item, i) => <AccordionItemComponent key={i} {...item} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 1 },
  item: { backgroundColor: Colors.backgroundSecondary, overflow: 'hidden' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.md },
  title: { color: Colors.textPrimary, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.base, flex: 1 },
  arrow: { color: Colors.textMuted, fontSize: 22, transform: [{ rotate: '0deg' }] },
  arrowOpen: { transform: [{ rotate: '90deg' }] },
  body: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, overflow: 'hidden' },
  content: { color: Colors.textSecondary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm, lineHeight: 20 },
});

export default Accordion;
