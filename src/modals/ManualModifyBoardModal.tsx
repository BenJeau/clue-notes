import React, { useRef, useState } from 'react';
import { Pressable, Text, View, TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Button, MaterialCommunityIcons, Modal } from '../components';
import { useTheme } from '../hooks';
import { sections } from '../config/data';

interface ManualModifyBoardModalProps {
  modalRef: React.RefObject<Modalize>;
}

const ManualModifyBoardModal: React.FC<ManualModifyBoardModalProps> = ({
  modalRef,
}) => {
  const theme = useTheme();
  const [id, setIndex] = useState(-1);

  const ref = useRef<TextInput>(null);
  return (
    <Modal
      modalRef={modalRef}
      props={{
        HeaderComponent: () => (
          <View style={{ padding: 20, paddingBottom: 10 }}>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Modify Board
            </Text>
            <Text style={{ color: theme.colors.text }}>
              Press the name to edit the items, delete items, add items or reset
              board
            </Text>
          </View>
        ),
        disableScrollIfPossible: false,
        sectionListProps: {
          sections,
          keyExtractor: (item) => item,
          renderSectionHeader: ({ section: { title } }) => (
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 18,
                paddingVertical: 10,
              }}>
              {title}
            </Text>
          ),
          renderSectionFooter: ({ section: { title } }) => (
            <Button
              label={`Add ${title.toLowerCase().substr(0, title.length - 1)}`}
              style={{ backgroundColor: theme.colors.border, marginBottom: 10 }}
            />
          ),
          style: {
            padding: 20,
            paddingTop: 0,
          },
          renderItem: ({ item, index }) => (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: theme.colors.card,
                flex: 1,
                borderRadius: 10,
                marginBottom: 10,
                overflow: 'hidden',
                justifyContent: 'space-between',
                paddingHorizontal: 9,
                alignItems: 'center',
                height: 37.5,
              }}>
              <TextInput
                ref={id === index ? ref : null}
                style={{
                  color: theme.colors.text,
                  padding: 0,
                  margin: 0,
                  flex: 1,
                }}
                value={item}
              />
              <Pressable
                onPress={() => {
                  setIndex(index);
                  setTimeout(() => {
                    ref.current?.focus();
                  }, 100);
                }}
                android_ripple={{ color: theme.colors.text, borderless: true }}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={theme.colors.text}
                />
              </Pressable>
            </View>
          ),
        },
      }}
    />
  );
};

export default ManualModifyBoardModal;
