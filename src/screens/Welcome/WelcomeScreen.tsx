/**
 * Welcome screen — Bug floats with waving animation,
 * "GET STARTED" CTA (brand-red), secondary "I already have an account".
 */
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Pressable,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';
import Bug from '../../components/mascot/Bug';

type WelcomeNav = StackNavigationProp<RootStackParamList, 'Welcome'>;
interface Props { navigation: WelcomeNav }

// ─── 3D red CTA button ────────────────────────────────────────────────────────

const DEPTH = 4;

const RedButton: React.FC<{ label: string; onPress: () => void }> = ({ label, onPress }) => {
  const depthAnim = useRef(new Animated.Value(0)).current;

  const pressIn = () =>
    Animated.timing(depthAnim, { toValue: DEPTH, duration: 80, useNativeDriver: true }).start();
  const pressOut = () => {
    Animated.timing(depthAnim, { toValue: 0, duration: 80, useNativeDriver: true }).start();
    onPress();
  };

  return (
    <Pressable onPressIn={pressIn} onPressOut={pressOut} accessibilityRole="button">
      <View style={[styles.redBtnWrapper, { height: 52 + DEPTH }]}>
        <View style={[styles.redBtnShadow, { backgroundColor: Colors.brandRedDark }]} />
        <Animated.View
          style={[
            styles.redBtnSurface,
            { backgroundColor: Colors.brandRed, transform: [{ translateY: depthAnim }] },
          ]}
        >
          <Text style={styles.redBtnLabel}>{label}</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
};

// ─── Screen ───────────────────────────────────────────────────────────────────

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const bugY      = useRef(new Animated.Value(-60)).current;
  const bugOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY    = useRef(new Animated.Value(12)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;
  const btnY      = useRef(new Animated.Value(24)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered entrance
    Animated.sequence([
      // Bug drops in
      Animated.parallel([
        Animated.spring(bugY,      { toValue: 0, tension: 55, friction: 9, useNativeDriver: true }),
        Animated.timing(bugOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
      ]),
      // Title slides up
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.spring(titleY, { toValue: 0, tension: 70, friction: 10, useNativeDriver: true }),
      ]),
      // Buttons slide up
      Animated.parallel([
        Animated.timing(btnOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.spring(btnY, { toValue: 0, tension: 70, friction: 10, useNativeDriver: true }),
      ]),
    ]).start(() => {
      // Start idle float loop
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, { toValue: -8, duration: 2000, useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue: 0,  duration: 2000, useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundPrimary} />

      {/* Bug character — floats after entrance */}
      <View style={styles.heroArea}>
        <Animated.View
          style={{
            opacity: bugOpacity,
            transform: [{ translateY: Animated.add(bugY, floatAnim) }],
          }}
        >
          <Bug mood="waving" size="lg" />
        </Animated.View>
      </View>

      {/* Title & subtitle */}
      <Animated.View
        style={[styles.textBlock, { opacity: titleOpacity, transform: [{ translateY: titleY }] }]}
      >
        <Text style={styles.appName}>hacklingo</Text>
        <Text style={styles.tagline}>Learn to code. For free. Forever.</Text>
      </Animated.View>

      {/* Buttons */}
      <Animated.View
        style={[styles.buttonsBlock, { opacity: btnOpacity, transform: [{ translateY: btnY }] }]}
      >
        <RedButton label="GET STARTED" onPress={() => navigation.navigate('Onboarding')} />

        <Pressable
          onPress={() => navigation.navigate('MainTabs')}
          style={styles.secondaryBtn}
          accessibilityRole="button"
        >
          <Text style={styles.secondaryBtnLabel}>I ALREADY HAVE AN ACCOUNT</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
  },
  heroArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Layout.isSmallDevice ? Spacing.lg : Spacing.xxxl,
  },
  textBlock: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingBottom: Spacing.xxl,
  },
  appName: {
    fontFamily: Typography.fontFamily.black,
    fontSize: 44,
    color: Colors.brandRed,
    letterSpacing: -1.5,
  },
  tagline: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  buttonsBlock: {
    width: '100%',
    gap: Spacing.md,
  },
  redBtnWrapper: {
    position: 'relative',
    width: '100%',
  },
  redBtnShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 52,
    borderRadius: Layout.radiusXl,
  },
  redBtnSurface: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 52,
    borderRadius: Layout.radiusXl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redBtnLabel: {
    fontFamily: Typography.fontFamily.extraBold,
    fontSize: Typography.fontSize.base,
    color: Colors.white,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  secondaryBtn: {
    height: 52,
    borderRadius: Layout.radiusXl,
    borderWidth: 2,
    borderColor: Colors.borderMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnLabel: {
    fontFamily: Typography.fontFamily.extraBold,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

export default WelcomeScreen;
