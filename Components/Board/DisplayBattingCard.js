import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H1, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions } from 'react-native';
import { connect } from "react-redux";

import LinearGradient from 'react-native-linear-gradient';

import DisplayCurrentBattersRuns from './DisplayCurrentBattersRuns';
import CardBoard from '../../Util/CardBoard.js';

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';
import { updateOver } from '../../Reducers/over';

//class DisplayBattingCard extends Component {
  class DisplayBattingCard extends React.PureComponent {
  state = {
    gameRunEvents: this.props.gameRuns.gameRunEvents || [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
    players: this.props.players.players || [],
  };

  handleChange = ( gameRuns, players ) => {
    this.setState({ gameRuns });
    this.setState({ players });
  };

    getCurrentBatters = () => {

      if (this.props.id > 0) {

        const scoreOne = this.props.scoreOne;
        const scoreTwo = this.props.scoreTwo;
        const scoreThree = this.props.scoreThree;
        const outs = this.props.outs;

        const formScoreTotal = scoreOne + scoreTwo + scoreThree
        let formScore = 0;
        if (outs > 0) {
        formScore = formScoreTotal / outs;
        }
        else {
          formScore = formScoreTotal;
        }

        const formScoreRound = Math.round(formScore);

        console.log(formScore);



        return (

<Col>
          <Row size={2} >

            <Col size={1}>
                <Text style={styles.text}>{this.props.id}</Text>
            </Col>
            <Col size={6}>
                <Text style={styles.text}>{this.props.player}</Text>
            </Col>
            <Col size={4.5}>
                <DisplayCurrentBattersRuns batterId={this.props.id} />
            </Col>
            <Col size={3} style={{backgroundColor: '#fff'}}>
                <Text style={{backgroundColor: '#fff', paddingLeft: 5}}>Form: {formScoreRound}</Text>
            </Col >
          </Row>
                      <View style={styles.horizontalRule} />
          </Col >



        );
      }
      else {
        //dont show.
      }
    }

  render() {
    console.log('Hit batting card??');
    return (
      <View>
        {this.getCurrentBatters()}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  players: state.players,
});

export default connect(mapStateToProps)(DisplayBattingCard);

//export default DisplayBattingCard;

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
  horizontalRule: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 2.5,
  marginBottom: 15,
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});
