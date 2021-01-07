import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Button, Text, TextInput } from "react-native";
import { Modalize } from "react-native-modalize";
import { useDispatch } from "react-redux";

import { Modal } from "../components";
import { setPlayer } from "../redux/slices/boardSlice";

interface SetPlayerNameModalProps {
  modalRef: React.RefObject<Modalize>;
  selectedPlayerIndex: number;
}

const SetPlayerNameModal: React.FC<SetPlayerNameModalProps> = ({
  modalRef,
  selectedPlayerIndex,
}) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [name, setName] = useState("");

  const save = () => {
    modalRef.current?.close();
    setName("");
    dispatch(setPlayer({ index: selectedPlayerIndex, name }));
  };

  return (
    <Modal modalRef={modalRef} props={{ childrenStyle: { padding: 20 } }}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: "bold" }}>
        Set player name
      </Text>
      <TextInput
        onChangeText={(text) => setName(text)}
        value={name}
        maxLength={2}
        autoCapitalize="characters"
      />
      <Button title="Save" onPress={save} />
    </Modal>
  );
};

export default SetPlayerNameModal;
