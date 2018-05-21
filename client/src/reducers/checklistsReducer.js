import _ from 'lodash';
import {
  FETCH_CHECKLISTS,
  FETCH_CHECKLIST,
  SUBMIT_CHECKLIST,
  DELETE_CHECKLIST } from '../actions/actionTypes';


export default function checklistsReducer(state={}, action) {
  console.log("userReducer: ", action);
  switch(action.type){
  case FETCH_CHECKLISTS:
    return action.payload;
  case SUBMIT_CHECKLIST:
  case FETCH_CHECKLIST:
    if (action.payload.error){
      return state;
    } else {
      var newState = {...state};
      _.forOwn(action.payload.content, function(value, key) {
        newState[key] = value;
      });
      return newState;
    }
  case DELETE_CHECKLIST:
    if(action.payload.error || !action.payload.content){
      return state;
    } else {
      var newState = {...state};
      const id = action.payload.content;
      delete newState[id];
      return newState;
    }
  default:
    return state;
  }
}
