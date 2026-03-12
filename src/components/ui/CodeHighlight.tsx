import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface Token {
  text: string;
  type: 'keyword' | 'string' | 'number' | 'comment' | 'builtin' | 'default';
}

function tokenizePython(code: string): Token[] {
  const keywords = ['def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'not', 'and', 'or', 'import', 'from', 'class', 'pass', 'break', 'continue', 'with', 'as', 'try', 'except', 'finally', 'raise', 'lambda', 'True', 'False', 'None', 'global', 'yield'];
  const builtins = ['print', 'len', 'range', 'int', 'str', 'float', 'list', 'dict', 'set', 'type', 'input', 'sum', 'min', 'max', 'enumerate', 'zip', 'map', 'filter'];

  const tokens: Token[] = [];
  const words = code.split(/(\s+|[()[\]{},.:=<>!+\-*/%&|^~]|"[^"]*"|'[^']*'|#[^
]*)/).filter(Boolean);

  for (const word of words) {
    if (word.startsWith('#')) tokens.push({ text: word, type: 'comment' });
    else if (word.startsWith('"') || word.startsWith("'")) tokens.push({ text: word, type: 'string' });
    else if (!isNaN(Number(word)) && word.trim() !== '') tokens.push({ text: word, type: 'number' });
    else if (keywords.includes(word.trim())) tokens.push({ text: word, type: 'keyword' });
    else if (builtins.includes(word.trim())) tokens.push({ text: word, type: 'builtin' });
    else tokens.push({ text: word, type: 'default' });
  }
  return tokens;
}

const TOKEN_COLORS: Record<Token['type'], string> = {
  keyword: '#C678DD',
  string: '#98C379',
  number: '#D19A66',
  comment: '#5C6370',
  builtin: '#61AFEF',
  default: Colors.textSecondary,
};

interface CodeHighlightProps {
  code: string;
  language?: string;
}

const CodeHighlight: React.FC<CodeHighlightProps> = ({ code }) => {
  const tokens = tokenizePython(code);
  return (
    <ScrollView horizontal style={styles.scroll} showsHorizontalScrollIndicator={false}>
      <Text style={styles.code}>
        {tokens.map((t, i) => (
          <Text key={i} style={{ color: TOKEN_COLORS[t.type] }}>{t.text}</Text>
        ))}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 8,
    padding: Spacing.md,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: Typography.sizes.sm,
    lineHeight: 22,
  },
});

export default CodeHighlight;
