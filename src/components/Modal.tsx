import React from 'react';
import { View, Text } from 'react-native';
import { Modalize, ModalizeProps } from 'react-native-modalize';

import { useTheme } from '../hooks';
import Button from './Button';

interface ModalProps {
  modalRef: React.RefObject<Modalize>;
  props?: ModalizeProps;
  header?: {
    title?: string;
    subtitle?: string;
  };
  showDismiss?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  modalRef,
  children,
  props,
  header,
  showDismiss,
}) => {
  const { colors } = useTheme();

  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight
      handlePosition="inside"
      {...props}
      modalStyle={[
        {
          backgroundColor: colors.background,
          borderTopEndRadius: 0,
          borderTopStartRadius: 0,
        },
        props?.modalStyle,
      ]}
      childrenStyle={{}}
      handleStyle={[{ backgroundColor: colors.text }, props?.handleStyle]}>
      {children && (
        <>
          {header && (
            <View
              style={{
                padding: 20,
                paddingBottom: 10,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}>
              {header.title && (
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {header.title}
                </Text>
              )}
              {header.subtitle && (
                <Text style={{ color: colors.text }}>{header.subtitle}</Text>
              )}
            </View>
          )}
          <View
            style={[
              { padding: 20 },
              header ? {} : { borderTopWidth: 1, borderColor: colors.border },
              props?.childrenStyle,
            ]}>
            {children}
            {showDismiss && (
              <Button
                label="Dismiss"
                onPress={() => modalRef.current?.close()}
                style={{ marginTop: 10 }}
              />
            )}
          </View>
        </>
      )}
    </Modalize>
  );
};

export default Modal;
