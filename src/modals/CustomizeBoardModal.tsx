import React, { useRef, useState } from 'react';
import { Text, TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Button, Modal } from '../components';
import { useTheme } from '../hooks';
import { colors } from '../config/data';

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
  const [id, setIndex] = useState(-1);

  const ref = useRef<TextInput>(null);
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
      />
    </Modal>
  );
};

export default CustomizeBoardModal;
