import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import RootStack from './RootStack';

const Navigator: React.FC = () => {
  const { colors, dark } = useTheme();

  useEffect(() => {
    changeNavigationBarColor(dark ? '#010101' : '#F2F2F2', !dark, true);
  }, [colors, dark]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="#00000000"
        barStyle={dark ? 'light-content' : 'dark-content'}
      />
      <RootStack />
    </>
  );
};

export default Navigator;
