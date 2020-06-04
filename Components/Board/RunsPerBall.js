import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions } from 'react-native';
import { connect } from "react-redux";

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateOver } from '../../Reducers/over';

import BallDiff from '../../Util/BallDiff.js';

class RunsPerBall extends Component {

  state = {
    gameRunEvents: this.props.gameRuns.gameRunEvents || [],
    eventID: this.props.gameRuns.eventID || 0,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
  };

  handleChange = ( gameRuns, ball ) => {
    this.setState({ gameRuns });
    this.setState({ ball });
  };


  RunsPerOverDsiplay() {

    console.log('getting hit early in runPerBall');

    //Get the reunEvents from Redux.
    let runEvents = this.props.gameRuns.gameRunEvents;
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

    ball = runEvents.length;
    ball--

    let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
    let totalBall = totalBallDiff[1];
    let totalOver = totalBallDiff[0];
    console.log(totalBall);
    let numberBallValue = 0;
    if (totalBall === 0) {
      numberBallValue = Number(6);
    }
    else {
      numberBallValue = Number(totalBall);
    }
    let numberOverValue = Number(totalOver);


    // *********************** end of calularte overs *************************** //


    //Get the total length of the event array.
    let eventLength = runEvents.length;
    console.log(eventLength);

    let eventLengthOver = eventLength - numberBallValue;
    console.log(eventLengthOver);

    let latestOver = runEvents.slice(eventLengthOver, eventLength);
    console.log(latestOver);


/*
      if (numberBallValue === 6) {
        console.log('is numberBallValue === 0 hit?');
        return (
          <View>
          <Row style={styles.ballCircle} size={12}>
                <Text style={styles.overBowled}>Over Bowled</Text>
          </Row>
          <Row>
            <Button rounded large warning style={styles.largeButton}
              onPress={() => this.props.navigation.navigate('Home')} >
              <Text style={styles.buttonTextBack}><Icon name='ios-arrow-back' style={styles.buttonTextBack} /> Back to run counter</Text>
            </Button>
          </Row>
          </View>
            )
      }
      else {
        //nothing.
      }
      */

  let countBall = 1;

  console.log(latestOver);
  console.log(numberBallValue);



  return (
      <Row>
          {
          latestOver.map(function(item, i){
            console.log(item.runsValue);
            console.log(countBall);
            console.log(numberBallValue);

            let wicketOrRun = '';

            if (item.wicketEvent === false) {
              wicketOrRun = <Text style={styles.textBall} key={i}>{item.runsValue}</Text>;
            }
            else {
                wicketOrRun = <Text style={styles.textBall} key={i}>W</Text>;
            }

            if (countBall === numberBallValue) {
              if (numberBallValue === 1) {
                return (
                  <Col size={5}>
                    <Row>
                      <Col style={styles.ballCircle} size={1}>
                        {wicketOrRun}
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
                        {wicketOrRun}
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
                        {wicketOrRun}
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
                        {wicketOrRun}
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
                        {wicketOrRun}
                      </Col>
                      <Col style={styles.yetToBeBowledCircle} size={1}>
                        <Text style={styles.textBall} key={i}> </Text>
                      </Col>
                    </Row>
                  </Col>
                )
              }
              else if (numberBallValue === 6) {
                return (<Col style={styles.ballCircle} size={1}>
                  {wicketOrRun}
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
                countBall++
            return (<Col style={styles.ballCircle} size={1}>
              {wicketOrRun}
              </Col>
            )
            }
          }
        )
      }
      </Row>
    );

    // ********************************* The END ************************************ //

}




  render() {

    return (
        <Grid style={styles.rowPadding}>
          <View style={styles.horizontalRule} />
          {this.RunsPerOverDsiplay()}
          <View style={styles.horizontalRule} />
        </Grid>
    );
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  ball: state.ball,
});

export default connect(mapStateToProps)(RunsPerBall);

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
        paddingLeft: 15,
          paddingRight: 15,
          flex: 1,
          paddingBottom: 40
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
