import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import settings from './settingsSlice';
import state from './stateSlice';

export default combineReducers({
  board,
  settings,
  state,
});
