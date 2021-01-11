import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SectionsType {
  suspects: string[];
  weapons: string[];
  rooms: string[];
}

interface SettingsType {
  autoHide: boolean;
  sections: SectionsType;
}

const initialState: SettingsType = {
  autoHide: false,
  sections: {
    suspects: [
      'Miss Scarlet',
      'Col. Mustard',
      'Mrs. White',
      'Mr. Green',
      'Mrs. Peacock',
      'Prof. Plum',
    ],
    weapons: [
      'Candlestick',
      'Knife',
      'Rope',
      'Revolver',
      'Lead Pipe',
      'Wrench',
    ],
    rooms: [
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
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleAutoHide: (state) => {
      state.autoHide = !state.autoHide;
    },
    addSectionItem: (
      state,
      action: PayloadAction<{
        section: 'suspects' | 'weapons' | 'rooms';
        item: string;
      }>,
    ) => {
      const { section, item } = action.payload;

      state.sections[section].push(item);
    },
    removeSectionItem: (
      state,
      action: PayloadAction<{
        section: 'suspects' | 'weapons' | 'rooms';
        index: number;
      }>,
    ) => {
      const { section, index } = action.payload;

      state.sections[section].splice(index, 1);
    },
    editSectionItem: (
      state,
      action: PayloadAction<{
        section: 'suspects' | 'weapons' | 'rooms';
        index: number;
        item: string;
      }>,
    ) => {
      const { section, index, item } = action.payload;

      state.sections[section].splice(index, 1, item);
    },
    resetSections: (state) => {
      state.sections = initialState.sections;
    },
    setSections: (state, action: PayloadAction<SectionsType>) => {
      state.sections = action.payload;
    },
  },
});

export const {
  toggleAutoHide,
  addSectionItem,
  editSectionItem,
  removeSectionItem,
  resetSections,
  setSections,
} = settingsSlice.actions;
export default settingsSlice.reducer;
