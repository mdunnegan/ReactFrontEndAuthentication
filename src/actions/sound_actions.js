import {
  SET_PLAYING_TAB,
  SET_STOP_PLAYING_TAB_FUNCTION_HANDLE
} from './types';

export function setPlayingTab(tab) {
  return {
    type: SET_PLAYING_TAB,
    payload: { tab }
  }
}

export function setStopPlayingTabFunctionHandle(handle) {
  return {
    type: SET_STOP_PLAYING_TAB_FUNCTION_HANDLE,
    payload: { handle }
  }
}