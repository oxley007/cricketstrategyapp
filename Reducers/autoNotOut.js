
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_AUTONOTOUT = 'UPDATE_AUTONOTOUT';

export const updateAutoNotOut = autoNotOut => ({
  type: UPDATE_AUTONOTOUT,
  autoNotOut,
});

const initialState = {
  autoNotOut: 0,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTONOTOUT:
      return {
        ...state,
        autoNotOut: action.autoNotOut,
      };
    default:
      return state;
  }
};
