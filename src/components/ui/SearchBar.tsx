import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', value, onChangeText, onClear }) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, focused && styles.focused]}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => { onChangeText(''); onClear?.(); }}>
          <Text style={styles.clear}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  focused: { borderColor: Colors.blue },
  icon: { marginRight: Spacing.sm, fontSize: 14 },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.base,
  },
  clear: { color: Colors.textMuted, fontSize: 14, paddingLeft: Spacing.sm },
});

export default SearchBar;
