import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions, ImageBackground, Easing, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";

import BoardDisplayStrikeRateTop from './BoardDisplayStrikeRateTop';

import LinearGradient from 'react-native-linear-gradient';
import {Animated} from "react-native";
import {useSpring, animated} from 'react-spring'

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateOver } from '../../Reducers/over';
import { updateGameCards } from '../../Reducers/gameCards';
import { updatePlayers } from '../../Reducers/players';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';
import { updateMomentum } from '../../Reducers/momentum';
import { updatePlayerRuns } from '../../Reducers/playerRuns';
import { updateToggle } from '../../Reducers/toggle';

import CardBoard from '../../Util/CardBoard.js';
import BallDiff from '../../Util/BallDiff.js';

class BoardDisplayTopAttack extends Component {
  constructor (props) {
  super(props)
  //this.springValue = new Animated.Value(0.3)
  this.animatedValue = new Animated.Value(0)
  this.animatedValueAll = new Animated.Value(0)
  this.animatedValueRuns = new Animated.Value(0)
  this.state = {
      stop: 0,
      ballCount: 0,
      momentumThisOver: [],
      loadingBoard: true,
  };
  }

  state = {
    gameRunEvents: this.props.gameRuns.gameRunEvents || [],
    eventID: this.props.gameRuns.eventID || 0,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    cardOne: this.props.gameCards.cardOne || 100,
    cardTwo: this.props.gameCards.cardTwo || 100,
    cardOne: this.props.gameCards.cardOne || 100,
    cardTwo: this.props.gameCards.cardTwo || 100,
    runs: this.props.gameCards.runs || 100,
    wicketEvent: this.props.gameCards.wicketEvent || false,
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
    springValue: new Animated.Value(0.3),
    momentum: this.props.momentum.momentum || 0,
    momentum: this.props.momentum.momentumPrevOver || 0,
    momentumThisOver: this.props.momentum.momentumThisOver || [],
    playerRuns: this.props.playerRuns.wickets || 0,
    playerRuns: this.props.playerRuns.totalRuns || 0,
    togglePremium: this.props.toggle.togglePremium || true,
    toggleHomeLoad: this.props.toggle.toggleHomeLoad || true,
    //yAnimation: new Animated.Value(21),
  };

  handleChange = ( gameRuns, ball, gameCards, players, firstInningsRuns, momentum, playerRuns, toggle ) => {
    this.setState({ gameRuns });
    this.setState({ ball });
    this.setState({ gameCards });
    this.setState({ players });
    this.setState({ firstInningsRuns });
    this.setState({ momentum });
    this.setState({ playerRuns });
    this.setState({ toggle });
  };

/*
componentDidMount() {
   this.playAnimation();
 }
 */

componentDidUpdate () {
  this.animateRuns()
}


 componentDidMount () {
  this.animate()
  this.animateAll()
  this.animateRuns()
  this.hideSpinner()
}

animate () {
  this.animatedValue.setValue(0)
  Animated.timing(
    this.animatedValue,
    {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear
    }
  ).start(() => this.animate())
}

animateAll () {
  this.animatedValueAll.setValue(0)
  Animated.timing(
    this.animatedValueAll,
    {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear
    }
  ).start(() => this.animateAll())
}


animateRuns () {
  this.animatedValueRuns.setValue(0)
  Animated.timing(
    this.animatedValueRuns,
    {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    }).start(() => this.animateRunsStop())
    //Animated.timing(this.animation).stop()
}

animateRunsStop () {
  this.animatedValueRuns.setValue(1)
  Animated.timing(
  this.animatedValueRuns
).stop();
}


/*
animateRuns () {
  //this.animatedValueRuns.setValue(0)
  Animated.timing(
    this.animatedValueRuns,
    {
      toValue: 1,
    }
  ).start()
}
*/


getDisplayRunsTotal() {

  let gameRunEvents = this.props.gameRuns.gameRunEvents;

  let sum = a => a.reduce((acc, item) => acc + item);
  //let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));

  const totalRuns = this.props.playerRuns.totalRuns;
  console.log(totalRuns);

  //Get total wickets
  //let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
  //let totalWickets = getWicketCount[0];

  const totalWickets = this.props.playerRuns.wickets;
  console.log(totalWickets);

  //----------calculate overs
  let over = this.props.ball.over;
  let ball = 0;

  /*
  let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
  let ballTotal = legitBall[0];

  ball = sum(ballTotal.map(acc => Number(acc)));
  */

  ball = gameRunEvents.length;
  ball--

  let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
  let totalOver = totalBallDiff[0];

  let totalBall = totalBallDiff[1];
  //---------- end of calularte overs

  return [totalRuns, totalWickets, totalOver, totalBall]
}

displayRequiredRunRate() {
  let gameRunEvents = this.props.gameRuns.gameRunEvents;
  let sum = a => a.reduce((acc, item) => acc + item);

//----------calculate overs
let ball = 0;

/*
let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
let ballTotal = legitBall[0];
console.log(ballTotal);

ball = sum(ballTotal.map(acc => Number(acc)));
console.log(ball);
*/

ball = gameRunEvents.length;
ball--
console.log(ball + ' balls to replave Legitball.');

const ballsRemaining = 120 - ball;


//Calculate the total runs to go
//let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));

const totalRuns = this.props.playerRuns.totalRuns;
console.log(totalRuns);

let runsRequired = this.props.firstInningsRuns.firstInningsRuns - totalRuns;
console.log(runsRequired);

const requiredRunRate = (runsRequired / ballsRemaining) * 6;
console.log(requiredRunRate);

/*workout required run rate:
console.log(numberOverValue);
let runRate = totalRuns / numberOverValue;
console.log(runRate);
*/


  const requiredRunRateOneDecimal = parseFloat(requiredRunRate).toFixed(1);
  return [requiredRunRateOneDecimal];

}

  getScorecard = () => {

    const gameRunEvents = this.props.gameRuns.gameRunEvents;
    const players = this.props.players.players;
    //const facingBall = this.props.players.facingBall;

    let facingBall = 1;

    if (this.props.overPageFlag === true) {
    facingBall = this.props.overPageFacingBall;
    }
    else {
      facingBall = this.props.players.facingBall;
    }

    console.log(facingBall);

    let battingStrikeRate = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);

    const aceAce = battingStrikeRate[0];
    const twoTwo = battingStrikeRate[1];

    const runRateValue = this.displayRequiredRunRate();
    const runRate = runRateValue[0];
    console.log(runRate);

    const display = this.getDisplayRunsTotal();
    const wickets = display[1];
    console.log(wickets);

    /*
    const getmomentumScore = CardBoard.getmomentumScore(runRate, wickets);
    console.log(getmomentumScore[0]);
    const momentumScore = getmomentumScore[0];
    console.log(momentumScore);

    const getmomentumScorePercentage = CardBoard.getmomentumScorePercentage(momentumScore);
    const threeThree = getmomentumScorePercentage[0];
    const fourFour = getmomentumScorePercentage[1];
    const fiveFive = getmomentumScorePercentage[2];
    */

    const momentumScore = this.props.momentum.momentum;

    const getMomentumScore = CardBoard.getMomentumScore(momentumScore);
    const threeThree = getMomentumScore[0];
    const fourFour = getMomentumScore[1];
    const fiveFive = getMomentumScore[2];

    console.log(threeThree);
    console.log(fourFour);
    console.log(fiveFive);

    const getFormScore = CardBoard.getFormScore(players, facingBall, gameRunEvents);
    console.log(getFormScore);
    const formScoreOne = getFormScore[0];
    const formScoreTwo = getFormScore[1];

    if (facingBall === 1) {
      formScore = formScoreOne;
    }
    else {
      formScore = formScoreTwo;
    }
    console.log(formScore);

    const getFormScoreRuns = CardBoard.getFormScoreRuns(formScore, players, facingBall);
    const sixSix = getFormScoreRuns[0];
    const sevenSeven = getFormScoreRuns[1];
    const batterId = getFormScoreRuns[2];

    console.log(sixSix);
    console.log(sevenSeven);

    console.log(batterId);
    console.log(this.props.aggBoardValue);

    let boardRuns = [];

