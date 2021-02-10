import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { Modal, Symbol } from '~/components';
import {
  ALWAYS_OPEN,
  ALWAYS_OPEN_BOTTOM_PADDING,
  ALWAYS_OPEN_PADDING,
  ALWAYS_OPEN_TOP_PADDING,
  SQUARE_SIZE,
} from '~/config/constants';
import { icons, sheet } from '~/config/data';
import { useTheme } from '~/hooks';

const { width } = Dimensions.get('screen');
const NUM_PER_ROW = Math.floor(width / (SQUARE_SIZE + 6 + 2));
const PADDING = (width - NUM_PER_ROW * (SQUARE_SIZE + 6 + 2)) / 2;
const NUM_ICONS_FIRST_ROW = Math.min(NUM_PER_ROW - 1, icons.length);

const Symbols = () => {
  const { colors } = useTheme();

  return (
    <Modal
      showDismiss={false}
      props={{
        alwaysOpen: ALWAYS_OPEN,
        childrenStyle: {
          padding: PADDING,
          paddingTop: ALWAYS_OPEN_TOP_PADDING - 3,
          paddingBottom: ALWAYS_OPEN_PADDING,
          alignItems: 'center',
          width: '100%',
        },
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <View style={styles.section}>
          <Symbol data={{ type: 'text', data: ' ' }} />
          {Array.from({ length: NUM_ICONS_FIRST_ROW }, (_, key) => (
            <Symbol key={key} data={{ type: 'icon', data: icons[key] }} />
          ))}
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: colors.border,
              marginVertical: ALWAYS_OPEN_BOTTOM_PADDING + 1,
            }}
          />
          {Array.from(
            { length: Math.max(icons.length - NUM_ICONS_FIRST_ROW, 0) },
            (_, key) => (
              <Symbol
                key={key}
                data={{ type: 'icon', data: icons[key + NUM_ICONS_FIRST_ROW] }}
              />
            ),
          )}
        </View>
      </View>
      {sheet.map((i, key) => (
        <View key={key}>
          <Text style={[styles.header, { color: colors.text }]}>{i.title}</Text>
          <View style={styles.section}>
            {i.data.map((j) => (
              <Symbol key={j} data={{ type: 'text', data: j }} />
            ))}
          </View>
        </View>
      ))}
    </Modal>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    flexWrap: 'wrap',
  },
  header: {
    fontSize: 18,
    paddingVertical: 5,
    paddingLeft: 3,
  },
});

export default Symbols;
