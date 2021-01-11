import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import settings from './settingsSlice';

export default combineReducers({
  board,
  settings,
});
