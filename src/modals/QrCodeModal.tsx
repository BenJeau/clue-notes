import React, { forwardRef } from 'react';
import { Dimensions, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import QRCode from 'react-native-qrcode-svg';

import { Modal } from '../components';
import { useSelector, useTheme } from '../hooks';

const window = Dimensions.get('window');

const QrCodeModal = forwardRef<Modalize>((_, ref) => {
  const { colors } = useTheme();
  const qrCodeValue = useSelector(({ settings }) =>
    JSON.stringify(Object.values(settings.sections)),
  );

  const qrSize =
    (window.width > window.height ? window.height : window.width) - 40 - 14;

  return (
    <Modal
      ref={ref}
      showDismiss
      header={{
        title: 'Share Board Layout',
        subtitle:
          'Scan this QR code within the other application to share your board layout',
      }}
      props={{ childrenStyle: { flex: 1 } }}>
      <View
        style={{
          backgroundColor: colors.text,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 7,
          borderRadius: 10,
          flex: 1,
        }}>
        <QRCode
          value={qrCodeValue}
          size={qrSize}
          backgroundColor={colors.text}
          color={colors.card}
        />
      </View>
    </Modal>
  );
});

export default QrCodeModal;
