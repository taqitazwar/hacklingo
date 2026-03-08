import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { Typography, Spacing } from '../../constants';

interface Notification {
  id: string;
  title: string;
  body: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Streak at risk!',
    body: 'You have not practiced today. Keep your 7-day streak alive!',
    icon: 'flame',
    color: Colors.orange,
    time: '2h ago',
    read: false,
  },
  {
    id: '2',
    title: 'New lesson unlocked',
    body: 'Closures & Higher-Order Functions is now available.',
    icon: 'lock-open',
    color: Colors.green,
    time: '1d ago',
    read: false,
  },
  {
    id: '3',
    title: 'Achievement earned!',
    body: 'You earned "Week Warrior" — 7-day streak!',
    icon: 'trophy',
    color: Colors.yellow,
    time: '3d ago',
    read: true,
  },
  {
    id: '4',
    title: 'Daily reminder',
    body: 'Time for your daily Python practice!',
    icon: 'time',
    color: Colors.blue,
    time: '4d ago',
    read: true,
  },
];

const NotificationsScreen: React.FC = () => {
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount} new</Text>
            </View>
          )}
        </View>

        <View style={styles.list}>
          {MOCK_NOTIFICATIONS.map((notif) => (
            <Pressable
              key={notif.id}
              style={[styles.card, !notif.read && styles.cardUnread]}
            >
              <View style={[styles.iconBox, { backgroundColor: notif.color + '22' }]}>
                <Ionicons name={notif.icon} size={20} color={notif.color} />
              </View>
              <View style={styles.content}>
                <Text style={styles.cardTitle}>{notif.title}</Text>
                <Text style={styles.cardBody}>{notif.body}</Text>
                <Text style={styles.cardTime}>{notif.time}</Text>
              </View>
              {!notif.read && <View style={styles.dot} />}
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
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.size.xxl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  badge: {
    backgroundColor: Colors.brandRed,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  list: { gap: Spacing.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 14,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  cardUnread: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.brandRed,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1 },
  cardTitle: {
    fontSize: Typography.size.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  cardBody: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: 3,
    lineHeight: 18,
  },
  cardTime: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.brandRed,
    marginTop: 4,
  },
});

export default NotificationsScreen;
