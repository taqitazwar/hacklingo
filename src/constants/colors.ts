/**
 * Duolingo-inspired color palette.
 * Primary green (#58CC02) is the signature brand color.
 * Text uses dark gray (#3C3C3C) — never pure black, per Duolingo's style.
 */
const Colors = {
  // ─── Bug the Ladybug — brand identity ─────────────────────────────────
  brandRed: '#E03232',        // Bug's shell red — app primary brand
  brandRedDark: '#B52828',    // Pressed / shadow state
  brandRedLight: '#FF5A5A',   // Highlight / hover

  // ─── Duolingo signature greens ────────────────────────────────────────
  green: '#58CC02',
  greenDark: '#58A700',       // Button shadow / pressed state
  greenDeep: '#46A302',       // Darker variant for section headers
  greenLight: '#1A3A22',
  greenPale: '#0F2A18',

  // ─── Blue ─────────────────────────────────────────────────────────────
  blue: '#1CB0F6',
  blueDark: '#0E8EC8',
  blueLight: '#0A1E30',

  // ─── Orange (streak) ──────────────────────────────────────────────────
  orange: '#FF9600',
  orangeDark: '#CC7A00',
  orangeLight: '#2E1C08',

  // ─── Red (hearts / error) ─────────────────────────────────────────────
  red: '#FF4B4B',
  redDark: '#EA2B2B',
  redLight: '#2E1010',

  // ─── Yellow / Gold (XP, achievements) ────────────────────────────────
  yellow: '#FFC800',
  yellowDark: '#CC9E00',
  yellowLight: '#2E2A0E',

  // ─── Purple ──────────────────────────────────────────────────────────
  purple: '#CE82FF',
  purpleDark: '#9B40CC',
  purpleLight: '#211230',

  // ─── Teal ────────────────────────────────────────────────────────────
  teal: '#00CD9C',
  tealDark: '#009E78',
  tealLight: '#0A2420',

  // ─── Text ─────────────────────────────────────────────────────────────
  textPrimary: '#F0F4F8',
  textSecondary: '#8FAEC8',
  textMuted: '#4D6B85',
  textInverse: '#0F1923',
  textGreen: '#58CC02',

  // ─── Backgrounds (dark developer theme) ───────────────────────────────
  backgroundPrimary: '#131F2E',
  backgroundSecondary: '#1A2B40',
  backgroundTertiary: '#1F3350',
  backgroundElevated: '#253D60',

  // ─── Borders ──────────────────────────────────────────────────────────
  borderLight: '#1F3350',
  borderMedium: '#2A4665',

  // ─── Semantic aliases ─────────────────────────────────────────────────
  success: '#58CC02',
  successDark: '#58A700',
  successLight: '#1A3A22',

  error: '#FF4B4B',
  errorDark: '#EA2B2B',
  errorLight: '#2E1010',

  // ─── Game ─────────────────────────────────────────────────────────────
  heart: '#FF4B4B',
  heartEmpty: '#2A4665',
  xpGold: '#FFC800',
  streakOrange: '#FF9600',

  // ─── Code block ──────────────────────────────────────────────────────
  codeBackground: '#1E1E2E',
  codeText: '#CDD6F4',
  codeKeyword: '#CBA6F7',
  codeString: '#A6E3A1',
  codeComment: '#6C7086',
  codeNumber: '#FAB387',

  // ─── Per-section accent colors ────────────────────────────────────────
  section1: '#58CC02',   // Python Basics      → Duolingo green
  section2: '#1CB0F6',   // Control Flow       → Blue
  section3: '#CE82FF',   // Lists              → Purple
  section4: '#FF9600',   // Dictionaries       → Orange
  section5: '#FF4B4B',   // Functions          → Red
  section6: '#00CD9C',   // Strings            → Teal
  section7: '#FFC800',   // Files              → Yellow
  section8: '#CE82FF',   // Pythonic           → Purple
  section9: '#1CB0F6',   // Intermediate       → Blue
  section10: '#58CC02',  // Mastery            → Green

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

/**
 * Section gradient pairs [light, dark] for course map nodes.
 */
export const SectionGradients: Record<string, [string, string]> = {
  'python-basics':     ['#78E020', '#58CC02'],
  'control-flow':      ['#35D0FC', '#1CB0F6'],
  'lists':             ['#DC9AFF', '#CE82FF'],
  'dictionaries':      ['#FFB020', '#FF9600'],
  'functions':         ['#FF6B6B', '#FF4B4B'],
  'strings-advanced':  ['#20E8B8', '#00CD9C'],
  'files-automation':  ['#FFD820', '#FFC800'],
  'pythonic-thinking': ['#DC9AFF', '#CE82FF'],
  'intermediate':      ['#35D0FC', '#1CB0F6'],
  'mastery':           ['#78E020', '#58CC02'],
};

/**
 * Shadow color for each section's node (darker shade of section color).
 */
export const SectionShadowColors: Record<string, string> = {
  'python-basics':     '#46A302',
  'control-flow':      '#0E8EC8',
  'lists':             '#9B40CC',
  'dictionaries':      '#CC7A00',
  'functions':         '#CC2B2B',
  'strings-advanced':  '#009E78',
  'files-automation':  '#CC9E00',
  'pythonic-thinking': '#9B40CC',
  'intermediate':      '#0E8EC8',
  'mastery':           '#46A302',
};

export type ColorKey = keyof typeof Colors;
export default Colors;
