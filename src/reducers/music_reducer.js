import {
  POPULATE_MUSIC
} from '../actions/types';

export default function(state = [], action) {
  switch(action.type){
    case POPULATE_MUSIC:
      return action.payload.map(payloadObject => {
        return {
          noteRows: payloadObject.noteRows,
          bpm: 90
        }
      });
  }
  return state;
}