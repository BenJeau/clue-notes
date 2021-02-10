import {
  Navigation,
  OptionsModalPresentationStyle,
  OptionsStatusBar,
} from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { persistStore } from 'redux-persist';

import * as Screens from '../screens';
import Provider from './Provider';
import { store } from '../redux';
import { HeaderButton } from '../components';

export const registerScreens = () => {
  const screens = Object.keys(Screens) as Array<keyof typeof Screens>;

  Navigation.registerComponent('HeaderButton', () => Provider(HeaderButton));

  screens.forEach((i) => {
    Navigation.registerComponent(i, () =>
      gestureHandlerRootHOC(Provider(Screens[i])),
    );
  });
};

export const launch = () => {
  Navigation.events().registerAppLaunchedListener(() => {
    persistStore(store, null, () => {
      defaultSetRoot();
    });
  });
};

const defaultSetRoot = async () => {
  await Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Notes',
              options: {
                statusBar: {
                  drawBehind: true,
                  backgroundColor: 'transparent',
                  style: 'dark',
                },
              },
            },
          },
        ],
        options: {
          animations: {
            setRoot: {
              waitForRender: true,
              alpha: {
                from: 0,
                to: 1,
                duration: 100,
              },
            },
          },
          topBar: {
            visible: false,
          },
        },
      },
    },
  });

  if (store.getState().settings.showDisclaimer) {
    showModal('Disclaimer');
  }
};

export const showModal = (name: keyof typeof Screens, passProps?: any) => {
  let statusBarConfig: OptionsStatusBar = {
    drawBehind: true,
    backgroundColor: '#ffffff00',
    // style: colors.statusBar,
  };
  Navigation.showModal({
    component: {
      name: name,
      passProps,
      options: {
        statusBar: statusBarConfig,
        modalPresentationStyle:
          OptionsModalPresentationStyle.overCurrentContext,
        layout: {
          backgroundColor: 'transparent',
        },
        animations: {
          showModal: {
            enabled: false,
          },
          dismissModal: {
            enabled: false,
          },
        },
      },
    },
  });
};

export const dismissModal = (componentId: string) =>
  Navigation.dismissModal(componentId);

export const dismissAllModal = () => Navigation.dismissAllModals();
