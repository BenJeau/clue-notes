import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Modal, Button } from '../components';
import { useTheme, useDispatch } from '../hooks';
import { setPlayer } from '../redux/slices/notesSlice';

interface SetPlayerNameModalProps {
  modalRef: React.RefObject<Modalize>;
  selectedPlayerIndex: number;
  buttonColor: string;
}

const SetPlayerNameModal: React.FC<SetPlayerNameModalProps> = ({
  modalRef,
  selectedPlayerIndex,
  buttonColor,
}) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const textInputRef = useRef<TextInput>(null);

  const save = () => {
    modalRef.current?.close();
    setName('');
    dispatch(setPlayer({ index: selectedPlayerIndex, name }));
  };

  return (
    <Modal
      modalRef={modalRef}
      props={{
        onOpened: () => textInputRef.current?.focus(),
        childrenStyle: { paddingTop: 10 },
      }}
      header={{
        title: 'Set Player Initials',
        subtitle: 'Max of two characters',
      }}>
      <TextInput
        ref={textInputRef}
        onChangeText={(text) => setName(text)}
        value={name}
        maxLength={2}
        autoCapitalize="characters"
        onSubmitEditing={save}
        placeholder="Player initials"
        placeholderTextColor={`${colors.text}70`}
        selectionColor={buttonColor}
        style={{ paddingLeft: 0, color: colors.text }}
      />
      <Button
        label="Save"
        onPress={save}
        style={{ backgroundColor: buttonColor }}
      />
    </Modal>
  );
};

export default SetPlayerNameModal;