    if ((this.props.aggBoardValue === 1 && batterId <= 5) || (this.props.aggBoardValue === 4 && batterId <= 5)) {

    boardRuns = [
    {
        id: 1, col: 0, run: " ", header: 1
    },
    {
      id: 2, col: 0, run: "A", header: 1
    },
    {
      id: 3, col: 0, run: "2", header: 1
    },
    {
      id: 4, col: 0, run: "3", header: 1
    },
    {
      id: 5, col: 0, run: "4", header: 1
    },
    {
      id: 6, col: 0, run: "5", header: 1
    },
    {
      id: 7, col: 0, run: "6", header: 1
    },
    {
      id: 8, col: 0, run: "7", header: 1
    },
    {
      id: 9, col: 1, run: "A", header: 1
    },
    {
      id: 10, col: 1, run: aceAce, header: 0
    },
    {
      id: 11, col: 1, run: "3", header: 0
    },
    {
      id: 12, col: 1, run: "4", header: 0
    },
    {
      id: 13, col: 1, run: "W", header: 0
    },
    {
      id: 14, col: 1, run: "2", header: 0
    },
    {
      id: 15, col: 1, run: "1", header: 0
    },
    {
      id: 16, col: 1, run: "6", header: 0
    },
    {
      id: 17, col: 2, run: "2", header: 1
    },
    {
      id: 18, col: 2, run: "1", header: 0
    },
    {
      id: 19, col: 2, run: twoTwo, header: 0
    },
    {
      id: 20, col: 2, run: "2", header: 0
    },
    {
      id: 21, col: 2, run: "0", header: 0
    },
    {
      id: 22, col: 2, run: "1", header: 0
    },
    {
      id: 23, col: 2, run: "4", header: 0
    },
    {
      id: 24, col: 2, run: "0", header: 0
    },
    {
      id: 25, col: 3, run: "3", header: 1
    },
    {
      id: 26, col: 3, run: "4", header: 0
    },
    {
      id: 27, col: 3, run: "W", header: 0
    },
    {
      id: 28, col: 3, run: threeThree, header: 0
    },
    {
      id: 29, col: 3, run: "1", header: 0
    },
    {
      id: 30, col: 3, run: "0", header: 0
    },
    {
      id: 31, col: 3, run: "2", header: 0
    },
    {
      id: 32, col: 3, run: "0", header: 0
    },
    {
      id: 33, col: 4, run: "4", header: 1
    },
    {
      id: 34, col: 4, run: "1", header: 0
    },
    {
      id: 35, col: 4, run: "0", header: 0
    },
    {
      id: 36, col: 4, run: "4", header: 0
    },
    {
      id: 37, col: 4, run: fourFour, header: 0
    },
    {
      id: 38, col: 4, run: "6", header: 0
    },
    {
      id: 39, col: 4, run: "1", header: 0
    },
    {
      id: 40, col: 4, run: "4", header: 0
    },
    {
      id: 41, col: 5, run: "5", header: 1
    },
    {
      id: 42, col: 5, run: "0", header: 0
    },
    {
      id: 43, col: 5, run: "2", header: 0
    },
    {
      id: 44, col: 5, run: "0", header: 0
    },
    {
      id: 45, col: 5, run: "4", header: 0
    },
    {
      id: 46, col: 5, run: fiveFive, header: 0
    },
    {
      id: 47, col: 5, run: "1", header: 0
    },
    {
      id: 48, col: 5, run: "W", header: 0
    },
    {
      id: 49, col: 6, run: "6", header: 1
    },
    {
      id: 50, col: 6, run: "0", header: 0
    },
    {
      id: 51, col: 6, run: "2", header: 0
    },
    {
      id: 52, col: 6, run: "1", header: 0
    },
    {
      id: 53, col: 6, run: "0", header: 0
    },
    {
      id: 54, col: 6, run: "1", header: 0
    },
    {
      id: 55, col: 6, run: sixSix, header: 0
    },
    {
      id: 56, col: 6, run: "1", header: 0
    },
    {
      id: 57, col: 7, run: "7", header: 1
    },
    {
      id: 58, col: 7, run: "1", header: 0
    },
    {
      id: 59, col: 7, run: "0", header: 0
    },
    {
      id: 60, col: 7, run: "4", header: 0
    },
    {
      id: 61, col: 7, run: "0", header: 0
    },
    {
      id: 62, col: 7, run: "6", header: 0
    },
    {
      id: 63, col: 7, run: "W", header: 0
    },
    {
      id: 64, col: 7, run: sevenSeven, header: 0
    },
]
}
else if ((this.props.aggBoardValue === 2 && batterId <= 5) || (this.props.aggBoardValue === 5 && batterId <= 5)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "3", header: 0
},
{
  id: 12, col: 1, run: "1", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "6", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "1", header: 0
},
{
  id: 23, col: 2, run: "4", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "4", header: 0
},
{
  id: 27, col: 3, run: "0", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "1", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "2", header: 0
},
{
  id: 39, col: 4, run: "1", header: 0
},
{
  id: 40, col: 4, run: "4", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "0", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "0", header: 0
},
{
  id: 45, col: 5, run: "4", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "W", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "2", header: 0
},
{
  id: 52, col: 6, run: "1", header: 0
},
{
  id: 53, col: 6, run: "0", header: 0
},
{
  id: 54, col: 6, run: "1", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "2", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "6", header: 0
},
{
  id: 63, col: 7, run: "W", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 3 && batterId <= 5) || (this.props.aggBoardValue === 6 && batterId <= 5)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "1", header: 0
},
{
  id: 12, col: 1, run: "0", header: 0
},
{
  id: 13, col: 1, run: "0", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "6", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "1", header: 0
},
{
  id: 23, col: 2, run: "4", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "4", header: 0
},
{
  id: 27, col: 3, run: "W", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "1", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "0", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "0", header: 0
},
{
  id: 39, col: 4, run: "1", header: 0
},
{
  id: 40, col: 4, run: "4", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "0", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "0", header: 0
},
{
  id: 45, col: 5, run: "4", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "0", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "1", header: 0
},
{
  id: 52, col: 6, run: "0", header: 0
},
{
  id: 53, col: 6, run: "0", header: 0
},
{
  id: 54, col: 6, run: "1", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "0", header: 0
},
{
  id: 63, col: 7, run: "0", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 1 && batterId <= 8) || (this.props.aggBoardValue === 4 && batterId <= 8)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "3", header: 0
},
{
  id: 12, col: 1, run: "4", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "6", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "1", header: 0
},
{
  id: 23, col: 2, run: "4", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "4", header: 0
},
{
  id: 27, col: 3, run: "W", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "W", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "6", header: 0
},
{
  id: 39, col: 4, run: "1", header: 0
},
{
  id: 40, col: 4, run: "4", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "4", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "6", header: 0
},
{
  id: 45, col: 5, run: "4", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "W", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "0", header: 0
},
{
  id: 52, col: 6, run: "1", header: 0
},
{
  id: 53, col: 6, run: "W", header: 0
},
{
  id: 54, col: 6, run: "4", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "6", header: 0
},
{
  id: 63, col: 7, run: "W", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 2 && batterId <= 8) || (this.props.aggBoardValue === 5 && batterId <= 8)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "1", header: 0
},
{
  id: 12, col: 1, run: "4", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "6", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "1", header: 0
},
{
  id: 23, col: 2, run: "0", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "0", header: 0
},
{
  id: 27, col: 3, run: "W", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "1", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "1", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "6", header: 0
},
{
  id: 39, col: 4, run: "1", header: 0
},
{
  id: 40, col: 4, run: "4", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "4", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "1", header: 0
},
{
  id: 45, col: 5, run: "1", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "W", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "1", header: 0
},
{
  id: 52, col: 6, run: "1", header: 0
},
{
  id: 53, col: 6, run: "0", header: 0
},
{
  id: 54, col: 6, run: "4", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "6", header: 0
},
{
  id: 63, col: 7, run: "0", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 3 && batterId <= 8) || (this.props.aggBoardValue === 6 && batterId <= 8)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "1", header: 0
},
{
  id: 12, col: 1, run: "4", header: 0
},
{
  id: 13, col: 1, run: "0", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "0", header: 0
},
{
  id: 16, col: 1, run: "1", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "1", header: 0
},
{
  id: 23, col: 2, run: "4", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "4", header: 0
},
{
  id: 27, col: 3, run: "0", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "0", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "W", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "6", header: 0
},
{
  id: 39, col: 4, run: "0", header: 0
},
{
  id: 40, col: 4, run: "1", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "4", header: 0
},
{
  id: 43, col: 5, run: "0", header: 0
},
{
  id: 44, col: 5, run: "1", header: 0
},
{
  id: 45, col: 5, run: "1", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "0", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "1", header: 0
},
{
  id: 52, col: 6, run: "0", header: 0
},
{
  id: 53, col: 6, run: "0", header: 0
},
{
  id: 54, col: 6, run: "2", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "1", header: 0
},
{
  id: 63, col: 7, run: "0", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 1 && batterId > 8) || (this.props.aggBoardValue === 4 && batterId > 8)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "3", header: 0
},
{
  id: 12, col: 1, run: "0", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "6", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "W", header: 0
},
{
  id: 23, col: 2, run: "4", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "4", header: 0
},
{
  id: 27, col: 3, run: "W", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "W", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "0", header: 0
},
{
  id: 39, col: 4, run: "1", header: 0
},
{
  id: 40, col: 4, run: "4", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "0", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "6", header: 0
},
{
  id: 45, col: 5, run: "4", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "W", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "4", header: 0
},
{
  id: 52, col: 6, run: "1", header: 0
},
{
  id: 53, col: 6, run: "W", header: 0
},
{
  id: 54, col: 6, run: "0", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "6", header: 0
},
{
  id: 63, col: 7, run: "W", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 2 && batterId > 8) || (this.props.aggBoardValue === 5 && batterId > 8)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "2", header: 0
},
{
  id: 12, col: 1, run: "0", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "6", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "W", header: 0
},
{
  id: 23, col: 2, run: "2", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "4", header: 0
},
{
  id: 27, col: 3, run: "0", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "1", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "0", header: 0
},
{
  id: 39, col: 4, run: "1", header: 0
},
{
  id: 40, col: 4, run: "4", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "0", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "6", header: 0
},
{
  id: 45, col: 5, run: "1", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "W", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "4", header: 0
},
{
  id: 52, col: 6, run: "1", header: 0
},
{
  id: 53, col: 6, run: "1", header: 0
},
{
  id: 54, col: 6, run: "0", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "1", header: 0
},
{
  id: 63, col: 7, run: "0", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 3 && batterId > 8) || (this.props.aggBoardValue === 6 && batterId > 8)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "1", header: 0
},
{
  id: 12, col: 1, run: "1", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "1", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "1", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "0", header: 0
},
{
  id: 23, col: 2, run: "4", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "0", header: 0
},
{
  id: 27, col: 3, run: "0", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "1", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "1", header: 0
},
{
  id: 39, col: 4, run: "0", header: 0
},
{
  id: 40, col: 4, run: "1", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "1", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "0", header: 0
},
{
  id: 45, col: 5, run: "1", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "0", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "0", header: 0
},
{
  id: 52, col: 6, run: "1", header: 0
},
{
  id: 53, col: 6, run: "0", header: 0
},
{
  id: 54, col: 6, run: "2", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "1", header: 0
},
{
  id: 63, col: 7, run: "0", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else {
  boardRuns = [
  {
      id: 1, col: 0, run: " ", header: 1
  },
  {
    id: 2, col: 0, run: "A", header: 1
  },
  {
    id: 3, col: 0, run: "2", header: 1
  },
  {
    id: 4, col: 0, run: "3", header: 1
  },
  {
    id: 5, col: 0, run: "4", header: 1
  },
  {
    id: 6, col: 0, run: "5", header: 1
  },
  {
    id: 7, col: 0, run: "6", header: 1
  },
  {
    id: 8, col: 0, run: "7", header: 1
  },
  {
    id: 9, col: 1, run: "A", header: 1
  },
  {
    id: 10, col: 1, run: aceAce, header: 0
  },
  {
    id: 11, col: 1, run: "3", header: 0
  },
  {
    id: 12, col: 1, run: "4", header: 0
  },
  {
    id: 13, col: 1, run: "W", header: 0
  },
  {
    id: 14, col: 1, run: "2", header: 0
  },
  {
    id: 15, col: 1, run: "1", header: 0
  },
  {
    id: 16, col: 1, run: "6", header: 0
  },
  {
    id: 17, col: 2, run: "2", header: 1
  },
  {
    id: 18, col: 2, run: "1", header: 0
  },
  {
    id: 19, col: 2, run: twoTwo, header: 0
  },
  {
    id: 20, col: 2, run: "2", header: 0
  },
  {
    id: 21, col: 2, run: "0", header: 0
  },
  {
    id: 22, col: 2, run: "1", header: 0
  },
  {
    id: 23, col: 2, run: "4", header: 0
  },
  {
    id: 24, col: 2, run: "0", header: 0
  },
  {
    id: 25, col: 3, run: "3", header: 1
  },
  {
    id: 26, col: 3, run: "4", header: 0
  },
  {
    id: 27, col: 3, run: "W", header: 0
  },
  {
    id: 28, col: 3, run: threeThree, header: 0
  },
  {
    id: 29, col: 3, run: "1", header: 0
  },
  {
    id: 30, col: 3, run: "0", header: 0
  },
  {
    id: 31, col: 3, run: "2", header: 0
  },
  {
    id: 32, col: 3, run: "0", header: 0
  },
  {
    id: 33, col: 4, run: "4", header: 1
  },
  {
    id: 34, col: 4, run: "1", header: 0
  },
  {
    id: 35, col: 4, run: "0", header: 0
  },
  {
    id: 36, col: 4, run: "4", header: 0
  },
  {
    id: 37, col: 4, run: fourFour, header: 0
  },
  {
    id: 38, col: 4, run: "6", header: 0
  },
  {
    id: 39, col: 4, run: "1", header: 0
  },
  {
    id: 40, col: 4, run: "4", header: 0
  },
  {
    id: 41, col: 5, run: "5", header: 1
  },
  {
    id: 42, col: 5, run: "0", header: 0
  },
  {
    id: 43, col: 5, run: "2", header: 0
  },
  {
    id: 44, col: 5, run: "0", header: 0
  },
  {
    id: 45, col: 5, run: "4", header: 0
  },
  {
    id: 46, col: 5, run: fiveFive, header: 0
  },
  {
    id: 47, col: 5, run: "1", header: 0
  },
  {
    id: 48, col: 5, run: "W", header: 0
  },
  {
    id: 49, col: 6, run: "6", header: 1
  },
  {
    id: 50, col: 6, run: "0", header: 0
  },
  {
    id: 51, col: 6, run: "2", header: 0
  },
  {
    id: 52, col: 6, run: "1", header: 0
  },
  {
    id: 53, col: 6, run: "0", header: 0
  },
  {
    id: 54, col: 6, run: "1", header: 0
  },
  {
    id: 55, col: 6, run: sixSix, header: 0
  },
  {
    id: 56, col: 6, run: "1", header: 0
  },
  {
    id: 57, col: 7, run: "7", header: 1
  },
  {
    id: 58, col: 7, run: "1", header: 0
  },
  {
    id: 59, col: 7, run: "0", header: 0
  },
  {
    id: 60, col: 7, run: "4", header: 0
  },
  {
    id: 61, col: 7, run: "0", header: 0
  },
  {
    id: 62, col: 7, run: "6", header: 0
  },
  {
    id: 63, col: 7, run: "W", header: 0
  },
  {
    id: 64, col: 7, run: sevenSeven, header: 0
  },
]
}

console.log(this.props.gameCards.cardOne);
console.log(this.props.gameCards.cardTwo);
console.log(this.props.gameCards.runs);
console.log(this.props.gameCards.wicketEvent);

const cardTwo = this.props.gameCards.cardTwo;
const runs = this.props.gameCards.runs;

if (cardTwo === 100 && this.props.overPageFlag != true) {

if (this.props.gameCards.cardOne === 0 || this.props.gameCards.cardOne === 7 || this.props.gameCards.cardOne === 14 || this.props.gameCards.cardOne === 21 && this.props.overPageFlag != true) {



  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getRow = this.getRow(data, index, 1);
        return (getRow)
          })

          let colTwo = boardRuns.map((data, index) => {
            const getOpacity = this.getOpacity(data, index, 2);
            return (getOpacity)
      })

      let colThree = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 3);
        return (getOpacity)
          })

          let colFour = boardRuns.map((data, index) => {
            const getOpacity = this.getOpacity(data, index, 4);
            return (getOpacity)
              })

              let colFive = boardRuns.map((data, index) => {
                const getOpacity = this.getOpacity(data, index, 5);
                return (getOpacity)
                  })

                  let colSix = boardRuns.map((data, index) => {
                    const getOpacity = this.getOpacity(data, index, 6);
                    return (getOpacity)
                      })

                      let colSeven = boardRuns.map((data, index) => {
                        const getOpacity = this.getOpacity(data, index, 7);
                        return (getOpacity)
                          })

                return (

                  <Grid>
                    <Col>{colZero}</Col>
                    <Col>{colOne}</Col>
                    <Col>{colTwo}</Col>
                    <Col>{colThree}</Col>
                    <Col>{colFour}</Col>
                    <Col>{colFive}</Col>
                    <Col>{colSix}</Col>
                    <Col>{colSeven}</Col>
                  </Grid>
                )
}
else if (this.props.gameCards.cardOne === 1 || this.props.gameCards.cardOne === 8 || this.props.gameCards.cardOne === 15 || this.props.gameCards.cardOne === 22 && this.props.overPageFlag != true) {


  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 1);
        return (getOpacity)
          })

          let colTwo = boardRuns.map((data, index) => {
            const getRow = this.getRow(data, index, 2);
            return (getRow)
              })

              let colThree = boardRuns.map((data, index) => {
                const getOpacity = this.getOpacity(data, index, 3);
                return (getOpacity)
                })

                  let colFour = boardRuns.map((data, index) => {
                    const getOpacity = this.getOpacity(data, index, 4);
                    return (getOpacity)
                      })

                      let colFive = boardRuns.map((data, index) => {
                        const getOpacity = this.getOpacity(data, index, 5);
                        return (getOpacity)
                          })

                          let colSix = boardRuns.map((data, index) => {
                            const getOpacity = this.getOpacity(data, index, 6);
                            return (getOpacity)
                              })

                              let colSeven = boardRuns.map((data, index) => {
                                const getOpacity = this.getOpacity(data, index, 7);
                                return (getOpacity)
                                  })

                        return (
                          <Grid>

                            <Col>{colZero}</Col>
                            <Col>{colOne}</Col>
                            <Col>{colTwo}</Col>
                            <Col>{colThree}</Col>
                            <Col>{colFour}</Col>
                            <Col>{colFive}</Col>
                            <Col>{colSix}</Col>
                            <Col>{colSeven}</Col>
                          </Grid>
                        )

}
else if (this.props.gameCards.cardOne === 2 || this.props.gameCards.cardOne === 9 || this.props.gameCards.cardOne === 16 || this.props.gameCards.cardOne === 23 && this.props.overPageFlag != true) {



  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 1);
        return (getOpacity)
          })

          let colTwo = boardRuns.map((data, index) => {
            const getOpacity = this.getOpacity(data, index, 2);
            return (getOpacity)
              })

              let colThree = boardRuns.map((data, index) => {
                const getRow = this.getRow(data, index, 3);
                return (getRow)
                  })

                  let colFour = boardRuns.map((data, index) => {
                    const getOpacity = this.getOpacity(data, index, 4);
                    return (getOpacity)
                      })

                      let colFive = boardRuns.map((data, index) => {
                        const getOpacity = this.getOpacity(data, index, 5);
                        return (getOpacity)
                          })

                          let colSix = boardRuns.map((data, index) => {
                            const getOpacity = this.getOpacity(data, index, 6);
                            return (getOpacity)
                              })

                              let colSeven = boardRuns.map((data, index) => {
                                const getOpacity = this.getOpacity(data, index, 7);
                                return (getOpacity)
                                  })

                        return (
                          <Grid>

                            <Col>{colZero}</Col>
                            <Col>{colOne}</Col>
                            <Col>{colTwo}</Col>
                            <Col>{colThree}</Col>
                            <Col>{colFour}</Col>
                            <Col>{colFive}</Col>
                            <Col>{colSix}</Col>
                            <Col>{colSeven}</Col>
                          </Grid>
                        )

}
else if (this.props.gameCards.cardOne === 3 || this.props.gameCards.cardOne === 10 || this.props.gameCards.cardOne === 17 || this.props.gameCards.cardOne === 24 && this.props.overPageFlag != true) {



  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 1);
        return (getOpacity)
          })

          let colTwo = boardRuns.map((data, index) => {
            const getOpacity = this.getOpacity(data, index, 2);
            return (getOpacity)
              })

              let colThree = boardRuns.map((data, index) => {
                const getOpacity = this.getOpacity(data, index, 3);
                return (getOpacity)
                  })

                  let colFour = boardRuns.map((data, index) => {
                    const getRow = this.getRow(data, index, 4);
                    return (getRow)

                      })

                      let colFive = boardRuns.map((data, index) => {
                        const getOpacity = this.getOpacity(data, index, 5);
                        return (getOpacity)
                          })

                          let colSix = boardRuns.map((data, index) => {
                            const getOpacity = this.getOpacity(data, index, 6);
                            return (getOpacity)
                              })

                              let colSeven = boardRuns.map((data, index) => {
                                const getOpacity = this.getOpacity(data, index, 7);
                                return (getOpacity)
                                  })

                        return (
                          <Grid>

                            <Col>{colZero}</Col>
                            <Col>{colOne}</Col>
                            <Col>{colTwo}</Col>
                            <Col>{colThree}</Col>
                            <Col>{colFour}</Col>
                            <Col>{colFive}</Col>
                            <Col>{colSix}</Col>
                            <Col>{colSeven}</Col>
                          </Grid>
                        )

}
else if (this.props.gameCards.cardOne === 4 || this.props.gameCards.cardOne === 11 || this.props.gameCards.cardOne === 18 || this.props.gameCards.cardOne === 25 && this.props.overPageFlag != true) {



  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 1);
        return (getOpacity)
          })

          let colTwo = boardRuns.map((data, index) => {
            const getOpacity = this.getOpacity(data, index, 2);
            return (getOpacity)
              })

              let colThree = boardRuns.map((data, index) => {
                const getOpacity = this.getOpacity(data, index, 3);
                return (getOpacity)
                  })

                  let colFour = boardRuns.map((data, index) => {
                    const getOpacity = this.getOpacity(data, index, 4);
                    return (getOpacity)

                      })

                      let colFive = boardRuns.map((data, index) => {
                        const getRow = this.getRow(data, index, 5);
                        return (getRow)
                          })

                          let colSix = boardRuns.map((data, index) => {
                            const getOpacity = this.getOpacity(data, index, 6);
                            return (getOpacity)
                              })

                              let colSeven = boardRuns.map((data, index) => {
                                const getOpacity = this.getOpacity(data, index, 7);
                                return (getOpacity)
                                  })

                        return (
                          <Grid>

                            <Col>{colZero}</Col>
                            <Col>{colOne}</Col>
                            <Col>{colTwo}</Col>
                            <Col>{colThree}</Col>
                            <Col>{colFour}</Col>
                            <Col>{colFive}</Col>
                            <Col>{colSix}</Col>
                            <Col>{colSeven}</Col>
                          </Grid>
                        )

}
else if (this.props.gameCards.cardOne === 5 || this.props.gameCards.cardOne === 12 || this.props.gameCards.cardOne === 19 || this.props.gameCards.cardOne === 26 && this.props.overPageFlag != true) {


  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 1);
        return (getOpacity)
          })

          let colTwo = boardRuns.map((data, index) => {
            const getOpacity = this.getOpacity(data, index, 2);
            return (getOpacity)
              })

              let colThree = boardRuns.map((data, index) => {
                const getOpacity = this.getOpacity(data, index, 3);
                return (getOpacity)
                  })

                  let colFour = boardRuns.map((data, index) => {
                    const getOpacity = this.getOpacity(data, index, 4);
                    return (getOpacity)

                      })

                      let colFive = boardRuns.map((data, index) => {
                        const getOpacity = this.getOpacity(data, index, 5);
                        return (getOpacity)
                          })

                          let colSix = boardRuns.map((data, index) => {
                            const getRow = this.getRow(data, index, 6);
                            return (getRow)
                              })

                              let colSeven = boardRuns.map((data, index) => {
                                const getOpacity = this.getOpacity(data, index, 7);
                                return (getOpacity)
                                  })

                        return (
                          <Grid>

                            <Col>{colZero}</Col>
                            <Col>{colOne}</Col>
                            <Col>{colTwo}</Col>
                            <Col>{colThree}</Col>
                            <Col>{colFour}</Col>
                            <Col>{colFive}</Col>
                            <Col>{colSix}</Col>
                            <Col>{colSeven}</Col>
                          </Grid>
                        )

}
else if (this.props.gameCards.cardOne === 6 || this.props.gameCards.cardOne === 13 || this.props.gameCards.cardOne === 20 || this.props.gameCards.cardOne === 27 && this.props.overPageFlag != true) {


  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )}
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 1);
        return (getOpacity)
      })

      let colTwo = boardRuns.map((data, index) => {
          const getOpacity = this.getOpacity(data, index, 2);
          return (getOpacity)
      })

      let colThree = boardRuns.map((data, index) => {
          const getOpacity = this.getOpacity(data, index, 3);
          return (getOpacity)
      })

      let colFour = boardRuns.map((data, index) => {
          const getOpacity = this.getOpacity(data, index, 4);
          return (getOpacity)
      })

      let colFive = boardRuns.map((data, index) => {
          const getOpacity = this.getOpacity(data, index, 5);
          return (getOpacity)
      })

      let colSix = boardRuns.map((data, index) => {
          const getOpacity = this.getOpacity(data, index, 6);
          return (getOpacity)
      })

      let colSeven = boardRuns.map((data, index) => {
          const getRow = this.getRow(data, index, 7);
          return (getRow)
        })

      return (
        <Grid>

          <Col>{colZero}</Col>
          <Col>{colOne}</Col>
          <Col>{colTwo}</Col>
          <Col>{colThree}</Col>
          <Col>{colFour}</Col>
          <Col>{colFive}</Col>
          <Col>{colSix}</Col>
          <Col>{colSeven}</Col>
        </Grid>
      )
}
else {


let colZero = boardRuns.map((data, index) => {
    if (data.col === 0) {
        return (
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>{data.run}</Text>
            </Row>
      )
      }
    })

    let colOne = boardRuns.map((data, index) => {
      const getRow = this.getRowAll(data, index, 1);
      return (getRow)
    })

    let colTwo = boardRuns.map((data, index) => {
      const getRow = this.getRowAll(data, index, 2);
      return (getRow)
    })

    let colThree = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 3);
        return (getRow)
    })

    let colFour = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 4);
        return (getRow)
    })

    let colFive = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 5);
        return (getRow)
    })

    let colSix = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 6);
        return (getRow)
    })

    let colSeven = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 7);
        return (getRow)
    })


    return (
      <Grid>

        <Col>{colZero}</Col>
        <Col>{colOne}</Col>
        <Col>{colTwo}</Col>
        <Col>{colThree}</Col>
        <Col>{colFour}</Col>
        <Col>{colFive}</Col>
        <Col>{colSix}</Col>
        <Col>{colSeven}</Col>
      </Grid>
    )
  }
}
else if (cardTwo != 100 && this.props.overPageFlag != true) {


  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )}
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getDarkOpacity(data, index, 1);
        return (getOpacity)
      })

      let colTwo = boardRuns.map((data, index) => {
          const getOpacity = this.getDarkOpacity(data, index, 2);
          return (getOpacity)
      })

      let colThree = boardRuns.map((data, index) => {
          const getOpacity = this.getDarkOpacity(data, index, 3);
          return (getOpacity)
      })

      let colFour = boardRuns.map((data, index) => {
          const getOpacity = this.getDarkOpacity(data, index, 4);
          return (getOpacity)
      })

      let colFive = boardRuns.map((data, index) => {
          const getOpacity = this.getDarkOpacity(data, index, 5);
          return (getOpacity)
      })

      let colSix = boardRuns.map((data, index) => {
          const getOpacity = this.getDarkOpacity(data, index, 6);
          return (getOpacity)
      })

      let colSeven = boardRuns.map((data, index) => {
          const getRow = this.getDarkOpacity(data, index, 7);
          return (getRow)
        })


        const opacity = this.animatedValueRuns.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 1, 1]
        })

        const momentumThisOver = this.props.momentum.momentumThisOver;
        //const momentumThisOverState = this.state.momentumThisOver;
        const momentumThisOverLength = momentumThisOver.length-1;
        const momentumThisOverLast = momentumThisOver[momentumThisOverLength];

        /*
        const runsValueDisplay = boardRuns.map(data => {
            if (data.run === "W") {

              }
            })
            */

            console.log(this.props.gameCards.wicketEvent);
        const wicketEvent = this.props.gameCards.wicketEvent;

        let momentumScore = (<Text></Text>)
        if ((runs === 0 && wicketEvent != true) || runs === 1 || runs === 2 || runs === 3) {
          momentumScore = (
          <Col style={{position: 'absolute', top: '10%', left: '10%', right: 0, bottom: 0}}>
            <Row style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Animated.Text style={{opacity, fontSize: 200, color: '#fff'}}>{runs}</Animated.Text>
            </Row>
          </Col>
          )
        }
        else if (wicketEvent === true) {
          momentumScore = (
          <Col style={{position: 'absolute', top: '10%', left: '10%', right: 0, bottom: 0}}>
            <Row style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Animated.Text style={{opacity, fontSize: 70, color: '#fff'}}>Howzat!</Animated.Text >
            </Row>
          </Col>
          )
        }
        else if (momentumThisOverLast > 0) {
          momentumScore = (
          <Col style={{position: 'absolute', top: '10%', left: '10%', right: 0, bottom: 0}}>
            <Row style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Animated.Text style={{opacity, fontSize: 180, color: '#fff'}}>{runs}</Animated.Text>
            </Row>
            <Row style={{width: '100%', justifyContent: 'center', alignItems: 'center', height: 60}}>
              <Animated.Text style={{opacity, fontSize: 30, color: '#fff'}}>momentum: +{momentumThisOverLast}</Animated.Text>
            </Row>
          </Col>
        )
        }
        else if (momentumThisOverLast < 0) {
          momentumScore = (
          <Col style={{position: 'absolute', top: '10%', left: '10%', right: 0, bottom: 0}}>
            <Row style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Animated.Text style={{opacity, fontSize: 180, color: '#fff'}}>{runs}</Animated.Text>
            </Row>
            <Row style={{width: '100%', justifyContent: 'center', alignItems: 'center', height: 60}}>
              <Animated.Text style={{opacity, fontSize: 30, color: '#fff'}}>momentum: +{momentumThisOverLast}</Animated.Text>
            </Row>
          </Col>
          )
        }
        else {
          momentumScore = (
          <Col style={{position: 'absolute', top: '10%', left: '10%', right: 0, bottom: 0}}>
            <Row style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Animated.Text style={{opacity, fontSize: 200, color: '#fff'}}>{runs}</Animated.Text>
            </Row>
          </Col>
          )
        }

      return (
        <Grid>

          <Col>{colZero}</Col>
          <Col>{colOne}</Col>
          <Col>{colTwo}</Col>
          <Col>{colThree}</Col>
          <Col>{colFour}</Col>
          <Col>{colFive}</Col>
          <Col>{colSix}</Col>
          <Col>{colSeven}</Col>
          {momentumScore}
        </Grid>
      )

      //const getTopRowRuns = this.getTopRowRuns();

      /*
    return (
    <Grid>
      <Col>
      {getTopRowRuns}
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>A</Text>
      </Row>
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>2</Text>
      </Row>
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>3</Text>
      </Row>
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>4</Text>
      </Row>
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>5</Text>
      </Row>
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>6</Text>
      </Row>
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>7</Text>
      </Row>
      </Col>
      <Col style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
      <Row style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 200}}>{runs}</Text>
      </Row>
      </Col>
    </Grid>
    )
    */
}
else {


  //fail safe display.
  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.CardValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 1);
        return (getRow)
      })

      let colTwo = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 2);
        return (getRow)
      })

      let colThree = boardRuns.map((data, index) => {
          const getRow = this.getRowAll(data, index, 3);
          return (getRow)
      })

      let colFour = boardRuns.map((data, index) => {
          const getRow = this.getRowAll(data, index, 4);
          return (getRow)
      })

      let colFive = boardRuns.map((data, index) => {
          const getRow = this.getRowAll(data, index, 5);
          return (getRow)
      })

      let colSix = boardRuns.map((data, index) => {
          const getRow = this.getRowAll(data, index, 6);
          return (getRow)
      })

      let colSeven = boardRuns.map((data, index) => {
          const getRow = this.getRowAll(data, index, 7);
          return (getRow)
      })


      return (
        <Grid>

          <Col>{colZero}</Col>
          <Col>{colOne}</Col>
          <Col>{colTwo}</Col>
          <Col>{colThree}</Col>
          <Col>{colFour}</Col>
          <Col>{colFive}</Col>
          <Col>{colSix}</Col>
          <Col>{colSeven}</Col>
        </Grid>
      )
    }
}



