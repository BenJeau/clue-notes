// import React, { useEffect, useState } from 'react';
// import { Dimensions } from 'react-native';
// import { Accelerometer } from 'expo-sensors';
// import { useHeaderHeight } from '@react-navigation/stack';
// import Animated from 'react-native-reanimated';
// import { useTheme } from '@react-navigation/native';
// import { Subscription } from '@unimodules/core';

// const Overlay: React.FC = () => {
//   const headerHeight = useHeaderHeight();
//   const { colors } = useTheme();

//   const elevation = Animated.useValue<number>(0);
//   const [subscription, setSubscription] = useState<Subscription>();

//   const _subscribe = () => {
//     setSubscription(
//       Accelerometer.addListener((accelerometerData) => {
//         elevation.setValue(
//           new Animated.Value(parseFloat(accelerometerData.y.toFixed(2))),
//         );
//       }),
//     );
//   };

//   const _unsubscribe = () => {
//     subscription && subscription.remove();
//     setSubscription(undefined);
//   };

//   useEffect(() => {
//     _subscribe();
//     Accelerometer.setUpdateInterval(16);
//     return () => _unsubscribe();
//   }, []);

//   const opacity = elevation.interpolate({
//     inputRange: [0.3, 0.7],
//     outputRange: [1, 0],
//     extrapolate: Animated.Extrapolate.CLAMP,
//   });

//   return (
//     <Animated.View
//       style={{
//         position: 'absolute',
//         height: Dimensions.get('screen').height,
//         zIndex: 100,
//         elevation: 100,
//         width: '100%',
//         backgroundColor: colors.background,
//         top: -headerHeight,
//         opacity,
//       }}
//       pointerEvents="box-only"
//     />
//   );
// };

// export default Overlay;
