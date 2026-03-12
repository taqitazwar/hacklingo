// Extended color palette for theming
export const EXTENDED_COLORS = {
  // Backgrounds
  bg100: '#131F2E',
  bg200: '#1A2B40',
  bg300: '#1F3350',

  // Text
  text100: '#F0F4F8',
  text200: '#8FAEC8',
  text300: '#4D6B85',

  // Brand
  red: '#E03232',
  redDark: '#B52828',
  redLight: '#2E1515',

  // Status
  green: '#58CC02',
  greenDark: '#46A802',
  greenLight: '#1A3A22',

  blue: '#1CB0F6',
  blueLight: '#0A1E30',

  yellow: '#FFD900',
  yellowLight: '#2E2600',

  orange: '#FF9600',
  orangeLight: '#2E1A00',

  teal: '#00B8D4',
  tealLight: '#00262D',

  purple: '#9C27B0',
  purpleLight: '#200527',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ExtendedColor = keyof typeof EXTENDED_COLORS;
