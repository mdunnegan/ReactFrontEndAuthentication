import {
  SET_PLAYING_TAB,
  SET_STOP_PLAYING_TAB_FUNCTION
} from './types';

export function setPlayingTab(tab) {
  return {
    type: SET_PLAYING_TAB,
    payload: { tab }
  }
}