import React, { useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { RootStackParamList, Challenge } from '../../types';
import { Colors, Spacing } from '../../constants';
import { useProgressStore } from '../../store';
import { useLesson } from '../../hooks';
import { getNextLessonId, calculateLessonXp } from '../../utils';
import { Button } from '../../components/ui';
import { LessonHeader, FeedbackBar } from '../../components/lesson';
import {
  PredictOutputChallenge,
  MultipleChoiceChallenge,
  FillBlankChallenge,
  FixBugChallenge,
  ReorderBlocksChallenge,
} from '../../components/challenges';

type LessonNavigationProp = StackNavigationProp<RootStackParamList, 'Lesson'>;
type LessonRouteProp = RouteProp<RootStackParamList, 'Lesson'>;

interface Props {
  navigation: LessonNavigationProp;
  route: LessonRouteProp;
}

const LessonScreen: React.FC<Props> = ({ navigation, route }) => {
  const { lesson, sectionTitle, accentColor } = route.params;

  const { hearts, loseHeart, completeLesson, unlockLesson } = useProgressStore();

  const {
    currentChallengeIndex,
    currentChallenge,
    selectedAnswer,
    answerResult,
    mistakeCount,
    isLessonComplete,
    selectAnswer,
    submitAnswer,
    nextChallenge,
    getAccuracyPercent,
  } = useLesson(lesson.challenges);

  const progress = currentChallengeIndex / lesson.challenges.length;
  const hasAnswered = answerResult !== 'unanswered';
  const canSubmit = selectedAnswer !== null && !hasAnswered;

  useEffect(() => {
    if (isLessonComplete) {
      handleLessonComplete();
    }
  }, [isLessonComplete]);

  const handleLessonComplete = useCallback(() => {
    const accuracy = getAccuracyPercent();
    const xpEarned = calculateLessonXp(lesson, accuracy);

    completeLesson(lesson.id, xpEarned, accuracy);

    const nextLessonId = getNextLessonId(lesson.id);
    if (nextLessonId) {
      unlockLesson(nextLessonId);
    }

    navigation.replace('Results', {
      xpEarned,
      accuracy,
      streakDay: useProgressStore.getState().currentStreak,
      lessonTitle: lesson.title,
      isStreakMilestone: useProgressStore.getState().currentStreak % 7 === 0,
    });
  }, [getAccuracyPercent, lesson, completeLesson, unlockLesson, navigation]);

  const handleSubmit = useCallback(() => {
    const isCorrect = submitAnswer();

    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      loseHeart();
      if (hearts <= 1) {
        handleOutOfHearts();
      }
    }
  }, [submitAnswer, loseHeart, hearts]);

  const handleContinue = useCallback(() => {
    nextChallenge();
  }, [nextChallenge]);

  const handleOutOfHearts = () => {
    Alert.alert(
      'Out of hearts!',
      "Bug says: everyone makes mistakes! Come back in a few hours and try again.",
      [
        {
          text: 'Leave',
          onPress: () => navigation.goBack(),
          style: 'destructive',
        },
      ]
    );
  };

  const handleCloseLesson = () => {
    if (currentChallengeIndex === 0) {
      navigation.goBack();
      return;
    }
    Alert.alert(
      'Wait, you were so close!',
      "Bug believes in you! If you leave now, your progress will be lost.",
      [
        { text: 'Keep Going', style: 'cancel' },
        { text: 'Quit', onPress: () => navigation.goBack(), style: 'destructive' },
      ]
    );
  };

  const renderChallenge = (challenge: Challenge) => {
    const commonProps = {
      selectedAnswer: selectedAnswer as string | null,
      answerResult,
      onSelectAnswer: (answer: string) => selectAnswer(answer),
    };

    switch (challenge.type) {
      case 'PREDICT_OUTPUT':
        return <PredictOutputChallenge challenge={challenge} {...commonProps} />;
      case 'MULTIPLE_CHOICE':
        return <MultipleChoiceChallenge challenge={challenge} {...commonProps} />;
      case 'FILL_BLANK':
        return <FillBlankChallenge challenge={challenge} {...commonProps} />;
      case 'FIX_BUG':
        return <FixBugChallenge challenge={challenge} {...commonProps} />;
      case 'REORDER_BLOCKS':
        return (
          <ReorderBlocksChallenge
            challenge={challenge}
            answerResult={answerResult}
            onOrderChange={(order) => selectAnswer(order)}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundPrimary} />

      <LessonHeader
        progress={progress}
        hearts={hearts}
        onClose={handleCloseLesson}
      />

      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.challengeContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {renderChallenge(currentChallenge)}
        </ScrollView>

        {!hasAnswered && (
          <View style={styles.submitRow}>
            <Button
              label="Check answer"
              onPress={handleSubmit}
              disabled={!canSubmit}
            />
          </View>
        )}
      </KeyboardAvoidingView>

      {hasAnswered && (
        <FeedbackBar
          result={answerResult}
          explanation={currentChallenge.explanation}
          onContinue={handleContinue}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  body: {
    flex: 1,
  },
  challengeContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  submitRow: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.sm,
  },
});

export default LessonScreen;
