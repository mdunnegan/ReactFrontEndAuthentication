import {
  TOGGLE_NOTE,
  TOGGLE_LOOP,
  UPDATE_BPM,
  ADD_BAR
} from '../actions/types';

const default16thNotes = [
  [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
  [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
  [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false]
];

const defaultState = {
  bpm: 100,
  loop: true,
  measureLength: 4,
  subdivisionQuantifier: 4,
  numBars: 1,
  noteRows: default16thNotes
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

    case ADD_BAR:
      let newBar = [];
      for (let i = 0; i < action.payload.barSize; i++) {
        newBar[i] = false;
      }

      return {
        ...state,
        numBars: state.numBars+1,
        noteRows: state.noteRows.map((row, i) => {
          return [...state.noteRows[i], ...newBar];
        })
      }
      
    default:
      return state;
  }
}