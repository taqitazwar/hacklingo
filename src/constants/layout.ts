import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Layout = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  isSmallDevice: SCREEN_HEIGHT < 700,
  isTablet: SCREEN_WIDTH >= 768,

  buttonHeight: 52,
  buttonHeightSmall: 46,
  headerHeight: 56,
  tabBarHeight: Platform.OS === 'ios' ? 83 : 60,

  // Duolingo uses very round corners
  radiusSm:   8,
  radiusMd:   12,
  radiusLg:   16,
  radiusXl:   20,
  radiusXxl:  28,
  radiusFull: 999,

  // Button 3D depth offset (how many px the shadow sticks out below)
  buttonDepth: 4,

  shadowSm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  shadowMd: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 5,
  },
  shadowLg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 18,
    elevation: 8,
  },
} as const;

export default Layout;
