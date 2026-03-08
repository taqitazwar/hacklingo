import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Layout } from '../../constants';

interface CodeBlockProps {
  code: string;
  /** Highlight a specific line index (zero-based) in error red */
  highlightLineIndex?: number;
  scrollable?: boolean;
}

/**
 * Renders a code snippet in a dark terminal-style block.
 * Applies simple keyword coloring without a heavy syntax library.
 */
const PYTHON_KEYWORDS = new Set([
  'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in',
  'not', 'and', 'or', 'True', 'False', 'None', 'import', 'from',
  'class', 'try', 'except', 'break', 'continue', 'pass', 'lambda',
  'with', 'as', 'range', 'print', 'input', 'len', 'int', 'str', 'float',
  'list', 'dict', 'set', 'type', 'append', 'pop', 'sort', 'upper', 'lower',
]);

const tokenizeLine = (line: string): { text: string; color: string }[] => {
  const tokens: { text: string; color: string }[] = [];
  const parts = line.split(/(\s+|[():=+\-*/%<>!,\[\]{}.]|"[^"]*"|'[^']*'|#.*)/);

  for (const part of parts) {
    if (!part) continue;

    if (part.startsWith('#')) {
      tokens.push({ text: part, color: Colors.codeComment });
    } else if ((part.startsWith('"') && part.endsWith('"')) ||
               (part.startsWith("'") && part.endsWith("'"))) {
      tokens.push({ text: part, color: Colors.codeString });
    } else if (!isNaN(Number(part)) && part.trim() !== '') {
      tokens.push({ text: part, color: Colors.codeNumber });
    } else if (PYTHON_KEYWORDS.has(part.trim())) {
      tokens.push({ text: part, color: Colors.codeKeyword });
    } else {
      tokens.push({ text: part, color: Colors.codeText });
    }
  }

  return tokens;
};

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  highlightLineIndex,
  scrollable = false,
}) => {
  const lines = code.split('\n');

  const content = (
    <View style={styles.codeContainer}>
      {lines.map((line, lineIndex) => {
        const isHighlighted = lineIndex === highlightLineIndex;
        return (
          <View
            key={lineIndex}
            style={[styles.codeLine, isHighlighted && styles.highlightedLine]}
          >
            <Text style={styles.lineNumber}>{lineIndex + 1}</Text>
            <Text style={styles.codeText}>
              {tokenizeLine(line).map((token, tokenIndex) => (
                <Text key={tokenIndex} style={{ color: token.color }}>
                  {token.text}
                </Text>
              ))}
            </Text>
          </View>
        );
      })}
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {scrollable ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.codeBackground,
    borderRadius: Layout.radiusMd,
    padding: Spacing.base,
    ...Layout.shadowSm,
  },
  codeContainer: {
    gap: 2,
  },
  codeLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 1,
    paddingHorizontal: Spacing.xs,
    borderRadius: Layout.radiusSm / 2,
  },
  highlightedLine: {
    backgroundColor: 'rgba(255, 75, 75, 0.2)',
  },
  lineNumber: {
    color: Colors.codeComment,
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.mono,
    width: 20,
    marginRight: Spacing.sm,
    textAlign: 'right',
    lineHeight: Typography.fontSize.base * 1.4,
  },
  codeText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.mono,
    lineHeight: Typography.fontSize.base * 1.4,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default CodeBlock;
