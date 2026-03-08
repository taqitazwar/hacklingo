/**
 * Onboarding — Conversation-style flow guided by Bug the Ladybug.
 *
 * Steps:
 *   greeting     → "Hi there! I'm Bug!"
 *   intro        → "Just 4 quick questions…"
 *   language     → Language selection
 *   reason       → Why are you learning?
 *   experience   → What's your experience level?
 *   goal         → Daily goal
 */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  Animated,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import Colors from '../../constants/colors';
import { Typography, Spacing, Layout } from '../../constants';
import Button from '../../components/ui/Button';
import Bug, { BugMood } from '../../components/mascot/Bug';
import SpeechBubble from '../../components/mascot/SpeechBubble';

type OnboardingNav = StackNavigationProp<RootStackParamList, 'Onboarding'>;
interface Props { navigation: OnboardingNav }

// ─── Step config ──────────────────────────────────────────────────────────────

type StepId = 'greeting' | 'intro' | 'language' | 'reason' | 'experience' | 'goal';

const STEP_ORDER: StepId[] = ['greeting', 'intro', 'language', 'reason', 'experience', 'goal'];

const STEP_SPEECH: Record<StepId, string> = {
  greeting:   "Hi there! I'm Bug! I'll help you learn to code — one tiny bite at a time!",
  intro:       "Just 4 quick questions before your first lesson. You've got this!",
  language:    "What language do you want to learn first?",
  reason:      "Why do you want to learn to code?",
  experience:  "Where are you in your coding journey?",
  goal:        "What's your daily learning goal?",
};

const STEP_BUG_MOOD: Record<StepId, BugMood> = {
  greeting:   'waving',
  intro:       'reading',
  language:    'encouraging',
  reason:      'thinking',
  experience:  'reading',
  goal:        'happy',
};

const STEP_PROGRESS: Record<StepId, number> = {
  greeting:   0.05,
  intro:       0.2,
  language:    0.4,
  reason:      0.57,
  experience:  0.75,
  goal:        0.92,
};

// ─── Option data ──────────────────────────────────────────────────────────────

const LANGUAGES = [
  { id: 'python',     emoji: '🐍', label: 'Python',     available: true  },
  { id: 'javascript', emoji: '⚡', label: 'JavaScript', available: false },
  { id: 'typescript', emoji: 'TS', label: 'TypeScript', available: false },
  { id: 'html',       emoji: '🌐', label: 'HTML/CSS',   available: false },
  { id: 'sql',        emoji: '🗄️', label: 'SQL',        available: false },
  { id: 'java',       emoji: '☕', label: 'Java',       available: false },
  { id: 'swift',      emoji: '🍎', label: 'Swift',      available: false },
  { id: 'go',         emoji: '🐿️', label: 'Go',         available: false },
  { id: 'rust',       emoji: '⚙️', label: 'Rust',       available: false },
  { id: 'kotlin',     emoji: '🎯', label: 'Kotlin',     available: false },
  { id: 'cpp',        emoji: 'C++', label: 'C++',       available: false },
  { id: 'scratch',    emoji: '🐱', label: 'Scratch',    available: false },
];

const REASONS = [
  { id: 'career',  emoji: '💼', label: 'Boost my career'     },
  { id: 'school',  emoji: '📚', label: 'Support my studies'  },
  { id: 'fun',     emoji: '🎮', label: 'Just for fun'        },
  { id: 'project', emoji: '🚀', label: 'Build something cool'},
  { id: 'switch',  emoji: '🔄', label: 'Switch to tech'      },
  { id: 'other',   emoji: '💡', label: 'Other reason'        },
];

const EXPERIENCES = [
  { id: 'none', emoji: '🌱', label: 'Total beginner',   sublabel: "Never written a line of code" },
  { id: 'some', emoji: '🔧', label: 'Some experience',  sublabel: "Tried coding, still learning" },
  { id: 'dev',  emoji: '💻', label: 'I write code',     sublabel: "Know a language, new to this" },
];

const GOALS = [
  { id: 'casual',  label: '5 min / day',  sublabel: 'Casual'  },
  { id: 'regular', label: '10 min / day', sublabel: 'Regular' },
  { id: 'serious', label: '15 min / day', sublabel: 'Serious' },
  { id: 'intense', label: '20 min / day', sublabel: 'Intense' },
];

