import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '../types';
import Colors from '../constants/colors';
import { Typography, Spacing, Layout } from '../constants';
import HomeScreen        from '../screens/Home/HomeScreen';
import PracticeScreen    from '../screens/Practice/PracticeScreen';
import ChallengesScreen  from '../screens/Challenges/ChallengesScreen';
import ProfileScreen     from '../screens/Profile/ProfileScreen';
import LeaderboardScreen from '../screens/Leaderboard/LeaderboardScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_CONFIG: Record<
  keyof MainTabParamList,
  { label: string; active: IoniconName; inactive: IoniconName; activeColor: string }
> = {
  Home:        { label: 'Learn',      active: 'home',          inactive: 'home-outline',         activeColor: Colors.brandRed },
  Practice:    { label: 'Practice',   active: 'refresh-circle', inactive: 'refresh-circle-outline', activeColor: Colors.blue   },
  Challenges:  { label: 'Challenges', active: 'flash',         inactive: 'flash-outline',        activeColor: Colors.yellow   },
  Leaderboard: { label: 'Rank',       active: 'trophy',        inactive: 'trophy-outline',       activeColor: Colors.orange   },
  Profile:     { label: 'Profile',    active: 'person-circle', inactive: 'person-circle-outline', activeColor: Colors.teal    },
};

const TabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => {
      const cfg = TAB_CONFIG[route.name as keyof MainTabParamList];
      return {
        headerShown: false,
        tabBarIcon: ({ focused, size }) => (
          <Ionicons
            name={focused ? cfg.active : cfg.inactive}
            size={size}
            color={focused ? cfg.activeColor : Colors.textMuted}
          />
        ),
        tabBarActiveTintColor: cfg.activeColor,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.backgroundPrimary,
          borderTopColor: Colors.borderLight,
          borderTopWidth: 1,
          height: Layout.tabBarHeight,
          paddingBottom: Platform.OS === 'ios' ? Spacing.lg : Spacing.sm,
          paddingTop: Spacing.xs,
        },
        tabBarLabelStyle: {
          fontFamily: Typography.fontFamily.bold,
          fontSize: Typography.fontSize.xs,
        },
      };
    }}
  >
    <Tab.Screen name="Home"        component={HomeScreen}        options={{ tabBarLabel: TAB_CONFIG.Home.label        }} />
    <Tab.Screen name="Practice"    component={PracticeScreen}    options={{ tabBarLabel: TAB_CONFIG.Practice.label    }} />
    <Tab.Screen name="Challenges"  component={ChallengesScreen}  options={{ tabBarLabel: TAB_CONFIG.Challenges.label  }} />
    <Tab.Screen name="Leaderboard" component={LeaderboardScreen} options={{ tabBarLabel: TAB_CONFIG.Leaderboard.label }} />
    <Tab.Screen name="Profile"     component={ProfileScreen}     options={{ tabBarLabel: TAB_CONFIG.Profile.label     }} />
  </Tab.Navigator>
);

export default TabNavigator;
