import axios from 'axios';
import { POPULATE_MUSIC } from './types';
import { ROOT_URL } from './index';

export function fetchTabs(email) {
  return function(dispatch) {
    axios.get(ROOT_URL + '/music', { email })
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