getRow = (data, index, cardNumberValue) => {
  //THIS IS WHEN YOU CLICK THE FIRST CARD.
  console.log("hi");

  let battingStrikeRate = 1000;

  if ((data.id === 10 && (data.run === "0" || data.run === "1" || data.run === "2" || data.run === "4" || data.run === "W")) || (data.id === 19 && (data.run === "0" || data.run === "4" || data.run === "6" ))) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;

  const battingStrikeRateArray = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);

  battingStrikeRate = battingStrikeRateArray[2];
}

let momentumScore = 1000;
if ((data.id === 28 && (data.run === "W" || data.run === "4" || data.run === "6")) || (data.id === 37 && (data.run === "4" || data.run === "0" || data.run === "3" || data.run === "6")) || (data.id === 46 && (data.run === "W" || data.run === "1" || data.run === "4" || data.run === "6"))) {
const runRateValue = this.displayRequiredRunRate();
const runRate = runRateValue[0];
console.log(runRate);

const display = this.getDisplayRunsTotal();
const wickets = display[1];
console.log(wickets);

momentumScore = this.props.momentum.momentum;
}

let formScore = 1000;
console.log(data.id);
console.log(data.run);
if ((data.id === 55 && (data.run === "W" || data.run === "1" || data.run === "0" || data.run === "2" || data.run === "4")) || (data.id === 64 && (data.run === "0" || data.run === "2" || data.run === "4" || data.run === "6"))) {
  console.log('form score hit.');
  console.log(data.id);
  console.log(data.run);
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;

  const getFormScore = CardBoard.getFormScore(players, facingBall, gameRunEvents);
  console.log(getFormScore);
  const formScoreOne = getFormScore[0];
  const formScoreTwo = getFormScore[1];

  if (facingBall === 1) {
    formScore = formScoreOne;
    console.log(formScore);
  }
  else {
    formScore = formScoreTwo;
    console.log(formScore);
  }

}

  const opacity = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  })

  console.log(data.col);
  console.log(data);
  console.log(cardNumberValue);
  console.log(data.header);
  console.log(formScore);


  //let { springValue } = this.state;
  //let { yAnimation } = this.state;
  if (data.col === cardNumberValue && data.header === 1) {
      return (
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueText}>{data.run}</Text>
      </Row >
    )
  }
  else if (data.col === cardNumberValue && data.run === "4" && battingStrikeRate === 1000 && momentumScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
      return (
        <Row style={styles.fourValueSquare}>
        <Animated.View style={
        {opacity,
          width: '100%',
          height: '100%',
          borderRadius: 60 / 2,
          //backgroundColor: 'transparent',
          borderColor: '#f7ff00',
          borderWidth: 2,
        backgroundColor: '#f7ff00',
        position: 'absolute',}}>
        </Animated.View>
        <Text style={styles.sixValueText}>{data.run}a</Text>
        </Row>
    )
    }
    else if (data.col === cardNumberValue && data.run === "W" && battingStrikeRate === 1000 && momentumScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 28 || data.id != 46 || data.id != 55 || data.id != 64)) {
        return (
          <Row style={styles.wicketValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#FF69B4',
            borderWidth: 2,
          backgroundColor: '#FF69B4',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.rundValueText}>{data.run}</Text>
          </Row>
      )
      }
      else if (data.col === cardNumberValue && data.run === "6" && battingStrikeRate === 1000 && momentumScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
          return (
            <Row style={styles.sixValueSquare}>
            <Animated.View style={
            {opacity,
              width: '100%',
              height: '100%',
              borderRadius: 60 / 2,
              //backgroundColor: 'transparent',
              borderColor: '#7CFC00',
              borderWidth: 2,
            backgroundColor: '#7CFC00',
            position: 'absolute',}}>
            </Animated.View>
                <Text style={styles.sixValueText}>{data.run}b</Text>
            </Row >
        )
        }
    else if (data.col === cardNumberValue) {
      console.log(data.id + " ID b");
      console.log(data.run + " run b");
      console.log(battingStrikeRate + " Strike rate b");
      if ((data.id === 10 && data.run === "W") || (data.id === 19 && data.run === "0" && (battingStrikeRate <= 30 || isNaN(parseFloat(battingStrikeRate)))) || (data.id === 28 && data.run === "0") || (data.id === 28 && data.run === "W" && momentumScore <= -26) || (data.id === 37 && data.run === "6") || (data.id === 37 && data.run === "4" && momentumScore <= -6 && momentumScore >= -15) || (data.id === 46 && data.run === "W" && momentumScore <= -26) || (data.id === 46 && data.run === "W" && momentumScore <= -6) || (data.id === 55 && data.run === "W") || (data.id === 64 && data.run === "0")) {
        if (data.run === "W" && momentumScore <= -26 && data.id != 28) {
        return (
          <Row style={styles.strikeRateWValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF69B4',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWValueText}>{data.run}.d</Text>
          </Row>
      )
      }
      else if ((data.run === "W" && momentumScore >= -15 && data.id != 55) || (data.id === 28 && data.run === "0" && momentumScore >= -15) || (data.run === "4" && momentumScore >= -15)) {
      return (
        <Row style={styles.strikeRateM6ValueSquare}>
        <Animated.View style={
        {opacity,
          width: '100%',
          height: '100%',
          //backgroundColor: 'transparent',
          borderColor: '#fff',
          borderWidth: 2,
        backgroundColor: '#ff8300',
        position: 'absolute',}}>
        </Animated.View>
            <Text style={styles.strikeRateWValueText}>{data.run}cc</Text >
        </Row>
    )
    }
      else {
        return (
          <Row style={styles.strikeRateWValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF69B4',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWValueText}>{data.run}iii</Text>
          </Row>
      )
      }
      }
        else if ((data.id === 28 && data.run === "W" && momentumScore <= -16 && momentumScore >= -26) || (data.id === 37 && data.run === "1" && momentumScore <= -16 && momentumScore >= -26) || (data.id === 46 && data.run === "1" && momentumScore <= -16 && momentumScore >= -26)) {
          return (
            <Row style={styles.strikeRateValueSquareLB}>
            <Animated.View style={
            {opacity,
              width: '100%',
              height: '100%',
              //backgroundColor: 'transparent',
              borderColor: '#fff',
              borderWidth: 2,
            backgroundColor: '#C68642',
            position: 'absolute',}}>
            </Animated.View>
                <Text style={styles.strikeRateWValueText}>{data.run}]</Text>
            </Row>
          )
        }
      else if ((data.id === 10 && data.run === "0") || (data.id === 19 && data.run === "0" && battingStrikeRate <= 60) || (data.id === 28 && data.run === "0") || (data.id === 37 && data.run === "1") || (data.id === 46 && data.run === "1"  && momentumScore <= -16) || (data.id === 55 && data.run === "1" && formScore <= 20) || (data.id === 64 && data.run === "1")) {
        if (data.run === "W") {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF8300',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWickerValueText}>{data.run}.j</Text>
          </Row>
      )
      }
      else if ((data.id === 28 && data.run === "0") || (data.id === 37 && data.run === "1") || (data.id === 46 && data.run === "1"  && momentumScore <= -16) || (data.id === 55 && data.run === "1" && formScore <= 20) || (data.id === 64 && data.run === "1")) {
        return (
          <Row style={styles.strikeRateValueSquareLightOrange}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF8300',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate100ValueText}>{data.run}.e</Text>
          </Row>
      )
      }
      else if ((data.id === 55 && data.run === "1" && formScore <= 20) || (data.id === 64 && data.run === "1" && formScore <= 20)) {

      }
      else {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF8300',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate100ValueText}>{data.run}.h</Text>
          </Row>
      )
      }
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 99) || (data.id === 19 && data.run === "1") || (data.id === 28 && data.run === "4" && momentumScore >= 16 && momentumScore <= 25) || (data.id === 37 && data.run === "4" && momentumScore <= -6) || (data.id === 47 && data.run === "0" && momentumScore >= 16 && momentumScore <= 25) || (data.id === 46 && data.run === "W" && momentumScore <= -6) || (data.id === 46 && data.run === "6" && momentumScore >= 16 && momentumScore <= 25) || (data.id === 55 && data.run === "2") || (data.id === 64 && data.run === "4")) {
        if (data.run === "W") {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#f7ff00',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWickerValueText}>{data.run}</Text>
          </Row>
      )
    }
    else {
      return (
        <Row style={styles.strikeRate100ValueSquare}>
        <Animated.View style={
        {opacity,
          width: '100%',
          height: '100%',
          //backgroundColor: 'transparent',
          borderColor: '#fff',
          borderWidth: 2,
        backgroundColor: '#f7ff00',
        position: 'absolute',}}>
        </Animated.View>
            <Text style={styles.strikeRate120ValueText}>{data.run}</Text>
        </Row>
    )
    }
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 120) || (data.id === 19 && data.run === "2"))
      {
        return (
          <Row style={styles.strikeRate100ValueSquareYellow}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#f7ff00',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate120ValueText}>{data.run}t.</Text>
          </Row>
      )
      }
      else if ((data.id === 19 && data.run === "2") || (data.id === 28 && data.run === "2") || (data.id === 37 && data.run === "0" && momentumScore <= 5) || (data.id === 46 && data.run === "1" && momentumScore <= 5) || (data.id === 55 && data.run === "1") || (data.id === 64 && data.run === "2")) {
        return (
          <Row style={styles.strikeRate120ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#fff',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate120ValueText}>{data.run}</Text>
          </Row>
      )
      }
      else if ((data.id === 10 && data.run === "2") || (data.id === 19 && data.run === "4") || (data.id === 28 && data.run === "4" && momentumScore <= 15) || (data.id === 37 && data.run === "3" && momentumScore <= 15)  || (data.id === 46 && data.run === "W" && momentumScore <= -15) || (data.id === 46 && data.run === "0")) {
        return (
          <Row style={styles.strikeRate120ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#5bd1fc',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate140ValueText}>{data.run}c</Text>
          </Row>
      )
      }
      else if ((data.id === 10 && data.run === "4") || (data.id === 19 && data.run === "6") || (data.id === 28 && data.run === "4" && momentumScore <= 25) || (data.id === 28 && data.run === "6" && momentumScore > 25) || (data.id === 37 && data.run === "0" && momentumScore <= 25) || (data.id === 37 && data.run === "4" && momentumScore > 25) || (data.id === 46 && data.run === "6") || (data.id === 46 && data.run === "4" && momentumScore > 25) || (data.id === 55 && data.run === "4") || (data.id === 64 && data.run === "6")) {
        return (
          <Row style={styles.strikeRate141ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#7CFC00',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate141ValueText}>{data.run}d</Text>
          </Row>
      )
      }
      else if ((data.id === 28 && data.run === "6") || (data.id === 37 && data.run === "4" && momentumScore > 25) || (data.id === 46 && data.run === "4")) {
        return (
          <Row style={styles.strikeRateGreenValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#ffbf00',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate141ValueText}>{data.run}i</Text>
          </Row>
      )
      }
      else {
        return (
          <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>{data.run}v</Text>
          </Row>
      )
      }
    }
}


getRowAll = (data, index, cardNumberValue) => {
  //THIS IS WHEN YOU CLICK 'PLAY!'.

  let battingStrikeRate = 1000;
  if ((data.id === 10 &&  (data.run === "0" || data.run === "1" || data.run === "2" || data.run === "4" || data.run === "6" || data.run === "W")) || (data.id === 19 && (data.run === "0" || data.run === "4" || data.run === "6" || data.run === "2" || data.run === "1"))) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  //const facingBall = this.props.players.facingBall;

  let facingBall = 1;

  if (this.props.overPageFlag === true) {
  facingBall = this.props.overPageFacingBall;
  }
  else {
    facingBall = this.props.players.facingBall;
  }

  const battingStrikeRateArray = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);

  battingStrikeRate = battingStrikeRateArray[2];
}

  let momentumScore = 1000;
if ((data.id === 28 && (data.run === "W" || data.run === "4" || data.run === "6" || data.run === "0")) || (data.id === 37 && (data.run === "4" || data.run === "0" || data.run === "6" || data.run === "1" || data.run === "3")) || (data.id === 46 && (data.run === "W" || data.run === "1" || data.run === "6" || data.run === "4"))) {
  const runRateValue = this.displayRequiredRunRate();
  const runRate = runRateValue[0];
  console.log(runRate);

  const display = this.getDisplayRunsTotal();
  const wickets = display[1];
  console.log(wickets);

  momentumScore = this.props.momentum.momentum;
  console.log(momentumScore);
}

let formScore = 1000;
console.log(data.id);
console.log(data.run);
if ((data.id === 55 && (data.run === "W" || data.run === "1" || data.run === "0" || data.run === "2" || data.run === "4")) || (data.id === 64 && (data.run === "0" || data.run === "2" || data.run === "4" || data.run === "6"))) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  //const facingBall = this.props.players.facingBall;

  let facingBall = 1;

  if (this.props.overPageFlag === true) {
  facingBall = this.props.overPageFacingBall;
  }
  else {
    facingBall = this.props.players.facingBall;
  }

  const getFormScore = CardBoard.getFormScore(players, facingBall, gameRunEvents);
  console.log(getFormScore);
  const formScoreOne = getFormScore[0];
  const formScoreTwo = getFormScore[1];

  if (facingBall === 1) {
    formScore = formScoreOne;
  }
  else {
    formScore = formScoreTwo;
  }
  //console.log(formScore);
}

  const opacity = this.animatedValueAll.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  })

  //let { springValue } = this.state;
  //let { yAnimation } = this.state;
  if (data.col === cardNumberValue && data.header === 1) {
    return (
    <Row style={styles.CardValueSquare}>
      <Text style={styles.CardValueText}>{data.run}.e</Text>
    </Row>
  )
  }
    else if (data.col === cardNumberValue && data.run === "4" && battingStrikeRate === 1000 && momentumScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
        console.log(formScore);
        console.log(battingStrikeRate);
        console.log(momentumScore);
        console.log(data.id);
        return (
          <Row style={styles.fourValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            borderRadius: 60 / 2,
            //backgroundColor: 'transparent',
            borderColor: '#f7ff00',
            borderWidth: 2,
          backgroundColor: '#f7ff00',
          position: 'absolute',}}>
          </Animated.View>
          <Text style={styles.sixValueText}>{data.run}f</Text>
          </Row>
      )
      }
    else if (data.col === cardNumberValue && data.run === "W" && battingStrikeRate === 1000 && momentumScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 28 || data.id != 46 || data.id != 55 || data.id != 64)) {
        return (
          <Row style={styles.wicketValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#FF69B4',
            borderWidth: 2,
          backgroundColor: '#FF69B4',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.rundValueText}>{data.run}fff</Text>
          </Row>
      )
      }
      else if (data.col === cardNumberValue && data.run === "6" && battingStrikeRate === 1000 && momentumScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
          console.log(battingStrikeRate);
          console.log(momentumScore);
          console.log(data.id);
          return (
            <Row style={styles.sixValueSquare}>
            <Animated.View style={
            {opacity,
              width: '100%',
              height: '100%',
              borderRadius: 60 / 2,
              //backgroundColor: 'transparent',
              borderColor: '#7CFC00',
              borderWidth: 2,
            backgroundColor: '#7CFC00',
            position: 'absolute',}}>
            </Animated.View>
                <Text style={styles.sixValueText}>{data.run}g</Text>
            </Row>
        )
        }
    else if (data.col === cardNumberValue) {
      console.log(data.id);
      console.log(battingStrikeRate);
      if ((data.id === 28 && data.run === "W" && momentumScore <= -16 && momentumScore >= -26) || (data.id === 37 && data.run === "1" && momentumScore <= -16 && momentumScore >= -26) || (data.id === 46 && data.run === "1" && momentumScore <= -16 && momentumScore >= -26)) {
        return (
          <Row style={styles.strikeRateBrownValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#C68642',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWValueText}>{data.run}hh</Text>
          </Row>
      )
      }
      else if ((data.id === 10 && data.run === "W") || (data.id === 19 && data.run === "0" && (battingStrikeRate <= 30 || isNaN(parseFloat(battingStrikeRate)))) || (data.id === 28 && data.run === "0") || (data.id === 28 && data.run === "W" && momentumScore <= -26) || (data.id === 37 && data.run === "6") || (data.id === 37 && data.run === "4" && momentumScore <= -6 && momentumScore >= -15) || (data.id === 46 && data.run === "W" && momentumScore <= -26) || (data.id === 46 && data.run === "W" && momentumScore <= -6) || (data.id === 55 && data.run === "W") || (data.id === 64 && data.run === "0")) {
        if (data.run === "W" && momentumScore <= -26 && data.id != 28) {
        return (
          <Row style={styles.strikeRateWValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF69B4',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWValueText}>{data.run}.u</Text >
          </Row>
      )
      }
      else if ((data.id === 28 && data.run === "W" && momentumScore >= -15) || (data.id === 28 && data.run === "0" && momentumScore <= -6 && momentumScore >= -15) || (data.id === 37 && data.run === "4" && momentumScore <= -6 && momentumScore >= -15) || (data.id === 37 && data.run === "0" && momentumScore >= -15) || (data.id === 46 && data.run === "W" && momentumScore <= -6 && momentumScore >= -15) || (data.id === 46 && data.run === "4" && momentumScore >= -15)) {
      return (
        <Row style={styles.strikeRateM6ValueSquare}>
        <Animated.View style={
        {opacity,
          width: '100%',
          height: '100%',
          //backgroundColor: 'transparent',
          borderColor: '#fff',
          borderWidth: 2,
        backgroundColor: '#ff8300',
        position: 'absolute',}}>
        </Animated.View>
            <Text style={styles.strikeRateWValueText}>{data.run}cd</Text>
        </Row>
    )
    }
      else {
        return (
          <Row style={styles.strikeRateWValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF69B4',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWValueText}>{data.run}ii.</Text >
          </Row>
      )
      }
      }
      else if ((data.id === 28 && data.run === "W" && momentumScore <= -25) || (data.id === 37 && data.run === "4" && momentumScore <= -6)) {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#C68642',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWickerValueTextRedBG}>{data.run}aa</Text>
          </Row>
      )
      }
      else if ((data.id === 10 && data.run === "0") || (data.id === 19 && data.run === "0" && battingStrikeRate <= 60) || (data.id === 37 && data.run === "1") || (data.id === 46 && data.run === "1"  && momentumScore <= -16) || (data.id === 55 && data.run === "1" && formScore <= 20) || (data.id === 64 && data.run === "1")) {
        if (data.run === "W") {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF8300',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWickerValueTextRedBG}>{data.run}av</Text >
          </Row >
      )
      }
      else {
        return (
          <Row style={styles.strikeRateValueSquareLightOrange}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF8300',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate100ValueText}>{data.run}jjj</Text>
          </Row>
      )
      }
      }
      else if ((data.id === 28 && data.run === "W" && momentumScore <= -25) || (data.id === 37 && data.run === "1") || (data.id === 46 && data.run === "1"  && momentumScore <= -16)) {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#C68642',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWickerValueText}>{data.run}kk</Text>
          </Row>
        )
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 99) || (data.id === 19 && data.run === "1" && battingStrikeRate <= 99)) {
        return (
          <Row style={styles.strikeRateValueSquareWhite}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#fff',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate120ValueText}>{data.run}n.</Text>
          </Row>
      )
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 120) || (data.id === 19 && data.run === "2" && battingStrikeRate <= 120) || (data.id === 10 && data.run === "1" && battingStrikeRate <= 99) || (data.id === 19 && data.run === "1") || (data.id === 28 && data.run === "0") || (data.id === 28 && data.run === "4" && momentumScore >= 16 && momentumScore <= 25) || (data.id === 37 && data.run === "4" && momentumScore <= 15) || (data.id === 37 && data.run === "0" && momentumScore >= 16 && momentumScore <= 25) || (data.id === 46 && data.run === "W" && momentumScore <= -15) || (data.id === 46 && data.run === "W" && momentumScore <= -6)  || (data.id === 46 && data.run === "6" && momentumScore >= 16 && momentumScore <= 25) || (data.id === 55 && data.run === "2") || (data.id === 64 && data.run === "4")) {
        if (data.run === "W") {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#f7ff00',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWickerValueText}>{data.run}LL</Text >
          </Row>
      )
    }
    else {
      return (
        <Row style={styles.strikeRate100ValueSquareYellow}>
        <Animated.View style={
        {opacity,
          width: '100%',
          height: '100%',
          //backgroundColor: 'transparent',
          borderColor: '#fff',
          borderWidth: 2,
        backgroundColor: '#f7ff00',
        position: 'absolute',}}>
        </Animated.View>
            <Text style={styles.strikeRate120ValueText}>{data.run}m.</Text>
        </Row>
    )
    }
      }
      else if ((data.id === 19 && data.run === "2") || (data.id === 28 && data.run === "2") || (data.id === 37 && data.run === "0" && momentumScore <= 5) || (data.id === 46 && data.run === "1" && momentumScore <= 5) || (data.id === 55 && data.run === "1" && formScore <= 30) || (data.id === 64 && data.run === "2")) {
        return (
          <Row style={styles.strikeRateValueSquareWhite}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#fff',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate120ValueText}>{data.run}nn</Text>
          </Row>
      )
      }
      else if ((data.id === 10 && data.run === "2") || (data.id === 19 && data.run === "4") || (data.id === 28 && data.run === "4" && momentumScore <= 15) || (data.id === 37 && data.run === "3") || (data.id === 46 && data.run === "0")) {
        return (
          <Row style={styles.strikeRateValueSquareLightBlue}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#5bd1fc',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate140ValueText}>{data.run}h</Text>
          </Row>
      )
      }
      else if ((data.id === 10 && data.run === "4") || (data.id === 19 && data.run === "6") || (data.id === 28 && data.run === "4" && momentumScore <= 25) || (data.id === 28 && data.run === "6" && momentumScore > 25) || (data.id === 37 && data.run === "0" && momentumScore <= 25) || (data.id === 37 && data.run === "4" && momentumScore > 25) || (data.id === 46 && data.run === "6") || (data.id === 46 && data.run === "4" && momentumScore > 25) || (data.id === 55 && data.run === "4") || (data.id === 64 && data.run === "6")) {
        return (
          <Row style={styles.strikeRateGreenValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#7CFC00',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate141ValueText}>{data.run}ix</Text>
          </Row>
      )
      }
      else if ((data.id === 28 && data.run === "6") || (data.id === 37 && data.run === "4" && momentumScore > 25) || (data.id === 46 && data.run === "4")) {
        return (
          <Row style={styles.greyValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#ffbf00',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate141ValueText}>{data.run}oo</Text>
          </Row>
      )
      }
      else {
        return (
          <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>{data.run}</Text>
          </Row>
      )
      }
    }
}

