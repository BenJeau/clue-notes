import React, { memo, useCallback } from 'react';
import {
  Pressable as RNPressable,
  PressableProps,
  Vibration,
} from 'react-native';
import isEqual from 'react-fast-compare';
import { useSelector, useTheme } from '../hooks';

const Pressable: React.FC<PressableProps> = (props) => {
  const { colors } = useTheme();
  const { vibrate } = useSelector(({ settings }) => settings);

  const onPress = useCallback(
    (e) => {
      if (vibrate) {
        Vibration.vibrate(10);
      }
      if (props.onPress) {
        props.onPress(e);
      }
    },
    [props, vibrate],
  );

  return (
    <RNPressable
      android_ripple={{ color: colors.text }}
      {...props}
      onPress={onPress}
    />
  );
};

export default memo(Pressable, isEqual);
