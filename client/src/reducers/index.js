import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import userReducer from './userReducer';
import checklistsReducer from './checklistsReducer';

export default combineReducers({
  user: userReducer,
  form: formReducer,
  checklists: checklistsReducer
});
