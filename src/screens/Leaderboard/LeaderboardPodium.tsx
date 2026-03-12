import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface PodiumEntry {
  rank: number;
  name: string;
  xp: number;
}

interface LeaderboardPodiumProps {
  top3: [PodiumEntry, PodiumEntry, PodiumEntry];
}

const PODIUM_HEIGHTS = [110, 80, 60];
const PODIUM_ORDER = [1, 0, 2]; // 2nd, 1st, 3rd display order

const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({ top3 }) => {
  const medals = ['🥇', '🥈', '🥉'];
  return (
    <View style={styles.container}>
      {PODIUM_ORDER.map((dataIdx, displayIdx) => {
        const entry = top3[dataIdx];
        const height = PODIUM_HEIGHTS[dataIdx];
        const isFirst = dataIdx === 0;
        return (
          <View key={dataIdx} style={styles.column}>
            <Text style={styles.medal}>{medals[dataIdx]}</Text>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{entry.name[0].toUpperCase()}</Text>
            </View>
            <Text style={styles.name} numberOfLines={1}>{entry.name}</Text>
            <Text style={styles.xp}>{entry.xp.toLocaleString()}</Text>
            <View style={[styles.podium, { height, backgroundColor: isFirst ? Colors.green : Colors.backgroundSecondary }]}>
              <Text style={styles.rank}>{dataIdx + 1}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: Spacing.sm, padding: Spacing.lg },
  column: { flex: 1, alignItems: 'center' },
  medal: { fontSize: 28, marginBottom: 4 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatarText: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  name: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.xs, marginBottom: 2 },
  xp: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: 10, marginBottom: 4 },
  podium: {
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: { color: '#FFF', fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.lg },
});

export default LeaderboardPodium;
