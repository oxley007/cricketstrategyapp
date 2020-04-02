
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_GAMECARDS = 'UPDATE_GAMECARDS';

export const updateGameCards = ( cardOne, cardTwo, runs, wicketEvent ) => ({
  type: UPDATE_GAMECARDS,
  cardOne,
  cardTwo,
  runs,
  wicketEvent,
});

const initialState = {
  cardOne: 0,
  cardTwo: 0,
  runs: 0,
  wicketEvent: false,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GAMECARDS:
    //console.log(action.gameID);
      return {
        ...state,
        cardOne: action.cardOne,
        cardTwo: action.cardTwo,
        runs: action.runs,
        wicketEvent: action.wicketEvent,
      };
    default:
      return state;
  }
};
