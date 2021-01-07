import React from "react";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { useDispatch } from "react-redux";

import { clearBoard, clearPlayers } from "../redux/slices/boardSlice";
import { Button, Modal } from "../components";

interface ResetModalProps {
  modalRef: React.RefObject<Modalize>;
}

const ResetModal: React.FC<ResetModalProps> = ({ modalRef }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const clearNotes = () => {
    dispatch(clearBoard());
    dimiss();
  };

  const clearEverything = () => {
    dispatch(clearBoard());
    dispatch(clearPlayers());
    dimiss();
  };

  const dimiss = () => modalRef.current?.close();

  return (
    <Modal modalRef={modalRef} props={{ childrenStyle: { padding: 20 } }}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: "bold" }}>
        Reset Board
      </Text>

      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Button
          label="Only board content"
          onPress={clearNotes}
          style={{
            backgroundColor: colors.card,
            borderRadius: 5,
            flex: 1,
            marginRight: 5,
          }}
          pressableStyle={{ padding: 5 }}
        />
        <Button
          label="Everything"
          onPress={clearEverything}
          style={{
            backgroundColor: colors.card,
            borderRadius: 5,
            flex: 1,
            marginLeft: 5,
          }}
          pressableStyle={{ padding: 5 }}
        />
      </View>
      <Button
        label="Cancel"
        onPress={dimiss}
        style={{ backgroundColor: colors.card, borderRadius: 5 }}
        pressableStyle={{ padding: 5 }}
      />
    </Modal>
  );
};

export default ResetModal;
