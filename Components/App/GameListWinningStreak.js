import React from 'react';

import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList } from 'react-native';
import {Header,Left,Right,Icon,Content,Grid,Row,Col,Container,H1,H3,Footer,Button} from 'native-base';

import { connect } from "react-redux";
import firebase from 'react-native-firebase';
import { updatePlayerStats } from '../../Reducers/playerStats';
import { updateGames } from '../../Reducers/games';
import { updateAutoNotOut } from '../../Reducers/autoNotOut';


class GameListWinningStreak extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth()
    this.refPlayerStats = firebase.firestore().collection(currentUser.uid).doc('playerStats');
    this.state = {
        winningStreak: 0,
        loading: true,
    };
  }


  state = {
    winningStreak: this.props.playerStats.winningStreak || 0,
    longestStreak: this.props.playerStats.longestStreak || 0,
    highestPlayerScore: this.props.playerStats.highestPlayerScore || 0,
    highestPlayerScoreId: this.props.playerStats.highestPlayerScoreId || 0,
    highestTeamScore: this.props.playerStats.highestTeamScore || 0,
    games: this.props.games.games || [],
    autoNotOut: this.props.autoNotOut.autoNotOut || 3,
  };

  handleChange = ( playerStats, games, autoNotOut ) => {
    this.setState({ playerStats });
    this.setState({ games });
    this.setState({ autoNotOut });
  };

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    //this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    this.refPlayerStats.onSnapshot(this.onDocCollectionUpdate)
}

componentWillUnmount() {
    //this.unsubscribe();
}

onDocCollectionUpdate = (documentSnapshot) => {
  console.log('display snapshot game winning streak.');
  console.log(documentSnapshot);
  console.log(documentSnapshot.data());
  //console.log(documentSnapshot.data().winningStreak);



  let winningStreak = 0;
  let longestStreak = 0;
  let highestTeamScore = 0
  let highestPlayerScore = 0
  let highestPlayerScoreId = []
  let autoNotOut = 0;
  try {
    autoNotOut = documentSnapshot.data().autoNotOut;
} catch (error) {
console.log('hit should nav to AddPlayers.');
  autoNotOut = this.props.autoNotOut.autoNotOut;
}


  if (documentSnapshot.data() === undefined || documentSnapshot.data() === null) {
    //longestStreak = 0;
    //winningStreak = 0;
    try {
      longestStreak = documentSnapshot.data().longestStreak;
      winningStreak = documentSnapshot.data().winningStreak;
      highestTeamScore = documentSnapshot.data().highestTeamScore;
      highestPlayerScore = documentSnapshot.data().highestPlayerScore;
      highestPlayerScoreId = documentSnapshot.data().highestPlayerScoreId;
  } catch (error) {
    winningStreak = this.props.playerStats.winningStreak;
    longestStreak = this.props.playerStats.longestStreak;
    highestTeamScore = this.props.playerStats.highestTeamScore;
    highestPlayerScore = this.props.playerStats.highestPlayerScore;
    highestPlayerScoreId = this.props.playerStats.highestPlayerScoreId;
  }

  }
  else {
    //longestStreak = documentSnapshot.data().longestStreak;
    //winningStreak = documentSnapshot.data().winningStreak;
    winningStreak = this.props.playerStats.winningStreak;
    longestStreak = this.props.playerStats.longestStreak;
    highestTeamScore = this.props.playerStats.highestTeamScore;
    highestPlayerScore = this.props.playerStats.highestPlayerScore;
    highestPlayerScoreId = this.props.playerStats.highestPlayerScoreId;
  }

  this.setState({
    winningStreak,
    loading: false,
 });

 //const highestPlayerScore = this.props.playerStats.highestPlayerScore;
 //const highestPlayerScoreId = this.props.playerStats.highestPlayerScoreId;
  //const highestTeamScore = this.props.playerStats.highestTeamScore;

 this.setState({
 winningStreak: winningStreak,
 longestStreak: longestStreak,
 highestPlayerScore: highestPlayerScore,
 highestPlayerScoreId: highestPlayerScoreId,
 highestTeamScore: highestTeamScore,
 }, function () {
   const { winningStreak, longestStreak, highestPlayerScore, highestPlayerScoreId, highestTeamScore } = this.state
   this.props.dispatch(updatePlayerStats(this.state.winningStreak, this.state.longestStreak, this.state.highestPlayerScore, this.state.highestPlayerScoreId, this.state.highestTeamScore));
 })

 this.setState({
   autoNotOut: autoNotOut,
 }, function () {
   const { autoNotOut } = this.state
   this.props.dispatch(updateAutoNotOut(this.state.autoNotOut));
 })

}


  getWinningStreak = () => {

    const winningStreak = this.state.winningStreak;

    const games = this.props.games.games;

    if (games === undefined || games === null || games.length < 1) {
        return (
          <Row size={3}>
            <Text style={styles.winningStreakNumber}>{winningStreak}</Text >
          </Row>
        )
    }
    else {
    return (
      <Row size={3}>
        <Text style={styles.winningStreakNumber}>{this.props.playerStats.winningStreak}</Text>
      </Row>
      )
    }
  }

  readUserData = () => {
        const { currentUser } = firebase.auth()
        firebase.database().ref(currentUser.uid).once('playerStats', function (snapshot) {
          console.log(snapshot.val())
            });
          }

  render() {
    return (
      <Col size={2} style={styles.rowPaddingStartGame}>
      <View style={styles.horizontalRule} />
        <Row size={3} >
          <Text style={styles.winningStreakText}>Current winning streak:</Text>
        </Row>
          {this.getWinningStreak()}
          <View style={styles.horizontalRule} />
      </Col>
  );
  }
}


const mapStateToProps = state => ({
  playerStats: state.playerStats,
  games: state.games,
  autoNotOut: state.autoNotOut,
});

export default connect(mapStateToProps)(GameListWinningStreak);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    winningStreakText: {
      fontSize: 14,
      color: '#fff',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '200',
      textAlign:'center',
      alignSelf:'center',
      flexDirection: 'column',
    },
    winningStreakNumber: {
      fontSize: 44,
      color: '#fff',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '600',
      textAlign:'center',
      alignSelf:'center',
      flexDirection: 'column',
    },
    rowPaddingStartGame :{
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 10,
      paddingLeft: 20,
      textAlign: 'center',
    },
    horizontalRule: {
      borderBottomColor: '#fff',
      borderBottomWidth: 1,
      width: '100%',
      marginTop: 15,
      marginBottom: 15,
    },
});
