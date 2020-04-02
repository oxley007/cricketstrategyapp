import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H3, Footer, Button, Tab, Tabs, TabHeading } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions, ImageBackground, Alert } from 'react-native';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';
import { updateGames } from '../../Reducers/games';
import { updateGamesList } from '../../Reducers/gamesList';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';
import { updatePlayerStats } from '../../Reducers/playerStats';
import { updateGameCards } from '../../Reducers/gameCards';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateMomentum } from '../../Reducers/momentum';
import { updateAutoNotOut } from '../../Reducers/autoNotOut';

import DisplayGames from '../Game/DisplayGames';
import TabOne from './GameMain';
import DisplayBattingCard from '../Board/DisplayBattingCard';
import BallDiff from '../../Util/BallDiff.js';
import CardBoard from '../../Util/CardBoard.js';


class Game extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth()
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.refPlayers = firebase.firestore().collection(currentUser.uid).doc('players');
    this.state = {
        loading: true,
        isLoaded: false,
        players: [],
    };
  }


  state = {
    gameID: this.props.gameID.gameID || '0',
    keyID: this.props.gameID.keyID || '0',
    gameRunEvents: this.props.gameRuns.gameRunEvents || [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
    eventID: this.props.gameRuns.eventID || 0,
    overBowled: this.props.gameRuns.overBowled || false,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
    games: this.props.games.games || [],
    gamesList: this.props.gamesList.gamesList || [],
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
    winningStreak: this.props.playerStats.winningStreak || 0,
    longestStreak: this.props.playerStats.longestStreak || 0,
    highestPlayerScore: this.props.playerStats.highestPlayerScore || 0,
    highestPlayerScoreId: this.props.playerStats.highestPlayerScoreId || 0,
    highestTeamScore: this.props.playerStats.highestTeamScore || 0,
    cardOne: this.props.gameCards.cardOne || 100,
    cardTwo: this.props.gameCards.cardTwo || 100,
    runs: this.props.gameCards.runs || 100,
    wicketEvent: this.props.gameCards.wicketEvent || false,
    teamPlayers: this.props.teamPlayers.teamPlayers || [],
    momentum: this.props.momentum.momentum || 0,
    momentum: this.props.momentum.momentumPrevOver || 0,
    momentumThisOver: this.props.momentum.momentumThisOver || [],
    autoNotOut: this.props.autoNotOut.autoNotOut || 0,
  };

  handleChange = ( gameID, gameRuns, ball, players, games, gamesList, firstInningsRuns, playerStats, gameCards, teamPlayers, momentum, autoNotOut ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
    this.setState({ ball });
    this.setState({ players });
    this.setState({ games });
    this.setState({ gamesList });
    this.setState({ firstInningsRuns });
    this.setState({ playerStats });
    this.setState({ gameCards });
    this.setState({ teamPlayers });
    this.setState({ momentum });
    this.setState({ autoNotOut });
  };

  componentDidMount() {
    console.log(this.props.players.facingBall);
    //SplashScreen.hide()
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    const players = [];
    //this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

    let allPlayers = this.props.players.players
    console.log(allPlayers);

    let id = 0
    let batterFlag = 2;
    allPlayers.map(player => {
      console.log('hit 3');
      console.log(player);
      if (id === 1 || id === 2) {
        batterFlag = 0;
      }
      else {
        batterFlag = 2;
      }

      /*
      players.push({
        id,
        batterFlag,
        player
      });
      */
      console.log(players);
      id++
      console.log(id);
      });

      console.log('hit');
      console.log(allPlayers);

      const facingBall = this.props.players.facingBall;

      console.log(facingBall);

      console.log('hit 2');
    console.log(players);
    this.setState({
      players: players,
      facingBall: facingBall,
    }, function () {
      const { players, facingBall } = this.state
      this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
    })

    /*
    this.ref.get().then(function(documentSnapshot) {
  console.log(documentSnapshot);
  console.log(documentSnapshot.data());
  console.log(documentSnapshot.data().players);
  let allPlayers = documentSnapshot.data().players;
  console.log(allPlayers);

  let id = 0
  let batterFlag = 2;
  allPlayers.map(player => {
    console.log('hit 3');
    console.log(player);
    if (id === 1 || id === 2) {
      batterFlag = 0;
    }
    else {
      batterFlag = 2;
    }


    players.push({
      id,
      batterFlag,
      player
    });
    console.log(players);
    id++
    console.log(id);
    });

    console.log('hit');
    console.log(allPlayers);

    console.log('hit 2');
  console.log(players);
  this.setState({
    isLoaded: true,
    players: players
  });

  console.log(this.props.teamPlayers.teamPlayers);
  //this.setState({ players });
  console.log(this.state.players);

})
*/



}

componentWillUnmount() {
  this.unsubscribe();
  clearInterval(this.interval);
}

onCollectionUpdate = (querySnapshot) => {
  console.log('onCollectionUpdate hit');
  console.log(this.props.games.games);
  const games = this.props.games.games;
  querySnapshot.forEach((doc) => {
    const { gameId, gameName, firstInningsRuns } = doc.data();

 });
}


componentWillUnmount() {
  console.log('componentWillUnmount');
    this.unsubscribe();
}

/*
onCollectionUpdate = (querySnapshot) => {
  const players = [];
  console.log(querySnapshot);
  querySnapshot.forEach((feild) => {
    console.log(doc.data());
    const { players } = doc.data();

    players.push({
      key: doc.id,
      doc, // DocumentSnapshot
      players,
    });
  });

  this.setState({
    players,
    loading: false,
 });

}
*/

endGame = () => {
  Alert.alert(
  'Exit Game?!',
  'Exiting the game will forefit the game and you will be start your winning streak from zero. Are you sure you want to exit the game?',
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Exit Game', onPress: () => {
      this.processLoss();
      const { navigation } = this.props;
      this.props.navigation.navigate('GameListNew')

    }},
  ],
  {cancelable: false},
);
}

