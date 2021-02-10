import React, { useCallback } from 'react';
import { Text } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { Modal } from '~/components';
import { useDispatch, useTheme } from '~/hooks';
import { clearPlayers } from '~/redux/slices/notesSlice';
import { toggleDisclaimer } from '~/redux/slices/settingsSlice';

const Disclaimer: NavigationFunctionComponent = ({ componentId }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const onClose = useCallback(() => {
    dispatch(toggleDisclaimer());
    dispatch(clearPlayers());
  }, [dispatch]);

  return (
    <Modal
      componentId={componentId}
      showDismiss
      props={{ onClose }}
      header={{
        title: 'Disclaimer',
        subtitle: 'Companion application',
      }}>
      <Text style={{ color: colors.text }}>
        This application is a companion of the Clue board game and is not Clue
        game itself
      </Text>
    </Modal>
  );
};

export default Disclaimer;
