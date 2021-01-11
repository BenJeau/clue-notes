import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardEntry } from './notesSlice';

interface StateType {
  selected: BoardEntry;
}

const initialState: StateType = {
  selected: {
    type: 'icon',
    data: 'check',
  },
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<BoardEntry>) => {
      state.selected = action.payload;
    },
  },
});

export const { setSelected } = stateSlice.actions;
export default stateSlice.reducer;
