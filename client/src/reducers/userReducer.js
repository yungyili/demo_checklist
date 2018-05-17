import {LOGIN_OUT} from '../actions/actionTypes';

export default function userReducer(state = {}, action){
  console.log("userReducer: ", action);
  switch(action.type){
  case LOGIN_OUT:
    return action.payload;
  default:
    return state;
  }
}
