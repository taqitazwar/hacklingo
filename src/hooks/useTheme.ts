import { useMemo } from 'react';
import { Colors, Typography, Spacing } from '../constants';

export type Theme = {
  colors: typeof Colors;
  typography: typeof Typography;
  spacing: typeof Spacing;
};

export function useTheme(): Theme {
  return useMemo(() => ({
    colors: Colors,
    typography: Typography,
    spacing: Spacing,
  }), []);
}
