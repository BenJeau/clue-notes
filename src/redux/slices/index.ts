import { combineReducers } from '@reduxjs/toolkit';
import notes from './notesSlice';
import settings from './settingsSlice';
import state from './stateSlice';

export default combineReducers({
  notes,
  settings,
  state,
});
