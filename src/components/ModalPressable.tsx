import React from 'react';
import {
  Pressable,
  StyleProp,
  Text,
  Vibration,
  View,
  ViewStyle,
} from 'react-native';
import MaterialCommunityIcons from './MaterialCommunityIcons';

import { BoardEntry } from '../redux/slices/notesSlice';
import { SQUARE_SIZE } from '../config/constants';
import { useTheme, useSelector, useDispatch } from '../hooks';
import { setSelected } from '../redux/slices/stateSlice';

interface ModalPressableProps {
  data: BoardEntry;
  style?: StyleProp<ViewStyle>;
}

const ModalPressable: React.FC<ModalPressableProps> = ({
  data: { data, type },
  style,
}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { selected } = useSelector(({ state }) => state);

  const isSelected = selected.data === data && selected.type === type;

  const updateSelected = () => {
    Vibration.vibrate(10);
    dispatch(setSelected({ data, type }));
  };

  return (
    <View style={[{ overflow: 'hidden', borderRadius: 5, margin: 3 }, style]}>
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

export default ModalPressable;
