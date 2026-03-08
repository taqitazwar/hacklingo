/**
 * SpeechBubble — Speech bubble with typewriter text effect.
 * Pointer direction: 'bottom' (Bug is below) or 'left' (Bug is to the left).
 */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';

interface SpeechBubbleProps {
  text: string;
  pointerSide?: 'bottom' | 'left';
  accentColor?: string;
  typewriterDelay?: number;  // ms per character, default 28
  onTypingComplete?: () => void;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  pointerSide = 'bottom',
  accentColor = Colors.green,
  typewriterDelay = 28,
  onTypingComplete,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pop-in animation on mount
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 70,
        friction: 9,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Typewriter effect
  useEffect(() => {
    setDisplayText('');
    setTypingDone(false);
    indexRef.current = 0;

    const type = () => {
      if (indexRef.current < text.length) {
        const nextIndex = indexRef.current + 1;
        setDisplayText(text.slice(0, nextIndex));
        indexRef.current = nextIndex;
        timeoutRef.current = setTimeout(type, typewriterDelay);
      } else {
        setTypingDone(true);
        onTypingComplete?.();
      }
    };

    timeoutRef.current = setTimeout(type, 300); // initial delay before typing starts

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text]);

  // On tap: skip typewriter and show full text
  const skipTypewriter = () => {
    if (!typingDone) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setDisplayText(text);
      setTypingDone(true);
      onTypingComplete?.();
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        pointerSide === 'left' && styles.containerLeft,
        { borderColor: accentColor + '55', opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
      ]}
      onTouchEnd={skipTypewriter}
    >
      <Text style={styles.text}>
        {displayText}
        {!typingDone && <Text style={[styles.cursor, { color: accentColor }]}>|</Text>}
      </Text>

      {/* Pointer triangle */}
      {pointerSide === 'bottom' && (
        <View style={[styles.pointerBottom, { borderTopColor: Colors.backgroundElevated }]} />
      )}
      {pointerSide === 'left' && (
        <View style={[styles.pointerLeft, { borderRightColor: Colors.backgroundElevated }]} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundElevated,
    borderRadius: Layout.radiusMd,
    borderWidth: 1.5,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    maxWidth: 280,
    position: 'relative',
  },
  containerLeft: {
    marginLeft: Spacing.sm,
  },
  text: {
    fontFamily: Typography.fontFamily.semibold,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    lineHeight: Typography.fontSize.base * 1.5,
  },
  cursor: {
    fontFamily: Typography.fontFamily.black,
    fontSize: Typography.fontSize.base,
  },
  pointerBottom: {
    position: 'absolute',
    bottom: -10,
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: Colors.transparent,
    borderRightColor: Colors.transparent,
  },
  pointerLeft: {
    position: 'absolute',
    left: -10,
    top: '50%',
    marginTop: -8,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 10,
    borderTopColor: Colors.transparent,
    borderBottomColor: Colors.transparent,
  },
});

export default SpeechBubble;
