import React from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
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

  return (
    <Modal
      modalRef={modalRef}
      props={{
        alwaysOpen: ALWAYS_OPEN,
        childrenStyle: {
          padding: ALWAYS_OPEN_PADDING,
          paddingTop: ALWAYS_OPEN_TOP_PADDING,
        },
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 10,
          flexWrap: 'wrap',
        }}>
        <ModalPressable data={{ type: 'text', data: ' ' }} />
        {icons.map((i, key) => (
          <ModalPressable key={key} data={{ type: 'icon', data: i }} />
        ))}
      </View>
      {sheet.map((i, key) => (
        <>
          <View
            key={key}
            style={{
              width: '100%',
            }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                paddingVertical: 10,
              }}>
              {i.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <FlatList
              data={i.data}
              renderItem={({ item }) => (
                <ModalPressable key={key} data={{ type: 'text', data: item }} />
              )}
              numColumns={8}
              style={{}}
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
              columnWrapperStyle={{
                width: Dimensions.get('screen').width - ALWAYS_OPEN_PADDING * 2,
                justifyContent: 'space-between',
                paddingBottom: 8,
              }}
            />
          </View>
        </>
      ))}
    </Modal>
  );
};

export default SymbolsModal;
