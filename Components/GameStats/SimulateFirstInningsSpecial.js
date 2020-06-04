import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H2, H3, Footer, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';
import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateGamesList } from '../../Reducers/gamesList';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';

import BallDiff from '../../Util/BallDiff.js';
import CardBoard from '../../Util/CardBoard.js';

class SimulateFirstInningsSpecial extends React.Component {
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
        rImage: '',
        cardWicket: 0,
        randomClick: 1,
        incrementer: null,
        simRuns: 0,
        simRunEvents: [],
        totalRuns: 0,
        totalWickets: 0,
        totalOver: 0,
        totalBall: 0,
        newGameFlag: 0,
        runRate: 'RR: ~',
        n: 0,
    };
  }

  state = {
    gameID: this.props.gameID.gameID || '0',
    gameRunEvents: this.props.gameRuns.gameRunEvents || [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
    eventID: this.props.gameRuns.eventID || 0,
    overBowled: this.props.gameRuns.overBowled || false,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
    games: this.props.games.games || [],
    teamPlayers: this.props.teamPlayers.teamPlayers || [],
    gamesList: this.props.gamesList.gamesList || [],
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
  };

  handleChange = ( gameID, gameRuns, ball, players, games, teamPlayers, gamesList ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
    this.setState({ ball });
    this.setState({ players });
    this.setState({ games });
    this.setState({ teamPlayers });
    this.setState({ gamesList });
  };

  incrementer = () => {
    console.log(this.state.incrementer);
    let incrementer = null;
    console.log(incrementer);
    this.setState({incrementer: incrementer});
  }


  componentDidMount() {
    const games = this.props.games.games;
    const gamesCount = games.length;

    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    this.refPlayers.onSnapshot(this.onDocCollectionUpdate)

    if (gamesCount <= 2000) {
    Alert.alert("Simulate first innings.", "On the next screen you will simulate the first innings to give yourself a target to chase. Click 'Generate innings' on the next page to start the innings. An average score is about 175. Enjoy!" )
    }

  }

  componentWillUnmount() {
    //this.unsubscribe();
    clearInterval(this.interval);
  }


  onCollectionUpdate = (querySnapshot) => {
    console.log(this.props.games.games);
    const games = [];
    console.log(this.props.games.games);
    let keyId = "";
    querySnapshot.forEach((doc) => {
      const { gameId, gameName } = doc.data();
      keyId = doc.id
      games.push({
        key: doc.id,
        doc, // DocumentSnapshot
        gameId,
        gameName,
      });
    });

    console.log(keyId);

    this.setState({
      games,
      loading: false,
      keyId: keyId,
   });
   console.log(this.props.games.games);
  }

  onDocCollectionUpdate = (documentSnapshot) => {
    console.log(this.state.facingBall);

    //let allPlayers = this.props.players.players;
    let facingBall = this.state.facingBall;

    console.log(allPlayers);
    console.log(facingBall);

    let teamPlayers = this.props.teamPlayers.teamPlayers;
    if (teamPlayers === [] || teamPlayers === undefined || teamPlayers === null || teamPlayers.length < 1 ) {
      console.log('allplays null hit?');
      teamPlayers = documentSnapshot.data().players;
    }
    else {
      console.log('else all players from redux.');
      teamPlayers = this.props.teamPlayers.teamPlayers;
    }

    console.log(teamPlayers);

    const teamPlayersSet = teamPlayers.map(player => {
      console.log(player);
      console.log(player.id);

      if (player.id === 1 || player.id === 2) {
        return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: 0, highestScore: player.highestScore};
      }
      else {
        return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: 0, highestScore: player.highestScore};
      }
    });

    console.log(teamPlayersSet);

      console.log('else all players from redux.');
    const allPlayers = teamPlayersSet;


    console.log(allPlayers);
    console.log(facingBall);


    this.setState({
      players: allPlayers,
      facingBall: 1,
    }, function () {
      const { players, facingBall } = this.state
      this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
    })

    this.setState({
      teamPlayers: teamPlayersSet,
    }, function () {
      const { teamPlayers } = this.state
      this.props.dispatch(updateTeamPlayers(this.state.teamPlayers));
    })

    console.log(this.props.players.players);

    console.log('finished onDocCollectionUpdate');

    }



