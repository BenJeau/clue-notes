import React, { useEffect, useState } from 'react';
import {
  Navigation,
  NavigationFunctionComponent,
} from 'react-native-navigation';

import { Board, Header, HeaderPlayers } from '~/components';
import { showModal } from '~/utils/navigation';
import { useTheme } from '~/hooks';
import Symbols from '~/screens/Symbols';
import { Animated, ScrollView, useWindowDimensions } from 'react-native';
import { HEADER_HEIGHT } from '../components/Header';

const Notes: NavigationFunctionComponent = ({ componentId }) => {
  const theme = useTheme();
  const window = useWindowDimensions();
  const [headerVisibleHeight] = useState(new Animated.Value(1));

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
      <ScrollView
        stickyHeaderIndices={[1]}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        onScroll={({
          nativeEvent: {
            contentOffset: { y },
          },
        }) => {
          Animated.timing(headerVisibleHeight, {
            toValue: y,
            useNativeDriver: true,
          }).start();
        }}
        contentContainerStyle={{ height: window.height + HEADER_HEIGHT }}>
        <Header
          headerVisibleHeight={headerVisibleHeight}
          icons={[
            {
              name: 'eye-off-outline',
              onPress: () => showModal('HideNotes'),
            },
            {
              name: 'undo-variant',
              onPress: () => showModal('ClearNotes'),
            },
            { name: 'cog-outline', onPress: () => showModal('Settings') },
          ]}
        />
        <HeaderPlayers />
        <Board />
      </ScrollView>
      <Symbols />
    </>
  );
};

export default Notes;
