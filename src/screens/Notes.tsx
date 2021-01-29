import React, { useCallback, useRef, useState } from 'react';
import { SectionList, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { headerData } from '../config/data';
import { BoardRow, Header, HeaderPlayers } from '../components';
import { ALWAYS_OPEN } from '../config/constants';
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
import { useTheme, useSelector } from '../hooks';

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

  const { colors, dark } = useTheme();
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number>(0);

  const { sections } = useSelector(({ settings }) => settings);

  const openResetModal = useCallback(() => resetModalRef.current?.open(), []);
  const openSettingsModal = useCallback(
    () => settingsModalRef.current?.open(),
    [],
  );
  const openCustomizeModal = () => customizeModalRef.current?.open();
  const openCameraModal = () => cameraModalRef.current?.open();
  const openQrModal = () => qrModalRef.current?.open();
  const openPlayerModal = () => playerModalRef.current?.open();
  const openModifyBoardModal = () => modifyBoardModalRef.current?.open();
  const openHideModal = useCallback(() => hideModalRef.current?.open(), []);

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

        <SectionList
          sections={[
            {
              title: 'suspects',
              data: sections.suspects,
            },
            { title: 'weapons', data: sections.weapons },
            { title: 'rooms', data: sections.rooms },
          ]}
          keyExtractor={(item, index) => `${item}${index}`}
          renderItem={({ item, index, section }) => (
            <BoardRow item={item} rowIndex={index} section={section.title} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 18,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                {`${title[0].toUpperCase()}${title.substr(1, title.length)}`}
              </Text>
            </View>
          )}
          stickySectionHeadersEnabled
          ListFooterComponent={<View style={{ height: ALWAYS_OPEN - 1 }} />}
        />
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
        buttonColor={headerData[selectedPlayerIndex][dark ? 'dark' : 'light']}
      />
      <HideModal ref={hideModalRef} />
    </>
  );
};

export default Home;
