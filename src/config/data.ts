export interface Section {
  title: string;
  data: string[];
}

export const sections: Section[] = [
  {
    title: 'Suspects',
    data: [
      'Miss Scarlet',
      'Col. Mustard',
      'Mrs. White',
      'Mr. Green',
      'Mrs. Peacock',
      'Prof. Plum',
    ],
  },
  {
    title: 'Weapons',
    data: ['Candlestick', 'Knife', 'Rope', 'Revolver', 'Lead Pipe', 'Wrench'],
  },
  {
    title: 'Rooms',
    data: [
      'Ball Room',
      'Billiard Room',
      'Conservatory',
      'Dinning Room',
      'Hall',
      'Kitchen',
      'Library',
      'Lounge',
      'Study',
    ],
  },
];

export const colors = {
  red: { dark: '#A5494F', light: '#ff595e' },
  yellow: { dark: '#A7A15A', light: '#ffca3a' },
  green: { dark: '#48864D', light: '#8ac926' },
  blue: { dark: '#4A57BA', light: '#1982c4' },
  purple: { dark: '#5F388B', light: '#6a4c93' },
  white: { dark: '#BCBCBC', light: '#FFFFFF' },
};

export const headerData = [
  {
    suspect: 'Miss Scarlet',
    color: colors.red,
  },
  {
    suspect: 'Col. Mustard',
    color: colors.yellow,
  },
  {
    suspect: 'Mr. Green',
    color: colors.green,
  },
  {
    suspect: 'Mrs. Peacock',
    color: colors.blue,
  },
  {
    suspect: 'Prof. Plum',
    color: colors.purple,
  },
  {
    suspect: 'Mrs. White',
    color: colors.white,
  },
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
