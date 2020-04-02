import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions } from 'react-native';
import { connect } from "react-redux";

import PartnerhsipUpgrade from './PartnerhsipUpgrade'

import { updateRuns } from '../../Reducers/runs';
import { updateOver } from '../../Reducers/over';
import { updateToggle } from '../../Reducers/toggle';

import BallDiff from '../../Util/BallDiff.js';

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
    textHeader: {
      color: '#fff',
      fontWeight: '300',
      fontSize: PixelRatio.get() === 1 ? 16 : PixelRatio.get() === 1.5 ? 20 : PixelRatio.get() === 2 && (width < 414) ? 22 : PixelRatio.get() === 2 && (width === 414) ? 24 : PixelRatio.get() === 3.5 ? 24 : PixelRatio.get() === 3 && Platform.OS === 'android' ? 20 : 24,
      },
      textDesc: {
        color: '#eee',
        fontWeight: '100',
        fontSize: PixelRatio.get() === 1 ? 10 : PixelRatio.get() === 1.5 ? 12 : PixelRatio.get() === 2 && (width < 414) ? 14 : PixelRatio.get() === 2 && (width === 414) ? 16 : PixelRatio.get() === 3.5 ? 14 : PixelRatio.get() === 3 && Platform.OS === 'android' ? 14 : 16,
      },
      rowPadding :{
        paddingTop: 15,
      },
      colCenter: {
        alignItems: 'center',
      },
      textHeaderNumber: {
        color: '#fff',
        fontSize: PixelRatio.get() === 1 ? 28 : PixelRatio.get() === 1.5 ? 32 : PixelRatio.get() === 2 && (width < 414) ? 34 : PixelRatio.get() === 2 && (width === 414) ? 40 : PixelRatio.get() === 3.5 ? 38 : PixelRatio.get() === 3 && Platform.OS === 'android' ? 34 : 40,
        lineHeight: 40,
      },
      horizontalRule: {
        borderBottomColor: '#fff',
        //borderBottomWidth: 0.5,
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 15,
        marginBottom: 15,
      },
});

class CurrentPartnership extends Component {

  state = {
    runs: this.props.runs.runs || 0,
    runEvents: this.props.runs.runEvents || [{eventID: 0, runsValue: 0, ball: -1, wicketEvent: false}],
    eventID: this.props.runs.eventID || 0,
    firstWicketIndex: this.props.runs.firstWicketIndex || 0,
    secondWicketIndex: this.props.runs.secondWicketIndex || 0,
    highestRunsPartnership: this.props.runs.highestRunsPartnership || [],
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    toggle: this.props.toggle.togglePremium || false,
  };

  handleChange = ( runs, ball ) => {
    this.setState({ runs });
    this.setState({ ball });
    this.setState({ partnership });
  };


  displayCurrentPartnership() {
    let firstWicketIndex = this.props.runs.firstWicketIndex;
    let secondWicketIndex = this.props.runs.secondWicketIndex;
    let eventID = this.props.runs.eventID;
    let highestRunsPartnership = this.props.runs.highestRunsPartnership;
    let totalRuns = this.props.runs.runs;

    console.log(this.props.runs.runEvents);
    let runEvents = this.props.runs.runEvents;

    let lastEvents = runEvents.slice(0);

    console.log(lastEvents);

    let sum = a => a.reduce((acc, item) => acc + item);

    // *** GET RUNRATE *** //
    let wicketHitFlag = false;


    const findLastWicketCount = lastEvents.reverse().map(acc => {
      console.log(acc);
      if (acc.runsType.includes('WICKET') || acc.runsType.includes('WICKET-WIDE') || acc.runsType.includes('WICKET-NO-BALL')) {
          wicketHitFlag = true;
          return 0;
        }
        else if (acc.runsType.includes('WIDE') || acc.runsType.includes('NO-BALL') || acc.runsType.includes('NO-BALLS')) {
            return 0;
          }
        else if (wicketHitFlag === false) {
          return 1;
        }
        else {
          return 0;
        }
      });

      //const findLastWicketCountEvents = runEvents.reverse()

      console.log(findLastWicketCount);
      console.log(runEvents);

      //Get the total length of the event array.
      let eventLength = runEvents.length;
      console.log(eventLength);

      //Get total wickets
      let getWicketCount = BallDiff.getWicketCount(runEvents);
      let totalWickets = getWicketCount[0];
      console.log(totalWickets);


      let findLastWicketTotal = sum(findLastWicketCount.map(acc => Number(acc)));

      if (totalWickets === 0) {
        findLastWicketTotal--
      }
      else {
        //nothing
      }


      console.log(findLastWicketTotal);



      let partnershipEvents = eventLength - findLastWicketTotal;

      console.log(partnershipEvents);

      let checkWicketBall = runEvents.slice(eventLength-1);

      console.log(checkWicketBall);

      const checkWicketBallFlag = checkWicketBall.reverse().map(acc => {
        console.log(acc);
        if (acc.runsType.includes('WICKET') || acc.runsType.includes('WICKET-WIDE') || acc.runsType.includes('WICKET-NO-BALL')) {
            return 1;
          }
          else {
            return 0;
          }
        });

        console.log(checkWicketBallFlag);

        let checkWicketBallFlagTotal = sum(checkWicketBallFlag.map(acc => Number(acc)));

        console.log(checkWicketBallFlagTotal);


      let lastPartnershipEvents = runEvents.slice(partnershipEvents);

      console.log(lastPartnershipEvents);

      let runRateOneDecimal = '';

      let totalBallDiff = BallDiff.getpartnershipDiffTotal(findLastWicketTotal);
      let totalBall = totalBallDiff[1];
      let totalOver = totalBallDiff[0];

      console.log(totalOver);
      console.log(totalBall);

      let overValue = totalOver + '.' +  totalBall;
      console.log(overValue);
      let numberOverValue = Number(overValue);

      if (checkWicketBallFlagTotal === 1 || numberOverValue === 0.0) {
        runRateOneDecimal = 0;
      }
      else {
      const lastPartnershipRunsCount = lastPartnershipEvents.map(acc => {
        console.log(acc);
        let currentPartnershipRunsInitalCount = 0
        let runs = Number(acc.runsValue);
        let extras = Number(acc.runExtras)
        currentPartnershipRunsInitalCount = currentPartnershipRunsInitalCount + runs;
        currentPartnershipRunsInitalCount = currentPartnershipRunsInitalCount + extras;
        return currentPartnershipRunsInitalCount
        });

        console.log(lastPartnershipRunsCount);

        let lastPartnershipRunsCountTotal = sum(lastPartnershipRunsCount.map(acc => Number(acc)));

        console.log(lastPartnershipRunsCountTotal);




        //workout run rate:
        console.log(numberOverValue);
        console.log(lastPartnershipRunsCountTotal);
        let runRate = lastPartnershipRunsCountTotal / numberOverValue;
        console.log(runRate);



        if (numberOverValue < 1) {
          runRateOneDecimal = '~';
        }
        else {
          runRateOneDecimal = parseFloat(runRate).toFixed(1);
        }
      }

    console.log(highestRunsPartnership);
    console.log(runEvents);
    console.log(firstWicketIndex);
    console.log(secondWicketIndex);
    let getCurrentHighpartnershipValue = BallDiff.getCurrentPartnsership(highestRunsPartnership, runEvents, firstWicketIndex, secondWicketIndex);
    let currentHighpartnershipValue = getCurrentHighpartnershipValue[0];
    console.log(currentHighpartnershipValue);
    console.log(secondWicketIndex);

    /*
      console.log('else hit for currentRunRate');
    let getCurrentRunrate = this.getCurrentRunRate(currentHighpartnershipValue, secondWicketIndex);
    let currentRunrate = getCurrentRunrate[0];
    */

    return (
      <Col size={3} style={styles.colCenter}>
        <Row>
          <H1 style={styles.textHeaderNumber}>{currentHighpartnershipValue}</H1>
        </Row>
        <Row>
          <Text style={styles.textDesc}>RR: {runRateOneDecimal}</Text>
        </Row>
      </Col>

    );
  }



