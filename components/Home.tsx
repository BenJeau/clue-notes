import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  SectionList,
  Pressable,
  Text,
  View,
  Platform,
  Vibration,
  Button,
} from "react-native";
import { headerData, icons, sections } from "./data";
import { Modalize } from "react-native-modalize";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Overlay from "./Overlay";
import { useHeaderHeight } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { BoardEntry, setPlayer } from "../redux/slices/boardSlice";
import { useSelector } from "../redux";
import Modal from "./Modal";

const SQUARE_SIZE = 40;

const Row = ({ item, data }) => {
  const { colors, dark } = useTheme();
  const [scratched, setScratched] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Pressable
        onPress={() => {
          Vibration.vibrate(10);
          setScratched((prev) => !prev);
        }}
        style={({ pressed }) => ({
          opacity: Platform.OS === "ios" && pressed ? 0.5 : 1,
          paddingLeft: 20,
          justifyContent: "center",
          flex: 1,
        })}
        android_ripple={{ color: colors.border }}
      >
        <Text
          style={{
            color: scratched ? "red" : colors.text,
            textDecorationLine: scratched ? "line-through" : "none",
            opacity: scratched ? 0.5 : 1,
          }}
        >
          {item}
        </Text>
      </Pressable>
      <View style={{ flexDirection: "row" }}>
        {headerData.map(({ color }, key) => (
          <Pressable
            key={key}
            style={{
              height: SQUARE_SIZE,
              width: SQUARE_SIZE,
              borderStartWidth: 1,
              borderColor: colors.border,
              backgroundColor: `${color[dark ? "dark" : "light"]}20`,
            }}
          ></Pressable>
        ))}
      </View>
    </View>
  );
};

interface ModalPressableProps {
  data: BoardEntry;
  selected: boolean;
}

const ModalPressable: React.FC<ModalPressableProps> = ({ data, selected }) => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={{
        backgroundColor: selected ? colors.text : colors.card,
        height: SQUARE_SIZE,
        width: SQUARE_SIZE,
        justifyContent: "center",
        alignItems: "center",
      }}
      android_ripple={{ color: selected ? colors.card : colors.text }}
    >
      {data.type === "icon" ? (
        <MaterialCommunityIcons
          name={data.data}
          size={20}
          color={colors.text}
        />
      ) : (
        <Text>{data.data}</Text>
      )}
    </Pressable>
  );
};

const Home = () => {
  const { colors, dark } = useTheme();
  const playerModalRef = useRef<Modalize>(null);
  const itemModalRef = useRef<Modalize>(null);
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const [activePlayer, setAcivePlayer] = useState<number>(0);
  const [text, setText] = useState("");

  const { players } = useSelector(({ board }) => board);

  return (
    <>
      <View
        style={{
          width: "100%",
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderColor: colors.border,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, paddingLeft: 20, justifyContent: "center" }}>
          <Text style={{ color: colors.text }}></Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {headerData.map(({ color }, key) => (
            <Pressable
              key={key}
              onPress={() => {
                setAcivePlayer(key);
                playerModalRef.current?.open();
              }}
              style={({ pressed }) => ({
                height: SQUARE_SIZE,
                width: SQUARE_SIZE,
                borderStartWidth: 1,
                borderColor: colors.border,
                backgroundColor: color[dark ? "dark" : "light"],
                opacity: Platform.OS === "ios" && pressed ? 0.5 : 1,
                justifyContent: "center",
                alignItems: "center",
              })}
              android_ripple={{ color: colors.background }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {players[key]}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `${item}${index}`}
        renderItem={({ item }) => <Row item={item} data={{}} />}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              backgroundColor: colors.card,
              borderBottomWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              {title}
            </Text>
          </View>
        )}
        stickySectionHeadersEnabled
        ListFooterComponent={<View style={{ height: SQUARE_SIZE + 20 }} />}
      />
      <Modal
        modalRef={itemModalRef}
        props={{
          alwaysOpen: SQUARE_SIZE + 20,
          childrenStyle: { padding: 10 },
          withHandle: false,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {icons.map((i, key) => (
            <ModalPressable
              key={key}
              selected={false}
              data={{ type: "icon", data: i }}
            />
          ))}
        </View>
      </Modal>
      <Modal modalRef={playerModalRef}>
        <Text style={{ color: colors.text, fontSize: 20, fontWeight: "bold" }}>
          Set player name
        </Text>
        <TextInput
          onChangeText={(t) => setText(t)}
          value={text}
          maxLength={2}
          autoCapitalize="characters"
        />
        <Button
          title="Save"
          onPress={() => {
            playerModalRef.current?.close();
            setText("");
            dispatch(setPlayer({ index: activePlayer, name: text }));
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