goToSefcondInnings = () => {

  //const firstInningsRuns = this.state.totalRuns;

  const { navigation } = this.props;
  const firstInningsRuns = navigation.getParam('score', 250);

  console.log(firstInningsRuns);

  this.setState({
    firstInningsRuns: firstInningsRuns,
  }, function () {
    const { firstInningsRuns } = this.state
    this.props.dispatch(updateFirstInningsRuns(this.state.firstInningsRuns));
  })

  console.log(this.props.games.games);
  const displayId = navigation.getParam('displayId');  //.it might need tobe 'displayId' (in brackets)
  console.log(displayId);

  const gameId = navigation.getParam('gameId');

  const teamPlayers = this.props.teamPlayers.teamPlayers;

  console.log(this.props.games.games);
  let currentKey = this.props.games.games.map(acc => {
    console.log(acc);
    if (acc.gameId  === gameId) {
      console.log(acc.gameId);
      console.log(acc.key);
      return acc.key;
    }
    });
    console.log(currentKey);

    let filtered = currentKey.filter(t=>t != undefined);
    console.log(filtered);
    console.log(filtered[0]);

  this.ref.doc(filtered[0]).update({
      firstInningsRuns: firstInningsRuns,
  });

  console.log(this.props.games.games);
  let games = this.props.games.games;
  console.log(games);

  //const { navigation } = this.props;
  //const displayId = navigation.getParam('displayId', gameId);  //.it might need tobe 'displayId' (in brackets)
  console.log(displayId);

  console.log(filtered[0]);

  const game = {
    displayId: displayId,
    firstInningsRuns: firstInningsRuns,
    gameId: gameId,
    gameName: "Cricket Strategy Sim",
    gameResult: 0,
    gameRunEvents: [],
    players: teamPlayers,
    key: filtered[0],
    topScore: 0,
    topScoreBalls: 0,
    topScorePlayer: '',
    topSecondBalls: 0,
    topSecondScore: 0,
    topSecondScorePlayer: '',
    totalRuns: 0,
    totalWickets: 0,
    keyId: '',
  }

  console.log(game);

  //games.push({displayId: displayId, firstInningsRuns: firstInningsRuns, gameId: gameId, gameName: "Cricket Strategy Sim", gameResult: 0, key: currentKey, topScore: 0, topScoreBalls: 0, topScorePlayer: '', topSecondBalls: 0, topSecondScore: 0, topSecondScorePlayer: '', totalRuns: 0, totalWickets: 0});
  console.log(games);
  games.unshift(game);
  console.log(games);

  this.setState({
    games: games,
  }, function () {
    const { games } = this.state
    this.props.dispatch(updateGames(this.state.games));
  })
  console.log(this.props.games.games);

  //let newGameFlag = 2;
  //this.setState({newGameFlag: newGameFlag});

  //console.log(this.state.totalRuns);
  //const firstInningsRuns = this.state.totalRuns


  //let newGameFlag = 0;
  //this.setState({newGameFlag: newGameFlag});


  //const teamPlayers = this.props.teamPlayers.teamPlayers;

  const teamPlayersSet = teamPlayers.map(player => {
    console.log(player);
    console.log(player.id);

    if (player.id === 1 || player.id === 2) {
      return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 0, aggBoard: 0, autoNotOut: 0, highestScore: player.highestScore};
    }
    else {
      return {player: player.player, id: player.id, scoreOne: player.scoreOne, scoreTwo: player.scoreTwo, scoreThree: player.scoreThree, outs: player.outs, batterFlag: 1, aggBoard: 0, autoNotOut: 0, highestScore: player.highestScore};
    }
  });

    console.log(teamPlayersSet);

  this.setState({
    teamPlayers: teamPlayersSet,
  }, function () {
    const { teamPlayers } = this.state
    this.props.dispatch(updateTeamPlayers(this.state.teamPlayers));
  })

  const gameRunEvents = this.props.gameRuns.gameRunEvents;

  this.setState({
    gameRunEvents: gameRunEvents,
    overBowled: false,
  }, function () {
    const { gameRunEvents, overBowled } = this.state
    this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.overBowled));
  })

  const totalWicketsReset = 0
  this.setState({ totalWickets: totalWicketsReset });

  //const newGameFlag = 1;
  const newGameFlagReset = 0;
  this.setState({ newGameFlag: newGameFlagReset });
  console.log(this.state.newGameFlag);

  let totalRunsReset = 0;
  this.setState({ totalRuns: totalRunsReset });

  const totalOverReset = 0;
  this.setState({ totalOver: totalOverReset });

  const totalBallReset = 0;
  this.setState({ totalBall: totalBallReset });

  const runRateReset = 0;
  this.setState({ runRate: runRateReset });

  //const games = this.props.games.games;
  const gamesCount = games.length;

  console.log(gamesCount);

  if (gamesCount <= 260) {
    this.props.navigation.navigate('ExplainerImageOne', {
      displayId: displayId,
      firstInningsRuns: firstInningsRuns,
    });
  }
  else {
  this.props.navigation.navigate('Game', {
    displayId: displayId,
    firstInningsRuns: firstInningsRuns,
  });
  }
}


