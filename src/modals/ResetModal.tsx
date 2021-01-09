import React from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useDispatch } from 'react-redux';

import { clearBoard, clearPlayers } from '../redux/slices/boardSlice';
import { Button, Modal } from '../components';
import { colors } from '../config/data';

interface ResetModalProps {
  modalRef: React.RefObject<Modalize>;
}

const ResetModal: React.FC<ResetModalProps> = ({ modalRef, animated }) => {
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
      props={{
        childrenStyle: { padding: 20 },
        panGestureAnimatedValue: animated,
      }}>
      <Text
        style={{ color: theme.colors.text, fontSize: 20, fontWeight: 'bold' }}>
        Reset Board
      </Text>
      <Text style={{ color: theme.colors.text }}>
        Clear the content of the board
      </Text>

      <View style={{ flexDirection: 'row', paddingTop: 20 }}>
        <Button
          label="Clear everything"
          onPress={clearEverything}
          style={{
            backgroundColor: colors.red[theme.dark ? 'dark' : 'light'],
            flex: 1,
            marginRight: 5,
          }}
        />
        <Button
          label="Only board content"
          onPress={clearNotes}
          style={{
            backgroundColor: theme.colors.card,
            flex: 1,
            marginLeft: 5,
          }}
        />
      </View>
    </Modal>
  );
};

export default ResetModal;
