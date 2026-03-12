import { Platform, Dimensions, PixelRatio } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function isSmallScreen(): boolean {
  return SCREEN_WIDTH < 375;
}

export function isTablet(): boolean {
  return Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) >= 768;
}

export function normalizeFont(size: number): number {
  const scale = SCREEN_WIDTH / 375;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
}

export function getStatusBarHeight(): number {
  if (IS_IOS) return 44;
  return 24;
}

export const SCREEN = { width: SCREEN_WIDTH, height: SCREEN_HEIGHT };
