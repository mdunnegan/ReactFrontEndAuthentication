import axios from 'axios';
import { POPULATE_MUSIC } from './types';
import { ROOT_URL } from './index';

export function fetchTabs(email) {

  return function(dispatch) {
    axios.get(ROOT_URL + '/music', { params: { email: email } })
      .then(response => {
        dispatch({ 
          type: POPULATE_MUSIC, 
          payload: response.data.tabs
        });
      }, () => {
        alert("Error fetching your music");
      });
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