getOpacity = (data, index, cardNumberValue) => {

  console.log(data.id + " aaa");
  console.log(data.run + " bbb");


  let battingStrikeRate = 1000;
  if ((data.id === 10 && (data.run === "0" || data.run === "1" || data.run === "2" || data.run === "4" || data.run === "W")) || (data.id === 19 && data.run === "0" ) || (data.id === 19 && (data.run === "4" || data.run === "0" || data.run === "6" || data.run === "2" || data.run === "1"))) {
    const gameRunEvents = this.props.gameRuns.gameRunEvents;
    const players = this.props.players.players;
    //const facingBall = this.props.players.facingBall;

    let facingBall = 1;

    if (this.props.overPageFlag === true) {
    facingBall = this.props.overPageFacingBall;
    }
    else {
      facingBall = this.props.players.facingBall;
    }


    const battingStrikeRateArray = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);

    battingStrikeRate = battingStrikeRateArray[2];
}

let momentumScore = 1000;
if ((data.id === 28 && (data.run === "W" || data.run === "4" || data.run === "6")) || (data.id === 37 && (data.run === "4" || data.run === "0" || data.run === "6" || data.run === "1" || data.run === "3")) || (data.id === 46 && (data.run === "W" || data.run === "1" || data.run === "4" || data.run === "6"))) {
const runRateValue = this.displayRequiredRunRate();
const runRate = runRateValue[0];
console.log(runRate);

const display = this.getDisplayRunsTotal();
const wickets = display[1];
console.log(wickets);

momentumScore = this.props.momentum.momentum;
}

