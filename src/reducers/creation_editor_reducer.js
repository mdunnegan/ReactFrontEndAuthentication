import {
  TOGGLE_NOTE,
  TOGGLE_LOOP,
  UPDATE_BPM
} from '../actions/types';

const defaultState = {
  bpm: 100,
  loop: true,
  noteRows: [
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
    [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false]
  ]
}

export default function(state = defaultState, action) {
  switch(action.type){

    case TOGGLE_NOTE:
      if (!action.payload) return state;
      
      return {
        ...state,
        noteRows: state.noteRows.map((row, i) => {
          if (i == action.payload.row){
            return row.map((val, j) => {
              if (j == action.payload.column){
                return !val;
              }
              return val;
            });
          }
          return row;
        })
      };

    case TOGGLE_LOOP:
      return {
        ...state,
        toggled: !state.toggled
      }

    case UPDATE_BPM:
      return {
        ...state,
        bpm: action.payload.bpm
      }
      
    default:
      return state;
  }
}