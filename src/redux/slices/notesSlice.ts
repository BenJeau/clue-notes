import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkParamType } from '..';

export interface BoardEntry {
  type: 'icon' | 'text';
  data: string;
}

interface BoardRow {
  scratched?: boolean;
  [col: number]: BoardEntry;
}

interface BoardSection {
  [row: number]: BoardRow;
}

interface BoardType {
  players: {
    [key: number]: string;
  };
  board: {
    suspects: BoardSection;
    weapons: BoardSection;
    rooms: BoardSection;
  };
}

const initialState: BoardType = {
  players: {},
  board: {
    suspects: {},
    weapons: {},
    rooms: {},
  },
};

export const setBoardValue = createAsyncThunk<
  {
    section: 'suspects' | 'weapons' | 'rooms';
    row: number;
    col: number;
    selected: BoardEntry;
  },
  {
    section: 'suspects' | 'weapons' | 'rooms';
    row: number;
    col: number;
  },
  ThunkParamType
>('board/setBoardValue', async (param, { getState }) => {
  return { ...param, selected: getState().state.selected };
});

const notesSlice = createSlice({
  name: 'notes',
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
      state.board = initialState.board;
    },
    clearPlayers: (state) => {
      state.players = initialState.players;
    },
    setScratched: (
      state,
      action: PayloadAction<{
        section: 'suspects' | 'weapons' | 'rooms';
        row: number;
        scratched: boolean;
      }>,
    ) => {
      const { row, section, scratched } = action.payload;

      if (!state.board[section][row]) {
        state.board[section][row] = {};
      }

      state.board[section][row].scratched = scratched;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setBoardValue.fulfilled, (state, action) => {
      const { row, col, section, selected } = action.payload;

      if (!state.board[section][row]) {
        state.board[section][row] = {};
      }

      state.board[section][row][col] = selected;
    });
  },
});

export const {
  clearBoard,
  clearPlayers,
  setPlayer,
  setScratched,
} = notesSlice.actions;
export default notesSlice.reducer;
