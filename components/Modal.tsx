import { useTheme } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Modalize, ModalizeProps } from "react-native-modalize";

interface ModalProps {
  modalRef: React.RefObject<Modalize>;
  props?: ModalizeProps;
}

const Modal: React.FC<ModalProps> = ({ modalRef, children, props }) => {
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();

  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight
      handlePosition="inside"
      {...props}
      rootStyle={{
        position: "absolute",
        top: -headerHeight,
        ...props?.rootStyle,
      }}
      modalStyle={{
        backgroundColor: colors.background,
        borderTopEndRadius: 0,
        borderTopStartRadius: 0,
        ...props?.modalStyle,
      }}
      childrenStyle={{}}
      handleStyle={{ backgroundColor: colors.text, ...props?.handleStyle }}
    >
      <View
        style={{
          borderTopWidth: 1,
          borderColor: colors.border,
          ...props?.childrenStyle,
        }}
      >
        {children}
      </View>
    </Modalize>
  );
};

export default Modal;
