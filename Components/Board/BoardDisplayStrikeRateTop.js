import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions, ImageBackground, Easing } from 'react-native';
import { connect } from "react-redux";

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

import CardBoard from '../../Util/CardBoard.js';
import BallDiff from '../../Util/BallDiff.js';

class BoardDisplayStrikeRateTop extends Component {
  constructor (props) {
  super(props)
  //this.springValue = new Animated.Value(0.3)
  this.animatedValue = new Animated.Value(0)
  this.animatedValueAll = new Animated.Value(0)
  this.animatedValueRuns = new Animated.Value(0)
  this.state = {
      stop: 0,
      ballCount: 0,
  };
  }

  state = {
    gameRunEvents: this.props.gameRuns.gameRunEvents || [],
    eventID: this.props.gameRuns.eventID || 0,
    facingBall: this.props.players.facingBall || 1,
    players: this.props.players.players || [],
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
    springValue: new Animated.Value(0.3),
    momentum: this.props.momentum.momentum || 0,
    momentum: this.props.momentum.momentumPrevOver || 0,
    momentumThisOver: this.props.momentum.momentumThisOver || [],
    playerRuns: this.props.playerRuns.wickets || 0,
  playerRuns: this.props.playerRuns.totalRuns || 0,
  };

  handleChange = ( gameRuns, ball, gameCards, players, firstInningsRuns, momentum, playerRuns) => {
    this.setState({ gameRuns });
    this.setState({ ball });
    this.setState({ gameCards });
    this.setState({ players });
    this.setState({ firstInningsRuns });
    this.setState({ momentum });
    this.setState({ playerRuns });
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

displayRequiredRunRate = () => {
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

const ballsRemaining = 120 - ball;

//Calculate the total runs to go
//let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));

const totalRuns = this.props.playerRuns.totalRuns;
console.log(totalRuns);

let runsRequired = this.props.firstInningsRuns.firstInningsRuns - totalRuns;
console.log(runsRequired);

const requiredRunRate = (runsRequired / ballsRemaining) * 6;
console.log(requiredRunRate);


  const runRate = parseFloat(requiredRunRate).toFixed(1);
  return [runRate];
}


getGameStrikeRate = () => {

  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;
  console.log(facingBall);

  const battingStrikeRateArray = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);

  const battingStrikeRate = battingStrikeRateArray[2];

  const opacity = this.animatedValueRuns.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1, 1]
  })

  if (battingStrikeRate <= 30) {
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
          <Text style={styles.strikeRateWValueText}>SR: {battingStrikeRate}</Text>
      </Row>
  )
  }
  else if (battingStrikeRate <= 60) {
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
          <Text style={styles.strikeRate100ValueText}>SR: {battingStrikeRate}</Text>
      </Row>
  )
  }

  else if (battingStrikeRate <= 99) {
    return (
      <Row style={styles.strikeRate100ValueSquare}>
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
          <Text style={styles.strikeRate120ValueText}>SR: {battingStrikeRate}</Text>
      </Row >
  )
  }
  else if (battingStrikeRate <= 120) {
    return (
      <Row style={styles.strikeRateValueSquareYellow} >
      <Animated.View style={
      {opacity,
        width: '100%',
        height: '100%',
        //backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 2,
      backgroundColor: 'f7ff00',
      position: 'absolute',}}>
      </Animated.View >
          <Text style={styles.strikeRate120ValueText}>SR: {battingStrikeRate}</Text>
      </Row>
  )
  }
  else if (battingStrikeRate <= 140) {
    return (
      <Row style={styles.strikeRate140ValueSquare}>
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
          <Text style={styles.strikeRate140ValueText}>SR: {battingStrikeRate}</Text>
      </Row>
  )
  }
  else if (battingStrikeRate > 140) {
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
          <Text style={styles.strikeRate141ValueText}>SR: {battingStrikeRate}</Text>
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
            <Text style={styles.strikeRateWValueText}>SR: 0</Text>
        </Row>
    )
    }
}

