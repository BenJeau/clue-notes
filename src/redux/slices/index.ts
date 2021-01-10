import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import state from './stateSlice';

export default combineReducers({
  board,
  state,
});
