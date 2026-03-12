import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../constants';

interface Friend {
  id: string;
  name: string;
  streak: number;
  xp: number;
  level: number;
}

const MOCK_FRIENDS: Friend[] = [
  { id: '1', name: 'Alex K.', streak: 12, xp: 4800, level: 8 },
  { id: '2', name: 'Sam T.', streak: 7, xp: 3200, level: 6 },
  { id: '3', name: 'Jordan M.', streak: 30, xp: 9100, level: 14 },
  { id: '4', name: 'Riley B.', streak: 3, xp: 1400, level: 3 },
  { id: '5', name: 'Casey W.', streak: 21, xp: 6700, level: 11 },
];

const FriendsScreen: React.FC = () => {
  const [tab, setTab] = useState<'friends' | 'add'>('friends');

  const renderFriend = ({ item, index }: { item: Friend; index: number }) => (
    <View style={styles.friendCard}>
      <View style={styles.rank}>
        <Text style={styles.rankText}>#{index + 1}</Text>
      </View>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.stats}>Lvl {item.level} · {item.xp.toLocaleString()} XP</Text>
      </View>
      <View style={styles.streak}>
        <Text style={styles.streakEmoji}>🔥</Text>
        <Text style={styles.streakCount}>{item.streak}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Friends</Text>
      <View style={styles.tabs}>
        {(['friends', 'add'] as const).map(t => (
          <TouchableOpacity key={t} style={[styles.tab, tab === t && styles.activeTab]} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.activeTabText]}>
              {t === 'friends' ? 'My Friends' : 'Add Friends'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {tab === 'friends' ? (
        <FlatList
          data={MOCK_FRIENDS}
          renderItem={renderFriend}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.addSection}>
          <Text style={styles.addText}>Share your code to add friends</Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>HACK-2024-XYZ</Text>
          </View>
        </View>
      )}
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
  tabs: { flexDirection: 'row', paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomColor: Colors.green },
  tabText: { color: Colors.textMuted, fontFamily: Typography.fonts.medium },
  activeTabText: { color: Colors.green },
  list: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  rank: { width: 28 },
  rankText: { color: Colors.textMuted, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.sm },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.lg },
  info: { flex: 1 },
  name: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  stats: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.xs },
  streak: { alignItems: 'center' },
  streakEmoji: { fontSize: 18 },
  streakCount: { color: Colors.orange, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.sm },
  addSection: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.lg },
  addText: { color: Colors.textSecondary, fontFamily: Typography.fonts.regular },
  codeBox: {
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.green,
  },
  codeText: { color: Colors.green, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.xl, letterSpacing: 4 },
});

export default FriendsScreen;
