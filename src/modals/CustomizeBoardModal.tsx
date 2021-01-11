import React from 'react';
import { Text } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Button, Modal } from '../components';
import { useDispatch, useTheme } from '../hooks';
import { colors } from '../config/data';
import { resetSections } from '../redux/slices/settingsSlice';

interface CustomizeBoardModalProps {
  modalRef: React.RefObject<Modalize>;
  openCameraModal: () => void;
  openQrModal: () => void;
  openModifyBoardModal: () => void;
}

const CustomizeBoardModal: React.FC<CustomizeBoardModalProps> = ({
  modalRef,
  openCameraModal,
  openModifyBoardModal,
  openQrModal,
}) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const resetBoardSections = () => {
    dispatch(resetSections());
  };

  return (
    <Modal
      modalRef={modalRef}
      props={{
        childrenStyle: { padding: 20 },
      }}>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Customize Board
      </Text>
      <Text style={{ color: theme.colors.text, marginBottom: 20 }}>
        Modify the content of the board to reflect your game of Clue
      </Text>
      <Button
        label="Import board via QR code"
        onPress={openCameraModal}
        style={{
          backgroundColor: theme.colors.card,
          marginBottom: 10,
        }}
      />
      <Button
        label="Share board via QR code"
        onPress={openQrModal}
        style={{
          backgroundColor: theme.colors.card,
          marginBottom: 10,
        }}
      />
      <Button
        label="Manually modify board"
        onPress={openModifyBoardModal}
        style={{
          backgroundColor: theme.colors.card,
          marginBottom: 20,
        }}
      />
      <Button
        label="Reset board"
        style={{
          backgroundColor: colors.red[theme.dark ? 'dark' : 'light'],
        }}
        onPress={resetBoardSections}
      />
    </Modal>
  );
};

export default CustomizeBoardModal;
