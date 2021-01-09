interface Colors {
  text: string;
  background: string;
  card: string;
  border: string;
}

interface ThemeColors {
  light: Colors;
  dark: Colors;
}

export const themeColors: ThemeColors = {
  light: {
    background: '#F2F2F2',
    card: '#FFFFFF',
    text: '#1C1C1E',
    border: '#D8D8D8',
  },
  dark: {
    background: '#010101',
    card: '#121212',
    text: '#E5E5E7',
    border: '#272729',
  },
};
