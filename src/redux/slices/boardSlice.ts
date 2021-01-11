import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkParamType } from '..';

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
}

const initialState: BoardType = {
  players: {},
  board: {},
};

export const setBoardValue = createAsyncThunk<
  {
    row: string;
    col: number;
    selected: BoardEntry;
  },
  {
    row: string;
    col: number;
  },
  ThunkParamType
>('board/setBoardValue', async (param, { getState }) => {
  return { ...param, selected: getState().state.selected };
});

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
    clearBoard: (state) => {
      state.board = {};
    },
    clearPlayers: (state) => {
      state.players = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setBoardValue.fulfilled, (state, action) => {
      const { row, col, selected } = action.payload;

      if (!state.board[row]) {
        state.board[row] = {};
      }

      state.board[row][col] = selected;
    });
  },
});

export const { clearBoard, clearPlayers, setPlayer } = boardSlice.actions;
export default boardSlice.reducer;
