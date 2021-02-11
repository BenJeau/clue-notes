import React, { useEffect } from 'react';
import {
  Navigation,
  NavigationFunctionComponent,
} from 'react-native-navigation';

import { Board, Header, HeaderPlayers } from '~/components';
import { showModal } from '~/utils/navigation';
import { useTheme } from '~/hooks';
import Symbols from '~/screens/Symbols';

const Notes: NavigationFunctionComponent = ({ componentId }) => {
  const theme = useTheme();

  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      navigationBar: {
        backgroundColor: theme.colors.background,
      },
      statusBar: {
        style: theme.dark ? 'light' : 'dark',
      },
      layout: {
        backgroundColor: theme.colors.card,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <>
      <Header
        icons={[
          {
            name: 'eye-off-outline',
            onPress: () => showModal('HideNotes'),
          },
          {
            name: 'undo-variant',
            onPress: () => showModal('ClearNotes'),
          },
          { name: 'dots-vertical', onPress: () => showModal('Settings') },
        ]}
      />
      <HeaderPlayers />
      <Board />
      <Symbols />
    </>
  );
};

export default Notes;
