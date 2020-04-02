
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_FIRSTINNINGSRUNS = 'UPDATE_FIRSTINNINGSRUNS';

export const updateFirstInningsRuns = firstInningsRuns => ({
  type: UPDATE_FIRSTINNINGSRUNS,
  firstInningsRuns,
});

const initialState = {
  firstInningsRuns: 0,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIRSTINNINGSRUNS:
      return {
        ...state,
        firstInningsRuns: action.firstInningsRuns,
      };
    default:
      return state;
  }
};
