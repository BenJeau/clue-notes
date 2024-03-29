import React from 'react';
import { SectionList, Text, View } from 'react-native';

import { useSelector, useTheme } from '~/hooks';
import { ALWAYS_OPEN } from '~/config/constants';
import BoardRow from './boardRow';

const Board: React.FC = () => {
  const { colors } = useTheme();
  const { rooms, suspects, weapons } = useSelector(
    ({ settings }) => settings.sections,
  );

  return (
    <SectionList
      nestedScrollEnabled
      sections={[
        { title: 'suspects', data: suspects },
        { title: 'weapons', data: weapons },
        { title: 'rooms', data: rooms },
      ]}
      keyExtractor={(item, index) => `${item}${index}`}
      renderItem={({ item, index, section }) => (
        <BoardRow
          item={item}
          rowIndex={index}
          section={section.title as 'suspects' | 'weapons' | 'rooms'}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderBottomWidth: 1,
            elevation: 1,
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
      style={{
        backgroundColor: colors.background,
        marginBottom: ALWAYS_OPEN - 1,
      }}
    />
  );
};

export default Board;
