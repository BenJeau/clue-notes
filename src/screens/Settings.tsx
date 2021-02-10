import React, { useCallback } from 'react';
import { Linking, Text } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { Modal, MaterialCommunityIcons, Button, Pressable } from '~/components';
import { useDispatch, useSelector, useTheme } from '~/hooks';
import { toggleAutoHide, toggleVibrate } from '~/redux/slices/settingsSlice';
import { showModal } from '~/utils/navigation';

const Settings: NavigationFunctionComponent = ({ componentId }) => {
  const { colors } = useTheme();
  const { autoHide, vibrate } = useSelector(({ settings }) => settings);
  const dispatch = useDispatch();

  const openGithub = useCallback(
    () => Linking.openURL('https://github.com/BenJeau'),
    [],
  );
  const toggleScreenHiding = useCallback(() => dispatch(toggleAutoHide()), [
    dispatch,
  ]);

  const toggleButtonVibration = useCallback(() => dispatch(toggleVibrate()), [
    dispatch,
  ]);

  return (
    <Modal
      componentId={componentId}
      props={{
        FooterComponent: () => (
          <Pressable
            onPress={openGithub}
            android_ripple={{}}
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
        onPress={() => showModal('CustomizeBoard')}
      />

      <Button
        label={`${
          autoHide ? 'Disable' : 'Enable'
        } experimental auto screen hiding`}
        style={{ backgroundColor: colors.card, marginTop: 10 }}
        onPress={toggleScreenHiding}
      />

      <Button
        label={`${vibrate ? 'Disable' : 'Enable'} button vibration`}
        style={{ backgroundColor: colors.card, marginTop: 10 }}
        onPress={toggleButtonVibration}
      />
    </Modal>
  );
};

export default Settings;
