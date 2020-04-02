import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H3, Footer, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions, ImageBackground } from 'react-native';

import { connect } from "react-redux";
import CardBoard from '../../Util/CardBoard.js';
import BallDiff from '../../Util/BallDiff.js';

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateOver } from '../../Reducers/over';
import { updateGameId } from '../../Reducers/gameId';
import { updatePlayers } from '../../Reducers/players';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';
import { updateGames } from '../../Reducers/games';
import { updatePlayerStats } from '../../Reducers/playerStats';
import { updateAutoNotOut } from '../../Reducers/autoNotOut';


class WicketNotOut extends React.Component {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.refPlayers = firebase.firestore().collection(currentUser.uid).doc('players');
    this.state = {
        textInput: '',
        textInputBatter: '',
        loading: true,
        scorecard: [],
    };
  }

  state = {
    gameID: this.props.gameID.gameID || '0',
    gameRunEvents: this.props.gameRuns.gameRunEvents || [],
    keyID: this.props.gameID.keyID || '0',
    eventID: this.props.gameRuns.eventID || 0,
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 0,
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
    games: this.props.games.games || [],
    longestStreak: this.props.playerStats.longestStreak || 0,
    autoNotOut: this.props.autoNotOut.autoNotOut || 0,
  };

  handleChange = ( gameRuns, gameID, players, firstInningsRuns, games, playerStats, autoNotOut ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
    this.setState({ players });
    this.setState({ firstInningsRuns });
    this.setState({ games });
    this.setState({ playerStats });
    this.setState({ autoNotOut });
  };
/*
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
}

componentWillUnmount() {
    this.unsubscribe();
}
*/

getNavigation = () => {

    let sum = a => a.reduce((acc, item) => acc + item);

    const gameRunEvents = this.props.gameRuns.gameRunEvents;
    const eventID = this.props.gameRuns.eventID;
    const gameId = this.props.gameID.gameID
    console.log(gameId);
    let keyID = this.props.gameID.keyID;
    const allPlayers = this.props.players.players;
    const facingBall = this.props.players.facingBall;
    const firstInningsRuns =this.props.firstInningsRuns.firstInningsRuns;
    const { navigation } = this.props;
    const displayId = navigation.getParam('displayId');
    console.log(displayId);
    const totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
    console.log(totalRuns);
    let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
    let totalWickets = getWicketCount[0];
    console.log(totalWickets);
    const games = this.props.games.games;
    const longestStreak = this.props.playerStats.longestStreak;



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

    console.log('ball and over more than 0.');
  let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
  console.log(highestScorers);
  let battersHighestScore = highestScorers[0];
  let battersNameHighestScore = highestScorers[1];
  let highestScoreBallCount = highestScorers[2];
  let battersSecondHighestScore = highestScorers[3];
  let battersNameSecondHighestScore = highestScorers[4];
  let secondHighestScoreBallCount = highestScorers[5];

  console.log(gameRunEvents);
  console.log(firstInningsRuns);
  console.log(totalRuns);

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
    totalRuns: totalRuns,
    totalWickets: totalWickets,
  }
  this.ref.doc(filtered[0]).update({
      gameRunEvents: gameRunEvents,
      totalRuns: totalRuns,
      players: allPlayers,
      topScore: battersHighestScore[0][0],
      topScorePlayer: battersNameHighestScore[0].player,
      topScoreBalls: highestScoreBallCount,
      topSecondScore: battersSecondHighestScore[0][0],
      topSecondScorePlayer: battersNameSecondHighestScore[0].player,
      topSecondBalls: secondHighestScoreBallCount,
      totalWickets: totalWickets,
      gameResult: 1,
  });

  winningStreak = 0;
  const autoNotOut = this.props.autoNotOut.autoNotOut;

  this.ref.doc("playerStats").update({
    winningStreak: winningStreak,
    longestStreak: longestStreak,
    highestPlayerScore: 0,
    highestPlayerScoreId: 0,
    highestTeamScore: 0,
    autoNotOut: autoNotOut,
  });

  console.log('check 1');

  let gameResult = 1;

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
    totalRuns: totalRuns,
    totalWickets: totalWickets,
  }

  console.log(gameComplete);
  console.log('check 2');


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

  console.log('check 3');

  console.log(gameDisplayIdIndexArray);

  let gameDisplayIdIndex = gameDisplayIdIndexArray.filter( runs => runs != 'na')
  console.log(gameDisplayIdIndex);

  console.log('check 4');
  console.log(games);
  games.splice(gameDisplayIdIndex,1,gameComplete);

  console.log('check 5');

  this.setState({
  games: games,
  }, function () {
    const { games } = this.state
    this.props.dispatch(updateGames(this.state.games));
  })

  console.log('check 6');

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

  console.log('check 7');

  console.log(this.props.playerStats.winningStreak);
  console.log(this.props.playerStats.longestStreak);

  this.setState({
    autoNotOut: autoNotOut,
  }, function () {
    const { autoNotOut } = this.state
    this.props.dispatch(updateAutoNotOut(this.state.autoNotOut));
  })

  //Add not out batsman runs here to player's Form attribute.

    allPlayers.map(player => {
      console.log(player);
      console.log(player.id);
      console.log('check 8');

      if (player.batterFlag === 0) {
        const scoreTwo = allPlayers[player.id].scoreOne;
        const scoreThree = allPlayers[player.id].scoreTwo;
        console.log('check 9');

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
          if (acc.batterID === allPlayers[player.id]) {
            console.log(acc.runsValue);
            return [acc.runsValue];
          }
          else {
              console.log(acc.runsValue);
              return 0;
            }
          });

          console.log('check 10');
          console.log(batterRunsCount);

          const batterRuns = sum(batterRunsCount.map(acc => Number(acc)));

          console.log(batterRuns);
          console.log('check 11');

        allPlayers[player.id].scoreOne = batterRuns;
        allPlayers[player.id].scoreTwo = scoreTwo;
        allPlayers[player.id].scoreThree = scoreThree;
        allPlayers[player.id].outs = outs;

        console.log(allPlayers);
        console.log('check 12');

      }
  })

  console.log(allPlayers);
  console.log(facingBall);
  this.setState({
    players: allPlayers,
    facingBall: facingBall,
  }, function () {
    const { players, facingBall } = this.state
    this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
  })

  console.log('check 13');

  this.props.navigation.navigate('GameListNew')

  }

