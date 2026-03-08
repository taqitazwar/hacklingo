import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Type-safe AsyncStorage wrapper.
 */

export async function storageGet<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function storageSet<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

export async function storageRemove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export async function storageClear(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {
    // ignore
  }
}

export const STORAGE_KEYS = {
  progress: '@hacklingo_progress',
  settings: '@hacklingo_settings',
  onboardingDone: '@hacklingo_onboarding_done',
  lastSeen: '@hacklingo_last_seen',
} as const;
