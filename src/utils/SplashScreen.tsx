import React, { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';

import { useTheme } from '~/hooks';

const SplashScreen: React.FC = ({ children }) => {
  const [redOpacity] = useState(new Animated.Value(1));
  const [backgroundOpacity] = useState(new Animated.Value(1));
  const [show, setShow] = useState(true);

  const { colors } = useTheme();

  useEffect(() => {
    Animated.timing(redOpacity, {
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
      duration: 300,
    }).start();

    Animated.timing(backgroundOpacity, {
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
      duration: 600,
    }).start(() => {
      setShow(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}
      {show && (
        <Animated.View
          style={{
            backgroundColor: colors.background,
            height: '100%',
            opacity: backgroundOpacity,
            width: '100%',
            position: 'absolute',
          }}>
          <Animated.View
            style={{
              backgroundColor: '#b91919',
              height: '100%',
              opacity: redOpacity,
              width: '100%',
              position: 'absolute',
            }}
          />
        </Animated.View>
      )}
    </>
  );
};

export default SplashScreen;
