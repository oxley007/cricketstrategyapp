import { combineReducers } from 'redux';

import user from './user';
import toggle from './toggle';
import toggleVibrate from './toggleVibrate';
import ball from './over';
import wicket from './wicket';
import stopwatch from './stopwatch';
import reset from './reset';
import partnership from './partnership';
import partnerships from './partnerships';
import wicketBall from './wicketball';
import settings from './settings';
import runs from './runs';
import stoptimer from './stoptimer';
import widecount from './wideCount';
import batterRuns from './batterRuns';
import gameID from './gameId';
import gameRuns from './gameRuns';
import players from './players';
import teamPlayers from './teamPlayers';
import games from './games';
import gamesList from './gamesList';
import firstInningsRuns from './firstInningsRuns';
import playerStats from './playerStats';
import gameCards from './gameCards';
import momentum from './momentum';
import autoNotOut from './autoNotOut';
import playerRuns from './playerRuns';


export default combineReducers({
  user,
  toggle,
  toggleVibrate,
  ball,
  wicket,
  stopwatch,
  reset,
  partnership,
  partnerships,
  wicketBall,
  settings,
  runs,
  stoptimer,
  widecount,
  batterRuns,
  gameID,
  gameRuns,
  players,
  teamPlayers,
  games,
  gamesList,
  firstInningsRuns,
  playerStats,
  gameCards,
  momentum,
  autoNotOut,
  playerRuns,
});