let formScore = 1000;
if ((data.id === 55 && (data.run === "W" || data.run === "1" || data.run === "0" || data.run === "2" || data.run === "4")) || (data.id === 64 && (data.run === "0" || data.run === "2" || data.run === "4" || data.run === "6"))) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;

  const getFormScore = CardBoard.getFormScore(players, facingBall, gameRunEvents);
  console.log(getFormScore);
  const formScoreOne = getFormScore[0];
  const formScoreTwo = getFormScore[1];

  if (facingBall === 1) {
    formScore = formScoreOne;
  }
  else {
    formScore = formScoreTwo;
  }
  console.log(formScore);
}

  const opacity = this.animatedValueRuns.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 1]
  })

  if (data.col === cardNumberValue && data.header === 1) {
    return (
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueText}>{data.run}</Text>
      </Row>
  )
  }
  else if (data.col === cardNumberValue && data.run === "4" && battingStrikeRate === 1000 && momentumScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
      return (
        <Animated.View style={{opacity}}>
        <Row style={styles.fourValueSquareOpacity}>
          <Text style={styles.rundValueTextOpacity}>{data.run}j</Text>
        </Row>
        </Animated.View>
    )
    }
    else if (data.col === cardNumberValue && data.run === "W" && battingStrikeRate === 1000 && momentumScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 28 || data.id != 46 || data.id != 55 || data.id != 64)) {
        return (
          <Animated.View style={{opacity}}>
          <Row style={styles.wicketValueSquareOpacity}>
              <Text style={styles.rundValueTextOpacity}>{data.run}</Text>
          </Row>
          </Animated.View>
      )
      }
      else if (data.col === cardNumberValue && data.run === "6" && battingStrikeRate === 1000 && momentumScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
          return (
            <Animated.View style={{opacity}}>
            <Row style={styles.sixValueSquareOpacity}>
                <Text style={styles.rundValueTextOpacity}>{data.run}zz</Text>
            </Row>
            </Animated.View>
        )
        }
    else if (data.col === cardNumberValue) {
      console.log(data.id + " ID a");
      console.log(data.run + " run a");
      console.log(battingStrikeRate + " Strike rate a");
      if ((data.id === 10 && data.run === "W") || (data.id === 19 && data.run === "0" && (battingStrikeRate <= 30 || isNaN(parseFloat(battingStrikeRate)))) || (data.id === 28 && data.run === "0") || (data.id === 28 && data.run === "W" && momentumScore <= -26) || (data.id === 37 && data.run === "6") || (data.id === 37 && data.run === "4" && momentumScore <= -6 && momentumScore >= -15) || (data.id === 46 && data.run === "W" && momentumScore <= -26) || (data.id === 46 && data.run === "W" && momentumScore <= -6) || (data.id === 55 && data.run === "W") || (data.id === 64 && data.run === "0")) {
        if (data.run === "W" && momentumScore <= -26 && data.id != 28) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRateWValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRateWValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}</Text >

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 28 && data.run === "W" && momentumScore >= -15) || (data.id === 28 && data.run === "0" && momentumScore <= -6 && momentumScore >= -15) || (data.id === 37 && data.run === "0" && momentumScore >= -15)  || (data.id === 37 && data.run === "4" && momentumScore <= -6 && momentumScore >= -15)|| (data.id === 46 && data.run === "4" && momentumScore >= -15) || (data.id === 46 && data.run === "W" && momentumScore <= -6 && momentumScore >= -15)) {
      return (
        <Animated.View style={{opacity}}>
        <View style={styles.strikeRate60ValueSquareDarkOpacityUnderLB}>
        <Row style={styles.strikeRateWValueSquareDarkOpacityLB}>

            <Text style={styles.rundValueTextOpacity}>{data.run}xx</Text>

        </Row>
          </View>
        </Animated.View>
    )
    }
      else {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRateWValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRateWValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}yy</Text >

          </Row>
            </View>
          </Animated.View>
      )
      }
      }
      else if ((data.id === 28 && data.run === "W" && momentumScore <= -16 && momentumScore >= -26) || (data.id === 37 && data.run === "1" && momentumScore <= -16 && momentumScore >= -26) || (data.id === 46 && data.run === "1" && momentumScore <= -16 && momentumScore >= -26)) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate140ValueSquareDarkOpacityUnder2}>
          <Row style={styles.strikeRate140ValueSquareDarkOpacity2}>

              <Text style={styles.rundValueTextOpacity}>{data.run}[</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "0") || (data.id === 19 && data.run === "0" && battingStrikeRate <= 60) || (data.id === 28 && data.run === "0") || (data.id === 37 && data.run === "4" && momentumScore <= 15)  || (data.id === 46 && data.run === "W" && momentumScore <= -15) || (data.id === 55 && data.run === "1" && formScore <= 20) || (data.id === 64 && data.run === "1")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate60ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate60ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 99) || (data.id === 19 && data.run === "1" && battingStrikeRate <= 99)) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate120ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate120ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}.x</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 99) || (data.id === 19 && data.run === "1") || (data.id === 37 && data.run === "4" && momentumScore <= -6) || (data.id === 46 && data.run === "W" && momentumScore <= -6)) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate100ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate100ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}ua</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 120) || (data.id === 19 && data.run === "2" && battingStrikeRate <= 120) || (data.id === 28 && data.run === "4" && momentumScore >= 16 && momentumScore <= 25) || (data.id === 37 && data.run === "0" && momentumScore >= 16 && momentumScore <= 25) || (data.id === 46 && data.run === "6" && momentumScore >= 16 && momentumScore <= 25) ||  (data.id === 55 && data.run === "2") || (data.id === 64 && data.run === "4")) {
        return (
        <Animated.View style={{opacity}}>
        <View style={styles.strikeRate60ValueSquareDarkOpacityUnderYellow}>
        <Row style={styles.strikeRate60ValueSquareDarkOpacityYellow}>

            <Text style={styles.rundValueTextOpacityDark}>{data.run}.f</Text>

        </Row>
          </View>
        </Animated.View>
      )
      }
      else if ((data.id === 19 && data.run === "2") || (data.id === 28 && data.run === "2") || (data.id === 37 && data.run === "0" && momentumScore <= 5) || (data.id === 46 && data.run === "1" && momentumScore <= 5)  || (data.id === 55 && data.run === "1" && formScore <= 30) || (data.id === 64 && data.run === "2")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate120ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate120ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}ya</Text >

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "2") || (data.id === 19 && data.run === "4") || (data.id === 28 && data.run === "4" && momentumScore <= 15) || (data.id === 37 && data.run === "3") || (data.id === 46 && data.run === "0")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRateValueSquareDarkOpacityUnderLightBlue}>
          <Row style={styles.strikeRateValueSquareDarkOpacityLightBlue}>

              <Text style={styles.rundValueTextOpacity}>{data.run}.n</Text>

          </Row>
            </View>
          </Animated.View >
      )
      }
      else if ((data.id === 10 && data.run === "4") || (data.id === 19 && data.run === "6") || (data.id === 28 && data.run === "4" && momentumScore <= 25) || (data.id === 28 && data.run === "6" && momentumScore > 25) || (data.id === 37 && data.run === "0" && momentumScore <= 25) || (data.id === 37 && data.run === "4" && momentumScore > 25) || (data.id === 46 && data.run === "6") || (data.id === 46 && data.run === "4" && momentumScore > 25) || (data.id === 55 && data.run === "4") || (data.id === 64 && data.run === "6")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate140ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate140ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}m</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 28 && data.run === "6") || (data.id === 37 && data.run === "4" && momentumScore > 25) || (data.id === 46 && data.run === "4")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate141ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate141ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}n</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else {
        return (
          <Animated.View style={{opacity}}>
          <Row style={styles.runValueSquareOpacity}>
              <Text style={styles.rundValueTextOpacity}>{data.run}..</Text>
          </Row>
          </Animated.View>
      )
      }
    }
}

