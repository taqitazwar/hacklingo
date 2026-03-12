import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface HomeHeaderProps {
  username: string;
  streak: number;
  hearts: number;
  xp: number;
  onStreakPress?: () => void;
  onHeartsPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ username, streak, hearts, xp, onStreakPress, onHeartsPress }) => (
  <View style={styles.header}>
    <Text style={styles.greeting}>Hello, {username}! 👋</Text>
    <View style={styles.stats}>
      <TouchableOpacity style={styles.stat} onPress={onStreakPress}>
        <Text style={styles.icon}>🔥</Text>
        <Text style={[styles.value, { color: Colors.orange }]}>{streak}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.stat} onPress={onHeartsPress}>
        <Text style={styles.icon}>❤️</Text>
        <Text style={[styles.value, { color: Colors.brandRed }]}>{hearts}</Text>
      </TouchableOpacity>
      <View style={styles.stat}>
        <Text style={styles.icon}>⚡</Text>
        <Text style={[styles.value, { color: Colors.green }]}>{xp}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.lg },
  greeting: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.lg, flex: 1 },
  stats: { flexDirection: 'row', gap: Spacing.md },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  icon: { fontSize: 18 },
  value: { fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
});

export default HomeHeader;
