import React, { memo, useCallback } from 'react';
import { View, Text, Animated } from 'react-native';
import isEqual from 'react-fast-compare';

import Pressable from './Pressable';
import { SQUARE_SIZE } from '~/config/constants';
import { playerColorKeys } from '~/config/data';
import { useSelector, useTheme } from '~/hooks';
import { showModal } from '~/utils/navigation';

const PlayerHeader: React.FC = () => {
  const { colors } = useTheme();
  const players = useSelector(({ notes }) => notes.players);

  return (
    <Animated.View
      style={{
        width: '100%',
      }}>
      <View
        style={{
          borderColor: colors.border,
          borderBottomWidth: 1,
          borderTopWidth: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          backgroundColor: colors.background,
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
            showModal('SetPlayerName', { selectedPlayerIndex: key });
          }, [key]);

          return (
            <Pressable
              key={key}
              onPress={onPress}
              style={{
                minHeight: SQUARE_SIZE,
                width: SQUARE_SIZE,
                borderColor: colors.border,
                backgroundColor: colors[colorKey],
                borderStartWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
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
    </Animated.View>
  );
};

export default memo(PlayerHeader, isEqual);
