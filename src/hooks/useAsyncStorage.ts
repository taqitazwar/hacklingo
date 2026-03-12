import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage<T>(key: string, defaultValue: T) {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(raw => {
        if (raw !== null) {
          try { setStoredValue(JSON.parse(raw)); } catch { /* invalid JSON */ }
        }
      })
      .finally(() => setLoading(false));
  }, [key]);

  const setValue = useCallback(async (value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
      AsyncStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  }, [key]);

  const removeValue = useCallback(async () => {
    setStoredValue(defaultValue);
    await AsyncStorage.removeItem(key);
  }, [key, defaultValue]);

  return { value: storedValue, setValue, removeValue, loading };
}
