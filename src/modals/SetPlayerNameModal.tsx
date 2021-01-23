import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Modal, Button } from '../components';
import { useTheme, useDispatch } from '../hooks';
import { setPlayer, setUserPlayerIndex } from '../redux/slices/notesSlice';

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
    setName('');
    dispatch(setPlayer({ index: selectedPlayerIndex, name }));
  };

  const updatePlayer = () => {
    dispatch(setUserPlayerIndex(selectedPlayerIndex));
    dismiss();
  };

  const dismiss = () => modalRef.current?.close();

  return (
    <Modal
      modalRef={modalRef}
      props={{
        onOpened: () => textInputRef.current?.focus(),
        onClose: save,
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
        onSubmitEditing={dismiss}
        placeholder="Player initials"
        placeholderTextColor={`${colors.text}70`}
        selectionColor={buttonColor}
        style={{ paddingLeft: 0, color: colors.text, marginTop: -10 }}
      />
      <Button
        label="I am this player (changes overlay color)"
        onPress={updatePlayer}
        style={{ backgroundColor: buttonColor }}
      />
    </Modal>
  );
};

export default SetPlayerNameModal;
