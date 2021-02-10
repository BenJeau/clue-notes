import React, { useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { clearBoard, clearPlayers } from '~/redux/slices/notesSlice';
import { Button, Modal } from '~/components';
import { useTheme, useDispatch } from '~/hooks';

const ClearNotes: NavigationFunctionComponent = ({ componentId }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const modalRef = useRef<Modalize>(null);

  const close = () => modalRef.current?.close();

  const clearNotes = () => {
    dispatch(clearBoard());
    close();
  };

  const clearEverything = () => {
    dispatch(clearBoard());
    dispatch(clearPlayers());
    close();
  };

  return (
    <Modal
      ref={modalRef}
      componentId={componentId}
      header={{
        title: 'Clear Notes',
        subtitle: 'Removes the notes taken',
      }}>
      <Button
        label="Clear content of the board"
        onPress={clearNotes}
        style={{
          backgroundColor: colors.card,
        }}
      />
      <Button
        label="Clear content of the board and players"
        onPress={clearEverything}
        style={{
          backgroundColor: colors.red,
          marginTop: 10,
        }}
      />
    </Modal>
  );
};

export default ClearNotes;
