import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface QuoteCardProps {
  quote: string;
  author?: string;
  backgroundColor?: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, author, backgroundColor = Colors.backgroundSecondary }) => (
  <View style={[styles.card, { backgroundColor }]}>
    <Text style={styles.quoteMark}>"</Text>
    <Text style={styles.quote}>{quote}</Text>
    {author && <Text style={styles.author}>— {author}</Text>}
  </View>
);

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: Spacing.lg },
  quoteMark: { color: Colors.green, fontSize: 48, fontFamily: Typography.fonts.bold, lineHeight: 48, marginBottom: -8 },
  quote: { color: Colors.textPrimary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.base, lineHeight: 24 },
  author: { color: Colors.textMuted, fontFamily: Typography.fonts.medium, fontSize: Typography.sizes.sm, marginTop: Spacing.sm },
});

export default QuoteCard;
