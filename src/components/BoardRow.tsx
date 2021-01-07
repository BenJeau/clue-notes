import React, { useMemo, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Platform, Pressable, Text, Vibration, View } from "react-native";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SQUARE_SIZE } from "../config/constants";
import { headerData } from "../config/data";
import { useSelector } from "../redux";
import { setBoardValue } from "../redux/slices/boardSlice";

interface BoardRowProps {
  item: string;
  index: string;
}

const BoardRow: React.FC<BoardRowProps> = ({ item, index }) => {
  const { colors, dark } = useTheme();
  const [scratched, setScratched] = useState(false);
  const { board } = useSelector(({ board }) => board);
  const dispatch = useDispatch();

  const data = useMemo(() => (board[index] ? board[index] : {}), [
    board,
    index,
  ]);

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
        {headerData.map(({ color }, key) => {
          const updateBox = () => {
            dispatch(setBoardValue({ row: index, col: key }));
          };

          return (
            <Pressable
              key={key}
              style={{
                height: SQUARE_SIZE,
                width: SQUARE_SIZE,
                borderStartWidth: 1,
                borderColor: colors.border,
                backgroundColor: `${color[dark ? "dark" : "light"]}20`,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={updateBox}
              android_ripple={{ color: color[dark ? "dark" : "light"] }}
            >
              {data[key] &&
                (data[key].type === "icon" ? (
                  <MaterialCommunityIcons
                    name={data[key].data}
                    size={20}
                    color={colors.text}
                  />
                ) : (
                  <Text style={{ color: colors.text }}>{data[key].data}</Text>
                ))}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default BoardRow;
