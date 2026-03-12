import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface Tab {
  key: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeKey: string;
  onPress: (key: string) => void;
  accentColor?: string;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeKey, onPress, accentColor = Colors.green }) => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const active = tab.key === activeKey;
        return (
          <TouchableOpacity key={tab.key} style={styles.tab} onPress={() => onPress(tab.key)}>
            <Text style={[styles.label, active && { color: accentColor }]}>{tab.label}</Text>
            {active && <View style={[styles.indicator, { backgroundColor: accentColor }]} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundTertiary,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  label: {
    color: Colors.textMuted,
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.sm,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 2,
    borderRadius: 1,
  },
});

export default TabBar;
