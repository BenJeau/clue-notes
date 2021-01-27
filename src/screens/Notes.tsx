import React, { memo, useCallback, useRef, useState } from 'react';
import {
  SectionList,
  Pressable,
  Text,
  View,
  Platform,
  Vibration,
} from 'react-native';
import { Modalize } from 'react-native-modalize';

import { headerData } from '../config/data';
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
  HideModal,
} from '../modals';
import { useTheme, useSelector } from '../hooks';
import isEqual from 'react-fast-compare';

interface PlayerHeaderProps {
  setSelectedPlayerIndex: (index: number) => void;
  openPlayerModal: () => void;
}

const MemoPressable = memo(Pressable, isEqual);

const PlayerHeader: React.FC<PlayerHeaderProps> = ({
  setSelectedPlayerIndex,
  openPlayerModal,
}) => {
  const { colors, dark } = useTheme();
  const { players } = useSelector(({ notes }) => notes);

  return (
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
      {headerData.map((color, key) => {
        const onPress = useCallback(() => {
          Vibration.vibrate(10);
          setSelectedPlayerIndex(key);
          openPlayerModal();
        }, [key, setSelectedPlayerIndex, openPlayerModal]);

        const style = useCallback(
          ({ pressed }: PressableStateCallbackType) => ({
            minHeight: SQUARE_SIZE,
            width: SQUARE_SIZE,
            borderColor: colors.border,
            backgroundColor: color[dark ? 'dark' : 'light'],
            opacity: Platform.OS === 'ios' && pressed ? 0.5 : 1,
            borderStartWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }),
          [color],
        );

        return (
          <MemoPressable
            key={key}
            onPress={onPress}
            style={style}
            android_ripple={{ color: colors.background }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 16,
              }}>
              {players[key]}
            </Text>
          </MemoPressable>
        );
      })}
    </View>
  );
};

const MemoPlayerHeader = memo(PlayerHeader, isEqual);

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

        <MemoPlayerHeader
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
