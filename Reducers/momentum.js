
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_MOMENTUM = 'UPDATE_MOMENTUM';

export const updateMomentum = ( momentum, momentumPrevOver, momentumThisOver ) => ({
  type: UPDATE_MOMENTUM,
  momentum,
  momentumPrevOver,
  momentumThisOver,
});

const initialState = {
  momentum: 0,
  momentumPrevOver: 0,
  momentumThisOver: [],
};

console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MOMENTUM:
      return {
        ...state,
        momentum: action.momentum,
        momentumPrevOver: action.momentumPrevOver,
        momentumThisOver: action.momentumThisOver,
      };
    default:
      return state;
  }
};
