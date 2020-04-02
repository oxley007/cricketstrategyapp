
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';

export const updatePlayers = ( players, facingBall ) => ({
  type: UPDATE_PLAYERS,
  players,
  facingBall,
});

const initialState = {
  players: [],
  facingBall: 1,
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLAYERS:
    console.log(action.players);
      return {
        ...state,
        players: action.players,
        facingBall: action.facingBall,
      };
    default:
      return state;
  }
};
