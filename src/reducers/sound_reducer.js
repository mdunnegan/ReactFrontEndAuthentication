import {
  SET_PLAYING_TAB,
  SET_STOP_PLAYING_TAB_FUNCTION_HANDLE
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case SET_PLAYING_TAB:
      return {
        ...state,
        playingTab: action.payload.tab,
      }

    case SET_STOP_PLAYING_TAB_FUNCTION_HANDLE:
      return {
        ...state,
        stopPlayingTabFunctionHandle: action.payload.handle,
      }
  }
  return state;
}