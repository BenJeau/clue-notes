import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import isEqual from 'react-fast-compare';

import { useTheme } from '~/hooks';
import HeaderButton from './HeaderButton';

interface HeaderProps {
  icons: {
    name: string;
    onPress: () => void;
  }[];
}

const Header: React.FC<HeaderProps> = ({ icons }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        height: 55 + getStatusBarHeight(),
        width: '100%',
        paddingTop: getStatusBarHeight(),
        borderBottomWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
          paddingLeft: 16,
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
            <HeaderButton
              key={key}
              icon={name}
              onPress={onPress}
              style={{ marginRight: 5 }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default memo(Header, isEqual);
