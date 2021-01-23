import React, { useEffect, useState } from 'react';
import { Modalize } from 'react-native-modalize';

import { Button, MaterialCommunityIcons, Modal } from '../components';
import { headerData } from '../config/data';
import { useDispatch, useSelector, useTheme } from '../hooks';
import { Dimensions, Pressable, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import { toggleAutoHide } from '../redux/slices/settingsSlice';

interface VisibilityModalProps {
  modalRef: React.RefObject<Modalize>;
}

const VisibilityModal: React.FC<VisibilityModalProps> = ({ modalRef }) => {
  const theme = useTheme();
  const { autoHide } = useSelector(({ settings }) => settings);
  const { userPlayerIndex } = useSelector(({ notes }) => notes);
  const dispatch = useDispatch();

  const dimiss = () => modalRef.current?.close();

  const color = headerData[userPlayerIndex][theme.dark ? 'dark' : 'light'];

  const [shouldOpen, setShouldOpen] = useState(false);
  const [shouldClose, setShouldClose] = useState(true);

  useEffect(() => {
    if (autoHide) {
      if (shouldOpen) {
        modalRef.current?.open();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldOpen]);

  useEffect(() => {
    if (autoHide) {
      if (shouldClose) {
        modalRef.current?.close();
      } else if (shouldOpen) {
        modalRef.current?.open();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldClose]);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 200);
    const subscription = accelerometer.subscribe(
      ({ y }) => {
        setShouldOpen(y < 7);
        setShouldClose(y > 3);
      },
      () => {
        console.log('The sensor is not available');
      },
    );

    return subscription.unsubscribe;
  }, []);

  return (
    <Modal
      modalRef={modalRef}
      props={{
        adjustToContentHeight: false,
        modalHeight: Dimensions.get('window').height,
        handleStyle: {
          marginTop: getStatusBarHeight(),
          backgroundColor: theme.dark ? color : '#00000080',
        },
        childrenStyle: {
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          borderTopWidth: 0,
          padding: 0,
          backgroundColor: theme.dark ? '#00000080' : '',
        },
        modalStyle: {
          backgroundColor: color,
        },
      }}>
      <Pressable
        android_ripple={{ color: theme.dark ? color : '#00000080' }}
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={dimiss}>
        <MaterialCommunityIcons
          name={'eye-off-outline'}
          size={150}
          color={theme.dark ? color : '#00000080'}
        />
        <Text
          style={{
            color: theme.dark ? color : '#00000080',
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 20,
          }}>
          Your notes are hidden
        </Text>
        <Text
          style={{
            color: theme.dark ? color : '#00000080',
          }}>
          Slide down or press anywhere to view your notes
        </Text>
      </Pressable>

      <Button
        label={`${
          autoHide ? 'Disable' : 'Enable'
        } experimental auto screen hiding`}
        style={{
          backgroundColor: '#00000080',
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
        }}
        onPress={() => dispatch(toggleAutoHide())}
        textColor={color}
      />
    </Modal>
  );
};

export default VisibilityModal;
