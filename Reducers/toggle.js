
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_TOGGLE = 'ADD_TOGGLE';

export const updateToggle = ( togglePremium, toggleHomeLoad ) => ({
  type: ADD_TOGGLE,
  togglePremium,
  toggleHomeLoad,
});

const initialState = {
  togglePremium: true,
  toggleHomeLoad: true,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  console.log(action.togglePremium);
  console.log(action.toggleHomeLoad);
  switch (action.type) {
    case ADD_TOGGLE:
    return {
      ...state,
      togglePremium: action.togglePremium,
      toggleHomeLoad: action.toggleHomeLoad,
    };
    default:
      return state;
  }
};