getDarkOpacity = (data, index, cardNumberValue) => {
  //THIS IS WHEN ALL THE ROWS ARE DARK.

  let battingStrikeRate = 1000;
  if ((data.id === 10 && (data.run === "0" || data.run === "1" || data.run === "2" || data.run === "4" || data.run === "W")) || (data.id === 19 && (data.run === "0" || data.run === "4" || data.run === "6" || data.run === "1") )) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;

  const battingStrikeRateArray = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);

  battingStrikeRate = battingStrikeRateArray[2];
}

let momentumScore = 1000;
if ((data.id === 28 && (data.run === "W" || data.run === "4" || data.run === "6" || data.run === "0")) || (data.id === 37 && (data.run === "4" || data.run === "0" || data.run === "6" || data.run === "1" || data.run === "3")) || (data.id === 46 && (data.run === "W" || data.run === "1" || data.run === "4" || data.run === "6")) || (data.id === 55 && (data.run === "W"))) {
const runRateValue = this.displayRequiredRunRate();
const runRate = runRateValue[0];
console.log(runRate);

const display = this.getDisplayRunsTotal();
const wickets = display[1];
console.log(wickets);

momentumScore = this.props.momentum.momentum;
}

let formScore = 1000;
if ((data.id === 55 && (data.run === "W" || data.run === "1" || data.run === "0" || data.run === "2" || data.run === "4")) || (data.id === 64 && (data.run === "0" || data.run === "2" || data.run === "4" || data.run === "6"))) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;

  const getFormScore = CardBoard.getFormScore(players, facingBall, gameRunEvents);
  console.log(getFormScore);
  const formScoreOne = getFormScore[0];
  const formScoreTwo = getFormScore[1];

  if (facingBall === 1) {
    formScore = formScoreOne;
  }
  else {
    formScore = formScoreTwo;
  }
  console.log(formScore);
}

  const opacity = this.animatedValueRuns.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1, 1]
  })

  if (data.col === cardNumberValue && data.header === 1) {
    return (
    <Row style={styles.CardValueSquare}>
      <Text style={styles.CardValueText}>{data.run}</Text>
    </Row>
  )
  }
  else if (data.col === cardNumberValue && data.run === "4" && battingStrikeRate === 1000 && momentumScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
      return (
        <Animated.View style={{opacity}}>
        <Row style={styles.fourValueSquareDarkOpacity}>
          <Text style={styles.rundValueTextOpacity}>{data.run}o</Text>
        </Row>
        </Animated.View >
    )
    }
    else if (data.col === cardNumberValue && data.run === "W" && battingStrikeRate === 1000 && momentumScore === 1000 && (data.id != 10 || data.id != 28 || data.id != 46 || data.id != 55 || data.id != 64)) {
        return (
          <Animated.View style={{opacity}}>
          <Row style={styles.wicketValueSquareDarkOpacity}>
              <Text style={styles.rundValueTextOpacity}>{data.run}.k</Text>
          </Row>
          </Animated.View>
      )
      }
      else if (data.col === cardNumberValue && data.run === "6" && battingStrikeRate === 1000 && momentumScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
          return (
            <Animated.View style={{opacity}}>
            <Row style={styles.sixValueSquareDarkOpacity}>
                <Text style={styles.rundValueTextOpacity}>{data.run}q</Text>
            </Row>
            </Animated.View>
        )
        }
    else if (data.col === cardNumberValue) {
      console.log(data.id + " ID c");
      console.log(data.run + " run c");
      console.log(battingStrikeRate + " Strike rate ac");
      if ((data.id === 10 && data.run === "W") || (data.id === 19 && data.run === "0" && (battingStrikeRate <= 30 || isNaN(parseFloat(battingStrikeRate)))) || (data.id === 28 && data.run === "W" && momentumScore <= -26) || (data.id === 37 && data.run === "6") || (data.id === 46 && data.run === "W" && momentumScore <= -26) || (data.id === 55 && data.run === "W") || (data.id === 64 && data.run === "0")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRateWValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRateWValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}t</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 28 && data.run === "W" && momentumScore <= -15 && momentumScore >= -25) || (data.id === 37 && data.run === "1") || (data.id === 46 && data.run === "1"  && momentumScore <= -16)) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate140ValueSquareDarkOpacityUnder2}>
          <Row style={styles.strikeRate140ValueSquareDarkOpacity2}>

              <Text style={styles.rundValueTextOpacity}>{data.run}q</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "0") || (data.id === 19 && data.run === "0" && battingStrikeRate <= 60) || (data.id === 55 && data.run === "1" && formScore <= 20) || (data.id === 64 && data.run === "1")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate60ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate60ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}uc</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 28 && data.run === "0" && momentumScore <= -6 && momentumScore >= -15) || (data.id === 37 && data.run === "4" && momentumScore <= -6 && momentumScore >= -15) || (data.id === 46 && data.run === "W" && momentumScore <= -6 && momentumScore >= -15)) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate60ValueSquareDarkOpacityUnderLB}>
          <Row style={styles.strikeRateWValueSquareDarkOpacityLB}>

              <Text style={styles.rundValueTextOpacity}>{data.run}xc</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 99) || (data.id === 19 && data.run === "1" && battingStrikeRate <= 99)) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate120ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate120ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}.x</Text>

          </Row>
            </View>
          </Animated.View >
      )
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 120) || (data.id === 19 && data.run === "2") || (data.id === 19 && data.run === "2"  && battingStrikeRate <= 120) || (data.id === 28 && data.run === "4" && momentumScore >= 16 && momentumScore <= 25) || (data.id === 37 && data.run === "4" && momentumScore <= -6) || (data.id === 37 && data.run === "0" && momentumScore >= 16 && momentumScore <= 25) || (data.id === 46 && data.run === "W" && momentumScore <= -6)  || (data.id === 46 && data.run === "6" && momentumScore >= 16 && momentumScore <= 25)|| (data.id === 55 && data.run === "2") || (data.id === 64 && data.run === "4")) {
        return (


          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate60ValueSquareDarkOpacityUnderYellow}>
          <Row style={styles.strikeRate60ValueSquareDarkOpacityYellow}>

              <Text style={styles.rundValueTextOpacityDark}>{data.run}.b</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 120) || (data.id === 19 && data.run === "2") || (data.id === 28 && data.run === "2") || (data.id === 37 && data.run === "0" && momentumScore <= 5) || (data.id === 46 && data.run === "1" && momentumScore <= 5) || (data.id === 55 && data.run === "1" && formScore <= 30) || (data.id === 64 && data.run === "2")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate120ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate120ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}.z</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "2") || (data.id === 19 && data.run === "4") || (data.id === 28 && data.run === "4" && momentumScore <= 15) || (data.id === 37 && data.run === "3") || (data.id === 46 && data.run === "0")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRateValueSquareDarkOpacityUnderLightBlue}>
          <Row style={styles.strikeRateValueSquareDarkOpacityLightBlue}>

              <Text style={styles.rundValueTextOpacity}>{data.run}s.</Text>

          </Row>
            </View>
          </Animated.View >
      )
      }
      else if ((data.id === 10 && data.run === "4") || (data.id === 19 && data.run === "6") || (data.id === 28 && data.run === "4" && momentumScore <= 25) || (data.id === 28 && data.run === "6" && momentumScore > 25) || (data.id === 37 && data.run === "0" && momentumScore <= 25) || (data.id === 37 && data.run === "4" && momentumScore > 25) || (data.id === 46 && data.run === "6") || (data.id === 46 && data.run === "4" && momentumScore > 25) || (data.id === 55 && data.run === "4") || (data.id === 64 && data.run === "6")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate140ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate140ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}r</Text>

          </Row>
            </View>
          </Animated.View >
      )
      }
      else if ((data.id === 28 && data.run === "6") || (data.id === 37 && data.run === "4" && momentumScore > 25) || (data.id === 46 && data.run === "4")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate141ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate141ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}x</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else {
        return (
          <Animated.View style={{opacity}}>
          <Row style={styles.runValueSquareDarkOpacity}>
              <Text style={styles.rundValueTextOpacity}>{data.run}.</Text>
          </Row>
          </Animated.View>
      )
      }
    }
}