processLoss = () => {
  let sum = a => a.reduce((acc, item) => acc + item);
  console.log('naviagte not hit');
  //Re-Calculate the total runs after update
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const totalRunsRefresh = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
  console.log(totalRunsRefresh);

  let eventID = this.props.gameRuns.eventID;
  let keyID = this.props.gameID.keyID;
  const gameId = this.props.gameID.gameID
  let winningStreak = this.props.playerStats.winningStreak;
  let longestStreak = this.props.playerStats.longestStreak;
  let autoNotOut = this.props.autoNotOut.autoNotOut;
  const games = this.props.games.games;
  let firstInningsRuns = this.props.firstInningsRuns.firstInningsRuns;
  const getWicketCount = BallDiff.getWicketCount(gameRunEvents);
  const totalWickets = getWicketCount[0];

  const { navigation } = this.props;
  const displayId = navigation.getParam('displayId', 111000);

  let batters = this.props.players.players
  console.log(batters);

  let findCurrentBatters = batters.map(acc => {
    console.log(acc);
    if (acc.batterFlag === 0) {
      console.log(acc.batterFlag);
      return {id: [acc.id]};
    }
      else {
        console.log(acc.batterFlag);
        return {id: [100]};
      }
    });
  console.log(findCurrentBatters);

  let idBatter = 0;
  let currentBatters = findCurrentBatters.filter( batter => batter['id'] != 100)
  console.log(currentBatters);

  console.log(gameRunEvents);
  this.setState({
    gameRunEvents: gameRunEvents,
    eventID: eventID,
    overBowled: false,
  }, function () {
    const { gameRunEvents, eventID, overBowled } = this.state
    this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.eventID, this.state.overBowled));
  })

  let filtered = '';
  if (keyID === '0' || keyID === undefined) {
    filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
    console.log(filtered);

    this.setState({
      keyID: filtered,
      gameID: gameId,
    }, function () {
      const { keyID, gameID } = this.state
      this.props.dispatch(updateGameId(this.state.keyID, this.state.gameID));
    })
  }
  else {
    filtered = gameId;
    console.log(filtered);
  }

  //filtered[0] = filtered;

  let allPlayers =  this.props.players.players;

  console.log('ball and over more than 0.');
  console.log(allPlayers);
  console.log(gameRunEvents);
let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
console.log(highestScorers);
let battersHighestScore = highestScorers[0];
let battersNameHighestScore = highestScorers[1];
let highestScoreBallCount = highestScorers[2];
let battersSecondHighestScore = highestScorers[3];
let battersNameSecondHighestScore = highestScorers[4];
let secondHighestScoreBallCount = highestScorers[5];

winningStreak = 0;
const gameResult = 1;


