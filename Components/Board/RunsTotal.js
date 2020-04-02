import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions } from 'react-native';

import { connect } from "react-redux";

import { updateOver } from '../../Reducers/over';
import { updateGameRuns } from '../../Reducers/gameRuns';

import BallDiff from '../../Util/BallDiff.js';
import RequiredRunRate from './RequiredRunRate';

/* animation prackage */
import * as Animatable from 'react-native-animatable';

class RunsTotal extends Component {

  state = {
    gameRunEvents: this.props.gameRuns.gameRunEvents || [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', batterID: 0, bowlerID: 0}],
    eventID: this.props.gameRuns.eventID || 0,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,

  };

  handleChange = ( gameRuns, ball, firstInningsRuns ) => {
    this.setState({ gameRuns });
    this.setState({ ball });
    this.setState({ firstInningsRuns });
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

getRunRate() {
  let gameRunEvents = this.props.gameRuns.gameRunEvents;
  let sum = a => a.reduce((acc, item) => acc + item);

//----------calculate overs
let ball = 0;

let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
let ballTotal = legitBall[0];
console.log(ballTotal);

ball = sum(ballTotal.map(acc => Number(acc)));
console.log(ball);

let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
let totalOver = totalBallDiff[0];
console.log(totalOver);

let totalBall = totalBallDiff[1];
let overValue = totalOver + '.' +  totalBall;
let numberOverValue = Number(overValue);

//---------- end of calularte overs

//Calculate the total runs
let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
console.log(totalRuns);

//workout run rate:
console.log(numberOverValue);
let runRate = totalRuns / numberOverValue;
console.log(runRate);

if (numberOverValue < 1) {
  let runRateOneDecimal = '';
  return ['RR: ~'];
}
else {
  let runRateOneDecimal = parseFloat(runRate).toFixed(1);
  return ['RR: ' + runRateOneDecimal];
}

}


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

displayRunsTotal() {

  let display = this.getDisplayRunsTotal();
  let totalRuns = display[0];
  let totalWickets = display[1];
  let totalOver = display[2];
  let totalBall = display[3];

  let getRunRate = this.getRunRate();
  let runRate = getRunRate[0];

if (totalWickets < 10 && this.props.overPageFlag != true) {

  return (
    <Row style={{height: 60, flex: 1,
justifyContent: 'flex-end',}} size={2}>
      <Col style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5}} size={8}>
    <Animatable.Text animation="bounceIn" style={styles.runCountStyling} ref={ci => this.animatedTextRefOne = ci}>
      {totalRuns}/{totalWickets}<Text style={styles.overCountStyling}> ({totalOver}.{totalBall})</Text >
    </Animatable.Text>
    </Col>
    <Col size={4}>
    <Row>
      <Animatable.Text animation="bounceIn" style={{fontSize: 10}} ref={ci => this.animatedTextRef = ci}>

      </Animatable.Text>
    </Row>
    <Row>
      <Animatable.Text animation="bounceIn" style={{fontSize: 10}} ref={ci => this.animatedTextRef = ci}>

      </Animatable.Text>
    </Row>
      <Row style={{marginLeft: 5, paddingLeft: 5, borderLeftColor: '#fff', borderLeftWidth: 1}}>
        <Animatable.Text animation="bounceIn" style={styles.rrCountStyling} ref={ci => this.animatedTextRef = ci}>
          {runRate}
        </Animatable.Text>
      </Row>
      <RequiredRunRate firstInningsRuns={this.props.firstInningsRuns.firstInningsRuns} overPageFlag={false} />
    </Col>
  </Row>
  );
}
else if (totalWickets < 10 && this.props.overPageFlag === true) {
  return (
    <Col style={styles.rowContainer} size={6}>
      <Row style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5}} size={8}>
    <Animatable.Text animation="bounceIn" style={styles.runCountStylingOverPage} ref={ci => this.animatedTextRefOne = ci}>
      {totalRuns}/{totalWickets}
    </Animatable.Text>
    </Row>
    <Row style={{marginLeft: 5}} size={4}>
    <Animatable.Text animation="bounceIn" style={styles.overCountStylingOverPage} ref={ci => this.animatedTextRef = ci}>
      ({totalOver}.{totalBall})
    </Animatable.Text>
    </Row>
  </Col>
  );
}
else {
  return (
    <Row style={{height: 60}} size={2}>
      <Col style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5}} size={8}>
    <Animatable.Text animation="bounceIn" style={styles.runCountStyling} ref={ci => this.animatedTextRefOne = ci}>
      {totalRuns}/{totalWickets}<Text style={styles.overCountStyling}> ({totalOver}.{totalBall})</Text>
    </Animatable.Text>
    </Col>
    <Col size={4}>
    <Row>
      <Animatable.Text animation="bounceIn" style={{fontSize: 10}} ref={ci => this.animatedTextRef = ci}>

      </Animatable.Text>
    </Row>
    <Row>
      <Animatable.Text animation="bounceIn" style={{fontSize: 10}} ref={ci => this.animatedTextRef = ci}>

      </Animatable.Text>
    </Row>
      <Row style={{marginLeft: 5, paddingLeft: 5, borderLeftColor: '#fff', borderLeftWidth: 1}}>
        <Animatable.Text animation="bounceIn" style={styles.rrCountStyling} ref={ci => this.animatedTextRef = ci}>
          {runRate}
        </Animatable.Text>
      </Row>
      <RequiredRunRate firstInningsRuns={this.props.firstInningsRuns.firstInningsRuns} overPageFlag={false} />
    </Col>
  </Row>
  );
}
  }

  render() {
    return (
        <Grid>
          <Row size={10} style={styles.rowPadding}>
            {this.displayRunsTotal()}
          </Row>
        </Grid>
    );
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  ball: state.ball,
  firstInningsRuns: state.firstInningsRuns,
});

export default connect(mapStateToProps)(RunsTotal);

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
    runCountStylingOverPage: {
      color: '#fff',
      fontSize: PixelRatio.get() === 1 ? 20 : PixelRatio.get() === 1.5 ? 25 : PixelRatio.get() === 2 && (width < 414) ? 25 : PixelRatio.get() === 2 && (width === 414) ? 45 : 45,
      bottom: 10,
      position: 'absolute',
    },
    overCountStyling: {
      color: '#eee',
      fontSize: PixelRatio.get() === 1 ? 10 : PixelRatio.get() === 1.5 ? 15 : PixelRatio.get() === 2 && (width < 414) ? 20 : PixelRatio.get() === 2 && (width === 414) ? 25 : 25,
      //position: 'absolute',
      //bottom: 5,
      fontSize: 24,
      textAlign: 'justify',
      lineHeight: 16,
    },
    overCountStylingOverPage: {
      color: '#eee',
      fontSize: PixelRatio.get() === 1 ? 5 : PixelRatio.get() === 1.5 ? 10 : PixelRatio.get() === 2 && (width < 414) ? 15 : PixelRatio.get() === 2 && (width === 414) ? 20 : 20,
      //position: 'absolute',
      //bottom: 5,
      bottom: 10,
      position: 'absolute',
    },
    rrCountStyling: {
      color: '#eee',
      fontSize: PixelRatio.get() === 1 ? 10 : PixelRatio.get() === 1.5 ? 15 : PixelRatio.get() === 2 && (width < 414) ? 20 : PixelRatio.get() === 2 && (width === 414) ? 25 : 25,
      //position: 'absolute',
      //bottom: 5,
      fontSize: 16,
      textAlign: 'justify',
      lineHeight: 16,
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
    }
});
