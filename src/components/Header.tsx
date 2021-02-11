import React, { memo } from 'react';
import { Animated, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import isEqual from 'react-fast-compare';

import { useTheme } from '~/hooks';
import HeaderButton from './HeaderButton';

interface HeaderProps {
  icons: {
    name: string;
    onPress: () => void;
  }[];
  headerVisibleHeight?: Animated.Value;
}

export const HEADER_HEIGHT = 55;

const Header: React.FC<HeaderProps> = ({
  icons,
  headerVisibleHeight = new Animated.Value(0),
}) => {
  const { colors } = useTheme();

  const opacity = headerVisibleHeight.interpolate({
    inputRange: [0, HEADER_HEIGHT - 5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={{
        height: HEADER_HEIGHT + getStatusBarHeight(),
        width: '100%',
        paddingTop: getStatusBarHeight(),
        backgroundColor: colors.card,
        elevation: 1,
      }}>
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
          paddingLeft: 16,
          opacity,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: colors.text,
            fontFamily: 'sans-serif-medium',
          }}>
          Clue Notes
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {icons.map(({ name, onPress }, key) => (
            <HeaderButton key={key} icon={name} onPress={onPress} />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default memo(Header, isEqual);
