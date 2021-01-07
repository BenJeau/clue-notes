import React, { useMemo, useRef, useState } from "react";
import { SectionList, Pressable, Text, View, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";

import { headerData, sections } from "../config/data";
import { useSelector } from "../redux";
import { BoardRow } from "../components";
import { SQUARE_SIZE, ALWAYS_OPEN } from "../config/constants";
import { SetPlayerNameModal, SymbolsModal } from "../modals";

const Home: React.FC = () => {
  const { colors, dark } = useTheme();
  const playerModalRef = useRef<Modalize>(null);
  const symbolsModalRef = useRef<Modalize>(null);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number>(0);

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
                setSelectedPlayerIndex(key);
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
        renderItem={({ item, index }) => (
          <BoardRow item={item} index={`${item}${index}`} />
        )}
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
        ListFooterComponent={<View style={{ height: ALWAYS_OPEN - 1 }} />}
      />

      <SymbolsModal modalRef={symbolsModalRef} />

      <SetPlayerNameModal
        modalRef={playerModalRef}
        selectedPlayerIndex={selectedPlayerIndex}
      />
    </>
  );
};

export default Home;
