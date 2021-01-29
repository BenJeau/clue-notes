import React, { memo } from 'react';
import {
  Pressable as RNPressable,
  PressableProps,
  Vibration,
} from 'react-native';
import isEqual from 'react-fast-compare';
import { useTheme } from '../hooks';

const Pressable: React.FC<PressableProps> = (props) => {
  const { colors } = useTheme();

  return (
    <RNPressable
      android_ripple={{ color: colors.text }}
      {...props}
      onPress={(e) => {
        Vibration.vibrate(10);
        if (props.onPress) {
          props.onPress(e);
        }
      }}
    />
  );
};

export default memo(Pressable, isEqual);
