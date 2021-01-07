import React, { useRef, useState } from 'react';
import { SectionList, Pressable, Text, View, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';

import { headerData, sections } from '../config/data';
import { useSelector } from '../redux';
import { BoardRow } from '../components';
import { SQUARE_SIZE, ALWAYS_OPEN } from '../config/constants';
import { ResetModal, SetPlayerNameModal, SymbolsModal } from '../modals';

interface HomeProps {
  route: {
    params: {
      resetModalRef: React.RefObject<Modalize>;
    };
  };
}

const Home: React.FC<HomeProps> = ({
  route: {
    params: { resetModalRef },
  },
}) => {
  const { colors, dark } = useTheme();
  const playerModalRef = useRef<Modalize>(null);
  const symbolsModalRef = useRef<Modalize>(null);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number>(0);

  const { players } = useSelector(({ board }) => board);

  return (
    <>
      <View
        style={{
          borderColor: colors.border,
          backgroundColor: colors.background,
          width: '100%',
          borderBottomWidth: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
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

      <SymbolsModal modalRef={symbolsModalRef} />

      <ResetModal modalRef={resetModalRef} />

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
