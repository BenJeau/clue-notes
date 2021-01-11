import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import {
  GoogleVisionBarcodesDetectedEvent,
  RNCamera,
} from 'react-native-camera';
import { Modalize } from 'react-native-modalize';

import { Modal } from '../components';
import { useDispatch } from '../hooks';
import { setSections } from '../redux/slices/settingsSlice';

interface CameraModalProps {
  modalRef: React.RefObject<Modalize>;
}

const CameraModal: React.FC<CameraModalProps> = ({ modalRef }) => {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();

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
            modalRef.current?.close();
          }
        } catch (e) {}
      }
    });
  };

  return (
    <Modal
      modalRef={modalRef}
      showDismiss
      header={{
        title: 'Scan QR Code',
        subtitle:
          'Scan the QR code from the other application to import the board layout',
      }}
      props={{
        onOpen: () => setIsFocused(true),
        onClosed: () => setIsFocused(false),
      }}>
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
    </Modal>
  );
};

export default CameraModal;
