import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BoardEntry {
  type: "icon" | "text";
  data: string;
}

interface BoardType {
  players: {
    [key: number]: string;
  };
  board: {
    [key: number]: {
      [key: number]: BoardEntry;
    };
  };
  selected: BoardEntry;
}

const initialState: BoardType = {
  players: {},
  board: {},
  selected: {
    type: "icon",
    data: "check"
  }
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setPlayer: (
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) => {
      const { index, name } = action.payload;
      state.players[index] = name;
    },
    setBoardValue: (
      state,
      action: PayloadAction<{ row: number; col: number; data: BoardEntry }>
    ) => {
      const { row, col, data } = action.payload;

      if (!state.board[row]) {
        state.board[row] = {};
      }

      state.board[row][col] = data;
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
} = boardSlice.actions;
export default boardSlice.reducer;
