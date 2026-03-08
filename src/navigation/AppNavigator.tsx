import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useProgressStore } from '../store';
import SplashScreen from '../screens/Splash/SplashScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import LessonScreen from '../screens/Lesson/LessonScreen';
import ResultsScreen from '../screens/Results/ResultsScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const loadProgress = useProgressStore((state) => state.loadProgress);

  // Load progress immediately in background — Splash's 2.5s delay is more than enough.
  useEffect(() => {
    loadProgress();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'none' }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash"     component={SplashScreen}    options={{ animation: 'none' }} />
      <Stack.Screen name="Welcome"    component={WelcomeScreen}   options={{ animation: 'none' }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ animation: 'none' }} />
      <Stack.Screen name="MainTabs"   component={TabNavigator}    options={{ animation: 'none' }} />
      <Stack.Screen
        name="Lesson"
        component={LessonScreen}
        options={{ presentation: 'modal', gestureEnabled: false }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ presentation: 'modal', gestureEnabled: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ animation: 'none' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