// ─── Main screen ──────────────────────────────────────────────────────────────

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [bubbleKey, setBubbleKey] = useState(0); // forces SpeechBubble remount on step change

  const [selectedLanguage,   setSelectedLanguage]   = useState<string | null>('python');
  const [selectedReason,     setSelectedReason]     = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [selectedGoal,       setSelectedGoal]       = useState<string | null>(null);

  const fadeAnim  = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const currentStep = STEP_ORDER[stepIndex];
  const isConversationStep = currentStep === 'greeting' || currentStep === 'intro';

  const canContinue: boolean = (() => {
    switch (currentStep) {
      case 'greeting':
      case 'intro':
        return true;
      case 'language':
        return selectedLanguage !== null;
      case 'reason':
        return selectedReason !== null;
      case 'experience':
        return selectedExperience !== null;
      case 'goal':
        return selectedGoal !== null;
    }
  })();

  const transitionToStep = useCallback((nextIndex: number) => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 0, duration: 130, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -20, duration: 130, useNativeDriver: true }),
    ]).start(() => {
      setStepIndex(nextIndex);
      setBubbleKey(k => k + 1);
      slideAnim.setValue(28);
      Animated.parallel([
        Animated.timing(fadeAnim,  { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, tension: 70, friction: 10, useNativeDriver: true }),
      ]).start();
    });
  }, [fadeAnim, slideAnim]);

  const goNext = useCallback(() => {
    const next = stepIndex + 1;
    if (next >= STEP_ORDER.length) {
      navigation.replace('MainTabs');
    } else {
      transitionToStep(next);
    }
  }, [stepIndex, transitionToStep, navigation]);

  const goBack = useCallback(() => {
    if (stepIndex > 0) transitionToStep(stepIndex - 1);
  }, [stepIndex, transitionToStep]);

  const continueLabel = currentStep === 'goal' ? "I'm Committed!" : 'Continue';

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundPrimary} />

      {/* ── Top bar ── */}
      <View style={styles.topBar}>
        {stepIndex > 0 ? (
          <Pressable onPress={goBack} style={styles.backBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
        ) : <View style={{ width: 36 }} />}

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: `${STEP_PROGRESS[currentStep] * 100}%` }]} />
        </View>

        <Pressable
          onPress={() => navigation.replace('MainTabs')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      {/* ── Content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          {/* Bug + Speech Bubble */}
          <View style={styles.mascotSection}>
            <Bug mood={STEP_BUG_MOOD[currentStep]} size={isConversationStep ? 'lg' : 'sm'} />
            <SpeechBubble
              key={bubbleKey}
              text={STEP_SPEECH[currentStep]}
              pointerSide="left"
              accentColor={Colors.brandRed}
            />
          </View>

          {/* Selection options (only shown for non-conversation steps) */}
          {!isConversationStep && (
            <OptionsSection
              step={currentStep}
              selectedLanguage={selectedLanguage}
              selectedReason={selectedReason}
              selectedExperience={selectedExperience}
              selectedGoal={selectedGoal}
              onSelectLanguage={setSelectedLanguage}
              onSelectReason={setSelectedReason}
              onSelectExperience={setSelectedExperience}
              onSelectGoal={setSelectedGoal}
            />
          )}
        </Animated.View>
      </ScrollView>

      {/* ── Bottom CTA ── */}
      <View style={styles.bottomArea}>
        <Button label={continueLabel} onPress={goNext} disabled={!canContinue} />
      </View>
    </SafeAreaView>
  );
};

// ─── Options section ──────────────────────────────────────────────────────────

interface OptionsSectionProps {
  step: StepId;
  selectedLanguage: string | null;
  selectedReason: string | null;
  selectedExperience: string | null;
  selectedGoal: string | null;
  onSelectLanguage: (id: string) => void;
  onSelectReason: (id: string) => void;
  onSelectExperience: (id: string) => void;
  onSelectGoal: (id: string) => void;
}

