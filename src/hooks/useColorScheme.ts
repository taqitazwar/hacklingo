import { useColorScheme as useRNColorScheme, ColorSchemeName } from 'react-native';

export function useColorScheme(): ColorSchemeName {
  return useRNColorScheme();
}

export function useIsDarkMode(): boolean {
  return useRNColorScheme() === 'dark';
}