console.log('lost so do the following...');
let game = {
  displayId: displayId,
  firstInningsRuns: firstInningsRuns,
  gameId: gameId,
  gameName: "Cricket Strategy Sim",
  gameResult: 1,
  players: allPlayers,
  gameRunEvents: gameRunEvents,
  key: filtered[0],
  topScore: battersHighestScore[0][0],
  topScorePlayer: battersNameHighestScore[0].player,
  topScoreBalls: highestScoreBallCount,
  topSecondScore: battersSecondHighestScore[0][0],
  topSecondScorePlayer: battersNameSecondHighestScore[0].player,
  topSecondBalls: secondHighestScoreBallCount,
  totalRuns: totalRunsRefresh,
  totalWickets: totalWickets,
  winningStreak: winningStreak,
}
this.ref.doc(filtered[0]).update({
    gameRunEvents: gameRunEvents,
    totalRuns: totalRunsRefresh,
    players: allPlayers,
    topScore: battersHighestScore[0][0],
    topScorePlayer: battersNameHighestScore[0].player,
    topScoreBalls: highestScoreBallCount,
    topSecondScore: battersSecondHighestScore[0][0],
    topSecondScorePlayer: battersNameSecondHighestScore[0].player,
    topSecondBalls: secondHighestScoreBallCount,
    totalWickets: totalWickets,
    gameResult: 1,
    winningStreak: winningStreak,
});



this.ref.doc("playerStats").update({
  winningStreak: winningStreak,
  longestStreak: longestStreak,
  highestPlayerScore: 0,
  highestPlayerScoreId: 0,
  highestTeamScore: 0,
  autoNotOut: autoNotOut,
});

let gameComplete = {
  displayId: displayId,
  firstInningsRuns: firstInningsRuns,
  gameId: gameId,
  gameName: "Cricket Strategy Sim",
  gameResult: gameResult,
  players: allPlayers,
  gameRunEvents: gameRunEvents,
  key: filtered[0],
  topScore: battersHighestScore[0][0],
  topScorePlayer: battersNameHighestScore[0].player,
  topScoreBalls: highestScoreBallCount,
  topSecondScore: battersSecondHighestScore[0][0],
  topSecondScorePlayer: battersNameSecondHighestScore[0].player,
  topSecondBalls: secondHighestScoreBallCount,
  totalRuns: totalRunsRefresh,
  totalWickets: totalWickets,
}

console.log(gameComplete);


let gameDisplayIdIndexCount = 0
let gameDisplayIdIndexArray = games.map(acc => {
console.log(acc);
console.log(acc.displayId);
if (acc.displayId  === displayId) {
  console.log(acc.displayId);
  return gameDisplayIdIndexCount;
}
else {
  gameDisplayIdIndexCount++;
  return 'na';
}
});

console.log(gameDisplayIdIndexArray);

let gameDisplayIdIndex = gameDisplayIdIndexArray.filter( runs => runs != 'na')
console.log(gameDisplayIdIndex);

console.log(games);
games.splice(gameDisplayIdIndex,1,gameComplete);

this.setState({
games: games,
}, function () {
  const { games } = this.state
  this.props.dispatch(updateGames(this.state.games));
})

console.log(this.props.games.games);

console.log(winningStreak);
console.log(longestStreak);

this.setState({
winningStreak: winningStreak,
longestStreak: longestStreak,
highestPlayerScore: 0,
highestPlayerScoreId: 0,
highestTeamScore: 0,
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

console.log(this.props.playerStats.winningStreak);
console.log(this.props.playerStats.longestStreak);

//Add not out batsman runs here to player's Form attribute.

  allPlayers = this.props.players.players;
  const facingBall = this.props.players.facingBall;
  const teamPlayers = this.props.teamPlayers.teamPlayers;

  allPlayers.map(player => {
    console.log(player);
    console.log(player.id);

    if (player.batterFlag === 0) {
      const scoreTwo = allPlayers[player.id].scoreOne;
      const scoreThree = allPlayers[player.id].scoreTwo;

      let outs = 0;
      if (allPlayers[player.id].outs <= 0) {
        outs = 0;
      }
      else {
        outs = allPlayers[player.id].outs
        outs--
      }

      let batterRunsCount = gameRunEvents.map(acc => {
        console.log(acc);
        if (acc.batterID === allPlayers[player.id].id) {
          console.log(acc.runsValue);
          return [acc.runsValue];
        }
        else {
            console.log(acc.runsValue);
            return 0;
          }
        });

        console.log(batterRunsCount);

        const batterRuns = sum(batterRunsCount.map(acc => Number(acc)));

        console.log(batterRuns);

      allPlayers[player.id].scoreOne = batterRuns;
      allPlayers[player.id].scoreTwo = scoreTwo;
      allPlayers[player.id].scoreThree = scoreThree;
      allPlayers[player.id].outs = outs;

      console.log(allPlayers);

      teamPlayers[player.id].scoreOne = batterRuns;
      teamPlayers[player.id].scoreTwo = scoreTwo;
      teamPlayers[player.id].scoreThree = scoreThree;
      teamPlayers[player.id].outs = outs;


      console.log(teamPlayers);

    }
})

const teamPlayersSet = allPlayers.map(player => {
  console.log(player);
  console.log(player.id);

  if ((player.id === 1 || player.id === 2)) {
    return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: player.autoNotOut};
  }
  else {
    return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: player.autoNotOut}
  }
});


