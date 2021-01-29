import React from 'react';
import { SectionList, Text, View } from 'react-native';
import { ALWAYS_OPEN } from '../config/constants';
import { useSelector, useTheme } from '../hooks';
import BoardRow from './BoardRow';

const Board: React.FC = () => {
  const { sections } = useSelector(({ settings }) => settings);
  const { colors } = useTheme();

  return (
    <SectionList
      sections={[
        {
          title: 'suspects',
          data: sections.suspects,
        },
        { title: 'weapons', data: sections.weapons },
        { title: 'rooms', data: sections.rooms },
      ]}
      keyExtractor={(item, index) => `${item}${index}`}
      renderItem={({ item, index, section }) => (
        <BoardRow item={item} rowIndex={index} section={section.title} />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            {`${title[0].toUpperCase()}${title.substr(1, title.length)}`}
          </Text>
        </View>
      )}
      stickySectionHeadersEnabled
      ListFooterComponent={<View style={{ height: ALWAYS_OPEN - 1 }} />}
    />
  );
};

export default Board;
