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

import { useTheme } from '../hooks';

interface ButtonProps {
  onPress: () => void;
  label: string;
  style?: StyleProp<ViewStyle>;
  pressableStyle?: StyleProp<ViewStyle>;
  icon?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  style,
  pressableStyle,
  icon,
  textColor,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[{ overflow: 'hidden', borderRadius: 10 }, style]}>
      <Pressable
        onPress={
          onPress &&
          (() => {
            Vibration.vibrate(10);
            onPress();
          })
        }
        android_ripple={{
          color: textColor || colors.text,
        }}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            padding: 9,
          },
          pressableStyle,
        ]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            color={colors.text}
            size={24}
            style={{ marginRight: 5 }}
          />
        )}
        <Text
          style={{
            color: textColor || colors.text,
            opacity: 0.8,
            fontFamily: 'sans-serif-medium',
            textAlign: 'center',
          }}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;
