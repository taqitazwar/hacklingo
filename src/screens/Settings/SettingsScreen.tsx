import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';
import { useProgressStore } from '../../store';

type SettingsNav = StackNavigationProp<RootStackParamList, 'Settings'>;
interface Props { navigation: SettingsNav; }

interface SettingRowProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  value?: boolean;
  onToggle?: (v: boolean) => void;
  onPress?: () => void;
  iconColor?: string;
  destructive?: boolean;
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon, label, value, onToggle, onPress, iconColor = Colors.textSecondary, destructive = false,
}) => (
  <Pressable
    style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    onPress={onPress}
    disabled={!onPress && value === undefined}
  >
    <View style={styles.rowLeft}>
      <Ionicons name={icon} size={20} color={destructive ? Colors.red : iconColor} />
      <Text style={[styles.rowLabel, destructive && styles.rowLabelDestructive]}>{label}</Text>
    </View>
    {onToggle !== undefined && value !== undefined ? (
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: Colors.backgroundTertiary, true: Colors.brandRed }}
        thumbColor={Colors.textPrimary}
      />
    ) : (
      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
    )}
  </Pressable>
);

const SectionLabel: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.sectionLabel}>{title}</Text>
);

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const resetProgress = useProgressStore((state) => state.resetProgress);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'This will delete all your XP, completed lessons, and streak data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetProgress();
            navigation.navigate('MainTabs');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundPrimary} />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Sound & Haptics */}
        <SectionLabel title="Experience" />
        <View style={styles.card}>
          <SettingRow
            icon="volume-high"
            label="Sound Effects"
            value={soundEnabled}
            onToggle={setSoundEnabled}
            iconColor={Colors.blue}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="phone-portrait"
            label="Haptic Feedback"
            value={hapticsEnabled}
            onToggle={setHapticsEnabled}
            iconColor={Colors.teal}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="flash-sharp"
            label="Auto-advance on Correct"
            value={autoAdvance}
            onToggle={setAutoAdvance}
            iconColor={Colors.yellow}
          />
        </View>

        {/* Notifications */}
        <SectionLabel title="Notifications" />
        <View style={styles.card}>
          <SettingRow
            icon="notifications"
            label="Daily Reminder"
            value={dailyReminder}
            onToggle={setDailyReminder}
            iconColor={Colors.orange}
          />
        </View>

        {/* Account */}
        <SectionLabel title="Account" />
        <View style={styles.card}>
          <SettingRow
            icon="refresh"
            label="Reset Progress"
            onPress={handleResetProgress}
            destructive
          />
        </View>

        {/* App info */}
        <SectionLabel title="About" />
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
        </View>

        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.xl,
    color: Colors.textPrimary,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: Spacing.base,
  },
  sectionLabel: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Layout.radiusMd,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  rowPressed: {
    backgroundColor: Colors.backgroundTertiary,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  rowLabel: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  rowLabelDestructive: {
    color: Colors.red,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  infoLabel: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  infoValue: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.base,
    color: Colors.textMuted,
  },
});

export default SettingsScreen;
