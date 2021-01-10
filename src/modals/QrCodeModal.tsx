import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import QRCode from 'react-native-qrcode-svg';

import { Button, Modal } from '../components';
import { sections } from '../config/data';
import { useTheme } from '../hooks';

interface QrCodeModalProps {
  modalRef: React.RefObject<Modalize>;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ modalRef }) => {
  const { colors } = useTheme();

  return (
    <Modal modalRef={modalRef} props={{ childrenStyle: { padding: 20 } }}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>
        Share Board Layout
      </Text>
      <Text style={{ color: colors.text }}>
        Scan this QR code within the other application to share your board
        layout
      </Text>
      <View
        style={{
          backgroundColor: colors.text,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          borderRadius: 5,
          marginTop: 20,
        }}>
        <QRCode
          value={JSON.stringify(sections)}
          size={Dimensions.get('screen').width - 50}
          backgroundColor={colors.text}
          color={colors.card}
        />
      </View>
      <Button
        label="Dismiss"
        onPress={() => modalRef.current?.close()}
        style={{ marginTop: 20, backgroundColor: colors.card }}
      />
    </Modal>
  );
};

export default QrCodeModal;
