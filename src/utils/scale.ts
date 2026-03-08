import { Dimensions, PixelRatio } from 'react-native';

const BASE_WIDTH = 375;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / BASE_WIDTH;

/** Scale a size relative to iPhone 14 base width */
const scaleSize = (size: number): number =>
  Math.round(PixelRatio.roundToNearestPixel(size * scale));

/** Scale font size — less aggressive than scaleSize to preserve readability */
const scaleFontSize = (size: number): number => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export { scaleSize, scaleFontSize };
