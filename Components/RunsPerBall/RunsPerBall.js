import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions } from 'react-native';
import { connect } from "react-redux";

import { updateRuns } from '../../Reducers/runs';
import { updateOver } from '../../Reducers/over';
import { updateWideCount } from '../../Reducers/wideCount';

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
      bottom: PixelRatio.get() === 2 && Platform.OS === 'ios' ? 40 : 5,
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
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 15,
        marginBottom: 15,
      },
      horizontalRuleTop: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 15,
      },
      wideStyle: {
        color: '#c471ed',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 13,
      },
      wideStyleLabel: {
        fontSize: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#c471ed',
      },
      textBall: {
        color: '#c471ed',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        fontWeight: 'bold',
      },
      ballCircle: {
        width: '100%',
  height: 'auto',
  borderRadius: 60 / 2,
  backgroundColor: '#fff',
  borderColor: '#fff',
  borderWidth: 3,
  margin: 1,
},
ballCircleExtra: {
  width: '100%',
height: 'auto',
borderRadius: 60 / 2,
backgroundColor: '#000',
borderColor: '#000',
borderWidth: 3,
margin: 1,
},
ballWicketCircle: {
  color: '#fff',
  width: '100%',
height: 'auto',
borderRadius: 60 / 2,
backgroundColor: '#c471ed',
borderColor: '#fff',
borderWidth: 3,
margin: 1,
},
wicketBall: {
  color: '#fff',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 'auto',
  marginBottom: 'auto',
  fontWeight: 'bold',
},
wicketWideStyle: {
  fontSize: 10,
  marginLeft: 'auto',
  marginRight: 'auto',
  color: '#fff',
},
ballWicketWideCircle: {
  color: '#fff',
  width: '100%',
height: 'auto',
borderRadius: 60 / 2,
backgroundColor: '#c471ed',
borderColor: '#000',
borderWidth: 3,
margin: 1,
},
yetToBeBowledCircle: {
  color: '#fff',
  width: '100%',
height: 'auto',
borderRadius: 60 / 2,
backgroundColor: 'transparent',
borderColor: '#fff',
borderWidth: 3,
margin: 1,
},
barExtras: {
  fontSize: 30,
  marginLeft: 'auto',
  marginRight: 'auto',
  color: '#fff',
},
overBowled: {
  fontSize: 20,
  marginLeft: 'auto',
  marginRight: 'auto',
  color: '#c471ed',
}
});

class RunsPerBall extends Component {

  state = {
    runs: this.props.runs.runs || 0,
    runEvents: this.props.runs.runEvents || [],
    eventID: this.props.runs.eventID || 0,
    firstWicketIndex: this.props.runs.firstWicketIndex || 0,
    secondWicketIndex: this.props.runs.secondWicketIndex || 0,
    highestRunsPartnership: this.props.runs.highestRunsPartnership || [],
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    widecount: this.props.widecount.widecount || 0,
  };

  handleChange = ( runs, ball, widecount ) => {
    this.setState({ runs });
    this.setState({ ball });
    this.setState({ widecount });
  };



