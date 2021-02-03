import React, { memo, useCallback } from 'react';
import { Platform, PressableStateCallbackType, View, Text } from 'react-native';
import isEqual from 'react-fast-compare';

import Pressable from './Pressable';
import { SQUARE_SIZE } from '../config/constants';
import { playerColorKeys } from '../config/data';
import { useSelector, useTheme } from '../hooks';

interface PlayerHeaderProps {
  setSelectedPlayerIndex: (index: number) => void;
  openPlayerModal: () => void;
}

const PlayerHeader: React.FC<PlayerHeaderProps> = ({
  setSelectedPlayerIndex,
  openPlayerModal,
}) => {
  const { colors, dark } = useTheme();
  const { players } = useSelector(({ notes }) => notes);

  return (
    <View
      style={{
        borderColor: colors.border,
        backgroundColor: colors.background,
        width: '100%',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: 'center',
        }}>
        <Text style={{ color: colors.text }}>Players</Text>
      </View>
      {playerColorKeys.map((colorKey, key) => {
        const onPress = useCallback(() => {
          setSelectedPlayerIndex(key);
          openPlayerModal();
        }, [key]);

        const style = useCallback(
          ({ pressed }: PressableStateCallbackType) => ({
            minHeight: SQUARE_SIZE,
            width: SQUARE_SIZE,
            borderColor: colors.border,
            backgroundColor: colors[colorKey],
            opacity: Platform.OS === 'ios' && pressed ? 0.5 : 1,
            borderStartWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }),
          [colorKey],
        );

        return (
          <Pressable
            key={key}
            onPress={onPress}
            style={style}
            android_ripple={{ color: colors.background }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 16,
              }}>
              {players[key]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default memo(PlayerHeader, isEqual);
