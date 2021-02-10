import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { Modal, Button } from '~/components';
import { playerColorKeys } from '~/config/data';
import { useTheme, useDispatch, useSelector } from '~/hooks';
import { setPlayer, setUserPlayerIndex } from '~/redux/slices/notesSlice';

interface SetPlayerNameModalProps {
  selectedPlayerIndex: number;
}

const SetPlayerName: NavigationFunctionComponent<SetPlayerNameModalProps> = ({
  selectedPlayerIndex = 0,
  componentId,
}) => {
  const player = useSelector(({ notes }) => notes.players[selectedPlayerIndex]);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const textInputRef = useRef<TextInput>(null);
  const modalRef = useRef<Modalize>(null);

  const save = () => {
    setName('');
    dispatch(setPlayer({ index: selectedPlayerIndex, name }));
  };

  const dismiss = useCallback(() => modalRef.current?.close(), [modalRef]);

  const updatePlayer = useCallback(() => {
    dispatch(setUserPlayerIndex(selectedPlayerIndex));
    dismiss();
  }, [dismiss, dispatch, selectedPlayerIndex]);

  const buttonColor = useMemo(
    () => colors[playerColorKeys[selectedPlayerIndex]],
    [colors, selectedPlayerIndex],
  );

  useEffect(() => {
    if (player) {
      setName(player);
    } else {
      setName('');
    }
  }, [player]);

  return (
    <Modal
      ref={modalRef}
      componentId={componentId}
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
};

export default SetPlayerName;