BoardDisplayStrikeRateTop = () => {
  if (this.props.overPageFlag != true) {
    return (
      <Row style={{paddingTop: 10}}>
        <BoardDisplayStrikeRateTop />
      </Row>
    )
  }
}

getBoardDisplay = () => {

  if (this.props.overPageFlag === false) {
  return (
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
        <View style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 15}}>
        {this.BoardDisplayStrikeRateTop()}
        {this.getScorecard()}
        </View >
      </LinearGradient>
    </ImageBackground>
  )
}
else {
  return (
        <Grid style={{paddingLeft: 15, paddingRight: 15}}>
        {this.BoardDisplayStrikeRateTop()}
        {this.getScorecard()}
        </Grid>
  )
}
}

getView = () => {

  if (this.state.loadingBoard === true) {

    return (
      <Col style={{justifyContent: 'center', textAlign: 'center', height: '100%', height: '100%', backgroundColor: '#c471ed', width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator
        style={{ color: '#fff', height: 200, width: 'auto' }}
        size="large"
        color="#fff"
      />
      <Text style={{ color: '#fff', fontSize: 30, width: 'auto' }}>Loading...3</Text >

      </Col >
    )

    /*
    return (
      <View style={{ flex: 1 }}>
  <WebView
    onLoad={() => this.hideSpinner()}
    style={{ flex: 1 }}
  />
  {this.state.loadingBoard && (
    <ActivityIndicator
      style={{ color: '#fff', height: 200, width: 'auto' }}
      size="large"
      color="#fff"
    />
  )}
  </View>
);
*/
  }
  else {
    return(
      <Col>
    {this.getBoardDisplay()}
    </Col>
  )

  }
}


hideSpinner() {
  console.log('when is this hit hideSpinnder?');
this.setState({ loadingBoard: false });
}

  render() {
    return (
        <Grid>
          {this.getView()}
        </Grid>
    );
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  ball: state.ball,
  gameCards: state.gameCards,
  players: state.players,
  firstInningsRuns: state.firstInningsRuns,
  momentum: state.momentum,
  playerRuns: state.playerRuns,
  toggle: state.toggle,
});

export default connect(mapStateToProps)(BoardDisplayTopAttack);

/*
Native Base StyleSheet
*/
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  gridStyle: {
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  CardValueText: {
    color: '#ccc',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
    padding: 5,
  },
  CardValueTextRuns: {
    color: '#ccc',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  CardValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
  },
  runValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
  },
  runValueSquareOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.6)',
  },
  runValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  wicketValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#FF69B4',
    borderWidth: 2,
  },
  wicketValueSquareOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(100,41,71,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.6)',
  },
  wicketValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(100,41,71,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  rundValueText: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  sixValueText: {
    color: '#555',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  rundValueTextOpacity: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
    opacity: 0.5,
  },
  rundValueTextOpacityDark: {
    color: '#333',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
    opacity: 0.5,
  },
  sixValueSquare: {
    width: '100%',
    height: 'auto',
    borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#7CFC00',
    borderWidth: 2,
  },
  sixValueSquareOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(49,99,0,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.6)',
  },
  sixValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(49,99,0,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  fourValueSquare: {
    width: '100%',
    height: 'auto',
    borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#f7ff00',
    borderWidth: 2,
  },
  fourValueSquareOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(97,100,0,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.6)',
  },
  fourValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(97,100,0,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRate120ValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.6)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.6)',
  },
  strikeRate120ValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'transparent',
    //borderWidth: 2,
    backgroundColor: 'rgb(255,255,255)',
  },
  strikeRate120ValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRateValueSquareWhite: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 2,
  },
  strikeRate120ValueText: {
    color: '#555',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRate60ValueSquareDarkOpacityLB: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(198,134,66,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(198,134,66,0.8)',
  },
  strikeRate60ValueSquareDarkOpacityUnderLB: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'transparent',
    //borderWidth: 2,
    backgroundColor: '#c68642',
  },
  strikeRate60ValueSquareDarkOpacityUnderLB2: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(198,134,66,0.8)',
    borderWidth: 2,
    backgroundColor: '#c68642',
  },
  strikeRate60ValueSquareDarkOpacityUnderYellow: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'transparent',
    //borderWidth: 2,
    backgroundColor: 'rgba(0, 0, 0,0.8)',
  },
  strikeRate60ValueSquareDarkOpacityYellow: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(247, 255, 0,0.4)',
    borderWidth: 2,
    backgroundColor: 'rgba(247, 255, 0,0.4)',
  },
  strikeRate140ValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'rgba(77,44,93,0.8)',
    //borderWidth: 2,
    borderColor: 'rgba(49,99,0,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(49,99,0,0.9)',
  },
  strikeRate140ValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(49,99,0,0.9)',
    borderWidth: 2,
    backgroundColor: '#7CFC00',
  },
  strikeRate140ValueSquareDarkOpacity2: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'rgba(77,44,93,0.8)',
    //borderWidth: 2,
    borderColor: 'rgba(198,134,66,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(198,134,66,0.9)',
  },
  strikeRate140ValueSquareDarkOpacityUnder2: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(198,134,66,0.9)',
    borderWidth: 2,
    backgroundColor: '#7CFC00',
  },
  strikeRate140ValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRateValueSquareLightBlue: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#5bd1fc',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRate140ValueText: {
    color: '#555',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRate141ValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRate141ValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'transparent',
    //borderWidth: 2,
    backgroundColor: 'rgb(247, 255, 0)',
  },
  strikeRateValueSquareDarkOpacityLightBlue: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(91, 209, 252,0.1)',
    borderWidth: 2,
    backgroundColor: 'rgba(91, 209, 252,0.1)',
  },
  strikeRateValueSquareDarkOpacityUnderLightBlue: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  strikeRate141ValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRate141ValueText: {
    color: '#555',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRate100ValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRate100ValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'rgb(247, 255, 0)',
    //borderColor: '#fff',
    //borderWidth: 2,
    backgroundColor: '#fff',
  },
  strikeRate100ValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRateValueSquareLB: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#c68642',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRate100ValueSquareYellow: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#f7ff00',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRate100ValueText: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRate60ValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRate60ValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'transparent',
    //borderWidth: 2,
    backgroundColor: '#FF8300',
  },
  strikeRate60ValueSquareDarkOpacityOrange: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(255, 191, 0,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(255, 191, 0,0.9)',
  },
  strikeRate60ValueSquareDarkOpacityUnderOrange: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
    backgroundColor: '#ffbf00',
  },
  strikeRateValueSquareLightOrange: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#ff8300',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRate60ValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#FF8300',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRate60ValueText: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRateWValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRateWValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'transparent',
    //borderWidth: 2,
    backgroundColor: '#FF69B4',
  },
  strikeRateWValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#FF69B4',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRateM6ValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#ff8300',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRateBrownValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#C68642',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRateGreenValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#7CFC00',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRateWValueText: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRateWickerValueText: {
    color: '#FF69B4',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRateWickerValueTextRedBG: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  mometumValueMore26SquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(255,191,0,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(255,191,0,0.8)',
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  linearGradient: {
    opacity: 0.9
  },
  linearGradientOpacity: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    opacity: 0.9,
  },

});

