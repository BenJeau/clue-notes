import React, { forwardRef } from 'react';
import { Modalize } from 'react-native-modalize';

import { clearBoard, clearPlayers } from '~/redux/slices/notesSlice';
import { Button, Modal } from '~/components';
import { useTheme, useDispatch, useInnerRef } from '~/hooks';

const ResetModal = forwardRef<Modalize>((_, ref) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const [combinedRef, innerRef] = useInnerRef(ref);

  const clearNotes = () => {
    dispatch(clearBoard());
    dimiss();
  };

  const clearEverything = () => {
    dispatch(clearBoard());
    dispatch(clearPlayers());
    dimiss();
  };

  const dimiss = () => innerRef.current?.close();

  return (
    <Modal
      ref={combinedRef}
      header={{
        title: 'Clear Notes',
        subtitle: 'Removes the notes taken',
      }}>
      <Button
        label="Clear content of the board"
        onPress={clearNotes}
        style={{
          backgroundColor: colors.card,
        }}
      />
      <Button
        label="Clear content of the board and players"
        onPress={clearEverything}
        style={{
          backgroundColor: colors.red,
          marginTop: 10,
        }}
      />
    </Modal>
  );
});

export default ResetModal;