getNavigationText = () => {

  let sum = a => a.reduce((acc, item) => acc + item);
  const gameRunEvents = this.props.gameRuns.gameRunEvents;

  let ballCount = gameRunEvents.map(acc => {
    console.log(acc);
    return 1;
  });
  let ball = sum(ballCount.map(acc => Number(acc)));

  if (ball >= 120) {
    return (
    <Button rounded large warning style={styles.largeButton}
    onPress={() => this.getNavigation()} >
        <Text style={styles.buttonTextBack}><Icon name='ios-arrow-back' style={styles.buttonTextBack} /> Game over. End of Innings!</Text>
      </Button>
    )
  }
  else {
    return (
    <Button rounded large warning style={styles.largeButton}
    onPress={() => this.props.navigation.navigate('Game')} >
        <Text style={styles.buttonTextBack}><Icon name='ios-arrow-back' style={styles.buttonTextBack} /> Back to game</Text>
      </Button>
    )
  }

}


  render() {


    return (
    <Container>
    <Header style={styles.headerStyle}>
      <Left size={1}>
        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} style={{color: '#fff', paddingLeft: 20, marginTop: 'auto', marginBottom: 'auto' }} />
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
    <ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradientOpacity}>
    <Content style={{ flex: 1, width: '100%'}}>
    <Col style={{height: 75, backgroundColor: '#FF69B4', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#fff',}}>
      <Row size={5}>
        <Text style={{fontSize: 40, color: '#fff'}}>HOWZAT!</Text>
      </Row>
      <Row size={2} style={{paddingBottom: 5}}>
        <Text style={{fontSize: 15, color: '#fff'}}>3rd Umpire decision...</Text>
      </Row>
    </Col>
      <Col style={{flex: 1,paddingLeft: 15, paddingRight: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#77dd77', marginTop: 20, borderRadius: 5, marginRight: 15, marginLeft: 15}}>
      <Row style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10, opacity: 1,}}>
        <Text style={{width: '100%', color: '#fff', fontSize: 100, textAlign: 'center'}}>NOT OUT!</Text>
      </Row>
    </Col>
    </Content>
    </LinearGradient>
    </ImageBackground>
    <Footer style={{ height: 100, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
      <Row>
        <Col size={1}>
        {this.getNavigationText()}
        </Col>
      </Row>
    </Footer>
  </Container>
  );
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  gameID: state.gameID,
  players: state.players,
  firstInningsRuns: state.firstInningsRuns,
  games: state.games,
  playerStats: state.playerStats,
  autoNotOut: state.autoNotOut,
});

export default connect(mapStateToProps)(WicketNotOut);


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    textHeader: {
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textHeaderThreshold: {
      color: '#fff',
      alignItems: 'flex-start',
      width: '90%'
    },
    textDesc: {
      color: '#eee',
      fontWeight: '100',
    },
    textHeaderNumber: {
      color: '#fff',
      fontSize: 40,
      lineHeight: 40,
    },
    colCenter: {
      alignItems: 'center',
    },
    horizontalRule: {
      borderBottomColor: '#fff',
      borderBottomWidth: 0.5,
      width: '100%',
      marginTop: 15,
      marginBottom: 15,
    },
    colVerticleAlign: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    largeButton: {
      width: '100%',
      backgroundColor: '#77dd77',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
      borderRadius: 0,
      height: '100%',
    },
    buttonText: {
      fontSize: PixelRatio.get() === 1 ? 28 : PixelRatio.get() === 1.5 ? 32 : PixelRatio.get() === 2 ? 36 : 40,
      color: '#c471ed',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '200',
    },
    buttonTextBack: {
      fontSize: 35,
      color: '#fff',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '200',
    },
    rowPadding :{
      paddingTop: 20,
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
    horizontalRule: {
      borderTopColor: '#fff',
      borderTopWidth: 0.5,
      width: '100%',
      marginTop: 30,
    },
    ThresholdStyle: {
      fontSize: 40,
      width: 60,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: '#fff',
      borderBottomColor: '#fff', backgroundColor: 'rgba(204, 204, 204, 0.4)'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    linearGradientOpacity: {
      flex: 1,
      borderRadius: 5,
      opacity: 0.9,
    },
});
