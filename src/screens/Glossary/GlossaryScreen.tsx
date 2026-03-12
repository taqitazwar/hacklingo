import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '../../constants';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example: string;
  category: string;
}

const TERMS: GlossaryTerm[] = [
  { id: '1', term: 'Variable', definition: 'A named container for storing data values.', example: 'x = 42', category: 'Basics' },
  { id: '2', term: 'Function', definition: 'A reusable block of code that performs a specific task.', example: 'def greet(name):\n    print(f"Hello, {name}")', category: 'Functions' },
  { id: '3', term: 'Loop', definition: 'A control structure that repeats a block of code.', example: 'for i in range(5):\n    print(i)', category: 'Control Flow' },
  { id: '4', term: 'List', definition: 'An ordered, mutable collection of items.', example: 'fruits = ["apple", "banana"]', category: 'Data Structures' },
  { id: '5', term: 'Dictionary', definition: 'A collection of key-value pairs.', example: 'person = {"name": "Alice", "age": 30}', category: 'Data Structures' },
  { id: '6', term: 'Class', definition: 'A blueprint for creating objects.', example: 'class Dog:\n    def bark(self):\n        print("Woof")', category: 'OOP' },
  { id: '7', term: 'Exception', definition: 'An error that occurs during program execution.', example: 'try:\n    x = 1/0\nexcept ZeroDivisionError:\n    print("Error")', category: 'Error Handling' },
  { id: '8', term: 'Lambda', definition: 'An anonymous one-line function.', example: 'double = lambda x: x * 2', category: 'Functions' },
];

const GlossaryScreen: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Glossary</Text>
      <FlatList
        data={TERMS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <View style={styles.header}>
              <Text style={styles.term}>{item.term}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.category}</Text>
              </View>
            </View>
            {expanded === item.id && (
              <View style={styles.body}>
                <Text style={styles.definition}>{item.definition}</Text>
                <View style={styles.exampleBox}>
                  <Text style={styles.example}>{item.example}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
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
  list: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: Spacing.md,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  term: { color: Colors.textPrimary, fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.base },
  badge: {
    backgroundColor: Colors.backgroundTertiary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: { color: Colors.textMuted, fontFamily: Typography.fonts.regular, fontSize: 10 },
  body: { marginTop: Spacing.md },
  definition: {
    color: Colors.textSecondary,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    marginBottom: Spacing.sm,
  },
  exampleBox: {
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 8,
    padding: Spacing.sm,
  },
  example: { color: Colors.green, fontFamily: 'monospace', fontSize: Typography.sizes.xs },
});

export default GlossaryScreen;
