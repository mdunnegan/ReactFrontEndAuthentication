import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import creationEditorReducer from './creation_editor_reducer';
import soundReducer from './sound_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  creationEditor: creationEditorReducer,
  playingTab: soundReducer
});

export default rootReducer;
