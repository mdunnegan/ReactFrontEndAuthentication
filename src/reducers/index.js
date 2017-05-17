import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import creationEditorReducer from './creation_editor_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  creationEditor: creationEditorReducer
});

export default rootReducer;
