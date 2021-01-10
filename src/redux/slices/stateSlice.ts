import { createSlice } from '@reduxjs/toolkit';

interface StateType {
  autoHide: boolean;
}

const initialState: StateType = {
  autoHide: false,
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    toggleAutoHide: (state) => {
      state.autoHide = !state.autoHide;
    },
  },
});

export const { toggleAutoHide } = stateSlice.actions;
export default stateSlice.reducer;
