import React, { useMemo } from 'react';
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
import { setBoardValue, setScratched } from '../redux/slices/notesSlice';
import { useTheme, useSelector, useDispatch } from '../hooks';

interface BoardRowProps {
  item: string;
  rowIndex: number;
  section: 'suspects' | 'weapons' | 'rooms';
}

const BoardRow: React.FC<BoardRowProps> = ({ item, rowIndex, section }) => {
  const { colors, dark } = useTheme();
  const { board } = useSelector(({ notes }) => notes);
  const dispatch = useDispatch();

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
      <Pressable
        onPress={() => {
          Vibration.vibrate(10);
          dispatch(
            setScratched({
              row: rowIndex,
              scratched: !data.scratched,
              section,
            }),
          );
        }}
        style={({ pressed }) => ({
          opacity: Platform.OS === 'ios' && pressed ? 0.5 : 1,
          paddingLeft: 20,
          justifyContent: 'center',
          flex: 1,
        })}
        android_ripple={{ color: colors.border }}>
        <Text
          style={{
            color: data.scratched ? 'red' : colors.text,
            textDecorationLine: data.scratched ? 'line-through' : 'none',
            opacity: data.scratched ? 0.5 : 1,
          }}>
          {item}
        </Text>
      </Pressable>
      <View style={{ flexDirection: 'row' }}>
        {headerData.map((color, key) => {
          const updateBox = () => {
            Vibration.vibrate(10);
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            dispatch(setBoardValue({ row: rowIndex, col: key, section }));
          };

          return (
            <Pressable
              key={key}
              style={{
                height: SQUARE_SIZE,
                width: SQUARE_SIZE,
                borderStartWidth: 1,
                borderColor: colors.border,
                backgroundColor: `${color[dark ? 'dark' : 'light']}20`,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={updateBox}
              android_ripple={{ color: color[dark ? 'dark' : 'light'] }}>
              {data[key] &&
                (data[key].type === 'icon' ? (
                  <MaterialCommunityIcons
                    name={data[key].data}
                    size={20}
                    color={colors.text}
                  />
                ) : (
                  <Text style={{ color: colors.text }}>{data[key].data}</Text>
                ))}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default BoardRow;
