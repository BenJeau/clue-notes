import React from 'react';
import { Linking, Pressable, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Modal, MaterialCommunityIcons, Button } from '../components';
import { useDispatch, useSelector, useTheme } from '../hooks';
import { toggleAutoHide } from '../redux/slices/stateSlice';

interface SettingsModalProps {
  modalRef: React.RefObject<Modalize>;
  openCustomizeBoard: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  modalRef,
  openCustomizeBoard,
}) => {
  const { colors } = useTheme();
  const { autoHide } = useSelector(({ state }) => state);
  const dispatch = useDispatch();

  return (
    <Modal
      modalRef={modalRef}
      props={{
        childrenStyle: { padding: 20 },
      }}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>
        Settings
      </Text>

      <Text style={{ color: colors.text, marginBottom: 20 }}>
        Modify board content and toggle features
      </Text>

      <Button
        label="Customize board"
        style={{ backgroundColor: colors.card }}
        onPress={openCustomizeBoard}
      />

      <Button
        label={`${
          autoHide ? 'Enable' : 'Disable'
        } experimental auto screen hiding`}
        style={{ backgroundColor: colors.card, marginTop: 10 }}
        onPress={() => dispatch(toggleAutoHide())}
      />

      <Pressable
        onPress={() => Linking.openURL('https://github.com/BenJeau')}
        style={({ pressed }) => ({
          flexDirection: 'row',
          paddingTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: pressed ? 0.2 : 0.5,
        })}>
        <Text style={{ color: colors.text, paddingRight: 5 }}>
          Open source and available on GitHub
        </Text>

        <MaterialCommunityIcons name="github" size={20} color={colors.text} />
      </Pressable>
    </Modal>
  );
};

export default SettingsModal;