  currentPartnershipDispay() {
    let ball = this.props.ball.ball;
    console.log(ball);
    if (this.props.toggle.togglePremium === false && ball >= 36) {
    return (
      <PartnerhsipUpgrade />
      )
      }
  else {
    return (
    <Row>
      <Col size={9}>
        <Row><H1 style={styles.textHeader}>Current Partnership:</H1></Row>
        <Row><Text style={styles.textDesc}>The current partnership in overs</Text></Row>
      </Col>
        {this.displayCurrentPartnership()}
    </Row>
  )
  }
  }

  render() {

    return (
        <Grid style={styles.rowPadding}>
          {this.currentPartnershipDispay()}
          <View style={styles.horizontalRule} />
        </Grid>
    );
  }
}

const mapStateToProps = state => ({
  runs: state.runs,
  ball: state.ball,
  toggle: state.toggle,
});

export default connect(mapStateToProps)(CurrentPartnership);

/*findIndex not to be used but keeping incase i need to use:
const indexOfWickets = runEvents.findIndex(x => x.wicketEvent === true);
console.log(indexOfWickets);
*/

/*

let sum = a => a.reduce((acc, item) => acc + item);

console.log(highestRunsPartnership.length);
if (!highestRunsPartnership.length) {
    console.log('!highestRunsPartnership.length hit');
    highestRunsPartnership.push(0);
  }

//Calculate the highest partnership in runsType
//loop through and log index of each wicket:
runEvents.map((currElement, index) => {
  console.log(currElement.wicketEvent + ' ' + index);
if (currElement.wicketEvent === true)
  {
    console.log('should only be hit on a wicket.');
    firstWicketIndex++
    let firstWicketFlag = 1
    console.log("The current iteration is: " + index);
    console.log("The current element is: " + currElement.wicketEvent);


    if (firstWicketIndex === 1) {
      console.log('first index is null');
      firstWicketIndex = 0;
      console.log(firstWicketIndex + ' firstWicketIndex');
      secondWicketIndex = index;
      console.log(secondWicketIndex + ' secondWicketIndex');
      firstWicketFlag = 2;
    }
    else {
      console.log('else do this');
      firstWicketIndex = secondWicketIndex;
      console.log(firstWicketIndex  + ' firstWicketIndex');
      secondWicketIndex = index;
      console.log(secondWicketIndex  + ' secondWicketIndex');
    }

    //Need to change the firstWicketFlag to a firstWicketIndex of more than 1.
    if (firstWicketFlag === 2) {
      firstWicketIndex = 2;
    }


  }
});


//Current partnership last wicket + length.
let totalEvents = runEvents.length;
let currentHighpartnershipValueRuns = sum(runEvents.slice(secondWicketIndex,totalEvents).map(acc => Number(acc.runsValue)));
let currentHighpartnershipValueExtras = sum(runEvents.slice(secondWicketIndex,totalEvents).map(acc => Number(acc.runExtras)));
let currentHighpartnershipValue = currentHighpartnershipValueRuns + currentHighpartnershipValueExtras;
console.log(currentHighpartnershipValue);

*/
