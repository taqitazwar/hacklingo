/**
 * Spacing scale based on 4pt grid system.
 * All spacing values are multiples of 4.
 */
const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 48,
  section: 64,
} as const;

export type SpacingKey = keyof typeof Spacing;
export default Spacing;
