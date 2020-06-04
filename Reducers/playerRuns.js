
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_PLAYERRUNS = 'ADD_PLAYERRUNS';

export const updatePlayerRuns = ( wickets, totalRuns ) => ({
  type: ADD_PLAYERRUNS,
  wickets,
  totalRuns,
});

const initialState = {
  wickets: 0,
  totalRuns: 0,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYERRUNS:
    console.log(action.wickets  + ' eventID');
    console.log(action.totalRuns  + ' totalRuns');
    return {
      ...state,
      wickets:  action.wickets,
      totalRuns: action.totalRuns,
    };
    default:
      return state;
  }
};
