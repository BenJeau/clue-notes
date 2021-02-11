import React from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { Modal, Symbol, Button } from '~/components';
import { useTheme } from '~/hooks';

interface SymbolOptionsProps {
  data: string;
  type?: 'text' | 'icon';
}

const SymbolOptions: NavigationFunctionComponent<SymbolOptionsProps> = ({
  componentId,
  data,
  type,
}) => {
  const { colors } = useTheme();

  return (
    <Modal
      componentId={componentId}
      showDismiss
      header={{
        title: 'Symbol Properties',
        subtitle: 'Change symbol behavior on the board',
        extra: (
          <Symbol
            data={data}
            type={type}
            style={{ margin: 0 }}
            disabled
            backgroundColor={colors.background}
          />
        ),
      }}>
      <Button
        label="Set as primary"
        style={{ marginBottom: 10, backgroundColor: colors.card }}
      />
    </Modal>
  );
};

export default SymbolOptions;
