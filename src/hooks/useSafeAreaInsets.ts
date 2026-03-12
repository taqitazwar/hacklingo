import { useSafeAreaInsets as useRNSAI } from 'react-native-safe-area-context';

export function useSafeBottom(extra = 0): number {
  const insets = useRNSAI();
  return insets.bottom + extra;
}

export function useSafeTop(extra = 0): number {
  const insets = useRNSAI();
  return insets.top + extra;
}

export { useRNSAI as useSafeAreaInsets };
