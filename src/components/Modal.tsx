import React, { forwardRef, useRef } from 'react';
import { View, Text } from 'react-native';
import { Modalize, ModalizeProps } from 'react-native-modalize';

import { useCombinedRefs, useTheme } from '../hooks';
import Button from './Button';

interface ModalProps {
  props?: ModalizeProps;
  header?: {
    title?: string;
    subtitle?: string;
  };
  showDismiss?: boolean;
}

const Modal = forwardRef<React.Ref<Modalize>, ModalProps>(
  ({ children, props, header, showDismiss }, ref?) => {
    const { colors } = useTheme();

    const innerRef = useRef<Modalize>(null);
    const combinedRef = useCombinedRefs(ref, innerRef);

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
                  onPress={() => innerRef.current?.close()}
                  style={{ marginTop: 10 }}
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
