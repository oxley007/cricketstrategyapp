
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_GAMEID = 'UPDATE_GAMEID';

export const updateGameId = ( gameID, keyID ) => ({
  type: UPDATE_GAMEID,
  gameID,
  keyID,
});

const initialState = {
  gameID: '0',
  keyID: '0',
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GAMEID:
    console.log(action.gameID);
      return {
        ...state,
        gameID: action.gameID,
        keyID: action.keyID,
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
