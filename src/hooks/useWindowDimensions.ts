import { useWindowDimensions as useRNDimensions } from 'react-native';

export function useWindowDimensions() {
  const { width, height, fontScale, scale } = useRNDimensions();
  return {
    width,
    height,
    fontScale,
    scale,
    isPortrait: height > width,
    isLandscape: width > height,
  };
}
