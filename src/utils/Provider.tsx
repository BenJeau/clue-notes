import React from 'react';
import { useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';

import { store, persistor } from '../redux';

const Provider: React.FC = ({ children }) => {
  const scheme = useColorScheme();

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          theme={scheme === 'light' ? DarkTheme : DefaultTheme}>
          {children}
        </NavigationContainer>
      </PersistGate>
    </ReduxProvider>
  );
};

export default Provider;
