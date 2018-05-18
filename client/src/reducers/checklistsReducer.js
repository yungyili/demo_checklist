import {FETCH_CHECKLISTS} from '../actions/actionTypes';

export default function checklistsReducer (state = {}, action) {
  switch(action.type){
  case FETCH_CHECKLISTS:
    return action.payload;
  default:
    return state;
  }
}
