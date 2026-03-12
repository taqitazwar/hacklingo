import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface InfoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  accentColor?: string;
  icon?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, subtitle, accentColor = Colors.green, icon }) => {
  return (
    <View style={styles.card}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.value, { color: accentColor }]}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    flex: 1,
  },
  icon: { fontSize: 24, marginBottom: 4 },
  value: {
    fontSize: Typography.sizes['2xl'],
    fontFamily: Typography.fonts.bold,
  },
  title: {
    color: Colors.textSecondary,
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
});

export default InfoCard;