displayStartSecondInnings = () => {

    return (
    <Button rounded large warning style={styles.largeButton}
      onPress={() => this.goToSefcondInnings()} >
      <Text style={styles.buttonTextBack}>Start second innings <Icon name='ios-arrow-forward' style={styles.buttonTextBack} /></Text>
    </Button>
  )
}

displayBack = () => {

    return (
    <Button rounded large warning style={styles.largeButton}
      onPress={() => this.props.navigation.navigate('StatsMain')} >
      <Text style={styles.buttonTextBack}><Icon name='ios-arrow-back' style={styles.buttonTextBack} /> Back to stats</Text>
    </Button>
  )
}

displayInningsChase = () => {

  const { navigation } = this.props;
  let score = navigation.getParam('score', 250);

  return (
    <Row size={2}>
      <Col>
      <View style={styles.horizontalRule} />
        <Row >
        <Text style={styles.headingText}>Simulate First Innings</Text>
        </Row>
        <Row>
        <Text style={styles.headingTextSmall}>{score}</Text>
        </Row>
        <View style={styles.horizontalRule} />
      </Col >
    </Row>
  )
}


  render() {
    console.log(this.props.games.games);
    console.log(this.state.totalWickets);
    console.log(this.state.totalRuns);
    console.log(this.state.totalOver);
    console.log(this.state.totalBall);
    console.log(this.state.runRate);
    console.log(this.state.simRuns);
    console.log(this.state.simRunEvents);

    return (
    <Container>
    <NavigationEvents
                onDidFocus={() => console.log('Refreshed')}
                />
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
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
    <Content style={{ flex: 1, width: '100%'}}>
      {this.displayInningsChase()}
    </Content>
    <Footer style={{ height: 120, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
      <Col>
        <Row>
      {this.displayStartSecondInnings()}
        </Row>
        <Row>
      {this.displayBack()}
        </Row>
        </Col>
    </Footer>
    </LinearGradient>
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
  teamPlayers: state.teamPlayers,
  gamesList: state.gamesList,
  firstInningsRuns: state.firstInningsRuns,
});

export default connect(mapStateToProps)(SimulateFirstInningsSpecial);


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
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
    },
    generateInningsLargeButton: {
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      elevation: 0,
      shadowOpacity: 0,
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
      fontSize: 20,
      color: '#c471ed',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '200',
    },
    generateInningsButtonText: {
      fontSize: 40,
      color: '#c471ed',
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
      marginTop: 25,
      marginBottom: 25,
    },
    ThresholdStyle: {
      fontSize: 40,
      width: 60,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: '#fff',
      borderBottomColor: '#fff', backgroundColor: 'rgba(204, 204, 204, 0.4)'
    },
    cardDisplay: {
      flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  headingText: {
    fontSize: 40,
    color: '#fff',
  },
  ballCircle: {
    width: '100%',
    height: 200,
    borderRadius: 60 / 2,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 3,
    margin: 1,
  },
  textBall: {
    color: '#c471ed',
    fontSize: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
  },
  ballCircleRuns: {
    width: '100%',
    height: 200,
    borderRadius: 60 / 2,
    backgroundColor: '#c471ed',
    borderColor: '#c471ed',
    borderWidth: 3,
    margin: 1,
  },
  textBallRuns: {
    color: '#fff',
    fontSize: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
  },
  textBallOvers: {
    color: '#fff',
    fontSize: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
  },
  headingTextSmall: {
    fontSize: 15,
    color: '#eee',
  }
});
