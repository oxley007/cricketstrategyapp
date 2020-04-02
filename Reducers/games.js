
import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_GAMES = 'ADD_GAMES';

export const updateGames = ( games ) => ({
  type: ADD_GAMES,
  games,
});

const initialState = {
  games: [],
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_GAMES:
    console.log(action.games  + ' games');
    return {
      ...state,
      games: action.games,
    };
    default:
      return state;
  }
};
