import { browserHistory } from 'react-router';
import axios from 'axios';
import { ROOT_URL } from './index';
import {
  TOGGLE_NOTE,
  ADD_BAR,
  UPDATE_BPM
} from './types';

export function toggleNote(row, column) {
  return {
    type: TOGGLE_NOTE,
    payload: {row, column}
  };
}

export function toggleLoop() {
  return {
    type: TOGGLE_LOOP
  };
}

export function updateBpm(bpm) {
  return {
    type: UPDATE_BPM,
    payload: { bpm }
  };
}

export function addBar(barSize) {
  return {
    type: ADD_BAR,
    payload: { barSize }
  }
}

export function save(tab, email) {
  const { noteRows, bpm } = tab;
  return function(dispatch) {
    axios.post(ROOT_URL + '/create', { noteRows, bpm, email })
      .then(response => {
        browserHistory.push('/music');
      }, function() {
        alert("Something went wrong");
      });
  }
}
