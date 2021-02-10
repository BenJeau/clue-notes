import { themeColors } from './style';

export const playerColorKeys: (keyof typeof themeColors.light)[] = [
  'red',
  'yellow',
  'green',
  'blue',
  'purple',
  'white',
];

export const icons = [
  'check',
  'close',
  'exclamation',
  'comment-search-outline',
  'eye-outline',
  'eye-off-outline',
  'flash-outline',
  'alien-outline',
  'arm-flex-outline',
];

export const sheet = [
  {
    title: 'Numbers',
    data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  },
  {
    title: 'Letters',
    data: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ],
  },
];
