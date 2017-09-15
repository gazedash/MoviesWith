import { combineReducers } from "redux";
import { createReducer } from "reduxsauce";
import * as Actions from "../actions";
import data from './data.json';
// the initial state of this reducer
export const INITIAL_STATE = data;
// the eagle has landed
export const success = (state = INITIAL_STATE, action = {}) => {
  return { ...state, error: false, goodies: action };
};

// map our action types to our reducer functions
export const HANDLERS = {
  [Actions.FetchSelectedUsers.type]: success
};

const movies = createReducer(INITIAL_STATE, HANDLERS);

export default combineReducers({
  movies
});
