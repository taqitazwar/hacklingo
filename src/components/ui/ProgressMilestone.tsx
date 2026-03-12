import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface MilestoneProps {
  value: number;
  label: string;
  achieved: boolean;
  icon: string;
}

const ProgressMilestone: React.FC<MilestoneProps> = ({ value, label, achieved, icon }) => (
  <View style={styles.container}>
    <View style={[styles.iconBox, achieved && styles.achieved]}>
      <Text style={[styles.icon, !achieved && styles.faded]}>{icon}</Text>
    </View>
    <Text style={[styles.value, achieved && { color: Colors.green }]}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 4 },
  iconBox: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: Colors.backgroundTertiary,
  },
  achieved: { borderColor: Colors.green, backgroundColor: Colors.greenLight },
  icon: { fontSize: 24 },
  faded: { opacity: 0.4 },
  value: { color: Colors.textMuted, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.sm },
  label: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: 10 },
});

export default ProgressMilestone;
