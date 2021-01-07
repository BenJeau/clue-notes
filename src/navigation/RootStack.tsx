import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";

import { Notes } from "../screens";
import { clearBoard, clearPlayers } from "../redux/slices/boardSlice";
import { HeaderButton } from "../components";

const Stack = createStackNavigator();

const RootStack = () => {
  const dispatch = useDispatch();

  const clear = () => {
    dispatch(clearBoard());
    dispatch(clearPlayers());
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { elevation: 0 },
      }}
    >
      <Stack.Screen
        name="Clue Notes"
        component={Notes}
        options={{
          headerRight: () => (
            <HeaderButton icon="restore" onPress={clear} />
          ),
          headerRightContainerStyle: { marginRight: 10 },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
