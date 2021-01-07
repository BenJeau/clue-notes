import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BoardEntry {
  type: 'icon' | 'text';
  data: string;
}

interface BoardType {
  players: {
    [key: number]: string;
  };
  board: {
    [key: string]: {
      [key: number]: BoardEntry;
    };
  };
  selected: BoardEntry;
}

const initialState: BoardType = {
  players: {},
  board: {},
  selected: {
    type: 'icon',
    data: 'check',
  },
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setPlayer: (
      state,
      action: PayloadAction<{ index: number; name: string }>,
    ) => {
      const { index, name } = action.payload;
      state.players[index] = name;
    },
    setBoardValue: (
      state,
      action: PayloadAction<{ row: string; col: number }>,
    ) => {
      const { row, col } = action.payload;

      if (!state.board[row]) {
        state.board[row] = {};
      }

      state.board[row][col] = state.selected;
    },
    setSelected: (state, action: PayloadAction<BoardEntry>) => {
      state.selected = action.payload;
    },
    clearBoard: (state) => {
      state.board = {};
    },
    clearPlayers: (state) => {
      state.players = {};
    },
  },
});

export const {
  clearBoard,
  clearPlayers,
  setBoardValue,
  setPlayer,
  setSelected,
} = boardSlice.actions;
export default boardSlice.reducer;
