import {
  SET_PLAYING_TAB,
  SET_STOP_PLAYING_TAB_FUNCTION
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case SET_PLAYING_TAB:
      state.playingTab = action.payload.tab;
    case SET_STOP_PLAYING_TAB_FUNCTION:
      state.stopPlayingTabFunction = action.payload.func;
  }
  return state;
}