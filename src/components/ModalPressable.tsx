import React from "react";
import { Pressable, Text } from "react-native";
import { useDispatch } from 'react-redux';
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useSelector } from '../redux';
import { BoardEntry, setSelected } from '../redux/slices/boardSlice';
import { SQUARE_SIZE } from "../config/constants";

interface ModalPressableProps {
  data: BoardEntry;
}

const ModalPressable: React.FC<ModalPressableProps> = ({
  data: { data, type },
}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { selected } = useSelector(({ board }) => board);

  const isSelected = selected.data === data && selected.type === type;

  const updateSelected = () => {
    dispatch(setSelected({ data, type }));
  };

  return (
    <Pressable
      style={{
        backgroundColor: isSelected ? colors.text : colors.card,
        height: SQUARE_SIZE,
        width: SQUARE_SIZE,
        justifyContent: "center",
        alignItems: "center",
      }}
      android_ripple={{ color: isSelected ? colors.card : colors.text }}
      onPress={updateSelected}
    >
      {type === "icon" ? (
        <MaterialCommunityIcons
          name={data}
          size={20}
          color={isSelected ? colors.card : colors.text}
        />
      ) : (
        <Text style={{ color: isSelected ? colors.card : colors.text }}>
          {data}
        </Text>
      )}
    </Pressable>
  );
};

export default ModalPressable;
