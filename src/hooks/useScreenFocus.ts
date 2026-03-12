import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export function useScreenFocus(onFocus: () => void, onBlur?: () => void) {
  const navigation = useNavigation();

  useEffect(() => {
    const focusSub = navigation.addListener('focus', onFocus);
    const blurSub = onBlur ? navigation.addListener('blur', onBlur) : null;
    return () => {
      focusSub();
      blurSub?.();
    };
  }, [navigation, onFocus, onBlur]);
}
