import React, { useRef, useState } from 'react';
import { SectionList, Pressable, Text, View, Platform } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { headerData, sections } from '../config/data';
import { useSelector } from '../redux';
import { BoardRow, Header } from '../components';
import { SQUARE_SIZE, ALWAYS_OPEN } from '../config/constants';
import {
  ResetModal,
  SetPlayerNameModal,
  SettingsModal,
  SymbolsModal,
} from '../modals';
import { useTheme } from '../hooks';

const Home: React.FC = () => {
  const { colors, dark } = useTheme();
  const playerModalRef = useRef<Modalize>(null);
  const symbolsModalRef = useRef<Modalize>(null);
  const resetModalRef = useRef<Modalize>(null);
  const settingsModalRef = useRef<Modalize>(null);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number>(0);

  const { players } = useSelector(({ board }) => board);

  const openResetModal = () => resetModalRef.current?.open();
  const openSettingsModal = () => settingsModalRef.current?.open();

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
      <SettingsModal modalRef={settingsModalRef} />

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
