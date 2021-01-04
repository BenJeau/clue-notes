import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { Accelerometer } from "expo-sensors";
import { useHeaderHeight } from "@react-navigation/stack";

import Animated from "react-native-reanimated";

const Overlay = () => {
  const headerHeight = useHeaderHeight();

  const elevation = Animated.useValue<number>(0);
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        elevation.setValue(
          new Animated.Value(parseFloat(accelerometerData.y.toFixed(2)))
        );
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    Accelerometer.setUpdateInterval(16);
    return () => _unsubscribe();
  }, []);

  const opacity = elevation.interpolate({
    inputRange: [0.3, 0.7],
    outputRange: [1, 0],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        height: Dimensions.get("screen").height,
        zIndex: 100,
        elevation: 100,
        width: "100%",
        backgroundColor: "red",
        top: -headerHeight,
        opacity,
      }}
      pointerEvents="box-only"
    />
  );
};

export default Overlay;
