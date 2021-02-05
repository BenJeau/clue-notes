import React, { forwardRef, useCallback } from 'react';
import { Text, View, TextInput, LayoutAnimation } from 'react-native';
import { Modalize } from 'react-native-modalize';

import {
  Button,
  MaterialCommunityIcons,
  Modal,
  Pressable,
} from '../components';
import { useDispatch, useInnerRef, useSelector, useTheme } from '../hooks';
import {
  addSectionItem,
  cleanupSections,
  editSectionItem,
  removeSectionItem,
} from '../redux/slices/settingsSlice';

const ModalHeader = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        padding: 20,
        paddingBottom: 10,
        borderTopWidth: 1,
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
        Press the name to edit the items, delete items, add items or reset board
      </Text>
    </View>
  );
};

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: theme.colors.border,
      }}>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 18,
        }}>
        {`${title[0].toUpperCase()}${title.substr(1, title.length)}`}
      </Text>
    </View>
  );
};

interface SectionFooterProps {
  title: string;
}

const SectionFooter: React.FC<SectionFooterProps> = ({ title }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(addSectionItem({ section: title, item: '' }));
  }, [dispatch, title]);

  return (
    <Button
      onPress={onPress}
      label={`Add ${title.toLowerCase().substr(0, title.length - 1)}`}
      style={{
        backgroundColor: colors.blue,
        marginVertical: 10,
        marginHorizontal: 20,
        marginBottom: 20,
      }}
    />
  );
};

interface SectionItemProps {
  item: string;
  index: number;
  section: ;
}

const SectionItem: React.FC<SectionItemProps> = ({ item, index, section }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const removeItem = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(removeSectionItem({ index, section: section.title }));
  }, [dispatch, index, section.title]);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.card,
        flex: 1,
        borderRadius: 10,
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        height: 43.5,
        borderWidth: 1,
        borderColor: colors.border,
        marginHorizontal: 20,
        marginTop: 10,
      }}>
      <TextInput
        placeholder="Entry name"
        placeholderTextColor={`${colors.text}70`}
        selectionColor={colors.blue}
        style={{
          color: colors.text,
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
        onPress={removeItem}
        android_ripple={{ color: colors.text, borderless: true }}>
        <MaterialCommunityIcons name="close" size={24} color={colors.text} />
      </Pressable>
    </View>
  );
};

const ManualModifyBoardModal = forwardRef<Modalize>((_, ref) => {
  const { suspects, weapons, rooms } = useSelector(
    ({ settings }) => settings.sections,
  );
  const dispatch = useDispatch();

  const [combinedRef, innerRef] = useInnerRef(ref);
  const close = useCallback(() => innerRef.current?.close(), [innerRef]);

  const onClose = useCallback(() => dispatch(cleanupSections()), [dispatch]);

  return (
    <Modal
      ref={combinedRef}
      props={{
        onClose,
        sectionListProps: {
          sections: [
            { title: 'suspects', data: suspects },
            { title: 'weapons', data: weapons },
            { title: 'rooms', data: rooms },
          ],
          keyExtractor: (item) => item,
          renderSectionHeader: ({ section: { title } }) => (
            <SectionHeader title={title} />
          ),
          renderSectionFooter: ({ section: { title } }) => (
            <SectionFooter title={title} />
          ),
          renderItem: ({ item, index, section }) => (
            <SectionItem item={item} index={index} section={section} />
          ),
          ListHeaderComponent: <ModalHeader />,
          stickySectionHeadersEnabled: true,
          ListFooterComponent: () => (
            <Button
              label="Dismiss"
              onPress={close}
              style={{ marginBottom: 20, marginHorizontal: 20 }}
            />
          ),
        },
      }}
    />
  );
});

export default ManualModifyBoardModal;
