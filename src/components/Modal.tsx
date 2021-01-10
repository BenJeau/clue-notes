import React from 'react';
import { View } from 'react-native';
import { Modalize, ModalizeProps } from 'react-native-modalize';

import { useTheme } from '../hooks';

interface ModalProps {
  modalRef: React.RefObject<Modalize>;
  props?: ModalizeProps;
}

const Modal: React.FC<ModalProps> = ({ modalRef, children, props }) => {
  const { colors } = useTheme();

  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight
      handlePosition="inside"
      {...props}
      modalStyle={{
        backgroundColor: colors.background,
        borderTopEndRadius: 0,
        borderTopStartRadius: 0,
      }}
      childrenStyle={{}}
      handleStyle={[{ backgroundColor: colors.text }, props?.handleStyle]}>
      <View
        style={[
          {
            borderTopWidth: 1,
            borderColor: colors.border,
          },
          props?.childrenStyle,
        ]}>
        {children}
      </View>
    </Modalize>
  );
};

export default Modal;