getMomentum = () => {

  const opacity = this.animatedValueRuns.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1, 1]
  })

  const momentumScore = this.props.momentum.momentum;

  if (momentumScore <= -26) {
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
          <Text style={styles.strikeRateWValueText}>Momentum: {momentumScore}</Text>
      </Row>
  )
  }
  else if (momentumScore <= -16) {
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
          <Text style={styles.strikeRate100ValueText}>Momentum: {momentumScore}</Text>
      </Row>
  )
  }

  else if (momentumScore <= -6) {
    return (
      <Row style={styles.strikeRate100ValueSquare}>
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
          <Text style={styles.strikeRate100ValueText}>Momentum: {momentumScore}</Text>
      </Row>
  )
  }
  else if (momentumScore <= 5) {
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
          <Text style={styles.strikeRate140ValueText}>Momentum: {momentumScore}</Text>
      </Row>
  )
  }
  else if (momentumScore <= 15) {
    return (
      <Row style={styles.strikeRate140ValueSquare}>
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
          <Text style={styles.strikeRate140ValueText}>Momentum: {momentumScore}</Text>
      </Row>
  )
  }
  else if (momentumScore <= 25) {
    return (
      <Row style={styles.strikeRate141ValueSquare}>
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
          <Text style={styles.strikeRate141ValueText}>Momentum: {momentumScore}</Text>
      </Row>
  )
  }
  else if (momentumScore >= 26) {
    return (
      <Row style={styles.greyValueSquare}>
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
          <Text style={styles.strikeRate141ValueText}>Momentum: {momentumScore}</Text>
      </Row>
  )
  }
  else {
  return (
    <Row style={styles.strikeRate120ValueSquare}>
      <Animated.View style={
      {opacity,
        width: '100%',
        height: '100%',
        borderColor: '#fff',
        borderWidth: 2,
      backgroundColor: '#fff',
      position: 'absolute',}}>
      </Animated.View>
      <Text style={styles.strikeRate120ValueText}>Momentum:</Text>
    </Row>
  )
  }

}

getPressure = () => {

  const opacity = this.animatedValueRuns.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1, 1]
  })

  const display = this.getDisplayRunsTotal();
  const wickets = display[1];
  console.log(wickets);

  //frpm here::::

  const runRateValue = this.displayRequiredRunRate();
  const runRate = runRateValue[0];
  console.log(runRate);

  //to here:::

  const getPressureScore = CardBoard.getPressureScore(runRate, wickets);
  console.log(getPressureScore[0]);
  const pressureScore = getPressureScore[0];
  console.log(pressureScore);

  if (pressureScore > 90) {
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
          <Text style={styles.strikeRateWValueText}>Pressure: {pressureScore}%</Text>
      </Row>
  )
  }
  else if (pressureScore > 80) {
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
          <Text style={styles.strikeRate100ValueText}>Pressure: {pressureScore}%</Text>
      </Row>
  )
  }

  else if (pressureScore > 60) {
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
          <Text style={styles.strikeRate120ValueText}>Pressure: {pressureScore}%</Text>
      </Row>
  )
  }
  else if (pressureScore > 45) {
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
          <Text style={styles.strikeRate140ValueText}>Pressure: {pressureScore}%</Text>
      </Row>
  )
  }
  else if (pressureScore > 30) {
    return (
      <Row style={styles.strikeRate140ValueSquare}>
      <Animated.View style={
      {opacity,
        width: '100%',
        height: '100%',
        //backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 2,
      backgroundColor: '#add8e6',
      position: 'absolute',}}>
      </Animated.View>
          <Text style={styles.strikeRate140ValueText}>Pressure: {pressureScore}%</Text>
      </Row>
  )
  }
  else if (pressureScore > 15) {
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
          <Text style={styles.strikeRate141ValueText}>Pressure: {pressureScore}%</Text>
      </Row>
  )
  }
  else if (pressureScore > 0) {
    return (
      <Row style={styles.greyValueSquare}>
      <Animated.View style={
      {opacity,
        width: '100%',
        height: '100%',
        //backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 2,
      backgroundColor: '#ddd',
      position: 'absolute',}}>
      </Animated.View>
          <Text style={styles.strikeRate141ValueText}>Pressure: {pressureScore}%</Text>
      </Row>
  )
  }
  else {
  return (
    <Row style={styles.strikeRate120ValueSquare}>
      <Animated.View style={
      {opacity,
        width: '100%',
        height: '100%',
        borderColor: '#fff',
        borderWidth: 2,
      backgroundColor: '#fff',
      position: 'absolute',}}>
      </Animated.View>
      <Text style={styles.strikeRate120ValueText}>Pressure:</Text>
    </Row>
  )
  }

}