/*

<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>&nbsp;</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>A</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>2</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>3</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>4</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>5</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>6</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>7</Text>
  </Row>
</Col>
<Col>
<Row style={styles.CardValueSquare}>
<Text style={styles.CardValueText}>A</Text>
</Row>
<Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
</Row>
<Row style={styles.runValueSquare}>
<Text style={styles.rundValueText}>3</Text>
</Row>
<Row style={styles.fourValueSquare}>
  <Text style={styles.rundValueText}>4</Text>
</Row>
<Row style={styles.wicketValueSquare}>
    <Text style={styles.rundValueText}>W</Text>
</Row>
<Row style={styles.runValueSquare}>
<Text style={styles.rundValueText}>2</Text>
</Row>
<Row style={styles.runValueSquare}>
<Text style={styles.rundValueText}>1</Text>
</Row>
<Row style={styles.sixValueSquare}>
    <Text style={styles.rundValueText}>6</Text>
</Row>
</Col>
<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>2</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>2</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.fourValueSquare}>
    <Text style={styles.rundValueText}>4</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
</Col>
<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>3</Text>
  </Row>
  <Row style={styles.fourValueSquare}>
    <Text style={styles.rundValueText}>4</Text>
  </Row>
  <Row style={styles.wicketValueSquare}>
    <Text style={styles.rundValueText}>W</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>2</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
</Col>
<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>4</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.fourValueSquare}>
    <Text style={styles.rundValueText}>4</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.sixValueSquare}>
    <Text style={styles.rundValueText}>6</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.fourValueSquare}>
    <Text style={styles.rundValueText}>4</Text>
  </Row>
</Col>
<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>5</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>2</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.fourValueSquare}>
    <Text style={styles.rundValueText}>4</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.wicketValueSquare}>
    <Text style={styles.rundValueText}>W</Text>
  </Row>
</Col>
<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>6</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>2</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
</Col>
<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>7</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.fourValueSquare}>
    <Text style={styles.rundValueText}>4</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.sixValueSquare}>
    <Text style={styles.rundValueText}>6</Text>
  </Row>
  <Row style={styles.wicketValueSquare}>
    <Text style={styles.rundValueText}>W</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
</Col>

*/
