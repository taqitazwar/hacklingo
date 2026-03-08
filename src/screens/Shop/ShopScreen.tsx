import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { Typography, Spacing } from '../../constants';
import { useProgressStore } from '../../store';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  type: 'heart' | 'streak_freeze' | 'xp_boost' | 'hint';
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'heart_refill',
    name: 'Heart Refill',
    description: 'Restore all 5 hearts instantly',
    icon: '❤️',
    cost: 350,
    type: 'heart',
  },
  {
    id: 'streak_freeze',
    name: 'Streak Freeze',
    description: 'Protect your streak for one missed day',
    icon: '🧊',
    cost: 200,
    type: 'streak_freeze',
  },
  {
    id: 'xp_boost',
    name: 'XP Boost',
    description: 'Double XP for the next 30 minutes',
    icon: '⚡',
    cost: 100,
    type: 'xp_boost',
  },
  {
    id: 'hint_pack',
    name: 'Hint Pack',
    description: 'Get 3 extra hints for tough challenges',
    icon: '💡',
    cost: 75,
    type: 'hint',
  },
];

const ShopScreen: React.FC = () => {
  const { totalXp } = useProgressStore();
  const gems = Math.floor(totalXp / 10); // 1 gem per 10 XP

  const handlePurchase = (item: ShopItem) => {
    if (gems < item.cost) {
      Alert.alert('Not enough gems', `You need ${item.cost - gems} more gems.`);
      return;
    }
    Alert.alert('Purchased!', `${item.name} has been added to your inventory.`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Shop</Text>
          <View style={styles.gemBadge}>
            <Text style={styles.gemIcon}>💎</Text>
            <Text style={styles.gemCount}>{gems}</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          Spend your gems on power-ups to enhance your learning.
        </Text>

        <View style={styles.grid}>
          {SHOP_ITEMS.map((item) => (
            <Pressable
              key={item.id}
              style={styles.card}
              onPress={() => handlePurchase(item)}
            >
              <Text style={styles.itemIcon}>{item.icon}</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
              <View style={styles.costRow}>
                <Text style={styles.gemIconSmall}>💎</Text>
                <Text style={styles.itemCost}>{item.cost}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.backgroundPrimary },
  scroll: { padding: Spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.size.xxl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  gemBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.blue + '22',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  gemIcon: { fontSize: 18 },
  gemCount: {
    fontSize: Typography.size.md,
    fontWeight: '700',
    color: Colors.blue,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.backgroundTertiary,
  },
  itemIcon: { fontSize: 36 },
  itemName: {
    fontSize: Typography.size.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  itemDesc: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  costRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.backgroundPrimary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: Spacing.sm,
  },
  gemIconSmall: { fontSize: 14 },
  itemCost: {
    fontSize: Typography.size.md,
    fontWeight: '700',
    color: Colors.blue,
  },
});

export default ShopScreen;
