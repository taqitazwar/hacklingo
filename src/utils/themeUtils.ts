import { Colors } from '../constants';

export type ThemeMode = 'dark' | 'light' | 'system';

export function getThemeColors(mode: ThemeMode) {
  // Currently only dark theme is implemented
  return Colors;
}

export function isDarkMode(mode: ThemeMode, systemIsDark: boolean): boolean {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  return systemIsDark;
}

export function getContrastColor(backgroundColor: string): string {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
