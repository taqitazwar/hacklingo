import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';

export type MascotMood = 'happy' | 'excited' | 'celebrating' | 'sad' | 'encouraging' | 'thinking' | 'neutral';

interface MascotProps {
  mood?: MascotMood;
  size?: 'small' | 'medium' | 'large';
  speech?: string;
  speechSide?: 'right' | 'bottom';
  animate?: boolean;
}

const MOOD_EMOJI: Record<MascotMood, string> = {
  happy:       '🤖',
  excited:     '🤖',
  celebrating: '🤖',
  sad:         '🤖',
  encouraging: '🤖',
  thinking:    '🤖',
  neutral:     '🤖',
};

const MOOD_ACCENT: Record<MascotMood, string> = {
  happy:       Colors.green,
  excited:     Colors.yellow,
  celebrating: Colors.orange,
  sad:         Colors.blue,
  encouraging: Colors.purple,
  thinking:    Colors.teal,
  neutral:     Colors.blue,
};

const MOOD_BG: Record<MascotMood, string> = {
  happy:       '#1A3A22',
  excited:     '#2E2A0E',
  celebrating: '#2E1C08',
  sad:         '#0A1E30',
  encouraging: '#211230',
  thinking:    '#0A2420',
  neutral:     '#0A1E30',
};

// Status badge shown on the robot for each mood
const MOOD_BADGE: Record<MascotMood, string> = {
  happy:       '✓',
  excited:     '!',
  celebrating: '★',
  sad:         '×',
  encouraging: '↑',
  thinking:    '?',
  neutral:     '',
};

const AVATAR_SIZE: Record<Required<MascotProps>['size'], number> = {
  small:  56,
  medium: 80,
  large:  110,
};

const Mascot: React.FC<MascotProps> = ({
  mood = 'neutral',
  size = 'medium',
  speech,
  speechSide = 'right',
  animate = true,
}) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (!animate) return;

    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 60,
      friction: 8,
      useNativeDriver: true,
    }).start();

    if (mood === 'celebrating' || mood === 'excited') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, { toValue: -8, duration: 350, useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 0, duration: 350, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [mood, animate]);

  const avatarSize = AVATAR_SIZE[size];
  const emojiSize = avatarSize * 0.5;
  const accentColor = MOOD_ACCENT[mood];
  const bgColor = MOOD_BG[mood];
  const badge = MOOD_BADGE[mood];

  const avatar = (
    <Animated.View
      style={{
        transform: [{ translateY: bounceAnim }, { scale: scaleAnim }],
      }}
    >
      <View style={[
        styles.avatarOuter,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          backgroundColor: bgColor,
          borderColor: accentColor,
        },
      ]}>
        <Text style={{ fontSize: emojiSize }}>{MOOD_EMOJI[mood]}</Text>
        {badge ? (
          <View style={[styles.badge, { backgroundColor: accentColor, width: avatarSize * 0.3, height: avatarSize * 0.3, borderRadius: avatarSize * 0.15 }]}>
            <Text style={[styles.badgeText, { fontSize: avatarSize * 0.14 }]}>{badge}</Text>
          </View>
        ) : null}
      </View>
    </Animated.View>
  );

  if (!speech) return avatar;

  if (speechSide === 'right') {
    return (
      <View style={styles.rowContainer}>
        {avatar}
        <SpeechBubble text={speech} accentColor={accentColor} direction="left" />
      </View>
    );
  }

  return (
    <View style={styles.colContainer}>
      <SpeechBubble text={speech} accentColor={accentColor} direction="bottom" />
      {avatar}
    </View>
  );
};

interface SpeechBubbleProps {
  text: string;
  accentColor: string;
  direction: 'left' | 'bottom';
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text, accentColor, direction }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      delay: 150,
      useNativeDriver: true,
    }).start();
  }, [text]);

  return (
    <Animated.View style={[
      styles.bubble,
      direction === 'left' && styles.bubbleLeft,
      direction === 'bottom' && styles.bubbleBottom,
      { borderColor: accentColor + '55', opacity: fadeAnim },
    ]}>
      {direction === 'left' && (
        <View style={[styles.tailLeft, { borderRightColor: Colors.backgroundElevated }]} />
      )}
      <Text style={styles.bubbleText}>{text}</Text>
      {direction === 'bottom' && (
        <View style={[styles.tailBottom, { borderTopColor: Colors.backgroundElevated }]} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  colContainer: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  avatarOuter: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontFamily: Typography.fontFamily.black,
  },
  bubble: {
    flex: 1,
    backgroundColor: Colors.backgroundElevated,
    borderRadius: Layout.radiusMd,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1.5,
    position: 'relative',
  },
  bubbleLeft: {
    marginLeft: Spacing.xs,
  },
  bubbleBottom: {
    alignSelf: 'stretch',
    marginBottom: Spacing.xs,
  },
  bubbleText: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    lineHeight: Typography.fontSize.sm * 1.5,
  },
  tailLeft: {
    position: 'absolute',
    left: -8,
    top: '50%',
    marginTop: -6,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 8,
    borderTopColor: Colors.transparent,
    borderBottomColor: Colors.transparent,
  },
  tailBottom: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: Colors.transparent,
    borderRightColor: Colors.transparent,
  },
});

export default Mascot;
