
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_PLAYERSTATS = 'UPDATE_PLAYERSTATS';

export const updatePlayerStats = ( winningStreak, longestStreak, highestPlayerScore, highestPlayerScoreId, highestTeamScore ) => ({
  type: UPDATE_PLAYERSTATS,
  winningStreak,
  longestStreak,
  highestPlayerScore,
  highestPlayerScoreId,
  highestTeamScore,
});

const initialState = {
  winningStreak: 0,
  longestStreak: 0,
  highestPlayerScore: 0,
  highestPlayerScoreId: 0,
  highestTeamScore: 0,
};

console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLAYERSTATS:
      return {
        ...state,
        winningStreak: action.winningStreak,
        longestStreak: action.longestStreak,
        highestPlayerScore: action.highestPlayerScore,
        highestPlayerScoreId: action.highestPlayerScoreId,
        highestTeamScore: action.highestTeamScore,
      };
    default:
      return state;
  }
};