getForm = () => {
  const opacity = this.animatedValueRuns.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1, 1]
  })

  const facingBall = this.props.players.facingBall;
  const allPlayers = this.props.players.players;
  const gameRunEvents = this.props.gameRuns.gameRunEvents;

  const getFormScore = CardBoard.getFormScore(allPlayers, facingBall, gameRunEvents);
  console.log(getFormScore);
  const formScoreOne = getFormScore[0];
  const formScoreTwo = getFormScore[1];

  let formScore = 0;
  if (facingBall === 1) {
    formScore = formScoreOne;
  }
  else {
    formScore = formScoreTwo;
  }

  console.log(formScore);

  if (formScore <= 10) {
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
          <Text style={styles.strikeRateWValueText}>Form: {formScore}</Text>
      </Row>
  )
  }
  else if (formScore <= 20) {
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
          <Text style={styles.strikeRate100ValueText}>Form: {formScore}</Text>
      </Row>
  )
  }

  else if (formScore <= 30) {
    return (
      <Row style={styles.strikeRate100ValueSquare}>
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
          <Text style={styles.strikeRate120ValueText}>Form: {formScore}</Text>
      </Row>
  )
  }
  else if (formScore <= 40) {
    return (
      <Row style={styles.strikeRate120ValueSquare}>
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
          <Text style={styles.strikeRate140ValueText}>Form: {formScore}</Text>
      </Row>
  )
  }
  else if (formScore > 40) {
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
          <Text style={styles.strikeRate141ValueText}>Form: {formScore}</Text>
      </Row>
  )
  }
  else {
  return (
    <Row style={styles.strikeRate120ValueSquare}>
      <Animated.View style={
      {opacity,
        width: '100%',
        height: '100%',
        borderColor: '#fff',
        borderWidth: 2,
      backgroundColor: '#fff',
      position: 'absolute',}}>
      </Animated.View>
      <Text style={styles.strikeRate120ValueText}>Form:</Text>
    </Row>
  )
  }

}

  render() {
    return (
      <Grid>
      <Col size={1}>
        <Row>
            <Text></Text>
        </Row>
      </Col>
      <Col size={2}>
        {this.getGameStrikeRate()}
      </Col>
      <Col size={3}>
        <Row>
            {this.getMomentum()}
        </Row>
      </Col>
      <Col size={2}>
        <Row>
            {this.getForm()}
        </Row>
      </Col>
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
});

export default connect(mapStateToProps)(BoardDisplayStrikeRateTop);

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
  strikeRate120ValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
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
  strikeRateValueSquareYellow: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#f7ff00',
    borderColor: '#fff',
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
  strikeRate140ValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRate140ValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'transparent',
    //borderWidth: 2,
    backgroundColor: 'rgb(247, 255, 0)',
  },
  strikeRate140ValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
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
    //backgroundColor: 'transparent',
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
  strikeRateWValueText: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  greyValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#ddd',
    borderWidth: 2,
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  linearGradient: {
    opacity: 0.9
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
