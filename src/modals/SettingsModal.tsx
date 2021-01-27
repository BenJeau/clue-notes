import React, { forwardRef } from 'react';
import { Linking, Pressable, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Modal, MaterialCommunityIcons, Button } from '../components';
import { useDispatch, useSelector, useTheme } from '../hooks';
import { toggleAutoHide } from '../redux/slices/settingsSlice';

interface SettingsModalProps {
  openCustomizeBoard: () => void;
}

const SettingsModal = forwardRef<Modalize, SettingsModalProps>(
  ({ openCustomizeBoard }, ref) => {
    const { colors } = useTheme();
    const { autoHide } = useSelector(({ settings }) => settings);
    const dispatch = useDispatch();

    return (
      <Modal
        ref={ref}
        props={{
          FooterComponent: () => (
            <Pressable
              onPress={() => Linking.openURL('https://github.com/BenJeau')}
              style={({ pressed }) => ({
                flexDirection: 'row',
                paddingBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: pressed ? 0.2 : 0.5,
              })}>
              <Text style={{ color: colors.text, paddingRight: 5 }}>
                Open source and available on GitHub
              </Text>

              <MaterialCommunityIcons
                name="github"
                size={20}
                color={colors.text}
              />
            </Pressable>
          ),
        }}
        header={{
          title: 'Settings',
          subtitle: 'Modify the rows of the board and toggle features',
        }}>
        <Button
          label="Customize board"
          style={{ backgroundColor: colors.card }}
          onPress={openCustomizeBoard}
        />

        <Button
          label={`${
            autoHide ? 'Disable' : 'Enable'
          } experimental auto screen hiding`}
          style={{ backgroundColor: colors.card, marginTop: 10 }}
          onPress={() => dispatch(toggleAutoHide())}
        />
      </Modal>
    );
  },
);

export default SettingsModal;
