import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../constants';

const FEATURES = [
  { icon: '♾️', text: 'Unlimited hearts' },
  { icon: '🔒', text: 'All premium lessons' },
  { icon: '📊', text: 'Advanced progress analytics' },
  { icon: '🎯', text: 'Personalized learning path' },
  { icon: '🚫', text: 'Ad-free experience' },
  { icon: '⬇️', text: 'Offline mode' },
];

interface PaywallScreenProps {
  onClose?: () => void;
  onSubscribe?: (plan: string) => void;
}

const PaywallScreen: React.FC<PaywallScreenProps> = ({ onClose, onSubscribe }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.crown}>👑</Text>
        <Text style={styles.title}>Go Premium</Text>
        <Text style={styles.subtitle}>Unlock the full HackLingo experience</Text>
        <View style={styles.features}>
          {FEATURES.map(f => (
            <View key={f.text} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>
        <View style={styles.plans}>
          <TouchableOpacity style={[styles.plan, styles.popularPlan]} onPress={() => onSubscribe?.('annual')}>
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>Most Popular</Text>
            </View>
            <Text style={styles.planPrice}>$4.99</Text>
            <Text style={styles.planPeriod}>per month, billed annually</Text>
            <Text style={styles.planSave}>Save 50%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.plan} onPress={() => onSubscribe?.('monthly')}>
            <Text style={styles.planPrice}>$9.99</Text>
            <Text style={styles.planPeriod}>per month</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.legal}>Cancel anytime. Prices in USD.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.backgroundPrimary },
  closeBtn: { position: 'absolute', top: 52, right: Spacing.lg, zIndex: 10 },
  closeText: { color: Colors.textMuted, fontSize: 20 },
  content: { padding: Spacing.xl, alignItems: 'center' },
  crown: { fontSize: 64, marginBottom: Spacing.md },
  title: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes['3xl'],
    marginBottom: Spacing.sm,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.base,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  features: { width: '100%', gap: Spacing.md, marginBottom: Spacing.xl },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  featureIcon: { fontSize: 24, width: 36 },
  featureText: { color: Colors.textPrimary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.base },
  plans: { width: '100%', gap: Spacing.sm, marginBottom: Spacing.lg },
  plan: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  popularPlan: {
    borderWidth: 2,
    borderColor: Colors.green,
    backgroundColor: Colors.greenLight,
  },
  popularBadge: {
    backgroundColor: Colors.green,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: Spacing.sm,
  },
  popularText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.xs },
  planPrice: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes['2xl'] },
  planPeriod: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm },
  planSave: { color: Colors.green, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.sm, marginTop: 4 },
  legal: { color: Colors.textMuted, fontSize: Typography.sizes.xs, textAlign: 'center' },
});

export default PaywallScreen;
