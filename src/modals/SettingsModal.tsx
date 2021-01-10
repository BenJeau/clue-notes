import React from 'react';
import { Linking, Pressable, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Modal, MaterialCommunityIcons } from '../components';
import { useTheme } from '../hooks';

interface SettingsModalProps {
  modalRef: React.RefObject<Modalize>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ modalRef }) => {
  const theme = useTheme();

  return (
    <Modal
      modalRef={modalRef}
      props={{
        childrenStyle: { padding: 20 },
      }}>
      <Text
        style={{ color: theme.colors.text, fontSize: 20, fontWeight: 'bold' }}>
        Settings
      </Text>

      <Pressable
        onPress={() => Linking.openURL('https://github.com/BenJeau')}
        style={({ pressed }) => ({
          flexDirection: 'row',
          paddingTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: pressed ? 0.2 : 0.5,
        })}>
        <Text style={{ color: theme.colors.text, paddingRight: 5 }}>
          Open source
        </Text>

        <MaterialCommunityIcons
          name="github"
          size={20}
          color={theme.colors.text}
        />
      </Pressable>
    </Modal>
  );
};

export default SettingsModal;
