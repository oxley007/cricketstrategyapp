
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_GAMENUM = 'UPDATE_GAMENUM';

export const updateGameNum = gameNum => ({
  type: UPDATE_GAMENUM,
  gameNum,
});

const initialState = {
  gameNum: 0,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GAMENUM:
      return {
        ...state,
        gameNum: action.gameNum,
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
