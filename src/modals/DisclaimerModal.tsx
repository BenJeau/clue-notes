import React, { useCallback, useEffect, useRef } from 'react';
import { Text } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Modal } from '../components';
import { useDispatch, useSelector, useTheme } from '../hooks';
import { clearPlayers } from '../redux/slices/notesSlice';
import { toggleDisclaimer } from '../redux/slices/settingsSlice';

const DisclaimerModal = () => {
  const modalRef = useRef<Modalize>(null);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const visible = useSelector(({ settings }) => settings.showDisclaimer);

  const onClose = useCallback(() => {
    dispatch(toggleDisclaimer());
    dispatch(clearPlayers());
  }, [dispatch]);

  useEffect(() => {
    if (visible) {
      modalRef.current?.open();
    }
  }, [visible]);

  return (
    <Modal
      ref={modalRef}
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

export default DisclaimerModal;
