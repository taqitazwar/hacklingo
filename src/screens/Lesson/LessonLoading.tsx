import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface LessonLoadingProps {
  message?: string;
}

const LessonLoading: React.FC<LessonLoadingProps> = ({ message = 'Loading lesson...' }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Colors.green} />
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.lg, backgroundColor: Colors.backgroundPrimary },
  text: { color: Colors.textSecondary, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.base },
});

export default LessonLoading;
