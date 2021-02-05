import React, { memo, useCallback } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import isEqual from 'react-fast-compare';

import { useTheme, useDispatch } from '~/hooks';
import { setScratched } from '~/redux/slices/notesSlice';

interface BoardRowTitleProps {
  scratched: boolean;
  section: 'suspects' | 'weapons' | 'rooms';
  rowIndex: number;
  title: string;
}

const BoardRowTitle: React.FC<BoardRowTitleProps> = ({
  scratched,
  section,
  rowIndex,
  title,
}) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const toggleScratched = useCallback(() => {
    dispatch(
      setScratched({
        row: rowIndex,
        scratched: !scratched,
        section,
      }),
    );
  }, [scratched, dispatch, rowIndex, section]);

  return (
    <Pressable
      onPress={toggleScratched}
      style={({ pressed }) => ({
        opacity: Platform.OS === 'ios' && pressed ? 0.5 : 1,
        paddingLeft: 20,
        justifyContent: 'center',
        flex: 1,
      })}>
      <Text
        style={{
          color: scratched ? 'red' : colors.text,
          textDecorationLine: scratched ? 'line-through' : 'none',
          opacity: scratched ? 0.5 : 1,
        }}>
        {title}
      </Text>
    </Pressable>
  );
};

export default memo(BoardRowTitle, isEqual);
