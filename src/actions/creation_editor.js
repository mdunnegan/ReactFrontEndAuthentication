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

export function updateBPM(bpm) {
  return {
    type: UPDATE_BPM,
    payload: { bpm }
  };
}