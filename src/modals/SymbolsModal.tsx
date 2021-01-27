import React, { forwardRef, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Modal, ModalPressable } from '../components';
import {
  ALWAYS_OPEN,
  ALWAYS_OPEN_PADDING,
  ALWAYS_OPEN_TOP_PADDING,
  SQUARE_SIZE,
} from '../config/constants';
import { icons, sheet } from '../config/data';
import { useTheme } from '../hooks';

const SymbolsModal = forwardRef<Modalize>((_, ref) => {
  const { colors } = useTheme();
  const [alwaysOpen, setAlwaysOpen] = useState(ALWAYS_OPEN);

  // Fixes a bug where the modal would open completely when loading the app
  useEffect(() => {
    setTimeout(() => setAlwaysOpen(ALWAYS_OPEN), 1500);
  }, []);

  return (
    <Modal
      ref={ref}
      showDismiss={false}
      props={{
        alwaysOpen,
        childrenStyle: {
          padding:
            (width -
              Math.floor(width / (SQUARE_SIZE + 6)) * (SQUARE_SIZE + 6)) /
            2,
          paddingTop: ALWAYS_OPEN_TOP_PADDING - 3,
          paddingBottom: ALWAYS_OPEN_PADDING,
          alignItems: 'center',
          width: '100%',
        },
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <View style={styles.section}>
          <ModalPressable data={{ type: 'text', data: ' ' }} />
          {icons.map((i, key) => {
            console.log(key, i);
            return (
              <ModalPressable key={key} data={{ type: 'icon', data: i }} />
            );
          })}
        </View>
      </View>
      {/* {sheet.map((i, key) => (
        <View key={key}>
          <Text style={[styles.header, { color: colors.text }]}>{i.title}</Text>
          <View style={styles.section}>
            {i.data.map((j) => (
              <ModalPressable key={j} data={{ type: 'text', data: j }} />
            ))}
          </View>
        </View>
      ))} */}
    </Modal>
  );
});

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    flexWrap: 'wrap',
  },
  header: {
    fontSize: 18,
    paddingVertical: 5,
    paddingLeft: 3,
  },
});

export default SymbolsModal;
