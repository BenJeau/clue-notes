import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Board, Header, HeaderPlayers } from '../components';
import {
  CameraModal,
  CustomizeBoardModal,
  ManualModifyBoardModal,
  QrCodeModal,
  ResetModal,
  SetPlayerNameModal,
  SettingsModal,
  SymbolsModal,
  HideModal,
} from '../modals';

const Home: React.FC = () => {
  const playerModalRef = useRef<Modalize>(null);
  const symbolsModalRef = useRef<Modalize>(null);
  const resetModalRef = useRef<Modalize>(null);
  const settingsModalRef = useRef<Modalize>(null);
  const customizeModalRef = useRef<Modalize>(null);
  const cameraModalRef = useRef<Modalize>(null);
  const qrModalRef = useRef<Modalize>(null);
  const modifyBoardModalRef = useRef<Modalize>(null);
  const hideModalRef = useRef<Modalize>(null);

  const openResetModal = useCallback(() => resetModalRef.current?.open(), []);
  const openSettingsModal = useCallback(
    () => settingsModalRef.current?.open(),
    [],
  );
  const openCustomizeModal = useCallback(
    () => customizeModalRef.current?.open(),
    [],
  );
  const openCameraModal = () => cameraModalRef.current?.open();
  const openQrModal = () => qrModalRef.current?.open();
  const openPlayerModal = useCallback(() => playerModalRef.current?.open(), []);
  const openModifyBoardModal = () => modifyBoardModalRef.current?.open();
  const openHideModal = useCallback(() => hideModalRef.current?.open(), []);

  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(0);

  return (
    <>
      <View style={{ height: '100%' }}>
        <Header
          icons={[
            { name: 'eye-off-outline', onPress: openHideModal },
            { name: 'undo-variant', onPress: openResetModal },
            { name: 'dots-vertical', onPress: openSettingsModal },
          ]}
        />
        <HeaderPlayers
          openPlayerModal={openPlayerModal}
          setSelectedPlayerIndex={setSelectedPlayerIndex}
        />
        <Board />
      </View>

      <SymbolsModal ref={symbolsModalRef} />
      <ResetModal ref={resetModalRef} />
      <SettingsModal
        ref={settingsModalRef}
        openCustomizeBoard={openCustomizeModal}
      />
      <CustomizeBoardModal
        ref={customizeModalRef}
        openCameraModal={openCameraModal}
        openQrModal={openQrModal}
        openModifyBoardModal={openModifyBoardModal}
      />
      <QrCodeModal ref={qrModalRef} />
      <CameraModal ref={cameraModalRef} />
      <ManualModifyBoardModal ref={modifyBoardModalRef} />
      <SetPlayerNameModal
        ref={playerModalRef}
        selectedPlayerIndex={selectedPlayerIndex}
      />
      <HideModal ref={hideModalRef} />
    </>
  );
};

export default Home;
