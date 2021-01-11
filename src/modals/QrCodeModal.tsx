import React, { useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import QRCode from 'react-native-qrcode-svg';

import { Modal } from '../components';
import { useSelector, useTheme } from '../hooks';

interface QrCodeModalProps {
  modalRef: React.RefObject<Modalize>;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ modalRef }) => {
  const { colors } = useTheme();
  const { sections } = useSelector(({ settings }) => settings);

  const qrCodeValue = useMemo(() => JSON.stringify(Object.values(sections)), [
    sections,
  ]);

  return (
    <Modal
      modalRef={modalRef}
      showDismiss
      header={{
        title: 'Share Board Layout',
        subtitle:
          'Scan this QR code within the other application to share your board layout',
      }}>
      <View
        style={{
          backgroundColor: colors.text,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          borderRadius: 5,
        }}>
        <QRCode
          value={qrCodeValue}
          size={Dimensions.get('screen').width - 50}
          backgroundColor={colors.text}
          color={colors.card}
        />
      </View>
    </Modal>
  );
};

export default QrCodeModal;
