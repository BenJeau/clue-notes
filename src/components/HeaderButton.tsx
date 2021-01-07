import React from "react";
import { Pressable, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

interface HeaderButtonProps {
  onPress: () => void;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ icon, onPress }) => {
  const { colors } = useTheme();

  return (
    <View style={{ borderRadius: 17.5, overflow: "hidden" }}>
      <Pressable
        onPress={onPress}
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
        <MaterialCommunityIcons name={icon} color={colors.text} size={24} />
      </Pressable>
    </View>
  );
};

export default HeaderButton;
