import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../constants';

interface NetworkStatusBarProps {
  connected: boolean;
}

const NetworkStatusBar: React.FC<NetworkStatusBarProps> = ({ connected }) => {
  if (connected) return null;
  return (
    <View style={styles.bar}>
      <Text style={styles.text}>No internet connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.brandRed,
    paddingVertical: 6,
    alignItems: 'center',
    zIndex: 999,
  },
  text: {
    color: '#FFF',
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.xs,
  },
});

export default NetworkStatusBar;
