import React, { forwardRef, useRef } from 'react';
import {
  Pressable,
  Text,
  View,
  TextInput,
  LayoutAnimation,
  Vibration,
} from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Button, MaterialCommunityIcons, Modal } from '../components';
import { useCombinedRefs, useDispatch, useSelector, useTheme } from '../hooks';
import {
  addSectionItem,
  editSectionItem,
  removeSectionItem,
} from '../redux/slices/settingsSlice';

const ManualModifyBoardModal = forwardRef<Modalize>((_, ref) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { sections } = useSelector(({ settings }) => settings);

  // TODO: a combined hook, since this is often used
  const innerRef = useRef<Modalize>(null);
  const combinedRef = useCombinedRefs(ref, innerRef);

  return (
    <Modal
      ref={combinedRef}
      props={{
        disableScrollIfPossible: false,
        HeaderComponent: () => (
          <View
            style={{
              padding: 20,
              paddingBottom: 10,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
            }}>
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
        sectionListProps: {
          ListFooterComponent: () => (
            <Button
              label="Dismiss"
              onPress={() => innerRef.current?.close()}
              style={{ marginVertical: 10 }}
            />
          ),
          sections: [
            { title: 'suspects', data: sections.suspects },
            { title: 'weapons', data: sections.weapons },
            { title: 'rooms', data: sections.rooms },
          ],
          keyExtractor: (item) => item,
          renderSectionHeader: ({ section: { title } }) => (
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 18,
                paddingVertical: 10,
              }}>
              {`${title[0].toUpperCase()}${title.substr(1, title.length)}`}
            </Text>
          ),
          renderSectionFooter: ({ section: { title } }) => (
            <Button
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                dispatch(addSectionItem({ section: title, item: '' }));
              }}
              label={`Add ${title.toLowerCase().substr(0, title.length - 1)}`}
              style={{ backgroundColor: theme.colors.border, marginBottom: 10 }}
            />
          ),
          style: {
            padding: 20,
            paddingTop: 0,
          },
          renderItem: ({ item, index, section }) => (
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
                style={{
                  color: theme.colors.text,
                  padding: 0,
                  margin: 0,
                  flex: 1,
                }}
                onEndEditing={({ nativeEvent: { text } }) => {
                  dispatch(
                    editSectionItem({
                      index,
                      section: section.title,
                      item: text,
                    }),
                  );
                }}>
                {item}
              </TextInput>
              <Pressable
                onPress={() => {
                  Vibration.vibrate(10);
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  dispatch(
                    removeSectionItem({ index, section: section.title }),
                  );
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
});

export default ManualModifyBoardModal;
