import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../hooks';
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
        height: 60,
        width: '100%',
        marginLeft: 16,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
          marginRight: 21,
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
              style={{ marginLeft: 5 }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Header;
