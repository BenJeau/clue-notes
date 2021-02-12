import React, { useCallback } from 'react';
import { Linking, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { Modal, MaterialCommunityIcons, Button } from '~/components';
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

  const openCustomizeBoard = useCallback(() => showModal('CustomizeBoard'), []);
  const openPrivacyPolicy = useCallback(
    () => Linking.openURL('https://cluenotes.jeaurond.dev/privacy.pdf'),
    [],
  );

  return (
    <Modal
      componentId={componentId}
      props={{
        FooterComponent: () => (
          <TouchableOpacity
            onPress={openGithub}
            style={{
              flexDirection: 'row',
              paddingBottom: 20,
              justifyContent: 'center',
              opacity: 0.5,
              alignItems: 'center',
            }}
            activeOpacity={0.2}>
            <Text style={{ color: colors.text, paddingRight: 5 }}>
              Open source and available on GitHub
            </Text>

            <MaterialCommunityIcons
              name="github"
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
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
        style={{ backgroundColor: colors.card, marginVertical: 10 }}
        onPress={toggleScreenHiding}
      />

      <Button
        label={`${vibrate ? 'Disable' : 'Enable'} button vibration`}
        style={{ backgroundColor: colors.card, marginBottom: 20 }}
        onPress={toggleButtonVibration}
      />

      <Button label="Privacy Policy" onPress={openPrivacyPolicy} />
    </Modal>
  );
};

export default Settings;
