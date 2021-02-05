import React, { forwardRef, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Modalize, ModalizeProps } from 'react-native-modalize';

import { useInnerRef, useTheme } from '~/hooks';
import Button from './Button';

interface ModalProps {
  children?: React.ReactNode;
  props?: ModalizeProps;
  header?: {
    title?: string;
    subtitle?: string;
  };
  showDismiss?: boolean;
}

const Modal = forwardRef<Modalize, ModalProps>(
  ({ children, props, header, showDismiss }, ref) => {
    const { colors } = useTheme();

    const [combinedRef, innerRef] = useInnerRef(ref);

    const close = useCallback(() => innerRef.current?.close(), [innerRef]);

    return (
      <Modalize
        ref={combinedRef}
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
                  onPress={close}
                  style={{ marginTop: 10, width: '100%' }}
                />
              )}
            </View>
          </>
        )}
      </Modalize>
    );
  },
);

export default Modal;
