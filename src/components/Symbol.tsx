import React, { memo, useCallback } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import isEqual from 'react-fast-compare';

import MaterialCommunityIcons from './MaterialCommunityIcons';
import Pressable from './Pressable';
import { BoardEntry } from '../redux/slices/notesSlice';
import { SQUARE_SIZE } from '../config/constants';
import { useTheme, useSelector, useDispatch } from '../hooks';
import { setSelected } from '../redux/slices/stateSlice';

interface SymbolProps {
  data: BoardEntry;
  style?: StyleProp<ViewStyle>;
}

const Symbol: React.FC<SymbolProps> = ({ data: { data, type }, style }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const selected = useSelector(({ state }) => state.selected);

  const isSelected = selected.data === data && selected.type === type;

  const updateSelected = useCallback(() => {
    dispatch(setSelected({ data, type }));
  }, [data, dispatch, type]);

  return (
    <View
      style={[
        {
          overflow: 'hidden',
          borderRadius: 10,
          margin: 3,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}>
      <Pressable
        style={{
          backgroundColor: isSelected ? colors.text : colors.card,
          height: SQUARE_SIZE,
          width: SQUARE_SIZE,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        android_ripple={{ color: isSelected ? colors.card : colors.text }}
        onPress={updateSelected}>
        {type === 'icon' ? (
          <MaterialCommunityIcons
            name={data}
            size={20}
            color={isSelected ? colors.card : colors.text}
          />
        ) : (
          <Text style={{ color: isSelected ? colors.card : colors.text }}>
            {data}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default memo(Symbol, isEqual);
