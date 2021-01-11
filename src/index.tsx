import React from 'react';
import { Platform, UIManager } from 'react-native';

import { Notes } from './screens';
import { Provider } from './utils';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default () => (
  <Provider>
    <Notes />
  </Provider>
);
