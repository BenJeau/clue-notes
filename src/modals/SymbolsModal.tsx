import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useTheme } from '@react-navigation/native';

import { Modal, ModalPressable } from '../components';
import {
  ALWAYS_OPEN,
  ALWAYS_OPEN_PADDING,
  ALWAYS_OPEN_TOP_PADDING,
} from '../config/constants';
import { icons, sheet } from '../config/data';

interface SymbolsModalProps {
  modalRef: React.RefObject<Modalize>;
}

const SymbolsModal: React.FC<SymbolsModalProps> = ({ modalRef }) => {
  const { colors } = useTheme();
  const [alwaysOpen, setAlwaysOpen] = useState(0);

  // Fixes a bug where the modal would open completely when loading the app
  useEffect(() => {
    setTimeout(() => setAlwaysOpen(ALWAYS_OPEN), 500);
  }, []);

  return (
    <Modal
      modalRef={modalRef}
      props={{
        alwaysOpen,
        childrenStyle: {
          paddingTop: ALWAYS_OPEN_TOP_PADDING - 4,
          paddingBottom: ALWAYS_OPEN_PADDING,
        },
      }}>
      <View style={styles.section}>
        <ModalPressable data={{ type: 'text', data: ' ' }} />
        {icons.map((i, key) => (
          <ModalPressable key={key} data={{ type: 'icon', data: i }} />
        ))}
      </View>
      {sheet.map((i, key) => (
        <View key={key}>
          <Text style={[styles.header, { color: colors.text }]}>{i.title}</Text>
          <View style={styles.section}>
            {i.data.map((j) => (
              <ModalPressable key={j} data={{ type: 'text', data: j }} />
            ))}
          </View>
        </View>
      ))}
    </Modal>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
    flexWrap: 'wrap',
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 10,
  },
});

export default SymbolsModal;
