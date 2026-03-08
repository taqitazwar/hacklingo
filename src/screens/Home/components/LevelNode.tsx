/**
 * Duolingo-style course map node.
 * - 3D depth effect: gradient circle sits on darker shadow circle
 * - Pulse ring on the current active lesson
 * - Completed = checkmark, Available = star, Locked = lock
 */
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Lesson, LessonStatus } from '../../../types';
import Colors, { SectionGradients, SectionShadowColors } from '../../../constants/colors';
import { Typography, Spacing, Layout } from '../../../constants';

interface LevelNodeProps {
  lesson: Lesson;
  status: LessonStatus;
  sectionId: string;
  accentColor: string;
  onPress: () => void;
  offsetX: number;
  isCurrentLesson: boolean;
}

const NODE_SIZE = 70;
const BOSS_SIZE = 82;
const DEPTH = 5;
const PULSE_DURATION = 1400;

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const getIcon = (status: LessonStatus, lessonType: string): IoniconName => {
  if (status === 'locked') return 'lock-closed';
  if (status === 'completed') return 'checkmark';
  if (lessonType === 'boss') return 'flash';
  return 'star';
};

const LevelNode: React.FC<LevelNodeProps> = ({
  lesson,
  status,
  sectionId,
  accentColor,
  onPress,
  offsetX,
  isCurrentLesson,
}) => {
  const depthAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const size = lesson.lessonType === 'boss' ? BOSS_SIZE : NODE_SIZE;
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';

  const gradientColors = SectionGradients[sectionId] ?? ([accentColor, accentColor] as [string, string]);
  const shadowColor = SectionShadowColors[sectionId] ?? accentColor;

  // Pulse on active lesson
  useEffect(() => {
    if (!isCurrentLesson || isLocked) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: PULSE_DURATION, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: PULSE_DURATION, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [isCurrentLesson, isLocked]);

  const pressIn = () => {
    if (isLocked) return;
    Animated.timing(depthAnim, { toValue: DEPTH, duration: 80, useNativeDriver: true }).start();
  };
  const pressOut = () => {
    if (isLocked) return;
    Animated.timing(depthAnim, { toValue: 0, duration: 80, useNativeDriver: true }).start();
    onPress();
  };

  const icon = getIcon(status, lesson.lessonType);
  const iconSize = lesson.lessonType === 'boss' ? 30 : 26;

  return (
    <Pressable
      onPressIn={pressIn}
      onPressOut={pressOut}
      disabled={isLocked}
      accessibilityRole="button"
      accessibilityLabel={`${lesson.title}, ${status}`}
      style={[styles.wrapper, { marginLeft: offsetX }]}
    >
      {/* Pulse ring behind node */}
      {isCurrentLesson && !isLocked && (
        <Animated.View
          style={[
            styles.pulseRing,
            {
              width: size + 24,
              height: size + 24,
              borderRadius: (size + 24) / 2,
              borderColor: accentColor,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
      )}

      {/* 3D node container */}
      <View style={{ width: size, height: size + DEPTH }}>
        {/* Shadow circle */}
        <View
          style={[
            styles.shadowCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: isLocked ? Colors.borderMedium : shadowColor,
              bottom: 0,
            },
          ]}
        />
        {/* Surface circle — moves down on press */}
        <Animated.View
          style={[
            styles.surfaceCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              top: 0,
              transform: [{ translateY: depthAnim }],
              opacity: isLocked ? 0.55 : 1,
            },
          ]}
        >
          {isLocked ? (
            <View style={[styles.lockedFill, { borderRadius: size / 2 }]}>
              <Ionicons name="lock-closed" size={22} color={Colors.textMuted} />
            </View>
          ) : (
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.8, y: 1 }}
              style={[styles.gradientFill, { borderRadius: size / 2 }]}
            >
              <Ionicons name={icon} size={iconSize} color={Colors.white} />
              {isCompleted && (
                <View style={styles.completedDot} />
              )}
            </LinearGradient>
          )}
        </Animated.View>
      </View>

      {/* Label */}
      <Text
        style={[styles.label, isLocked && styles.labelLocked]}
        numberOfLines={2}
      >
        {lesson.title}
      </Text>

      {lesson.lessonType === 'boss' && !isLocked && (
        <View style={[styles.bossBadge, { backgroundColor: Colors.yellow }]}>
          <Text style={styles.bossBadgeText}>BOSS</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: 110,
    gap: Spacing.sm,
  },
  pulseRing: {
    position: 'absolute',
    borderWidth: 3.5,
    opacity: 0.22,
    zIndex: -1,
    top: -12,
  },
  shadowCircle: {
    position: 'absolute',
  },
  surfaceCircle: {
    position: 'absolute',
    overflow: 'hidden',
  },
  lockedFill: {
    flex: 1,
    backgroundColor: Colors.backgroundTertiary,
    borderWidth: 3,
    borderColor: Colors.borderMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientFill: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedDot: {
    position: 'absolute',
    bottom: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  label: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.fontSize.xs * 1.4,
    marginTop: Spacing.xs,
  },
  labelLocked: {
    color: Colors.textMuted,
  },
  bossBadge: {
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  bossBadgeText: {
    fontFamily: Typography.fontFamily.black,
    fontSize: 9,
    color: Colors.textInverse,
    letterSpacing: 0.5,
  },
});

export default LevelNode;
