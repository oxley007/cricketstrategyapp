
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_WIDECOUNT = 'ADD_WIDECOUNT';

export const updateWideCount = ( widecount ) => ({
  type: ADD_WIDECOUNT,
  widecount,
});

const initialState = {
  widecount: 0,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  console.log(action.widecount);
  switch (action.type) {
    case ADD_WIDECOUNT:
    return {
      ...state,
      widecount: action.widecount,
    };
    default:
      return state;
  }
};
