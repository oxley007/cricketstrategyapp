
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const UPDATE_TEAMPLAYERS = 'UPDATE_TEAMPLAYERS';

export const updateTeamPlayers = ( teamPlayers ) => ({
  type: UPDATE_TEAMPLAYERS,
  teamPlayers,
});

const initialState = {
  teamPlayers: [],
};


//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEAMPLAYERS:
    console.log(action.teamPlayers);
      return {
        ...state,
        teamPlayers: action.teamPlayers,
      };
    default:
      return state;
  }
};
