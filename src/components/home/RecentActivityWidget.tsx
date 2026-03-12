import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface Activity {
  lessonTitle: string;
  xp: number;
  date: string;
}

interface RecentActivityWidgetProps {
  activities: Activity[];
}

const RecentActivityWidget: React.FC<RecentActivityWidgetProps> = ({ activities }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recent Activity</Text>
      {activities.length === 0 ? (
        <Text style={styles.empty}>No recent activity. Start learning!</Text>
      ) : (
        activities.slice(0, 5).map((a, i) => (
          <View key={i} style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.lesson} numberOfLines={1}>{a.lessonTitle}</Text>
            <Text style={styles.xp}>+{a.xp} XP</Text>
            <Text style={styles.date}>{a.date}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: Spacing.md },
  heading: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base, marginBottom: Spacing.md },
  empty: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.green },
  lesson: { flex: 1, color: Colors.textSecondary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.sm },
  xp: { color: Colors.green, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.xs },
  date: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.xs },
});

export default RecentActivityWidget;
