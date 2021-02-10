import React, { useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { Button, Modal } from '~/components';
import { useDispatch, useTheme } from '~/hooks';
import { resetSections } from '~/redux/slices/settingsSlice';
import { showModal } from '~/utils/navigation';

const CustomizeBoard: NavigationFunctionComponent = ({ componentId }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const modalRef = useRef<Modalize>(null);

  const resetBoardSections = () => {
    dispatch(resetSections());
    modalRef.current?.close();
  };

  const openCameraModal = () => showModal('Camera');
  const openQrModal = () => showModal('QrCode');
  const openModifyBoardModal = () => showModal('ModifyBoard');

  return (
    <Modal
      ref={modalRef}
      componentId={componentId}
      header={{
        title: 'Customize Board',
        subtitle: 'Modify the rows of the board to reflect your game of Clue',
      }}>
      <Button
        label="Import board via QR code"
        onPress={openCameraModal}
        style={{
          backgroundColor: colors.card,
          marginBottom: 10,
        }}
      />
      <Button
        label="Share board via QR code"
        onPress={openQrModal}
        style={{
          backgroundColor: colors.card,
          marginBottom: 10,
        }}
      />
      <Button
        label="Manually modify board"
        onPress={openModifyBoardModal}
        style={{
          backgroundColor: colors.card,
          marginBottom: 20,
        }}
      />
      <Button
        label="Reset board"
        style={{
          backgroundColor: colors.red,
        }}
        onPress={resetBoardSections}
      />
    </Modal>
  );
};

export default CustomizeBoard;
