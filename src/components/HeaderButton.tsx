import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import MaterialCommunityIcons from './MaterialCommunityIcons';
import Pressable from './Pressable';
import { useTheme } from '../hooks';

interface HeaderButtonProps {
  onPress: () => void;
  icon: string;
  style?: StyleProp<ViewStyle>;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  icon,
  onPress,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[{ borderRadius: 17.5, overflow: 'hidden' }, style]}>
      <Pressable
        onPress={onPress}
        style={{
          height: 35,
          width: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons name={icon} color={colors.text} size={24} />
      </Pressable>
    </View>
  );
};

export default HeaderButton;
