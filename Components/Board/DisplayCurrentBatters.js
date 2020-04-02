import React, { Component } from 'react';
import firebase from 'react-native-firebase';

import { Container, Footer, Text, Button, Icon, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import BallDiff from '../../Util/BallDiff.js';

import DisplayCurrentBattersRuns from './DisplayCurrentBattersRuns';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';


class DisplayCurrentBatters extends Component {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.refPlayers = firebase.firestore().collection(currentUser.uid).doc('players');
    this.state = {
        players: [],
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


  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.refPlayers.onSnapshot(this.onDocCollectionUpdate)
  }

  onDocCollectionUpdate = (documentSnapshot) => {

    let allPlayers = this.props.players.players;

    console.log(allPlayers);
    console.log(documentSnapshot.data().players);

    if (allPlayers === [] || allPlayers === undefined || allPlayers === null || allPlayers.length < 1) {
      console.log('allplays null hit?');
      allPlayers = documentSnapshot.data().players;
    }
    else {
      console.log('else all players from redux.');
      allPlayers = this.props.players.players;
    }

      console.log(allPlayers);
      this.setState({
        players: allPlayers,
      }, function () {
        const { players } = this.state
        this.props.dispatch(updatePlayers(this.state.players));
      })

      /*
      this.setState({
        players: allPlayers,
      });
      */

    }

  getFacingBall = (facingBall, countCurrentBatter) => {
    console.log('getFacingBall hit');
    console.log(facingBall);
    console.log(countCurrentBatter);
    if (facingBall === 1 && countCurrentBatter === 1) {
      return (<Text style={{color: '#fff', height: 10, alignSelf: 'flex-end', paddingRight: 5}}>*</Text >);
    }
    else if (facingBall === 2 && countCurrentBatter === 2) {
      return (<Text style={{color: '#fff', height: 10, alignSelf: 'flex-end', paddingRight: 5}}>*</Text>);
    }
    else {
      return (<Text style={{color: '#fff'}}></Text>);
    }
  }

  getCurrentBatter = () => {

    let gameRunEvents = this.props.gameRuns.gameRunEvents;

    console.log('get curretn batter hit!');
    console.log(this.props.players.players);
    //console.log(this.props.player);
    //console.log(this.props.id);
    //console.log(this.props.batterFlag);

    const players = this.props.players.players;
    const facingBall = this.props.players.facingBall;
    console.log(facingBall);
    //const facingBall = 0;
    console.log('facingBall hit?' + facingBall);
    let countCurrentBatter = 0;

    /*

    if (players != [] || players != undefined || players != null || players.length >= 1) {

    let countBAtterFlag0 = players.map(player => {
      console.log(player);
      if (player.batterFlag === 0) {
        return 1;
      }
      else {
        return 0;
      }
    });

    console.log(countBAtterFlag0 + ' count batter flag ');





    let sum = a => a.reduce((acc, item) => acc + item);
    let countBAtterFlag0Total = sum(countBAtterFlag0.map(acc => Number(acc)));


    console.log(countBAtterFlag0Total + ' count batter flag Tota; ');


      //players.map(player => {



      if (countBAtterFlag0Total > 2) {
        let teamPlayersSet = [];
        if (facingBall === 1) {
          teamPlayersSet = allPlayers.map(player => {
            console.log(player);
            console.log(player.id);
            let batterZeroCount = 0
            if (player.batterFlag === 0 && batterZeroCount === 0) {
              batterZeroCount++;
              return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
            }
            else if (player.batterFlag === 1 ) {
              return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
            }
            else if (player.batterFlag === 2) {
              return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 2, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
            }
            else {
              return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
            }
          });



        }
        else {
          let batterZeroCount = 0
          teamPlayersSet = allPlayers.map(player => {
            console.log(player);
            console.log(player.id);

            if (player.batterFlag === 0 && batterZeroCount === 1) {
              return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: player.autoNotOut};
            }
            else if (player.batterFlag === 1 ) {
              return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: idBatterOneAutoNotOuts};
            }
            else if (player.batterFlag === 2) {
              return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 2, aggBoard: 0, autoNotOut: idBatterTwoScoreNumber};
            }
            else {
              return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: player.aggBoard, autoNotOut: player.autoNotOut};
            }

            if (player.batterFlag === 0) {
              batterZeroCount++;
            }

          });
        }

        console.log(teamPlayersSet);
        console.log(facingBall);
        this.setState({
          players: teamPlayersSet,
          facingBall: facingBall,
        }, function () {
          const { players, facingBall } = this.state
          this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
        })

      }
    }

    */
    //})

    console.log(players);
    return players.map(player => {
      console.log(player.batterFlag);
      console.log(player.id);
      console.log(player.player);

      if (player.batterFlag === 0) {
        countCurrentBatter++
        console.log(countCurrentBatter);
        console.log('batter flag === 0 hit');
        return (
            <Row size={2}>
              <Col size={1}>
                {this.getFacingBall(facingBall, countCurrentBatter)}
              </Col>
              <Col size={5}>
                      <Text style={styles.batterText}>{player.player}</Text >
              </Col >
              <Col size={4}>
                <DisplayCurrentBattersRuns batterId={player.id} />
              </Col>
            </Row>
              )
      }
      else {
        //do nohting.
      }
    });

  }

    /*

      if (this.props.batterFlag === 0) {
        return (
          <View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 2 }}>
                <Text>{this.props.id}</Text>
            </View>
            <View style={{ flex: 4 }}>
                    <Text>{this.props.player}</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text>All Good.</Text>
            </View>
          </View>
              )
            }
            else {
              // nohting
            }
    }
    */

  render() {
    console.log('Hit current batters');
    return (

      <Col>
      {this.getCurrentBatter()}
      </Col>

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

});