  RunsPerOverDsiplay() {

    console.log('getting hit early in runPerBall');

    //Get the reunEvents from Redux.
    let runEvents = this.props.runs.runEvents;
    //A funcrtion that is used below to calculate the total values is an array i.e. 0 1 0 3 0 0 3 0 1 = a total of 8.
    let sum = a => a.reduce((acc, item) => acc + item);

    // ****** Get total overs bowled ******* //

    //----------calculate overs
    let ball = 0;

    /*
    let legitBall = BallDiff.getLegitBall(ball, runEvents);
    let ballTotal = legitBall[0];
    console.log(ballTotal);

    ball = sum(ballTotal.map(acc => Number(acc)));
    console.log(ball);
    */

    ball = gameRunEvents.length;
    ball--

    let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
    let totalBall = totalBallDiff[1];
    let totalOver = totalBallDiff[0];
    console.log(totalBall);
    let numberBallValue = Number(totalBall);
    let numberOverValue = Number(totalOver);


    // *********************** end of calularte overs *************************** //


    //Get the total length of the event array.
    let eventLength = runEvents.length;
    console.log(eventLength);

    //I DONT THINK THIS GETS USED ANY MORE????????:
    let eventLengthOver = eventLength - numberBallValue;
    console.log(eventLengthOver);

    // ************************************************** //


    //Get the array length - 20. WHy minus 20? So that we can loop through the last 20 events and work out which events belong to the current over.
    //We can't just loop through th last x ball so far in the over becouase there might have been 1 or many  wides or noballs.
    let eventLengthLastMinusTen = 0;
    if (eventLength > 10) {
      eventLengthLastMinusTen = eventLength - 10;
    }
    else {
      eventLengthLastMinusTen = eventLength - eventLength;
    }
    console.log(eventLengthLastMinusTen);
    console.log(eventLength);
    let lastValue = runEvents.slice(eventLengthLastMinusTen, eventLength);
    console.log(lastValue);


    // ********************************* HOW THIS SECTION WORKS ************************************ //

    //Loop through the Event array in reverse.
      //using the current ball value (i.e. between 0 - 6):
        //log when a legit ball )return 1), and
        //log if a wide, umtil..
        //... the current ball value has been hit.
          ///Then the rest of the ablls are returned as 0
            ///sum the total and then loop through to output the balls in the current over.

      //TO DO: need to add handle when current ball is at 0. ANd probably the first ball of the innings?

      let wideBallInOver = 0;
      let countLegitBallsMinus = 0;

      console.log(countLegitBallsMinus);
      console.log(numberBallValue);

      //might need to make a specific one for when the current ball total is 0 (ball yet to be bowled).
      const currentOverWidesMinus = lastValue.reverse().map(acc => {
        console.log(acc);
        if (acc.runsType.includes('WIDE') || acc.runsType.includes('NO-BALL') || acc.runsType.includes('NO-BALLS') || acc.runsType.includes('WICKET-WIDE') || acc.runsType.includes('WICKET-NO-BALL')) {
            if (numberBallValue === 0 && countLegitBallsMinus === 0) {
              return 1;
            }
            else {
            wideBallInOver++
            console.log('wide hit here. Now what?');
            if (countLegitBallsMinus < numberBallValue) {
              console.log('should only hit if countLegitBallsMinus is less than numberBallValue. countLegitBallsMinus = ' + countLegitBallsMinus + ' and numberBallValue = ' + numberBallValue);

              return 1;
            }
            else {
              return 0;
            }
          }
        }
        else {
          console.log('not a wide so return 0');
          if (countLegitBallsMinus < numberBallValue) {
            console.log('should only hit if countLegitBallsMinus is less than numberBallValue. countLegitBallsMinus = ' + countLegitBallsMinus + ' and numberBallValue = ' + numberBallValue);

            countLegitBallsMinus++
            return 1;
          }
          else {
            console.log(numberBallValue);
            if (numberBallValue === 0) {
              console.log(numberBallValue);
              countLegitBallsMinus++
              return 0;
            }
            else {
              return 0;
            }
          }
        }
    });

    console.log(currentOverWidesMinus);

    let checkIfZeroBallsBowledInOver = sum(currentOverWidesMinus.map(acc => Number(acc)));

      if (checkIfZeroBallsBowledInOver === 0 && numberOverValue > 0) {
        console.log('is this hit?');
        return (
          <Row>
          <Col style={styles.ballCircle} size={12}>
                <Text style={styles.overBowled}>Over Bowled</Text>
          </Col>
          </Row>
            )
      }
      else if (checkIfZeroBallsBowledInOver === 0 && numberOverValue === 0) {
        return (
          <Row>
          <Col size={5}>
            <Row>
              <Col style={styles.yetToBeBowledCircle} size={1}>
                <Text style={styles.textBall}> </Text>
              </Col>
              <Col style={styles.yetToBeBowledCircle} size={1}>
                <Text style={styles.textBall}> </Text>
              </Col>
              <Col style={styles.yetToBeBowledCircle} size={1}>
                <Text style={styles.textBall}> </Text>
              </Col>
              <Col style={styles.yetToBeBowledCircle} size={1}>
                <Text style={styles.textBall}> </Text>
              </Col>
              <Col style={styles.yetToBeBowledCircle} size={1}>
                <Text style={styles.textBall}> </Text>
              </Col>
              <Col style={styles.yetToBeBowledCircle} size={1}>
                <Text style={styles.textBall}> </Text>
              </Col>
            </Row>
          </Col>
          </Row>
        )
      }
      else {

    //calulate the total balls bowled so far in the over including wides & noballs.
    console.log(currentOverWidesMinus);
    let totalCurrentBallsMinus = sum(currentOverWidesMinus.map(acc => Number(acc)));
    console.log(totalCurrentBallsMinus);
    let numberBallValueAndExtras = totalCurrentBallsMinus;

    console.log(eventLength);
    console.log(numberBallValueAndExtras);
    eventLengthLast = eventLength - numberBallValueAndExtras;

    lastValue = runEvents.slice(eventLengthLast);

    console.log(lastValue);

    //need to move output loop here:
    let currentOverTypes = lastValue.map(acc => {
      console.log(acc);
      if (acc.runsType.includes('NO-BALLS')) {
        console.log(acc.runsValue);
        return [acc.runsValue, acc.runsType];
      }
      else if (acc.runsType.includes('WIDE') || acc.runsType.includes('NO-BALL') || acc.runsType.includes('LEG-BYE') || acc.runsType.includes('BYE') || acc.runsType.includes('WICKET-WIDE') || acc.runsType.includes('WICKET-NO-BALL')) {
          console.log('extra');
          return [acc.runExtras, acc.runsType]
        }
        else {
          console.log(acc.runsValue);
          return [acc.runsValue, acc.runsType];
        }
      });

      console.log(lastValue);
      console.log(currentOverTypes);

      let currentOverTypesReverse = lastValue.reverse().map(acc => {
        console.log(acc);
        if (acc.runsType.includes('WIDE') || acc.runsType.includes('NO-BALL') || acc.runsType.includes('NO-BALLS') || acc.runsType.includes('LEG-BYE') || acc.runsType.includes('BYE') || acc.runsType.includes('WICKET-WIDE') || acc.runsType.includes('WICKET-NO-BALL')) {
            return [acc.runExtras, acc.runsType]
          }
          else {
            return [acc.runsValue, acc.runsType];
          }
        });

        console.log(lastValue);
        console.log(currentOverTypesReverse);

        //return 1 for each abll so we can count.
      const currentOverTypesCount = lastValue.map(acc => {
        console.log(acc);
            return 1;
        });

        console.log(lastValue);
      console.log(currentOverTypesCount);
      let currentOverTypesTotal = sum(currentOverTypesCount.map(acc => Number(acc)));
      console.log(currentOverTypesTotal);

      //Check for any extras before the first legit ball has been bowled (i.e. a wide of noball on ball 0)
      let currentOverTypesTotalCheck = currentOverTypesTotal + currentOverTypesTotal + 5
      let firstBallWideCheck = runEvents.slice(numberBallValueAndExtras-currentOverTypesTotalCheck);

      console.log(firstBallWideCheck);
      let legitballHitInFirstBallWideCheck = false;

      let firstBallWideCheckCount = firstBallWideCheck.reverse().map(function(item, i){
        console.log(item);
        console.log(i);
        console.log(currentOverTypesTotal);
        i++
        if (i > currentOverTypesTotal) {
          console.log(item.runsType);
          console.log(legitballHitInFirstBallWideCheck);
          if (legitballHitInFirstBallWideCheck === false && (item.runsType.includes('WIDE') || item.runsType.includes('NO-BALL') || item.runsType.includes('NO-BALLS'))) {
            console.log('a wide on ball 0 has been hit!');
            return 1;
          }
          else {
            console.log('not a wide on ball zero.');
            legitballHitInFirstBallWideCheck = true;
            return 0;
          }
        }
        else {
          return 0;
        }
      }
    );

    console.log(firstBallWideCheckCount);
    let firstBallWideCheckCountTotal = sum(firstBallWideCheckCount.map(acc => Number(acc)));
    console.log(firstBallWideCheckCountTotal);

    let currentOverTypesTotalWithWides = currentOverTypesTotal + firstBallWideCheckCountTotal;

    console.log(currentOverTypesTotalWithWides);
    console.log(currentOverTypesTotal);
    console.log(firstBallWideCheckCountTotal);

    //check how many wides currently been bowled on current ball.

    let legitballHitInCurrentBallWideCheck = false;

    let currenttBallWideCheckCount = firstBallWideCheck.map(function(item, i){
      console.log(item);
      console.log(i);
      console.log(currentOverTypesTotal);
      i++
      if (i < currentOverTypesTotal) {
        console.log(item.runsType);
        console.log(legitballHitInFirstBallWideCheck);
        if (legitballHitInCurrentBallWideCheck === false && (item.runsType.includes('WIDE') || item.runsType.includes('NO-BALL') || item.runsType.includes('NO-BALLS'))) {
          console.log('a wide on current ball has been hit!');
          return 1;
        }
        else {
          console.log('not a wide on current ball.');
          legitballHitInCurrentBallWideCheck = true;
          return 0;
        }
      }
      else {
        return 0;
      }
    }
  );


  console.log(currenttBallWideCheckCount);
  let currentBallWideCheckCountTotal = sum(currenttBallWideCheckCount.map(acc => Number(acc)));
  console.log(currentBallWideCheckCountTotal);


/**** i need to loop through this to work out when a run is hit ****/

    let runsHitDontCheckMore = 0;

    let eventLengthWide = runEvents.length;
    let lastBallExtraCheck = runEvents.slice(eventLengthWide-1);
    const lastBallExtraCheckRunsType = lastBallExtraCheck.map(acc => {
      console.log(acc);
      return acc.runsType
    }
  );
  console.log(lastBallExtraCheckRunsType);

  let lastFourBallsExtraCheck = runEvents.slice(eventLengthWide-4);
  const lastFourBallsExtraCheckType = lastFourBallsExtraCheck.map(acc => {
    console.log(acc);
    return acc.runsType
  }
);

  let runHitInLastFourBalls = false;
  let runHitInLastFourBallsTotal = 1;
  let moreTHanOneWideCurrently = false;
  let lastFourBallsExtraCheckTypeCount = lastFourBallsExtraCheckType.reverse().map(function(item, i){
    console.log(item);
    console.log(i);
    if (runHitInLastFourBalls === false && (item.includes('WIDE') || item.includes('NO-BALL') || item.includes('NO-BALLS') || item.includes('WICKET-WIDE') || item.includes('WICKET-NO-BALL'))) {
      if (runHitInLastFourBallsTotal === 1) {
        console.log(runHitInLastFourBallsTotal);
        runHitInLastFourBallsTotal++;
        return 1;
      }
      else {
        console.log(runHitInLastFourBallsTotal);
        moreTHanOneWideCurrently = true;
        runHitInLastFourBallsTotal++;
        return 1;
      }

    }
    else {
      console.log(runHitInLastFourBalls);
      runHitInLastFourBalls = true;
      runHitInLastFourBallsTotal++;
      return 0;
    }
  });

  console.log(lastFourBallsExtraCheckTypeCount);
  console.log(moreTHanOneWideCurrently);

  lastFourBallsExtraCheckTypeCount
  let lastFourBallsExtraCheckTypeCountTotal = sum(lastFourBallsExtraCheckTypeCount.map(acc => Number(acc)));


/**** the end of the loop ****/

    console.log(currentOverTypesTotalWithWides);
    console.log(eventLengthWide);
    console.log(eventLengthLast-currentOverTypesTotalWithWides);
    let lastValueWideOnFirstBall = runEvents.slice(eventLengthWide-currentOverTypesTotalWithWides);
    console.log(lastValueWideOnFirstBall);

    let totalWidesNoBalls = currentOverTypesTotalWithWides - numberBallValue;
    console.log(totalWidesNoBalls);



    if (currentOverTypesTotalWithWides > currentOverTypesTotal) {
      //need to move output loop here:
      currentOverTypesTotal++
      numberBallValueAndExtras++
      currentOverTypes = lastValueWideOnFirstBall.map(acc => {
        console.log(acc);
        if (acc.runsType.includes('NO-BALLS')) {
          return [acc.runsValue, acc.runsType];
        }
          else if (acc.runsType.includes('WIDE') || acc.runsType.includes('NO-BALL') || acc.runsType.includes('LEG-BYE') || acc.runsType.includes('BYE') || acc.runsType.includes('WICKET-WIDE') || acc.runsType.includes('WICKET-NO-BALL')) {
            return [acc.runExtras, acc.runsType]
          }
          else {
            return [acc.runsValue, acc.runsType];
          }
        });
    }
    else {
      //do nothing.
    }

    console.log(currentOverTypes);

    /* Check if wides are bowled before the legit ball. */


    //currentOverTypesTotal = currentOverTypesTotalWithWides;
      //currentOverTypes.map((item,i) => <Text style={styles.textBall} key={i}>{item.runsType}</Text>)

      let lastBallCheck = [];
      let wideCountLoop = 0;
      let lastBallWideFlag = false;
      let lastBallWideFirstBallWideFlag = false;
      lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
      let recentFourBallsExtraCount = 0;

      console.log(numberBallValue);
      if (numberBallValue === 0 && currentOverTypesTotal === 1) {
        console.log('numberBallValue: ' + numberBallValue + '. currentOverTypesTotal: ' + currentOverTypesTotal);
        lastBallWideFlag = true;
        wideCountLoop = 1;
        }
        else if (numberBallValue === 0 && currentOverTypesTotal === 2) {
          console.log('numberBallValue: ' + numberBallValue + '. currentOverTypesTotal: ' + currentOverTypesTotal);
          lastBallWideFlag = true;
          wideCountLoop = 2;
        }
        else if (numberBallValue === 0 && currentOverTypesTotal === 3) {
          console.log('numberBallValue: ' + numberBallValue + '. currentOverTypesTotal: ' + currentOverTypesTotal);
          lastBallWideFlag = true;
          wideCountLoop = 3;
        }
        else if (numberBallValue === 0 && currentOverTypesTotal === 4) {
          console.log('numberBallValue: ' + numberBallValue + '. currentOverTypesTotal: ' + currentOverTypesTotal);
          lastBallWideFlag = true;
          wideCountLoop = 4;
        }
        else if (numberBallValue === 0 && currentOverTypesTotal === 5) {
          console.log('numberBallValue: ' + numberBallValue + '. currentOverTypesTotal: ' + currentOverTypesTotal);
          lastBallWideFlag = true;
          wideCountLoop = 5;
        }
        else {
      currentOverTypesReverse.map(function(item, i){
        console.log(currentOverTypesTotal);
        if (currentOverTypesTotal === 1) {
            wideCountLoop = 1;
            console.log('1 is hit.');
            console.log(moreTHanOneWideCurrently);
            console.log(lastBallExtraCheckRunsType);
            console.log(firstBallWideCheckCountTotal);
            console.log(recentFourBallsExtraCount);
            recentFourBallsExtraCount++
            if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL')) && currentBallWideCheckCountTotal === recentFourBallsExtraCount) {
              console.log('last ball wide and first ball wide flags.');
              //lastBallWideFlag = true;
              lastBallWideFirstBallWideFlag = true;
              //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
              lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
            }
            else if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL'))) {
              console.log('last ball wide and first ball wide flags.');
              //lastBallWideFlag = true;
              lastBallWideFirstBallWideFlag = true;
              //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
              if (firstBallWideCheckCountTotal <= 1) {
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
              }
              else {
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
              }

              console.log(lastBallCheck);

            }
            else if (firstBallWideCheckCountTotal > 0) {
              console.log('Just firstBallWideCheckCountTotal more than zero. ' + firstBallWideCheckCountTotal);
              lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);

            }
            else {
              lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
            }
            }
            else if (currentOverTypesTotal === 2) {
              wideCountLoop = 2;
              console.log('2 is hit.');
              console.log(moreTHanOneWideCurrently);
              console.log(lastBallExtraCheckRunsType);
              console.log(firstBallWideCheckCountTotal);
              console.log(recentFourBallsExtraCount);
              recentFourBallsExtraCount++
              if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL')) && currentBallWideCheckCountTotal === recentFourBallsExtraCount) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
              }
              else if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL'))) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                if (firstBallWideCheckCountTotal <= 1) {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
                }
                else {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
                }

                console.log(lastBallCheck);

              }
              else if (firstBallWideCheckCountTotal > 0) {
                console.log('Just firstBallWideCheckCountTotal more than zero. ' + firstBallWideCheckCountTotal);
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);

              }
              else {
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
              }
            }
            else if (currentOverTypesTotal === 3) {
              wideCountLoop = 3;
              console.log('3 is hit.');
              console.log(moreTHanOneWideCurrently);
              console.log(lastBallExtraCheckRunsType);
              console.log(firstBallWideCheckCountTotal);
              console.log(recentFourBallsExtraCount);
              recentFourBallsExtraCount++
              if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL')) && currentBallWideCheckCountTotal === recentFourBallsExtraCount) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
              }
              else if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL'))) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                if (firstBallWideCheckCountTotal <= 1) {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
                }
                else {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
                }

                console.log(lastBallCheck);

              }
              else if (firstBallWideCheckCountTotal > 0) {
                console.log('Just firstBallWideCheckCountTotal more than zero. ' + firstBallWideCheckCountTotal);
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);

              }
              else {
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
              }
            }
            else if (currentOverTypesTotal === 4) {
              wideCountLoop = 4;
              console.log('4 is hit.');
              console.log(moreTHanOneWideCurrently);
              console.log(lastBallExtraCheckRunsType);
              console.log(firstBallWideCheckCountTotal);
              console.log(recentFourBallsExtraCount);
              recentFourBallsExtraCount++
              if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL')) && currentBallWideCheckCountTotal === recentFourBallsExtraCount) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
              }
              else if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL'))) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                if (firstBallWideCheckCountTotal <= 1) {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
                }
                else {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
                }

                console.log(lastBallCheck);

              }
              else if (firstBallWideCheckCountTotal > 0) {
                console.log('Just firstBallWideCheckCountTotal more than zero. ' + firstBallWideCheckCountTotal);
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);

              }
              else {
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
              }
            }
            else if (currentOverTypesTotal === 5) {
              wideCountLoop = 5;
              console.log('5 is hit.');
              console.log(moreTHanOneWideCurrently);
              console.log(lastBallExtraCheckRunsType);
              console.log(firstBallWideCheckCountTotal);
              console.log(recentFourBallsExtraCount);
              recentFourBallsExtraCount++
              if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL')) && currentBallWideCheckCountTotal === recentFourBallsExtraCount) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
              }
              else if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL'))) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                if (firstBallWideCheckCountTotal <= 1) {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
                }
                else {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
                }

                console.log(lastBallCheck);

              }
              else if (firstBallWideCheckCountTotal > 0) {
                console.log('Just firstBallWideCheckCountTotal more than zero. ' + firstBallWideCheckCountTotal);
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);

              }
              else {
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
              }
            }
            else if (currentOverTypesTotal === 6) {
              wideCountLoop = 6;
              console.log('6 is hit.');
              console.log(moreTHanOneWideCurrently);
              console.log(lastBallExtraCheckRunsType);
              console.log(firstBallWideCheckCountTotal);
              console.log(recentFourBallsExtraCount);
              recentFourBallsExtraCount++
              if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL')) && currentBallWideCheckCountTotal === recentFourBallsExtraCount) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
              }
              else if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL'))) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                if (firstBallWideCheckCountTotal <= 1) {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
                }
                else {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
                }

                console.log(lastBallCheck);

              }
              else if (firstBallWideCheckCountTotal > 0) {
                console.log('Just firstBallWideCheckCountTotal more than zero. ' + firstBallWideCheckCountTotal);
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);

              }
              else {
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
              }
            }
            else if (currentOverTypesTotal === 7) {
              console.log('7 is hit.');
              wideCountLoop = 7;
              console.log(moreTHanOneWideCurrently);
              console.log(lastBallExtraCheckRunsType);
              console.log(firstBallWideCheckCountTotal);
              console.log(recentFourBallsExtraCount);
              recentFourBallsExtraCount++
              if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL')) && currentBallWideCheckCountTotal === recentFourBallsExtraCount) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
              }
              else if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL'))) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                if (firstBallWideCheckCountTotal <= 1) {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
                }
                else {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
                }

                console.log(lastBallCheck);

              }
              else if (firstBallWideCheckCountTotal > 0) {
                console.log('Just firstBallWideCheckCountTotal more than zero. ' + firstBallWideCheckCountTotal);
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);

              }
              else {
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
              }
            }
            else if (currentOverTypesTotal === 8) {
              wideCountLoop = 8;
              console.log('8 is hit.');
              console.log(moreTHanOneWideCurrently);
              console.log(lastBallExtraCheckRunsType);
              console.log(firstBallWideCheckCountTotal);
              console.log(recentFourBallsExtraCount);
              recentFourBallsExtraCount++
              if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL')) && currentBallWideCheckCountTotal === recentFourBallsExtraCount) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
              }
              else if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL'))) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                if (firstBallWideCheckCountTotal <= 1) {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
                }
                else {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
                }

                console.log(lastBallCheck);

              }
              else if (firstBallWideCheckCountTotal > 0) {
                console.log('Just firstBallWideCheckCountTotal more than zero. ' + firstBallWideCheckCountTotal);
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);

              }
              else {
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
              }
            }
            else if (currentOverTypesTotal === 9) {
              wideCountLoop = 9;
              console.log('9 is hit.');
              console.log(moreTHanOneWideCurrently);
              console.log(lastBallExtraCheckRunsType);
              console.log(firstBallWideCheckCountTotal);
              console.log(recentFourBallsExtraCount);
              recentFourBallsExtraCount++
              if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL')) && currentBallWideCheckCountTotal === recentFourBallsExtraCount) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
              }
              else if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL'))) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                if (firstBallWideCheckCountTotal <= 1) {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
                }
                else {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
                }

                console.log(lastBallCheck);

              }
              else if (firstBallWideCheckCountTotal > 0) {
                console.log('Just firstBallWideCheckCountTotal more than zero. ' + firstBallWideCheckCountTotal);
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);

              }
              else {
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
              }
            }
            else if (currentOverTypesTotal === 10) {
              wideCountLoop = 10;
              console.log('10 is hit.');
              console.log(moreTHanOneWideCurrently);
              console.log(lastBallExtraCheckRunsType);
              console.log(firstBallWideCheckCountTotal);
              console.log(recentFourBallsExtraCount);
              recentFourBallsExtraCount++
              if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL')) && currentBallWideCheckCountTotal === recentFourBallsExtraCount) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
              }
              else if (firstBallWideCheckCountTotal > 0 && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL'))) {
                console.log('last ball wide and first ball wide flags.');
                //lastBallWideFlag = true;
                lastBallWideFirstBallWideFlag = true;
                //lastBallWideFirstBallWideFlagMoreThanOneWideLAstBall = false;
                if (firstBallWideCheckCountTotal <= 1) {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
                }
                else {
                  lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);
                }

                console.log(lastBallCheck);

              }
              else if (firstBallWideCheckCountTotal > 0) {
                console.log('Just firstBallWideCheckCountTotal more than zero. ' + firstBallWideCheckCountTotal);
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras);

              }
              else {
                lastBallCheck = currentOverTypes.slice(numberBallValueAndExtras-1);
              }
            }
            else {
              //need to handle if over has more than 6 wides.
              console.log(currentOverTypesTotal + ' - currentOverTypesTotal was not hit. and widecount is: ' + wideCountLoop);
              lastBallCheck = ['NA', 1000];
            }
        }
    );
  }

      let countBall = 1;
      let lastFourBallsExtraCount = 0;

      console.log(currentOverTypes);

      if (lastBallCheck.length < 1) {
        console.log('just seeing if this is flagged.');
        lastBallCheck.push([0,'NA']);
        console.log(lastBallCheck[0][1]);
      }


