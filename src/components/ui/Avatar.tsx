import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Typography } from '../../constants';

interface AvatarProps {
  name?: string;
  imageUri?: string;
  size?: number;
  backgroundColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, imageUri, size = 40, backgroundColor = Colors.brandRed }) => {
  const initials = name
    ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  if (imageUri) {
    return (
      <Image
        source={{ uri: imageUri }}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
      />
    );
  }

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor }]}>
      <Text style={[styles.initials, { fontSize: size * 0.35 }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.bold,
  },
});

export default Avatar;
