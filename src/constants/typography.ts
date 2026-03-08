/**
 * Nunito font family — the same rounded, friendly typeface Duolingo uses.
 * Weights are loaded in App.tsx via expo-font.
 */
const fontFamily = {
  regular:   'Nunito_400Regular',
  semibold:  'Nunito_600SemiBold',
  bold:      'Nunito_700Bold',
  extraBold: 'Nunito_800ExtraBold',
  black:     'Nunito_900Black',
  mono:      'Courier New',
} as const;

const fontSize = {
  xs:      11,
  sm:      13,
  base:    15,
  md:      17,
  lg:      20,
  xl:      24,
  xxl:     28,
  xxxl:    32,
  display: 40,
} as const;

// Kept for backwards-compat — fontWeight is handled by fontFamily now
const fontWeight = {
  regular:  '400' as const,
  medium:   '500' as const,
  semibold: '600' as const,
  bold:     '700' as const,
  heavy:    '800' as const,
} as const;

const lineHeight = {
  tight:   1.2,
  normal:  1.5,
  relaxed: 1.75,
} as const;

const letterSpacing = {
  tight:  -0.5,
  normal:  0,
  wide:    0.5,
  wider:   1,
} as const;

const Typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} as const;

export default Typography;
