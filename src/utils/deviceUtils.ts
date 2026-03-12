import { Platform, NativeModules } from 'react-native';

export function getDeviceLanguage(): string {
  const locale = Platform.OS === 'ios'
    ? NativeModules.SettingsManager?.settings?.AppleLocale ?? 'en'
    : NativeModules.I18nManager?.localeIdentifier ?? 'en';
  return locale.split('_')[0].split('-')[0];
}

export function getDevicePlatform(): 'ios' | 'android' | 'web' {
  return Platform.OS as 'ios' | 'android' | 'web';
}

export function isDebugMode(): boolean {
  return __DEV__;
}
