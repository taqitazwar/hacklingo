import { Platform } from 'react-native';

export const SHADOWS = {
  none: {},
  sm: Platform.select({
    ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, shadowOffset: { width: 0, height: 1 } },
    android: { elevation: 2 },
  }),
  md: Platform.select({
    ios: { shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
    android: { elevation: 4 },
  }),
  lg: Platform.select({
    ios: { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
    android: { elevation: 8 },
  }),
  xl: Platform.select({
    ios: { shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 20, shadowOffset: { width: 0, height: 6 } },
    android: { elevation: 12 },
  }),
} as const;
