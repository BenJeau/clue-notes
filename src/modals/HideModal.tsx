import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';

import { Button, MaterialCommunityIcons, Modal } from '../components';
import { headerData } from '../config/data';
import { useCombinedRefs, useDispatch, useSelector, useTheme } from '../hooks';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import { toggleAutoHide } from '../redux/slices/settingsSlice';

const VisibilityModal = forwardRef<Modalize>((_, ref) => {
  const theme = useTheme();
  const { autoHide } = useSelector(({ settings }) => settings);
  const { userPlayerIndex } = useSelector(({ notes }) => notes);
  const dispatch = useDispatch();

  const innerRef = useRef<Modalize>(null);
  const combinedRef = useCombinedRefs(ref, innerRef);

  const dimiss = () => innerRef.current?.close();

  const window = useWindowDimensions();

  const color = headerData[userPlayerIndex][theme.dark ? 'dark' : 'light'];

  const [shouldOpen, setShouldOpen] = useState(false);
  const [shouldClose, setShouldClose] = useState(true);

  useEffect(() => {
    if (autoHide) {
      if (shouldOpen) {
        innerRef.current?.open();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldOpen]);

  useEffect(() => {
    if (autoHide) {
      if (shouldClose) {
        innerRef.current?.close();
      } else if (shouldOpen) {
        innerRef.current?.open();
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
      ref={combinedRef}
      props={{
        adjustToContentHeight: false,
        modalHeight: window.height,
        handleStyle: {
          marginTop: getStatusBarHeight(),
          backgroundColor: theme.dark ? color : '#00000080',
        },
        childrenStyle: {
          height: window.height,
          width: window.width,
          borderTopWidth: 0,
          backgroundColor: theme.dark ? '#00000080' : '',
          padding: 0,
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
          padding: 20,
          justifyContent: 'center',
          // flex: 1,
        }}
        onPress={dimiss}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
        </View>

        <Button
          label={`${
            autoHide ? 'Disable' : 'Enable'
          } experimental auto screen hiding`}
          style={{
            backgroundColor: '#00000080',
            width: '100%',
            marginTop: 20
          }}
          onPress={() => dispatch(toggleAutoHide())}
          textColor={color}
        />
      </Pressable>
    </Modal>
  );
});

export default VisibilityModal;
