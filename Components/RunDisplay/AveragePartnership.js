import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H3, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions } from 'react-native';
import { connect } from "react-redux";

import { updateRuns } from '../../Reducers/runs';
import { updateOver } from '../../Reducers/over';

import BallDiff from '../../Util/BallDiff.js';

// Custom Styles
//const dimen = Dimensions.get('window');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  textHeader: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '300',
    fontSize: PixelRatio.get() === 1 ? 10 : PixelRatio.get() === 1.5 ? 12 : PixelRatio.get() === 2 && (width < 414) ? 16 : PixelRatio.get() === 2 && (width === 414) ? 18 : PixelRatio.get() === 3.5 ? 18 : PixelRatio.get() === 3 && Platform.OS === 'android' ? 14 : PixelRatio.get() === 3 && (width === 414) && Platform.OS === 'ios' ? 18 : 16,
  },
  textDesc: {
    color: '#eee',
    fontWeight: '100',
    marginTop: 0,
  },
  colCenter: {
    alignItems: 'center',
  },
  verticleRule: {
    borderRightColor: '#fff',
    borderRightWidth: 0.5,
    height: '100%',
  },
  currentPartnershipNumber: {
    //fontSize: PixelRatio.get() === 1 ? 24 : PixelRatio.get() === 1.5 ? 30 : PixelRatio.get() === 2 ? 35 : 40,
    fontSize: PixelRatio.get() === 1 ? 10 : PixelRatio.get() === 1.5 ? 12 : PixelRatio.get() === 2 && (width < 414) ? 16 : PixelRatio.get() === 2 && (width === 414) ? 18 : PixelRatio.get() === 3.5 ? 18 : PixelRatio.get() === 3 && Platform.OS === 'android' ? 14 : PixelRatio.get() === 3 && (width === 414) && Platform.OS === 'ios' ? 18 : 16,
    color: '#fff',
    //fontSize: PixelRatio.get() === 1 ? 10 : PixelRatio.get() === 1.5 ? 12 : PixelRatio.get() === 2 && (width < 414) ? 16 : PixelRatio.get() === 2 && (width === 414) ? 18 : PixelRatio.get() === 3.5 ? 18 : PixelRatio.get() === 3 && Platform.OS === 'android' ? 14 : PixelRatio.get() === 3 && (width === 414) && Platform.OS === 'ios' ? 18 : 16,
    //lineHeight: PixelRatio.get() === 1 ? 24 : PixelRatio.get() === 1.5 ? 30 : PixelRatio.get() === 2 ? 35 : 40,
  },
});

class AveragePartnership extends Component {

  state = {
    runs: this.props.runs.runs || 0,
    runEvents: this.props.runs.runEvents || [],
    eventID: this.props.runs.eventID || 0,
    firstWicketIndex: this.props.runs.firstWicketIndex || 0,
    secondWicketIndex: this.props.runs.secondWicketIndex || 0,
    highestRunsPartnership: this.props.runs.highestRunsPartnership || [],
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
  };

  handleChange = ( runs, ball ) => {
    this.setState({ runs });
    this.setState({ ball });
  };

  averageRunsPartnership() {

    let runEvents = this.props.runs.runEvents;
    let averageRunsPartnership;

    //Calculate total wickets.
    const countWickets = runEvents.filter(wickets => wickets.wicketEvent === true);
    const totalWickets = countWickets.length;
    console.log(totalWickets);

    let sum = a => a.reduce((acc, item) => acc + item);


    if (totalWickets === 1) {
      //show first wicket partnership as average partnership.
    runEvents.map((currElement, index) => {
      console.log(currElement.wicketEvent + ' ' + index);
    if (currElement.wicketEvent === true)
      {

        console.log('should only be hit on a wicket.');

          let firstWicketIndex = 0;
          console.log(firstWicketIndex + ' firstWicketIndex');
          console.log(index);
          let secondWicketIndex = index;
          console.log(secondWicketIndex + ' secondWicketIndex');
          let totalHighpartnershipRunValue = sum(runEvents.slice(firstWicketIndex,secondWicketIndex).map(acc => Number(acc.runsValue)));
          let totalHighpartnershipExtraValue = sum(runEvents.slice(firstWicketIndex,secondWicketIndex).map(acc => Number(acc.runExtras)));
          //let totalRuns = sum(runEvents.map(acc => Number(acc.runsValue)));
          let totalRuns = totalHighpartnershipRunValue + totalHighpartnershipExtraValue;
          console.log(totalRuns);
          //let totalRuns = 0;
          averageRunsPartnership = totalRuns / totalWickets;
          console.log(averageRunsPartnership);
        }
        });
      }
        else {
    let totalBatRuns = sum(runEvents.map(acc => Number(acc.runsValue)));
    console.log(totalBatRuns);
    let totalExtraRuns = sum(runEvents.map(acc => Number(acc.runExtras)));
    console.log(totalExtraRuns);
    let totalRuns = totalBatRuns + totalExtraRuns;
    console.log(totalRuns);

    averageRunsPartnership = totalRuns / totalWickets;
    console.log(averageRunsPartnership);

  }



    if (averageRunsPartnership === Infinity || averageRunsPartnership === undefined || isNaN(averageRunsPartnership) ) {
        return (<Text style={styles.currentPartnershipNumber}>~</Text>)
    }
    else {
      let averageRunsPartnershipOneDecimal = parseFloat(averageRunsPartnership).toFixed(1);
      return (<Text style={styles.currentPartnershipNumber}>{averageRunsPartnershipOneDecimal}</Text>)
    }
  }

  render() {

    return (
        <Col>
          <Row>
            <Col style={styles.colCenter}>
              <Row>
                <Text style={styles.textHeader}>Avg P'ship: </Text>
                <Text style={styles.currentPartnershipNumber}>
                  {this.averageRunsPartnership()} runs
                </Text>
              </Row>
            </Col>
          <View style={styles.verticleRule} />
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  runs: state.runs,
  ball: state.ball,
});

export default connect(mapStateToProps)(AveragePartnership);

/*findIndex not to be used but keeping incase i need to use:
const indexOfWickets = runEvents.findIndex(x => x.wicketEvent === true);
console.log(indexOfWickets);
*/
