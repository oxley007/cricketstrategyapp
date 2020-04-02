import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H1, Row, Col, Grid } from 'native-base';
import { StyleSheet, View, PixelRatio, Platform, Dimensions } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import BallDiff from '../../Util/BallDiff.js';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';


class DisplayCurrentBatters extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
    };
  }

  state = {
    gameID: this.props.gameID.gameID || '0',
    gameRunEvents: this.props.gameRuns.gameRunEvents || [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
    eventID: this.props.gameRuns.eventID || 0,
    overBowled: this.props.gameRuns.overBowled || false,
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
  };

  handleChange = ( gameID, gameRuns, players ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
    this.setState({ players });
  };


  getBatterRuns = () => {

    console.log(this.props.batterId);
    let gameRunEvents = this.props.gameRuns.gameRunEvents;

    let sum = a => a.reduce((acc, item) => acc + item);

    let ballCount = 0;
    let batterRunsCount = gameRunEvents.map(acc => {
      console.log(acc);
      if (acc.batterID === this.props.batterId) {
        console.log(acc.runsValue);
        ballCount++
        return [acc.runsValue];
      }
      else {
          console.log(acc.runsValue);
          return 0;
        }
      });

      console.log(batterRunsCount);

      let batterRuns = sum(batterRunsCount.map(acc => Number(acc)));

      console.log(batterRuns);

      const battingStrikeRateRaw = (batterRuns / ballCount) * 100;
      console.log(battingStrikeRateRaw);

      let battingStrikeRate = 0;
      if (isNaN(battingStrikeRateRaw)) {
        battingStrikeRate = 0;
      }
      else {
      battingStrikeRate = battingStrikeRateRaw.toFixed(0);
    }
    console.log(battingStrikeRate);

      if (battingStrikeRate <= 30 ) {
        return (
              <Row><Col size={2}><Text style={styles.batterText}>{batterRuns} ({ballCount}) </Text></Col><Col size={3}><Text style={styles.batterTextSRRed}> S/R: {battingStrikeRate} </Text></Col></Row>
            )
      }
      else if (battingStrikeRate <= 60 ) {
        return (
              <Row><Col size={2}><Text style={styles.batterText}>{batterRuns} ({ballCount}) </Text></Col><Col size={3}><Text style={styles.batterTextSROrange}> S/R: {battingStrikeRate} </Text></Col></Row>
            )
      }
      else if (battingStrikeRate <= 99 ) {
        return (
              <Row><Col size={2}><Text style={styles.batterText}>{batterRuns} ({ballCount}) </Text></Col><Col size={3}><Text style={styles.batterTextSRWhite}> S/R: {battingStrikeRate} </Text></Col></Row>
            )
      }
      else if (battingStrikeRate <= 120 ) {
        return (
              <Row><Col size={2}><Text style={styles.batterText}>{batterRuns} ({ballCount}) </Text></Col><Col size={3}><Text style={styles.batterTextSRYellow}> S/R: {battingStrikeRate} </Text></Col></Row>
            )
      }
      else if (battingStrikeRate <= 140 ) {
        return (
              <Row><Col size={2}><Text style={styles.batterText}>{batterRuns} ({ballCount}) </Text></Col><Col size={3}><Text style={styles.batterTextSRLightBlue}> S/R: {battingStrikeRate} </Text></Col></Row>
            )
      }
      else if (battingStrikeRate > 140 ) {
        return (
              <Row><Col size={2}><Text style={styles.batterText}>{batterRuns} ({ballCount}) </Text></Col><Col size={3}><Text style={styles.batterTextSRGreen}> S/R: {battingStrikeRate} </Text></Col></Row>
            )
      }
      else {
        return (
              <Row><Col size={2}><Text style={styles.batterText}>{batterRuns} ({ballCount}) </Text></Col><Col size={3}><Text style={styles.batterTextSRWhite}> S/R: {battingStrikeRate} </Text></Col></Row>
            )
      }

  }



  render() {
    return (
      <Grid>
      {this.getBatterRuns()}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  gameID: state.gameID,
  gameRuns: state.gameRuns,
  players: state.players,
});

export default connect(mapStateToProps)(DisplayCurrentBatters);

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
  batterText: {
    color: '#fff'
  },
  batterTextSRGreen: {
    width: 200,
    height: '120%',
    backgroundColor: '#7CFC00',
    color: '#c471ed',
  },
  batterTextSRRed: {
    width: 200,
    height: '120%',
    backgroundColor: '#FF69B4',
    color: '#fff',
  },
  batterTextSROrange: {
    width: 200,
    height: '120%',
    backgroundColor: '#FF8300',
    color: '#fff',
  },
  batterTextSRPooGreen: {
    width: 200,
    height: '120%',
    backgroundColor: '#f7ff00',
    color: '#c471ed',
  },
  batterTextSRLightBlue: {
    width: 200,
    height: '120%',
    backgroundColor: '#5bd1fc',
    color: '#333',
  },
  batterTextSRYellow: {
    width: 200,
    height: '120%',
    backgroundColor: '#f7ff00',
    color: '#333',
  },
  batterTextSRWhite: {
    width: 200,
    height: '120%',
    backgroundColor: '#fff',
    color: '#c471ed',
  }

});
