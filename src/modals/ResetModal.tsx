import React from 'react';
import { Modalize } from 'react-native-modalize';

import { clearBoard, clearPlayers } from '../redux/slices/notesSlice';
import { Button, Modal } from '../components';
import { colors } from '../config/data';
import { useTheme, useDispatch } from '../hooks';

interface ResetModalProps {
  modalRef: React.RefObject<Modalize>;
}

const ResetModal: React.FC<ResetModalProps> = ({ modalRef }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const clearNotes = () => {
    dispatch(clearBoard());
    dimiss();
  };

  const clearEverything = () => {
    dispatch(clearBoard());
    dispatch(clearPlayers());
    dimiss();
  };

  const dimiss = () => modalRef.current?.close();

  return (
    <Modal
      modalRef={modalRef}
      header={{
        title: 'Clear Notes',
        subtitle: 'Removes the notes taken',
      }}>
      <Button
        label="Clear content of the board"
        onPress={clearNotes}
        style={{
          backgroundColor: theme.colors.card,
        }}
      />
      <Button
        label="Clear content of the board and players"
        onPress={clearEverything}
        style={{
          backgroundColor: colors.red[theme.dark ? 'dark' : 'light'],
          marginTop: 10,
        }}
      />
    </Modal>
  );
};

export default ResetModal;
