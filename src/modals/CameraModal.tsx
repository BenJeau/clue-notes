import React, { forwardRef, useState } from 'react';
import { Dimensions, StyleSheet, View, Text, Linking } from 'react-native';
import {
  GoogleVisionBarcodesDetectedEvent,
  RNCamera,
} from 'react-native-camera';
import { Modalize } from 'react-native-modalize';

import { Modal, Pressable } from '../components';
import { useDispatch, useInnerRef, useTheme } from '../hooks';
import { setSections } from '../redux/slices/settingsSlice';

const window = Dimensions.get('window');

const CameraModal = forwardRef<Modalize>((_, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const cameraSize =
    (window.width > window.height ? window.height : window.width) - 40;

  const [combinedRef, innerRef] = useInnerRef(ref);

  const onBarcodesDetected = ({
    barcodes,
  }: GoogleVisionBarcodesDetectedEvent) => {
    barcodes.forEach(({ type, data }) => {
      let barcodeType = type as string;

      if (barcodeType === 'QR_CODE') {
        try {
          const parsedData = JSON.parse(data);

          if (
            parsedData.length === 3 &&
            Object.values(parsedData).every((i) =>
              (i as any[]).every((j) => typeof j === 'string'),
            )
          ) {
            dispatch(
              setSections({
                suspects: parsedData[0],
                weapons: parsedData[1],
                rooms: parsedData[2],
              }),
            );
            innerRef.current?.close();
          }
        } catch (e) {}
      }
    });
  };

  return (
    <Modal
      ref={combinedRef}
      showDismiss
      header={{
        title: 'Scan QR Code',
        subtitle:
          'Scan the QR code from the other application to import the board layout',
      }}
      props={{
        onOpen: () => setIsFocused(true),
        onClosed: () => setIsFocused(false),
        childrenStyle: {
          alignItems: 'center',
        },
      }}>
      <View
        style={{
          width: cameraSize,
          borderRadius: 5,
          overflow: 'hidden',
          height: cameraSize,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
        }}>
        <RNCamera
          style={{ flex: 1 }}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          notAuthorizedView={
            <Pressable
              onPress={() => Linking.openSettings()}
              style={[
                StyleSheet.absoluteFill,
                { justifyContent: 'center', alignItems: 'center', padding: 50 },
              ]}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Allow camera access
              </Text>
              <Text
                style={{
                  color: colors.text,
                  textAlign: 'center',
                }}>
                Press here to enable camera permission in the application
                settings
              </Text>
            </Pressable>
          }
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onGoogleVisionBarcodesDetected={
            isFocused ? onBarcodesDetected : undefined
          }
          ratio="1:1"
        />
      </View>
    </Modal>
  );
});

export default CameraModal;
