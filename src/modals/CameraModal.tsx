import React, { useState } from 'react';
import { Dimensions, Text } from 'react-native';
import {
  GoogleVisionBarcodesDetectedEvent,
  RNCamera,
} from 'react-native-camera';
import { Modalize } from 'react-native-modalize';

import { Button, Modal } from '../components';
import { useTheme } from '../hooks';

interface CameraModalProps {
  modalRef: React.RefObject<Modalize>;
}

const CameraModal: React.FC<CameraModalProps> = ({ modalRef }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();

  const onBarcodesDetected = ({
    barcodes,
  }: GoogleVisionBarcodesDetectedEvent) => {
    barcodes.forEach(({ type, data }) => {
      let barcodeType = type as string;

      if (barcodeType === 'QR_CODE') {
        try {
          console.log(JSON.parse(data));
        } catch (e) {}
      }
    });
  };

  return (
    <Modal
      modalRef={modalRef}
      props={{
        onOpen: () => setIsFocused(true),
        onClosed: () => setIsFocused(false),
        childrenStyle: {
          padding: 20,
        },
      }}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>
        Scan QR Code
      </Text>
      <Text style={{ color: colors.text, paddingBottom: 20 }}>
        Scan the QR code from the other application to import the board layout
      </Text>
      <RNCamera
        style={{
          width: Dimensions.get('screen').width - 40,
          borderRadius: 5,
          overflow: 'hidden',
          height: Dimensions.get('screen').width - 40,
        }}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onGoogleVisionBarcodesDetected={
          isFocused ? onBarcodesDetected : undefined
        }
        ratio="1:1"
      />
      <Button
        label="Dismiss"
        onPress={() => modalRef.current?.close()}
        style={{ marginTop: 20, backgroundColor: colors.card }}
      />
    </Modal>
  );
};

export default CameraModal;
