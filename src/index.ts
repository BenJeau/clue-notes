import './utils/wdyr';

import { Platform, UIManager } from 'react-native';
import { launch, registerScreens } from './utils/navigation';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

registerScreens();
launch();