let extraRunCount = 0;
let byeLegByeDisplay = '';
let wideNoBallRunValue = 0;
let wideNoBallRunValueString = '';
let wideNoBallRunValueStringPlus = '';
let zeroWidesMoreThanFourFlag = 0;

    return (
      <Row>
        {
          currentOverTypes.map(function(item, i){
          console.log(item);
          console.log(i);
          console.log(item[0]);
          console.log(item[1]);
          console.log(countBall);
          console.log(numberBallValue);


          if (item[1].includes("LEG-BYE")) {
            byeLegByeDisplay = 'LB'
          }
          else if (item[1].includes("BYE")) {
            byeLegByeDisplay = 'BYE'
          }
          else if (item[1].includes("WIDE")) {
            byeLegByeDisplay = 'WD'
          }
          else if (item[1].includes("NO-BALL") || item[1].includes("NO-BALLS")) {
            byeLegByeDisplay = 'NB'
          }
          else {
            //do nothing
          }

          if (item[1].includes("NO-BALLS")) {
            wideNoBallRunValue = item[0];
            console.log(wideNoBallRunValue);
            wideNoBallRunValueString = wideNoBallRunValue.toString();
            console.log(wideNoBallRunValueString);
            wideNoBallRunValueStringPlus = `+${wideNoBallRunValueString}`;
            console.log(wideNoBallRunValueStringPlus);
          }
          else if (item[0] > 1 && (item[1].includes("WIDE") || item[1].includes("NO-BALL"))) {
            item[0]-- ;
            wideNoBallRunValue = item[0];
            console.log(wideNoBallRunValue);
            wideNoBallRunValueString = wideNoBallRunValue.toString();
            console.log(wideNoBallRunValueString);
            wideNoBallRunValueStringPlus = `+${wideNoBallRunValueString}`;
            console.log(wideNoBallRunValueStringPlus);
          }
          else if (item[1].includes("WIDE") || item[1].includes("NO-BALL") || item[1].includes("NO-BALLS")) {
            item[0]-- ;
            wideNoBallRunValue = item[0];
            console.log(wideNoBallRunValue);
            wideNoBallRunValueString = wideNoBallRunValue.toString();
            console.log(wideNoBallRunValueString);
            wideNoBallRunValueStringPlus = wideNoBallRunValueString;
            console.log(wideNoBallRunValueStringPlus);
          }

          /***** WORKOUT IF WIDES MORE THAN 4 **************/
          //if more than 4 wides in an over we need to change dispalys as 11 balls will not fit on the width of the screen
          if (totalWidesNoBalls > 4) {
            console.log(extraRunCount);
            if (item[1] === 'WIDE' || item[1] === 'NO-BALL' || item[1] === 'NO-BALLS' || item[1] === 'WICKET-WIDE' || item[1] === 'WICKET-NO-BALL') {
              extraRunCount++
              console.log(countBall);
              console.log(extraRunCount);
              console.log(numberBallValue);
              console.log(currentOverTypesTotal);
              if (currentOverTypesTotal === extraRunCount && (lastBallExtraCheckRunsType.includes('WIDE') || lastBallExtraCheckRunsType.includes('NO-BALL') || lastBallExtraCheckRunsType.includes('NO-BALLS') || lastBallExtraCheckRunsType.includes('WICKET-WIDE') || lastBallExtraCheckRunsType.includes('WICKET-NO-BALL')) && numberBallValue === 0) {
                return (<Col size={5}>
                  <Row>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col  size={1}>
                      <Text style={styles.barExtras} key={i}>|</Text>
                    </Col>
                    <Col style={styles.ballCircleExtra} size={1}>
                      <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                      <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                      </Col>
                  </Row>
                </Col>)
              }
              else {
                //nohting
              }
            }

            else if (countBall === numberBallValue) {
              console.log(countBall);
              console.log(numberBallValue);
              console.log(lastBallCheck[0][1]);
              console.log(lastBallCheck[0][0]);
            if (item[1].includes("WICKET") || item[1].includes("WICKET-WIDE") || item[1].includes("WICKET-NO-BALL")) {
              if (numberBallValue === 1) {
                return (
                  <Col size={5}>
                    <Row>
                      <Col style={styles.ballWicketCircle} size={1}>
                        <Text style={styles.wicketBall} key={i}>W</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col  size={1}>
                        <Text style={styles.barExtras} key={i}>|</Text>
                      </Col>
                      <Col style={styles.ballCircleExtra} size={1}>
                        <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                        </Col>
                    </Row>
                  </Col>
                )
              }
              else if (numberBallValue === 2) {
                return (
                  <Col size={5}>
                    <Row>
                      <Col style={styles.ballWicketCircle} size={1}>
                        <Text style={styles.wicketBall} key={i}>W</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col  size={1}>
                        <Text style={styles.barExtras} key={i}>|</Text>
                      </Col>
                      <Col style={styles.ballCircleExtra} size={1}>
                        <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                        </Col>
                    </Row>
                  </Col>
                )
              }
              else if (numberBallValue === 3) {
                return (
                  <Col size={5}>
                    <Row>
                      <Col style={styles.ballWicketCircle} size={1}>
                        <Text style={styles.wicketBall} key={i}>W</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col  size={1}>
                        <Text style={styles.barExtras} key={i}>|</Text>
                      </Col>
                      <Col style={styles.ballCircleExtra} size={1}>
                        <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                        </Col>
                    </Row>
                  </Col>
                )
              }
              else if (numberBallValue === 4) {
                return (
                  <Col size={4}>
                    <Row>
                      <Col style={styles.ballWicketCircle} size={1}>
                        <Text style={styles.wicketBall} key={i}>W</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col  size={1}>
                        <Text style={styles.barExtras} key={i}>|</Text>
                      </Col>
                      <Col style={styles.ballCircleExtra} size={1}>
                        <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                        </Col>
                    </Row>
                  </Col>
                )
              }
              else if (numberBallValue === 5) {
                return (
                  <Col size={3}>
                    <Row>
                      <Col style={styles.ballWicketCircle} size={1}>
                        <Text style={styles.wicketBall} key={i}>W</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col  size={1}>
                        <Text style={styles.barExtras} key={i}>|</Text>
                      </Col>
                      <Col style={styles.ballCircleExtra} size={1}>
                        <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                        </Col>
                    </Row>
                  </Col>
                )
              }
              else {
                return (
                  <Col size={5}>
                    <Row>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col  size={1}>
                        <Text style={styles.barExtras} key={i}>|</Text>
                      </Col>
                      <Col style={styles.ballCircleExtra} size={1}>
                        <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                        </Col>
                    </Row>
                  </Col>
                )
              }
            }
            else if (item[1].includes("BYE") || item[1].includes("LEG-BYE")) {
              if (numberBallValue === 1) {
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballCircle} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
                    </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col  size={1}>
                        <Text style={styles.barExtras} key={i}>|</Text>
                      </Col>
                      <Col style={styles.ballCircleExtra} size={1}>
                        <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                        </Col>
                    </Row>
                  </Col>
                )
              }
              else if (numberBallValue === 2) {
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballCircle} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
                    </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col  size={1}>
                        <Text style={styles.barExtras} key={i}>|</Text>
                      </Col>
                      <Col style={styles.ballCircleExtra} size={1}>
                        <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                        </Col>
                    </Row>
                  </Col>
                )
              }
              else if (numberBallValue === 3) {
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballCircle} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
                    </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col  size={1}>
                        <Text style={styles.barExtras} key={i}>|</Text>
                      </Col>
                      <Col style={styles.ballCircleExtra} size={1}>
                        <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                        </Col>
                    </Row>
                  </Col>
                )
              }
              else if (numberBallValue === 4) {
                return (
                  <Col size={4}>
                    <Row>
                    <Col style={styles.ballCircle} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
                    </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col  size={1}>
                        <Text style={styles.barExtras} key={i}>|</Text>
                      </Col>
                      <Col style={styles.ballCircleExtra} size={1}>
                        <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                        </Col>
                    </Row>
                  </Col>
                )
              }
              else if (numberBallValue === 5) {
                return (
                  <Col size={3}>
                    <Row>
                    <Col style={styles.ballCircle} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
                    </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col  size={1}>
                        <Text style={styles.barExtras} key={i}>|</Text>
                      </Col>
                      <Col style={styles.ballCircleExtra} size={1}>
                        <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                        </Col>
                    </Row>
                  </Col>
                )
              }
              else {
                return (
                  <Col size={5}>
                    <Row>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col  size={1}>
                        <Text style={styles.barExtras} key={i}>|</Text>
                      </Col>
                      <Col style={styles.ballCircleExtra} size={1}>
                        <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                        </Col>
                    </Row>
                  </Col>
                )
              }
            }

            else {
          if (numberBallValue === 1) {
            return (
              <Col size={5}>
                <Row>
                  <Col style={styles.ballCircle} size={1}>
                    <Text style={styles.textBall} key={i}>{item[0]}</Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col  size={1}>
                    <Text style={styles.barExtras} key={i}>|</Text>
                  </Col>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                    </Col>
                </Row>
              </Col>
            )
          }
          else if (numberBallValue === 2) {
            return (
              <Col size={5}>
                <Row>
                  <Col style={styles.ballCircle} size={1}>
                    <Text style={styles.textBall} key={i}>{item[0]}</Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col  size={1}>
                    <Text style={styles.barExtras} key={i}>|</Text>
                  </Col>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                    </Col>
                </Row>
              </Col>
            )
          }
          else if (numberBallValue === 3) {
            return (
              <Col size={5}>
                <Row>
                  <Col style={styles.ballCircle} size={1}>
                    <Text style={styles.textBall} key={i}>{item[0]}</Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col  size={1}>
                    <Text style={styles.barExtras} key={i}>|</Text>
                  </Col>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                    </Col>
                </Row>
              </Col>
            )
          }
          else if (numberBallValue === 4) {
            return (
              <Col size={4}>
                <Row>
                  <Col style={styles.ballCircle} size={1}>
                    <Text style={styles.textBall} key={i}>{item[0]}</Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col  size={1}>
                    <Text style={styles.barExtras} key={i}>|</Text>
                  </Col>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                    </Col>
                </Row>
              </Col>
            )
          }
          else if (numberBallValue === 5) {
            return (
              <Col size={3}>
                <Row>
                  <Col style={styles.ballCircle} size={1}>
                    <Text style={styles.textBall} key={i}>{item[0]}</Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col  size={1}>
                    <Text style={styles.barExtras} key={i}>|</Text>
                  </Col>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                    </Col>
                </Row>
              </Col>
            )
          }
          else {
            return (
              <Col size={5}>
                <Row>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col style={styles.yetToBeBowledCircle} size={1}>
                    <Text style={styles.textBall} key={i}> </Text>
                  </Col>
                  <Col  size={1}>
                    <Text style={styles.barExtras} key={i}>|</Text>
                  </Col>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{extraRunCount}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>Extras</Text>
                    </Col>
                </Row>
              </Col>
            )
          }
        }

        }
        else {
          console.log('count ball next line ' + countBall);
          countBall++
          console.log('countBall has been counted. ' + countBall);
          if (item[1].includes("WICKET") || item[1].includes("WICKET-WIDE") || item[1].includes("WICKET-NO-BALL")) {
            return (<Col style={styles.ballWicketCircle} size={1}>
              <Text style={styles.wicketBall} key={i}>W</Text>
              </Col>
            )
          }
          else if (item[1].includes("BYE") || item[1].includes("LEG-BYE")) {
            return (<Col style={styles.ballCircle} size={1}>
            <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
            <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
            </Col>
            )
          }
          else {
        return (<Col style={styles.ballCircle} size={1}>
          <Text style={styles.textBall} key={i}>{item[0]}</Text>
          </Col>
        )
        }
      }



          }
          else if (item[1] === 'WIDE' || item[1] === 'NO-BALL' || item[1] === 'NO-BALLS' || item[1] === 'WICKET-WIDE' || item[1] === 'WICKET-NO-BALL') {
            console.log(lastBallWideFlag);

            item[0]--

            if (item[1] === 'NO-BALL' || item[1] === 'NO-BALLS') {
              item[1] = 'NB';
            }
            else {
              //do nothing
            }

            if (lastBallWideFlag === true) {
              console.log(numberBallValue);
              console.log(wideCountLoop);

              let loopThroughTotal = i + 1

              console.log('loopThroughTotal === ' + loopThroughTotal + '. wideCountLoop === ' + wideCountLoop);
              console.log(lastBallWideFirstBallWideFlag);
              if (lastBallWideFirstBallWideFlag === true) {
                console.log(lastBallWideFirstBallWideFlag);
                console.log(lastFourBallsExtraCount);
                console.log(lastFourBallsExtraCheckTypeCountTotal);
                lastFourBallsExtraCount++
                if (lastFourBallsExtraCount != lastFourBallsExtraCheckTypeCountTotal) {
                  return (<Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                    </Col>
                  )
                }
                else {
                  console.log(numberBallValue);
                  if (item[1] === 'WICKET-WIDE' || item[1] === 'WICKET-NO-BALL') {
                    if (numberBallValue === 0) {
                      console.log('Wicket wide with remaining balls 6. numberBallValue: ' + numberBallValue);
                  return (
                    <Col size={5}>
                      <Row>
                      <Col style={styles.ballWicketWideCircle} size={1}>
                        <Text style={styles.wicketBall} key={i}>W</Text>
                        <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                  }
                    else if (numberBallValue === 1) {
                      console.log('wide with remaining balls 1. numberBallValue: ' + numberBallValue);
                  return (
                    <Col size={5}>
                      <Row>
                      <Col style={styles.ballWicketWideCircle} size={1}>
                        <Text style={styles.wicketBall} key={i}>W</Text>
                        <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                  }
                  else if (numberBallValue === 2) {
                  return (
                    <Col size={5}>
                      <Row>
                      <Col style={styles.ballWicketWideCircle} size={1}>
                        <Text style={styles.wicketBall} key={i}>W</Text>
                        <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                  }
                  else if (numberBallValue === 3) {
                  return (
                    <Col size={5}>
                      <Row>
                      <Col style={styles.ballWicketWideCircle} size={1}>
                        <Text style={styles.wicketBall} key={i}>W</Text>
                        <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                  }
                  else if (numberBallValue === 4) {
                  return (
                    <Col size={4}>
                      <Row>
                      <Col style={styles.ballWicketWideCircle} size={1}>
                        <Text style={styles.wicketBall} key={i}>W</Text>
                        <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                  }
                  else if (numberBallValue === 5) {
                  return (
                    <Col size={3}>
                      <Row>
                      <Col style={styles.ballWicketWideCircle} size={1}>
                        <Text style={styles.wicketBall} key={i}>W</Text>
                        <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                  }
                  else {
                  return (
                    <Col size={5}>
                      <Row>
                      <Col style={styles.ballWicketWideCircle} size={1}>
                        <Text style={styles.wicketBall} key={i}>W</Text>
                        <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                    )
                    }
                  }
                  else {
                  if (numberBallValue === 0) {
                    console.log('wide with remaining balls 6. numberBallValue: ' + numberBallValue);
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballCircleExtra} size={1}>
                      <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                      <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
                }
                  else if (numberBallValue === 1) {
                    console.log('wide with remaining balls 1. numberBallValue: ' + numberBallValue);
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballCircleExtra} size={1}>
                      <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                      <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
                }
                else if (numberBallValue === 2) {
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballCircleExtra} size={1}>
                      <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                      <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
                }
                else if (numberBallValue === 3) {
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballCircleExtra} size={1}>
                      <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                      <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
                }
                else if (numberBallValue === 4) {
                return (
                  <Col size={4}>
                    <Row>
                    <Col style={styles.ballCircleExtra} size={1}>
                      <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                      <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
                }
                else if (numberBallValue === 5) {
                return (
                  <Col size={3}>
                    <Row>
                    <Col style={styles.ballCircleExtra} size={1}>
                      <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                      <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
                }
                else {
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballCircleExtra} size={1}>
                      <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                      <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                  )
                  }
                }
              }

              }
              else if (loopThroughTotal != wideCountLoop && lastBallWideFirstBallWideFlag === false) {
                console.log('loop through is not === to wideCountLoop. loopThroughTotal === ' + loopThroughTotal + 'wideCountLoop === ' + wideCountLoop);
                if (item[1] === 'WICKET-WIDE' || item[1] === 'WICKET-NO-BALL') {
                  return (<Col style={styles.ballWicketWideCircle} size={1}>
                    <Text style={styles.wicketBall} key={i}>W</Text>
                    <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                  </Col>
                )
                }
                else {
                return (<Col style={styles.ballCircleExtra} size={1}>
                  <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                  <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                  </Col>
                )
              }


              }
              else {
                if (item[1] === 'WICKET-WIDE' || item[1] === 'WICKET-NO-BALL') {
                  if (numberBallValue === 0) {
                    console.log('Wicket wide with remaining balls 6. numberBallValue: ' + numberBallValue);
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballWicketWideCircle} size={1}>
                      <Text style={styles.wicketBall} key={i}>W</Text>
                      <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
                }
                  else if (numberBallValue === 1) {
                    console.log('wide with remaining balls 1. numberBallValue: ' + numberBallValue);
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballWicketWideCircle} size={1}>
                      <Text style={styles.wicketBall} key={i}>W</Text>
                      <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
                }
                else if (numberBallValue === 2) {
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballWicketWideCircle} size={1}>
                      <Text style={styles.wicketBall} key={i}>W</Text>
                      <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
                }
                else if (numberBallValue === 3) {
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballWicketWideCircle} size={1}>
                      <Text style={styles.wicketBall} key={i}>W</Text>
                      <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
                }
                else if (numberBallValue === 4) {
                return (
                  <Col size={4}>
                    <Row>
                    <Col style={styles.ballWicketWideCircle} size={1}>
                      <Text style={styles.wicketBall} key={i}>W</Text>
                      <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
                }
                else if (numberBallValue === 5) {
                return (
                  <Col size={3}>
                    <Row>
                    <Col style={styles.ballWicketWideCircle} size={1}>
                      <Text style={styles.wicketBall} key={i}>W</Text>
                      <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
                }
                else {
                return (
                  <Col size={5}>
                    <Row>
                    <Col style={styles.ballWicketWideCircle} size={1}>
                      <Text style={styles.wicketBall} key={i}>W</Text>
                      <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                  )
                  }
                }
                  else {
                console.log(numberBallValue);/******/
                if (numberBallValue === 0) {
                  console.log('wide with remaining balls 6. numberBallValue: ' + numberBallValue);
              return (
                <Col size={5}>
                  <Row>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
              )
              }
                else if (numberBallValue === 1) {
                  console.log('wide with remaining balls 1. numberBallValue: ' + numberBallValue);
              return (
                <Col size={5}>
                  <Row>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
              )
              }
              else if (numberBallValue === 2) {
              return (
                <Col size={5}>
                  <Row>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
              )
              }
              else if (numberBallValue === 3) {
              return (
                <Col size={5}>
                  <Row>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
              )
              }
              else if (numberBallValue === 4) {
              return (
                <Col size={4}>
                  <Row>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
              )
              }
              else if (numberBallValue === 5) {
              return (
                <Col size={3}>
                  <Row>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
              )
              }
              else {
              return (
                <Col size={5}>
                  <Row>
                  <Col style={styles.ballCircleExtra} size={1}>
                    <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                    <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
                )
                }
              }
              }
            }

            else {
              console.log('if a wide or no-ball and there is a value either side.');
              if (item[1] === 'WICKET-WIDE' || item[1] === 'WICKET-NO-BALL') {
                return (<Col style={styles.ballWicketWideCircle} size={1}>
                  <Text style={styles.wicketBall} key={i}>W</Text>
                  <Text style={styles.wicketWideStyle} key={i}>{byeLegByeDisplay}</Text>
                </Col>
              )
              }
              else {
            return (<Col style={styles.ballCircleExtra} size={1}>
              <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
              <Text style={styles.wideStyleLabel} key={i}>{wideNoBallRunValueStringPlus}</Text>
              </Col>
            )
          }
          }
          }
          else if (countBall === numberBallValue) {
            console.log(countBall);
            console.log(numberBallValue);
            console.log(lastBallCheck[0][1]);
            console.log(lastBallCheck[0][0]);

            if (lastBallCheck[0][1].includes("WIDE") || lastBallCheck[0][1].includes("NO-BALL") || lastBallCheck[0][1].includes("NO-BALLS") || lastBallCheck[0][1].includes("WICKET-WIDE") || lastBallCheck[0][1].includes("WICKET-NO-BALL")) {
            //if (lastBallCheck[0][1] === "WIDE" || lastBallCheck[0][1] === "NO-BALL") {
              console.log(lastBallWideFlag + 'lastBallWideFlag should hit');
              lastBallWideFlag = true;
              if (item[1].includes("WICKET") || item[1].includes("WICKET-WIDE") || item[1].includes("WICKET-NO-BALL")) {
                return (<Col style={styles.ballWicketCircle} size={1}>
                  <Text style={styles.wicketBall} key={i}>W</Text>
                  </Col>
                )
              }
              else if (item[1].includes("BYE") || item[1].includes("LEG-BYE")) {
                return (<Col style={styles.ballCircle} size={1}>
                <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
                </Col>
                )
              }
              else {
              return (<Col style={styles.ballCircle} size={1}>
                <Text style={styles.textBall} key={i}>{item[0]}</Text>
                </Col>
              )
            }
            }
            else {
              console.log(lastBallCheck[0][1] + 'is adding extra for last legit ball hit?');
              if (item[1].includes("WICKET") || item[1].includes("WICKET-WIDE") || item[1].includes("WICKET-NO-BALL")) {
                if (numberBallValue === 1) {
                  return (
                    <Col size={5}>
                      <Row>
                        <Col style={styles.ballWicketCircle} size={1}>
                          <Text style={styles.wicketBall} key={i}>W</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                }
                else if (numberBallValue === 2) {
                  return (
                    <Col size={5}>
                      <Row>
                        <Col style={styles.ballWicketCircle} size={1}>
                          <Text style={styles.wicketBall} key={i}>W</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                }
                else if (numberBallValue === 3) {
                  return (
                    <Col size={5}>
                      <Row>
                        <Col style={styles.ballWicketCircle} size={1}>
                          <Text style={styles.wicketBall} key={i}>W</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                }
                else if (numberBallValue === 4) {
                  return (
                    <Col size={4}>
                      <Row>
                        <Col style={styles.ballWicketCircle} size={1}>
                          <Text style={styles.wicketBall} key={i}>W</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                }
                else if (numberBallValue === 5) {
                  return (
                    <Col size={3}>
                      <Row>
                        <Col style={styles.ballWicketCircle} size={1}>
                          <Text style={styles.wicketBall} key={i}>W</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                }
                else {
                  return (
                    <Col size={5}>
                      <Row>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                }
              }
              else if (item[1].includes("BYE") || item[1].includes("LEG-BYE")) {
                if (numberBallValue === 1) {
                  return (
                    <Col size={5}>
                      <Row>
                        <Col style={styles.ballCircle} size={1}>
                        <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                }
                else if (numberBallValue === 2) {
                  return (
                    <Col size={5}>
                      <Row>
                        <Col style={styles.ballCircle} size={1}>
                        <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                }
                else if (numberBallValue === 3) {
                  return (
                    <Col size={5}>
                      <Row>
                        <Col style={styles.ballCircle} size={1}>
                        <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                        <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                }
                else if (numberBallValue === 4) {
                  return (
                    <Col size={4}>
                      <Row>
                      <Col style={styles.ballCircle} size={1}>
                      <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                      <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
                      </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                }
                else if (numberBallValue === 5) {
                  return (
                    <Col size={3}>
                      <Row>
                      <Col style={styles.ballCircle} size={1}>
                      <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
                      <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
                      </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                }
                else {
                  return (
                    <Col size={5}>
                      <Row>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                        <Col style={styles.yetToBeBowledCircle} size={1}>
                          <Text style={styles.textBall} key={i}> </Text>
                        </Col>
                      </Row>
                    </Col>
                  )
                }
              }

              else {
            if (numberBallValue === 1) {
              return (
                <Col size={5}>
                  <Row>
                    <Col style={styles.ballCircle} size={1}>
                      <Text style={styles.textBall} key={i}>{item[0]}</Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
              )
            }
            else if (numberBallValue === 2) {
              return (
                <Col size={5}>
                  <Row>
                    <Col style={styles.ballCircle} size={1}>
                      <Text style={styles.textBall} key={i}>{item[0]}</Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
              )
            }
            else if (numberBallValue === 3) {
              return (
                <Col size={5}>
                  <Row>
                    <Col style={styles.ballCircle} size={1}>
                      <Text style={styles.textBall} key={i}>{item[0]}</Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
              )
            }
            else if (numberBallValue === 4) {
              return (
                <Col size={4}>
                  <Row>
                    <Col style={styles.ballCircle} size={1}>
                      <Text style={styles.textBall} key={i}>{item[0]}</Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
              )
            }
            else if (numberBallValue === 5) {
              return (
                <Col size={3}>
                  <Row>
                    <Col style={styles.ballCircle} size={1}>
                      <Text style={styles.textBall} key={i}>{item[0]}</Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
              )
            }
            else {
              return (
                <Col size={5}>
                  <Row>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                    <Col style={styles.yetToBeBowledCircle} size={1}>
                      <Text style={styles.textBall} key={i}> </Text>
                    </Col>
                  </Row>
                </Col>
              )
            }
          }
          }

          }
          else {
            console.log('count ball next line ' + countBall);
            countBall++
            console.log('countBall has been counted. ' + countBall);
            if (item[1].includes("WICKET") || item[1].includes("WICKET-WIDE") || item[1].includes("WICKET-NO-BALL")) {
              return (<Col style={styles.ballWicketCircle} size={1}>
                <Text style={styles.wicketBall} key={i}>W</Text>
                </Col>
              )
            }
            else if (item[1].includes("BYE") || item[1].includes("LEG-BYE")) {
              return (<Col style={styles.ballCircle} size={1}>
              <Text style={styles.wideStyle} key={i}>{byeLegByeDisplay}</Text>
              <Text style={styles.wideStyleLabel} key={i}>{item[0]}</Text>
              </Col>
              )
            }
            else {
          return (<Col style={styles.ballCircle} size={1}>
            <Text style={styles.textBall} key={i}>{item[0]}</Text>
            </Col>
          )
          }
        }
          })
        }
      </Row>
    );

  }


    // ********************************* The END ************************************ //

}




  render() {

    return (
        <Grid style={styles.rowPadding}>
          {this.RunsPerOverDsiplay()}
          <View style={styles.horizontalRule} />
        </Grid>
    );
  }
}

const mapStateToProps = state => ({
  runs: state.runs,
  ball: state.ball,
  widecount: state.widecount,
});

export default connect(mapStateToProps)(RunsPerBall);

/*findIndex not to be used but keeping incase i need to use:
const indexOfWickets = runEvents.findIndex(x => x.wicketEvent === true);
console.log(indexOfWickets);
*/
