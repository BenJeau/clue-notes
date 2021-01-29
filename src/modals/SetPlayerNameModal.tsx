import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Modal, Button } from '../components';
import { headerData } from '../config/data';
import { useTheme, useDispatch, useSelector, useInnerRef } from '../hooks';
import { setPlayer, setUserPlayerIndex } from '../redux/slices/notesSlice';

interface SetPlayerNameModalProps {
  selectedPlayerIndex: number;
}

const SetPlayerNameModal = forwardRef<Modalize, SetPlayerNameModalProps>(
  ({ selectedPlayerIndex }, ref) => {
    const { players } = useSelector(({ notes }) => notes);
    const dispatch = useDispatch();
    const { colors, dark } = useTheme();
    const [name, setName] = useState('');
    const textInputRef = useRef<TextInput>(null);

    const [combinedRef, innerRef] = useInnerRef(ref);

    const save = () => {
      setName('');
      dispatch(setPlayer({ index: selectedPlayerIndex, name }));
    };

    const dismiss = useCallback(() => innerRef.current?.close(), [innerRef]);

    const updatePlayer = useCallback(() => {
      dispatch(setUserPlayerIndex(selectedPlayerIndex));
      dismiss();
    }, [dismiss, dispatch, selectedPlayerIndex]);

    const buttonColor = useMemo(
      () => headerData[selectedPlayerIndex][dark ? 'dark' : 'light'],
      [dark, selectedPlayerIndex],
    );

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
          onChangeText={setName}
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
