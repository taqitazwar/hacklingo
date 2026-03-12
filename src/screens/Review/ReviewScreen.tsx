import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../constants';

interface ReviewItem {
  id: string;
  lessonId: string;
  lessonTitle: string;
  type: string;
  question: string;
  correct: boolean;
  date: string;
}

const MOCK_REVIEWS: ReviewItem[] = [
  { id: '1', lessonId: 'basics-variables', lessonTitle: 'Variables', type: 'PREDICT_OUTPUT', question: 'What does x = 5 print?', correct: true, date: '2h ago' },
  { id: '2', lessonId: 'cf-for-loops', lessonTitle: 'For Loops', type: 'FILL_BLANK', question: 'Complete the range() call', correct: false, date: '1d ago' },
  { id: '3', lessonId: 'lists-intro', lessonTitle: 'Lists Intro', type: 'MULTIPLE_CHOICE', question: 'What does list.pop() return?', correct: true, date: '2d ago' },
  { id: '4', lessonId: 'dict-methods', lessonTitle: 'Dict Methods', type: 'PREDICT_OUTPUT', question: 'What does dict.items() return?', correct: false, date: '3d ago' },
];

const ReviewScreen: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'wrong'>('all');
  const items = filter === 'wrong' ? MOCK_REVIEWS.filter(r => !r.correct) : MOCK_REVIEWS;

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Review</Text>
      <View style={styles.filters}>
        {(['all', 'wrong'] as const).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.activeFilter]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.activeFilterText]}>
              {f === 'all' ? 'All Questions' : 'Incorrect Only'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.lessonTitle}>{item.lessonTitle}</Text>
              <Text style={item.correct ? styles.correct : styles.incorrect}>
                {item.correct ? '✓' : '✗'}
              </Text>
            </View>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.meta}>{item.type.replace('_', ' ')} · {item.date}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
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
  filters: { flexDirection: 'row', paddingHorizontal: Spacing.lg, marginBottom: Spacing.md, gap: Spacing.sm },
  filterBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
  },
  activeFilter: { backgroundColor: Colors.green },
  filterText: { color: Colors.textMuted, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.sm },
  activeFilterText: { color: '#FFF' },
  list: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  lessonTitle: { color: Colors.textSecondary, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.xs },
  correct: { color: Colors.green, fontSize: 16, fontFamily: Typography.fonts.bold },
  incorrect: { color: Colors.brandRed, fontSize: 16, fontFamily: Typography.fonts.bold },
  question: { color: Colors.textPrimary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.base, marginBottom: 4 },
  meta: { color: Colors.textMuted, fontSize: Typography.sizes.xs, fontFamily: Typography.fonts.regular },
});

export default ReviewScreen;
