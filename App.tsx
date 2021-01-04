import React from "react";
import {
  AccessibilityInfo,
  Pressable,
  useColorScheme,
  View,
} from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider, useDispatch } from "react-redux";

import { store, persistor } from "./redux";

import Home from "./components/Home";
import { clearBoard, clearPlayers } from "./redux/slices/boardSlice";

const Stack = createStackNavigator();

const Navigator = () => {
  const { colors } = useTheme();
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
        component={Home}
        options={{
          headerRight: () => (
            <View style={{ borderRadius: 17.5, overflow: "hidden" }}>
              <Pressable
                onPress={clear}
                android_ripple={{
                  color: colors.text,
                }}
                style={{
                  height: 35,
                  width: 35,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="refresh"
                  color={colors.text}
                  size={24}
                  style={{ transform: [{ scaleX: -1 }] }}
                />
              </Pressable>
            </View>
          ),
          headerRightContainerStyle: {
            marginRight: 10,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default () => {
  const scheme = useColorScheme();

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          theme={scheme === "light" ? DarkTheme : DefaultTheme}
        >
          <Navigator />
        </NavigationContainer>
      </PersistGate>
    </ReduxProvider>
  );
};
