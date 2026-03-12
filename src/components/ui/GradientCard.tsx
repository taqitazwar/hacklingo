import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing } from '../../constants';

interface GradientCardProps {
  title: string;
  subtitle?: string;
  colors: [string, string];
  onPress?: () => void;
  icon?: string;
  rightElement?: React.ReactNode;
}

const GradientCard: React.FC<GradientCardProps> = ({ title, subtitle, colors, onPress, icon, rightElement }) => {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper onPress={onPress} activeOpacity={0.85}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
        <View style={styles.content}>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <View style={styles.text}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        {rightElement}
      </LinearGradient>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  icon: { fontSize: 28 },
  text: { flex: 1 },
  title: { color: '#FFFFFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  subtitle: { color: 'rgba(255,255,255,0.8)', fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm },
});

export default GradientCard;
