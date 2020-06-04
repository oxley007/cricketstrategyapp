import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions } from 'react-native';

import { connect } from "react-redux";

import { updateOver } from '../../Reducers/over';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayerRuns } from '../../Reducers/playerRuns';

import BallDiff from '../../Util/BallDiff.js';

/* animation prackage */
import * as Animatable from 'react-native-animatable';

class RequiredRunRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
    };
  }

  state = {
    gameRunEvents: this.props.gameRuns.gameRunEvents || [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', batterID: 0, bowlerID: 0}],
    eventID: this.props.gameRuns.eventID || 0,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    playerRuns: this.props.playerRuns.wickets || 0,
    playerRuns: this.props.playerRuns.totalRuns || 0,
  };

  handleChange = ( gameRuns, ball, playerRuns ) => {
    this.setState({ gameRuns });
    this.setState({ ball });
    this.setState({ playerRuns });
  };

  componentDidUpdate() {
    let gameRunEvents = this.props.gameRuns.gameRunEvents;
    console.log(gameRunEvents);

    let lastEventNumber = gameRunEvents.length-1;
    let runEventsLast = gameRunEvents[lastEventNumber];
        if (runEventsLast.runsValue === 0 ) {
          if(this.animatedTextRef) {
            this.animatedTextRef.startAnimation(2000,() => {})
          }
        }
        else {
          if(this.animatedTextRefOne) {
         this.animatedTextRefOne.startAnimation(3000,() => {})
          }
        }
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

const ballsRemaining = 120 - ball;

/*Work out current over.
let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
let totalOver = totalBallDiff[0];
console.log(totalOver);

let totalBall = totalBallDiff[1];
let overValue = totalOver + '.' +  totalBall;
let numberOverValue = Number(overValue);
*/



//---------- end of calularte overs

//Calculate the total runs to go
//let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));

const totalRuns = this.props.playerRuns.totalRuns;
console.log(totalRuns);

let runsRequired = this.props.firstInningsRuns - totalRuns;
console.log(runsRequired);

const requiredRunRate = (runsRequired / ballsRemaining) * 6;
console.log(requiredRunRate);

/*workout required run rate:
console.log(numberOverValue);
let runRate = totalRuns / numberOverValue;
console.log(runRate);
*/


  const requiredRunRateOneDecimal = parseFloat(requiredRunRate).toFixed(1);
  return ['RRR: ' + requiredRunRateOneDecimal];

}

/*
getDisplayRunsTotal() {

  let gameRunEvents = this.props.gameRuns.gameRunEvents;

  let sum = a => a.reduce((acc, item) => acc + item);
  let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
  console.log(totalRuns);

  //Get total wickets
  let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
  let totalWickets = getWicketCount[0];
  console.log(totalWickets);

  //----------calculate overs
  let over = this.props.ball.over;
  let ball = 0;

  let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
  let ballTotal = legitBall[0];

  ball = sum(ballTotal.map(acc => Number(acc)));

  let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
  let totalOver = totalBallDiff[0];

  let totalBall = totalBallDiff[1];
  //---------- end of calularte overs

  return [totalRuns, totalWickets, totalOver, totalBall]
}
*/

/*
displayRequiredRunRate() {

  let display = this.getDisplayRunsTotal();
  let totalRuns = display[0];
  let totalWickets = display[1];
  let totalOver = display[2];
  let totalBall = display[3];

  let getRunRate = this.getRunRate();
  let runRate = getRunRate[0];

  //the seme, but with over to go.


if (totalWickets < 10) {

  return (
    <Col style={styles.rowContainer} size={2}>
      <Row style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5}} size={6}>
    <Animatable.Text animation="bounceIn" style={styles.runCountStyling} ref={ci => this.animatedTextRefOne = ci}>
      {totalRuns}/{totalWickets}
    </Animatable.Text>
    </Row>
    <Row style={{marginLeft: 5}} size={6}>
    <Animatable.Text animation="bounceIn" style={styles.overCountStyling} ref={ci => this.animatedTextRef = ci}>
      ({totalOver}.{totalBall}, {runRate})
    </Animatable.Text>
    </Row>
  </Col>
  );
}
else {
  return (
    <Col style={styles.rowContainer} size={2}>
      <Row style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5}} size={6}>
    <Animatable.Text animation="bounceIn" style={styles.runCountStyling10} ref={ci => this.animatedTextRefOne = ci}>
      {totalRuns}/{totalWickets}
    </Animatable.Text>
    </Row>
    <Row style={{marginLeft: 5}} size={6}>
    <Animatable.Text animation="bounceIn" style={styles.overCountStyling10} ref={ci => this.animatedTextRef = ci}>
      ({totalOver}.{totalBall}, {runRate})
    </Animatable.Text>
    </Row>
  </Col>
  );
}
  }
  */

  render() {
    return (
      <Row style={{marginLeft: 5, paddingLeft: 5, borderLeftColor: '#fff', borderLeftWidth: 1}}>
        <Animatable.Text animation="bounceIn" style={styles.rrCountStyling} ref={ci => this.animatedTextRef = ci}>
          {this.displayRequiredRunRate()}
        </Animatable.Text>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  ball: state.ball,
  playerRuns: state.playerRuns,
});

export default connect(mapStateToProps)(RequiredRunRate);

/*
Native Base StyleSheet
*/
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
    rowPadding: {
      bottom: PixelRatio.get() === 2 && Platform.OS === 'ios' ? 5 : 5,
    },
    runCountStyling: {
      color: '#fff',
      fontSize: PixelRatio.get() === 1 ? 30 : PixelRatio.get() === 1.5 ? 35 : PixelRatio.get() === 2 && (width < 414) ? 35 : PixelRatio.get() === 2 && (width === 414) ? 55 : 55,
    },
    overCountStyling: {
      color: '#eee',
      fontSize: PixelRatio.get() === 1 ? 10 : PixelRatio.get() === 1.5 ? 15 : PixelRatio.get() === 2 && (width < 414) ? 20 : PixelRatio.get() === 2 && (width === 414) ? 25 : 25,
      position: 'absolute',
      bottom: 5,
    },
    runCountStyling10: {
      color: '#fff',
      fontSize: PixelRatio.get() === 1 ? 20 : PixelRatio.get() === 1.5 ? 25 : PixelRatio.get() === 2 && (width < 414) ? 25 : PixelRatio.get() === 2 && (width === 414) ? 45 : 45,
    },
    overCountStyling10: {
      color: '#eee',
      fontSize: PixelRatio.get() === 1 ? 8 : PixelRatio.get() === 1.5 ? 12 : PixelRatio.get() === 2 && (width < 414) ? 16 : PixelRatio.get() === 2 && (width === 414) ? 20 : 20,
      position: 'absolute',
      bottom: 5,
    },
    rrCountStyling: {
      color: '#eee',
      fontSize: PixelRatio.get() === 1 ? 10 : PixelRatio.get() === 1.5 ? 15 : PixelRatio.get() === 2 && (width < 414) ? 20 : PixelRatio.get() === 2 && (width === 414) ? 25 : 25,
      fontSize: 16,
      textAlign: 'justify',
      lineHeight: 16,
    },
});
