
//import { ADD_TOGGLE } from "../Constants/action-types";

import { combineReducers } from 'redux';

import {AsyncStorage} from 'react-native';

export const ADD_GAMERUNS = 'ADD_GAMERUNS';

export const updateGameRuns = ( gameRunEvents, eventID, overBowled ) => ({
  type: ADD_GAMERUNS,
  gameRunEvents,
  eventID,
  overBowled,
});

const initialState = {
  gameRunEvents: [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
  eventID: 0,
  overBowled: false,
};

console.log('hitting rootReducer');
console.log(initialState);

//const rootReducer = (state = initialState, action) => {
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_GAMERUNS:
    console.log(action.gameRunEvents  + ' gameRunEvents');
    console.log(action.eventID  + ' eventID');
    return {
      ...state,
      gameRunEvents: action.gameRunEvents,
      eventID:  action.eventID,
      overBowled: action.overBowled,
    };
    default:
      return state;
  }
};
