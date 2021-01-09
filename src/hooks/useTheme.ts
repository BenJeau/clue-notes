import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { themeColors } from '../config/style';

export default () => {
  const scheme = useColorScheme();

  const dark = useMemo(() => scheme === 'dark', [scheme]);

  return {
    dark,
    colors: themeColors[dark ? 'dark' : 'light'],
  };
};
