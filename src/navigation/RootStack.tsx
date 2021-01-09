import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Notes } from '../screens';

const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Clue Notes"
      component={Notes}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

export default RootStack;
