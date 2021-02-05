import React, { memo } from 'react';
import { View } from 'react-native';
import isEqual from 'react-fast-compare';

import { playerColorKeys } from '~/config/data';
import { useTheme, useSelector } from '~/hooks';
import BoardRowTitle from './BoardRowTitle';
import BoardRowNote from './BoardRowNote';

interface BoardRowProps {
  item: string;
  rowIndex: number;
  section: 'suspects' | 'weapons' | 'rooms';
}

const BoardRow: React.FC<BoardRowProps> = ({ item, rowIndex, section }) => {
  const { colors } = useTheme();
  const data = useSelector(({ notes }) =>
    notes.board[section][rowIndex] ? notes.board[section][rowIndex] : {},
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: colors.border,
      }}>
      <BoardRowTitle
        scratched={!!data.scratched}
        section={section}
        rowIndex={rowIndex}
        title={item}
      />
      <View style={{ flexDirection: 'row' }}>
        {playerColorKeys.map((colorKey, index) => (
          <BoardRowNote
            key={index}
            color={colors[colorKey]}
            colIndex={index}
            rowIndex={rowIndex}
            section={section}
            data={data[index]}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(BoardRow, isEqual);
