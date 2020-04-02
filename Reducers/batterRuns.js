
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_BATTERRUNS = 'UPDATE_BATTERRUNS';

export const updateBatterRuns = batterRuns => ({
  type: UPDATE_BATTERRUNS,
  batterRuns,
});

const initialState = {
  batterRuns: 0,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BATTERRUNS:
      return {
        ...state,
        batterRuns: action.batterRuns,
      };
    default:
      return state;
  }
};

//export default rootReducer;



/*
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
};
*/
