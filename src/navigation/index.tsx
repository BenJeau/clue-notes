import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';

import RootStack from './RootStack';

const Navigator: React.FC = () => {
  const { colors, dark } = useTheme();

  return (
    <>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={dark ? 'light-content' : 'dark-content'}
      />
      <RootStack />
    </>
  );
};

export default Navigator;