console.log(teamPlayersSet);
console.log(facingBall);
this.setState({
  players: teamPlayersSet,
  facingBall: facingBall,
}, function () {
  const { players, facingBall } = this.state
  this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
})



console.log(teamPlayersSet);

this.setState({
  teamPlayers: teamPlayersSet,
}, function () {
  const { teamPlayers } = this.state
  this.props.dispatch(updateTeamPlayers(this.state.players));
})

this.ref.doc("players").update({
  players: teamPlayersSet,
});

this.setState({
  momentum: 0,
  momentumPrevOver: 0,
  momentumThisOver: [],
}, function () {
  const { momentum, momentumPrevOver, momentumThisOver } = this.state
  this.props.dispatch(updateMomentum(this.state.momentum, this.state.momentumPrevOver, this.state.momentumThisOver));
})

}

  render() {
    console.log('Hit Game!');
    console.log(this.props.players.players);

    return (
    <Container>
    <Header hasTabs style={styles.headerStyle}>
      <Left size={1} >
        <Button style={styles.goButton} rounded large success
          onPress={() => this.endGame()}
        >
          <Text style={styles.goButtonText}>X</Text>
        </Button>
      </Left>
      <Col size={1} style={ styles.logoStylingCol }>
      <Image
       source={require('../../assets/4dot6logo-transparent.png')}
       style={{ height: '100%', width: 'auto', justifyContent: 'center', alignItems: 'center', resizeMode: 'contain' }}
      />
      </Col>
      <Right size={1} style={styles.colVerticleAlign}>
        </Right>
    </Header>
        <Tabs initialPage={0}>
          <Tab heading={<TabHeading style={styles.activeTabStyle}>
                 <Text style={styles.activeTextStyle}>Scoreboard</Text>
               </TabHeading>}>
            <TabOne navigation={this.props.navigation} />
          </Tab>
          <Tab heading={<TabHeading style={styles.activeTabStyle}>
                 <Text style={styles.activeTextStyle}>Batting Card</Text>
               </TabHeading>}>
               <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
               <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
               locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>

              <FlatList
              data={this.props.players.players}
              style={{marginTop: 15, marginRight: 10, marginLeft: 10}}
              renderItem={({ item }) => <DisplayBattingCard {...item} />}
              />

            </LinearGradient>
            </ImageBackground >
          </Tab>
        </Tabs >
  </Container>
  );
  }
}

const mapStateToProps = state => ({
  gameID: state.gameID,
  gameRuns: state.gameRuns,
  ball: state.ball,
  players: state.players,
  games: state.games,
  gamesList: state.gamesList,
  firstInningsRuns: state.firstInningsRuns,
  playerStats: state.playerStats,
  gameCards: state.gameCards,
  teamPlayers: state.teamPlayers,
  momentum: state.momentum,
  autoNotOut: state.autoNotOut,
});

export default connect(mapStateToProps)(Game);


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStylingCol :{
      marginBottom: 5,
      marginTop: 5,
      marginLeft: Platform.OS === 'android' ? '17%' : 0,
      justifyContent: 'center'
    },
    headerStyle: {
      height: PixelRatio.get() === 1 ? 45 : PixelRatio.get() === 1.5 ? 50 : PixelRatio.get() === 2 ? 75 : PixelRatio.get() === 3.5 ? 60 : PixelRatio.get() === 3 && Platform.OS === 'android' ? 60 : 75,
      backgroundColor: '#12c2e9',
    },
    colVerticleAlign: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
    },
    activeTabStyle: {
      backgroundColor: '#fff',
    },
    activeTextStyle: {
      color: '#c471ed',
      fontSize: 17,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', //or 'stretch'
    },
    linearGradientOpacity: {
      flex: 1,
      opacity: 0.9,
    },
    goButton: {
      width: '100%',
      height: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: '#12c2e9',
    },
    goButtonText: {
      color: '#fff',
      fontSize: 30,
    },
});
