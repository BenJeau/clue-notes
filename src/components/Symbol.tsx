import React, { memo, useCallback, useMemo } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import isEqual from 'react-fast-compare';

import MaterialCommunityIcons from './MaterialCommunityIcons';
import Pressable from './Pressable';
import { SQUARE_SIZE } from '~/config/constants';
import { useTheme, useSelector, useDispatch } from '~/hooks';
import { setSelected } from '~/redux/slices/stateSlice';
import { sheet } from '../config/data';
import { showModal } from '../utils/navigation';

interface SymbolProps {
  data?: string;
  type?: 'icon' | 'text';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  backgroundColor?: string;
}

const Symbol: React.FC<SymbolProps> = ({
  data = '',
  type = 'icon',
  disabled = false,
  style,
  backgroundColor,
}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const selected = useSelector(({ state }) => state.selected);

  const isSelected =
    !disabled && selected.data === data && selected.type === type;

  const updateSelected = useCallback(() => {
    dispatch(setSelected({ data, type }));
  }, [dispatch, data, type]);

  const onLongPress = useCallback(() => {
    showModal('SymbolOptions', { data, type });
  }, [data, type]);

  const size = useMemo(
    () =>
      type === 'icon' && sheet.some((i) => i.data.includes(data)) ? 24 : 20,
    [type, data],
  );

  return (
    <View
      style={[
        {
          overflow: 'hidden',
          borderRadius: 10,
          margin: 3,
          borderWidth: 1,
          borderColor: colors.border,
          elevation: 1,
        },
        style,
      ]}>
      <Pressable
        style={{
          backgroundColor:
            backgroundColor || (isSelected ? colors.text : colors.card),
          height: SQUARE_SIZE,
          width: SQUARE_SIZE,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        android_ripple={isSelected ? { color: colors.card } : {}}
        disabled={disabled}
        // onLongPress={onLongPress}
        onPress={updateSelected}>
        {type === 'icon' ? (
          <MaterialCommunityIcons
            name={data}
            size={size}
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
