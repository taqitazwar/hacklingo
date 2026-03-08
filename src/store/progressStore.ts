/**
 * Central game state using Zustand with AsyncStorage persistence.
 * All game mechanic values live in GameConfig so they can be tuned without touching store logic.
 */
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, LessonProgress } from '../types';
import GameConfig from '../constants/game';

const STORAGE_KEY = '@hacklingo_progress';

const todayDateString = (): string => new Date().toISOString().split('T')[0];

const defaultProgress: UserProgress = {
  userId: 'local',
  totalXp: 0,
  currentStreak: 0,
  longestStreak: 0,
  hearts: GameConfig.maxHearts,
  lastHeartRefillAt: null,
  lastActivityDate: null,
  completedLessons: {},
  unlockedLessonIds: ['basics-hello-python'],
  aiHelpsUsedToday: 0,
  aiHelpsLastResetDate: null,
};

interface ProgressActions {
  loadProgress: () => Promise<void>;
  completeLesson: (lessonId: string, xpEarned: number, accuracy: number) => void;
  unlockLesson: (lessonId: string) => void;
  loseHeart: () => void;
  refillHearts: () => void;
  consumeAiHelp: () => boolean;
  resetDailyAiHelps: () => void;
  resetProgress: () => Promise<void>;
  getLessonStatus: (lessonId: string) => 'locked' | 'available' | 'completed';
  isLessonCompleted: (lessonId: string) => boolean;
}

type ProgressStore = UserProgress & ProgressActions;

const useProgressStore = create<ProgressStore>((set, get) => ({
  ...defaultProgress,

  loadProgress: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: UserProgress = JSON.parse(stored);
        set(parsed);
      }
    } catch {
      // If storage fails, start with defaults — no crash
    }
  },

  completeLesson: (lessonId, xpEarned, accuracy) => {
    const today = todayDateString();
    const state = get();

    const lessonProgress: LessonProgress = {
      lessonId,
      completedAt: new Date().toISOString(),
      accuracy,
      xpEarned,
    };

    const lastDate = state.lastActivityDate;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    let newStreak = state.currentStreak;
    if (lastDate === today) {
      // Already completed something today — streak unchanged
    } else if (lastDate === yesterdayString) {
      newStreak = state.currentStreak + 1;
    } else {
      newStreak = 1;
    }

    const newTotal = state.totalXp + xpEarned;
    const newLongest = Math.max(state.longestStreak, newStreak);

    const updated: Partial<UserProgress> = {
      totalXp: newTotal,
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastActivityDate: today,
      completedLessons: {
        ...state.completedLessons,
        [lessonId]: lessonProgress,
      },
    };

    set(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, ...updated }));
  },

  unlockLesson: (lessonId) => {
    const state = get();
    if (state.unlockedLessonIds.includes(lessonId)) return;

    const updated = {
      unlockedLessonIds: [...state.unlockedLessonIds, lessonId],
    };
    set(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, ...updated }));
  },

  loseHeart: () => {
    const state = get();
    if (state.hearts <= 0) return;

    const updated = {
      hearts: state.hearts - GameConfig.heartCostPerMistake,
    };
    set(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, ...updated }));
  },

  refillHearts: () => {
    const updated = {
      hearts: GameConfig.maxHearts,
      lastHeartRefillAt: new Date().toISOString(),
    };
    set(updated);
    const state = get();
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, ...updated }));
  },

  consumeAiHelp: (): boolean => {
    const state = get();
    const today = todayDateString();

    // Reset daily counter if it's a new day
    if (state.aiHelpsLastResetDate !== today) {
      set({ aiHelpsUsedToday: 0, aiHelpsLastResetDate: today });
    }

    const currentUsed = state.aiHelpsLastResetDate !== today ? 0 : state.aiHelpsUsedToday;
    if (currentUsed >= GameConfig.freeAiHelpsPerDay) return false;

    const updated = {
      aiHelpsUsedToday: currentUsed + 1,
      aiHelpsLastResetDate: today,
    };
    set(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, ...updated }));
    return true;
  },

  resetDailyAiHelps: () => {
    const updated = {
      aiHelpsUsedToday: 0,
      aiHelpsLastResetDate: todayDateString(),
    };
    set(updated);
  },

  resetProgress: async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    set(defaultProgress);
  },

  getLessonStatus: (lessonId): 'locked' | 'available' | 'completed' => {
    const state = get();
    if (state.completedLessons[lessonId]) return 'completed';
    if (state.unlockedLessonIds.includes(lessonId)) return 'available';
    return 'locked';
  },

  isLessonCompleted: (lessonId): boolean => {
    return !!get().completedLessons[lessonId];
  },
}));

export default useProgressStore;