const OptionsSection: React.FC<OptionsSectionProps> = ({
  step,
  selectedLanguage, selectedReason, selectedExperience, selectedGoal,
  onSelectLanguage, onSelectReason, onSelectExperience, onSelectGoal,
}) => {
  if (step === 'language') {
    return (
      <View style={styles.optionGrid}>
        {LANGUAGES.map(lang => {
          const selected = selectedLanguage === lang.id;
          return (
            <Pressable
              key={lang.id}
              onPress={() => lang.available && onSelectLanguage(lang.id)}
              style={[
                styles.langCard,
                selected && styles.optionSelected,
                !lang.available && styles.optionDisabled,
              ]}
              accessibilityLabel={lang.label}
            >
              <Text style={styles.optionEmoji}>{lang.emoji}</Text>
              <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                {lang.label}
              </Text>
              {!lang.available && <Text style={styles.comingSoonBadge}>Soon</Text>}
              {selected && <Text style={styles.checkIcon}>✓</Text>}
            </Pressable>
          );
        })}
      </View>
    );
  }

  if (step === 'reason') {
    return (
      <View style={styles.optionGrid}>
        {REASONS.map(r => {
          const selected = selectedReason === r.id;
          return (
            <Pressable
              key={r.id}
              onPress={() => onSelectReason(r.id)}
              style={[styles.langCard, selected && styles.optionSelected]}
            >
              <Text style={styles.optionEmoji}>{r.emoji}</Text>
              <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>{r.label}</Text>
              {selected && <Text style={styles.checkIcon}>✓</Text>}
            </Pressable>
          );
        })}
      </View>
    );
  }

  if (step === 'experience') {
    return (
      <View style={styles.listOptions}>
        {EXPERIENCES.map(exp => {
          const selected = selectedExperience === exp.id;
          return (
            <Pressable
              key={exp.id}
              onPress={() => onSelectExperience(exp.id)}
              style={[styles.listCard, selected && styles.optionSelected]}
            >
              <Text style={styles.listEmoji}>{exp.emoji}</Text>
              <View style={styles.listTextBlock}>
                <Text style={[styles.listLabel, selected && styles.optionLabelSelected]}>{exp.label}</Text>
                <Text style={styles.listSublabel}>{exp.sublabel}</Text>
              </View>
              {selected && <Text style={styles.checkIcon}>✓</Text>}
            </Pressable>
          );
        })}
      </View>
    );
  }

  if (step === 'goal') {
    return (
      <View style={styles.listOptions}>
        {GOALS.map(g => {
          const selected = selectedGoal === g.id;
          return (
            <Pressable
              key={g.id}
              onPress={() => onSelectGoal(g.id)}
              style={[styles.listCard, selected && styles.optionSelected]}
            >
              <Text style={[styles.listLabel, selected && styles.optionLabelSelected]}>{g.label}</Text>
              <Text style={[styles.listSublabel, selected && { color: Colors.green }]}>{g.sublabel}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  }

  return null;
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: Colors.textSecondary,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: Layout.radiusFull,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.brandRed,
    borderRadius: Layout.radiusFull,
  },
  skipText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
    width: 36,
    textAlign: 'right',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.xl,
  },
  mascotSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  // ── Grid options (language / reason) ──
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  langCard: {
    width: '47%',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Layout.radiusMd,
    padding: Spacing.base,
    alignItems: 'center',
    gap: Spacing.xs,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    position: 'relative',
  },
  // ── List options (experience / goal) ──
  listOptions: {
    gap: Spacing.sm,
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Layout.radiusMd,
    padding: Spacing.base,
    gap: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.borderLight,
  },
  listEmoji: {
    fontSize: 26,
  },
  listTextBlock: {
    flex: 1,
    gap: 2,
  },
  listLabel: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },
  listSublabel: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
  },
  // ── State modifiers ──
  optionSelected: {
    borderColor: Colors.brandRed,
    backgroundColor: '#2A0A0A',
  },
  optionDisabled: {
    opacity: 0.45,
  },
  optionEmoji: {
    fontSize: 28,
  },
  optionLabel: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  optionLabelSelected: {
    color: Colors.brandRed,
  },
  checkIcon: {
    position: 'absolute',
    top: 6,
    right: 8,
    fontSize: 14,
    color: Colors.brandRed,
    fontFamily: Typography.fontFamily.black,
  },
  comingSoonBadge: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 9,
    color: Colors.textMuted,
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: Layout.radiusFull,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 1,
    overflow: 'hidden',
  },
  // ── Bottom ──
  bottomArea: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.sm,
    backgroundColor: Colors.backgroundPrimary,
    borderTopWidth: 0.5,
    borderTopColor: Colors.borderLight,
  },
});

export default OnboardingScreen;
