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
        title: 'Reset Board',
        subtitle: 'Clear the content of the board',
      }}>
      <Button
        label="Clear everything"
        onPress={clearEverything}
        style={{
          backgroundColor: colors.red[theme.dark ? 'dark' : 'light'],
        }}
      />
      <Button
        label="Only board content"
        onPress={clearNotes}
        style={{
          backgroundColor: theme.colors.card,
          marginTop: 10,
        }}
      />
    </Modal>
  );
};

export default ResetModal;
