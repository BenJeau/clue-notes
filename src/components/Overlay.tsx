import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import { map, filter } from 'rxjs/operators';

import { useTheme } from '../hooks';

const Overlay: React.FC = () => {
  const { colors } = useTheme();
  const [elevation, setElevation] = useState(1);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 400);
    const subscription = accelerometer
      .pipe(
        map(({ x, y, z }) => x + y + z),
        filter((speed) => speed > 20),
      )
      .subscribe(
        (speed) => console.log(`You moved your phone with ${speed}`),
        (error) => {
          console.log('The sensor is not available');
        },
      );

    setTimeout(() => {
      // If it's the last subscription to accelerometer it will stop polling in the native API
      subscription.unsubscribe();
    }, 1000);
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        height: Dimensions.get('screen').height,
        zIndex: 100,
        elevation: 100,
        width: '100%',
        backgroundColor: colors.background,
        opacity: 0.5,
      }}
      pointerEvents="box-only"
    />
  );
};

export default Overlay;
