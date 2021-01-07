import React, { useRef } from "react";
import { Modalize } from "react-native-modalize";
import { createStackNavigator } from "@react-navigation/stack";

import { Notes } from "../screens";
import { HeaderButton } from "../components";
import { ResetModal } from "../modals";
import { useTheme } from "@react-navigation/native";

const Stack = createStackNavigator();

const RootStack = () => {
  const { colors } = useTheme();
  const resetModalRef = useRef<Modalize>(null);

  const openModal = () => resetModalRef.current?.open();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="Clue Notes"
          component={() => (
            <>
              <Notes />
              <ResetModal modalRef={resetModalRef} />
            </>
          )}
          options={{
            headerRight: () => (
              <HeaderButton icon="restore" onPress={openModal} />
            ),
            headerRightContainerStyle: { marginRight: 10 },
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default RootStack;
