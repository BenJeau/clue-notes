import React, { memo, useCallback, useMemo } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  Vibration,
  View,
} from 'react-native';
import MaterialCommunityIcons from './MaterialCommunityIcons';

import { SQUARE_SIZE } from '../config/constants';
import { headerData } from '../config/data';
import {
  BoardEntry,
  setBoardValue,
  setScratched,
} from '../redux/slices/notesSlice';
import { useTheme, useSelector, useDispatch } from '../hooks';
import isEqual from 'react-fast-compare';

interface BoardRowProps {
  item: string;
  rowIndex: number;
  section: 'suspects' | 'weapons' | 'rooms';
}

const BoardRow: React.FC<BoardRowProps> = ({ item, rowIndex, section }) => {
  const { colors } = useTheme();
  const { board } = useSelector(({ notes }) => notes);

  const data = useMemo(
    () => (board[section][rowIndex] ? board[section][rowIndex] : {}),
    [board, rowIndex, section],
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: colors.border,
      }}>
      <MemoBoardRowTitle
        scratched={data.scratched}
        section={section}
        rowIndex={rowIndex}>
        {item}
      </MemoBoardRowTitle>
      <View style={{ flexDirection: 'row' }}>
        {headerData.map((color, index) => (
          <MemoBoardRowNote
            key={index}
            color={color}
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

const BoardRowTitle: React.FC = ({
  scratched,
  section,
  rowIndex,
  children,
}) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const toggleScratched = useCallback(() => {
    Vibration.vibrate(10);
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
        {children}
      </Text>
    </Pressable>
  );
};

const MemoBoardRowTitle = memo(BoardRowTitle, isEqual);

interface BoardRowNoteProps {
  color: { dark: string; light: string };
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
  const { colors, dark } = useTheme();
  const dispatch = useDispatch();

  const updateBox = useCallback(() => {
    Vibration.vibrate(10);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(setBoardValue({ row: rowIndex, col: colIndex, section }));
  }, [colIndex, dispatch, rowIndex, section]);

  return (
    <Pressable
      key={colIndex}
      style={{
        minHeight: SQUARE_SIZE,
        width: SQUARE_SIZE,
        borderStartWidth: 1,
        borderColor: colors.border,
        backgroundColor: `${color[dark ? 'dark' : 'light']}20`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={updateBox}
      android_ripple={{ color: color[dark ? 'dark' : 'light'] }}>
      {data &&
        (data.type === 'icon' ? (
          <MaterialCommunityIcons
            name={data.data}
            size={20}
            color={colors.text}
          />
        ) : (
          <Text style={{ color: colors.text }}>{data.data}</Text>
        ))}
    </Pressable>
  );
};

const MemoBoardRowNote = memo(BoardRowNote, isEqual);

export default memo(BoardRow, isEqual);
