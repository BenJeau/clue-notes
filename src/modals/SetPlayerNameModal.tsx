import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Modal, Button } from '../components';
import { useTheme, useDispatch, useSelector, useCombinedRefs } from '../hooks';
import { setPlayer, setUserPlayerIndex } from '../redux/slices/notesSlice';

interface SetPlayerNameModalProps {
  selectedPlayerIndex: number;
  buttonColor: string;
}

const SetPlayerNameModal = forwardRef<Modalize, SetPlayerNameModalProps>(
  ({ selectedPlayerIndex, buttonColor }, ref) => {
    const { players } = useSelector(({ notes }) => notes);
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const [name, setName] = useState('');
    const textInputRef = useRef<TextInput>(null);

    const innerRef = useRef<Modalize>(null);
    const combinedRef = useCombinedRefs(ref, innerRef);

    const save = () => {
      setName('');
      dispatch(setPlayer({ index: selectedPlayerIndex, name }));
    };

    const updatePlayer = () => {
      dispatch(setUserPlayerIndex(selectedPlayerIndex));
      dismiss();
    };

    const dismiss = () => innerRef.current?.close();

    useEffect(() => {
      if (players[selectedPlayerIndex]) {
        setName(players[selectedPlayerIndex]);
      } else {
        setName('');
      }
    }, [players, selectedPlayerIndex]);

    return (
      <Modal
        ref={combinedRef}
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
  },
);

export default SetPlayerNameModal;
