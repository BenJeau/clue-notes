import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { store, persistor } from '../redux';
import { useTheme } from '../hooks';
import SplashScreen from './SplashScreen';

const Provider: React.FC = ({ children }) => {
  const { dark, colors } = useTheme();

  useEffect(() => {
    changeNavigationBarColor(colors.background, !dark, true);
  }, [colors, dark]);

  return (
    <View style={{ backgroundColor: colors.background }}>
      <StatusBar
        translucent
        backgroundColor={'#00000000'}
        barStyle={dark ? 'light-content' : 'dark-content'}
      />
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SplashScreen>{children}</SplashScreen>
        </PersistGate>
      </ReduxProvider>
    </View>
  );
};

export default Provider;
