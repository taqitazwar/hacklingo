/**
 * Splash screen — Bug's face fades in on brand-red background,
 * then transitions to the Welcome screen after ~2.5s.
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Colors from '../../constants/colors';
import { Typography } from '../../constants';
import Bug from '../../components/mascot/Bug';

type SplashNav = StackNavigationProp<RootStackParamList, 'Splash'>;
interface Props { navigation: SplashNav }

const { height: SCREEN_H } = Dimensions.get('window');

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const bugScale  = useRef(new Animated.Value(0.75)).current;
  const bugOpacity = useRef(new Animated.Value(0)).current;
  const logoY     = useRef(new Animated.Value(20)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Sequence: Bug in → Logo in → hold → fade out entire screen
    Animated.sequence([
      // 1. Bug fades + scales in (400ms)
      Animated.parallel([
        Animated.spring(bugScale,   { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
        Animated.timing(bugOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      // 2. Logo slides up (200ms delay)
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 300, delay: 100, useNativeDriver: true }),
        Animated.spring(logoY, { toValue: 0, tension: 70, friction: 10, delay: 100, useNativeDriver: true }),
      ]),
      // 3. Hold for 1.2s
      Animated.delay(1200),
      // 4. Fade out everything
      Animated.timing(screenOpacity, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start(() => {
      navigation.replace('Welcome');
    });
  }, []);

  return (
    <Animated.View style={[styles.screen, { opacity: screenOpacity }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.brandRed} />

      <Animated.View style={{ transform: [{ scale: bugScale }], opacity: bugOpacity }}>
        <Bug mood="happy" size="lg" />
      </Animated.View>

      <Animated.Text
        style={[styles.logo, { opacity: logoOpacity, transform: [{ translateY: logoY }] }]}
      >
        hacklingo
      </Animated.Text>

      <Text style={styles.tagline}>learn to code. for free.</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.brandRed,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logo: {
    fontFamily: Typography.fontFamily.black,
    fontSize: 42,
    color: Colors.white,
    letterSpacing: -1,
    marginTop: 16,
  },
  tagline: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.base,
    color: 'rgba(255,255,255,0.72)',
    letterSpacing: 0.3,
  },
});

export default SplashScreen;
