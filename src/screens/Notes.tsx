import React, { useRef, useState } from 'react';
import {
  SectionList,
  Pressable,
  Text,
  View,
  Platform,
  Vibration,
} from 'react-native';
import { Modalize } from 'react-native-modalize';

import { headerData, sections } from '../config/data';
import { BoardRow, Header } from '../components';
import { SQUARE_SIZE, ALWAYS_OPEN } from '../config/constants';
import {
  CameraModal,
  CustomizeBoardModal,
  ManualModifyBoardModal,
  QrCodeModal,
  ResetModal,
  SetPlayerNameModal,
  SettingsModal,
  SymbolsModal,
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

  const { colors, dark } = useTheme();
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number>(0);

  const { players } = useSelector(({ board }) => board);

  const openResetModal = () => resetModalRef.current?.open();
  const openSettingsModal = () => settingsModalRef.current?.open();
  const openCustomizeModal = () => customizeModalRef.current?.open();
  const openCameraModal = () => cameraModalRef.current?.open();
  const openQrModal = () => qrModalRef.current?.open();
  const openModifyBoardModal = () => modifyBoardModalRef.current?.open();

  return (
    <>
      <View style={{ height: '100%' }}>
        <Header
          icons={[
            { name: 'undo-variant', onPress: openResetModal },
            { name: 'dots-vertical', onPress: openSettingsModal },
          ]}
        />

        <View
          style={{
            borderColor: colors.border,
            backgroundColor: colors.background,
            width: '100%',
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            <Text style={{ color: colors.text }}>Players</Text>
          </View>
          {headerData.map(({ color }, key) => (
            <Pressable
              key={key}
              onPress={() => {
                Vibration.vibrate(10);
                setSelectedPlayerIndex(key);
                playerModalRef.current?.open();
              }}
              style={({ pressed }) => ({
                height: SQUARE_SIZE,
                width: SQUARE_SIZE,
                borderColor: colors.border,
                backgroundColor: color[dark ? 'dark' : 'light'],
                opacity: Platform.OS === 'ios' && pressed ? 0.5 : 1,
                borderStartWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              })}
              android_ripple={{ color: colors.background }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                }}>
                {players[key]}
              </Text>
            </Pressable>
          ))}
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item, index) => `${item}${index}`}
          renderItem={({ item, index }) => (
            <BoardRow item={item} index={`${item}${index}`} />
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
                {title}
              </Text>
            </View>
          )}
          stickySectionHeadersEnabled
          ListFooterComponent={<View style={{ height: ALWAYS_OPEN - 1 }} />}
        />
      </View>

      <SymbolsModal modalRef={symbolsModalRef} />
      <ResetModal modalRef={resetModalRef} />
      <SettingsModal
        modalRef={settingsModalRef}
        openCustomizeBoard={openCustomizeModal}
      />
      <CustomizeBoardModal
        modalRef={customizeModalRef}
        openCameraModal={openCameraModal}
        openQrModal={openQrModal}
        openModifyBoardModal={openModifyBoardModal}
      />
      <QrCodeModal modalRef={qrModalRef} />
      <CameraModal modalRef={cameraModalRef} />
      <ManualModifyBoardModal modalRef={modifyBoardModalRef} />

      <SetPlayerNameModal
        modalRef={playerModalRef}
        selectedPlayerIndex={selectedPlayerIndex}
        buttonColor={
          headerData[selectedPlayerIndex].color[dark ? 'dark' : 'light']
        }
      />
    </>
  );
};

export default Home;
