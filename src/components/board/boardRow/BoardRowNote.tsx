import React, { memo, useCallback, useMemo } from 'react';
import { LayoutAnimation, Pressable, Text, View } from 'react-native';
import isEqual from 'react-fast-compare';

import MaterialCommunityIcons from '~/components/MaterialCommunityIcons';
import { SQUARE_SIZE } from '~/config/constants';
import { useTheme, useDispatch } from '~/hooks';
import { BoardEntry, setBoardValue } from '~/redux/slices/notesSlice';
import { sheet } from '../../../config/data';

interface BoardRowNoteProps {
  color: string;
  colIndex: number;
  rowIndex: number;
  section: 'suspects' | 'weapons' | 'rooms';
  data?: BoardEntry;
}

const BoardRowNote: React.FC<BoardRowNoteProps> = ({
  color,
  colIndex,
  rowIndex,
  section,
  data,
}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const updateBox = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(setBoardValue({ row: rowIndex, col: colIndex, section }));
  }, [colIndex, dispatch, rowIndex, section]);

  const size = useMemo(
    () =>
      data &&
      data.type === 'icon' &&
      sheet.some((i) => i.data.includes(data.data))
        ? 24
        : 20,
    [data],
  );

  return (
    <View
      style={{
        borderStartWidth: 1,
        borderColor: colors.border,
      }}>
      <Pressable
        key={colIndex}
        style={{
          minHeight: SQUARE_SIZE,
          width: SQUARE_SIZE - 1,
          backgroundColor: `${color}20`,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={updateBox}
        android_ripple={{ color }}>
        {data &&
          (data.type === 'icon' ? (
            <MaterialCommunityIcons
              name={data.data}
              size={size}
              color={colors.text}
            />
          ) : (
            <Text style={{ color: colors.text }}>{data.data}</Text>
          ))}
      </Pressable>
    </View>
  );
};

export default memo(BoardRowNote, isEqual);
