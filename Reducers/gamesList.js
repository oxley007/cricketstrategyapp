
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_GAMESLIST = 'ADD_GAMESLIST';

export const updateGamesList = ( gamesList ) => ({
  type: ADD_GAMESLIST,
  gamesList,
});

const initialState = {
  gamesList: [],
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_GAMESLIST:
    console.log(action.gamesList  + ' gamesList');
    return {
      ...state,
      gamesList: action.gamesList,
    };
    default:
      return state;
  }
};
