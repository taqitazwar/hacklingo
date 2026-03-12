import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../constants';

interface SettingRow {
  label: string;
  value?: string;
  toggle?: boolean;
  onPress?: () => void;
  danger?: boolean;
}

const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const sections = [
    {
      title: 'Account',
      rows: [
        { label: 'Username', value: 'coder_dev' },
        { label: 'Email', value: 'user@email.com' },
        { label: 'Change Password' },
      ] as SettingRow[],
    },
    {
      title: 'Preferences',
      rows: [
        { label: 'Daily Goal', value: '10 min' },
        { label: 'Learning Language', value: 'Python' },
      ] as SettingRow[],
    },
    {
      title: 'Notifications',
      rows: [
        { label: 'Push Notifications', toggle: true },
        { label: 'Streak Reminders', toggle: true },
      ] as SettingRow[],
    },
    {
      title: 'About',
      rows: [
        { label: 'Version', value: '1.0.0' },
        { label: 'Privacy Policy' },
        { label: 'Terms of Service' },
      ] as SettingRow[],
    },
    {
      title: 'Danger Zone',
      rows: [
        { label: 'Reset Progress', danger: true },
        { label: 'Delete Account', danger: true },
      ] as SettingRow[],
    },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Settings</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {sections.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.card}>
              {section.rows.map((row, i) => (
                <TouchableOpacity
                  key={row.label}
                  style={[styles.row, i < section.rows.length - 1 && styles.rowBorder]}
                  onPress={row.onPress}
                >
                  <Text style={[styles.rowLabel, row.danger && { color: Colors.brandRed }]}>{row.label}</Text>
                  {row.value && <Text style={styles.rowValue}>{row.value}</Text>}
                  {!row.value && !row.toggle && <Text style={styles.chevron}>›</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.backgroundPrimary },
  title: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes['2xl'],
    padding: Spacing.lg,
  },
  section: { marginBottom: Spacing.lg, paddingHorizontal: Spacing.lg },
  sectionTitle: {
    color: Colors.textMuted,
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.backgroundTertiary },
  rowLabel: { color: Colors.textPrimary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.base },
  rowValue: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm },
  chevron: { color: Colors.textMuted, fontSize: 20 },
});

export default SettingsScreen;
